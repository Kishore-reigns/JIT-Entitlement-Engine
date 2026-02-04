const userId = getUserId();
const productId = "SKETCHUP";

if (!userId) window.location.href = "login.html";

async function loadPlans() {
    // 1. Load user credits
    const profile = await apiGet(
        `/user/profile?userId=${encodeURIComponent(userId)}`
    );
    document.getElementById("credits").innerText =
        `Credits: ${profile.creditBalance}`;

    // 2. Load active JIT status
    const statusApiRes = await apiGet(
        `/jit/status?userId=${encodeURIComponent(userId)}&productId=${productId}`
    );

    const activeJit = statusApiRes.message;
    const activePlanId =
        activeJit &&
        activeJit.status !== "NONE" &&
        activeJit.status !== "EXPIRED"
            ? activeJit.planId
            : null;

    // 3. Load plans
    const plans = await apiGet(`/catalog/plans?productId=${productId}`);
    const container = document.getElementById("plans");

    container.innerHTML = "";

    plans.forEach(p => {
        const div = document.createElement("div");
        div.className = "plan";

        const isActive = p.planId === activePlanId;
        const isFree = p.costPerMinute === 0;

        if (isActive) {
            div.classList.add("active");
        }

        div.innerHTML = `
            <h3>${p.name}</h3>

            <p><strong>Features:</strong><br>
                ${p.features
            .map(f => (typeof f === "string" ? f : f.S))
            .join(", ")}
            </p>

            <p><strong>Cost / min:</strong> ${p.costPerMinute}</p>

            ${
            isActive
                ? `<button disabled>Active Plan</button>`
                : isFree
                    ? `<button disabled>Included</button>`
                    : `<button onclick="activate('${p.planId}', ${p.costPerMinute})">
                              Activate JIT
                          </button>`
        }
        `;

        container.appendChild(div);
    });
}

async function activate(planId, costPerMinute) {
    const minutes = prompt("Enter duration (minutes):");
    if (!minutes || isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid duration");
        return;
    }

    const res = await apiPost("/jit/request-upgrade", {
        userId,
        productId,
        planId,
        durationMinutes: Number(minutes)
    });

    if (res.productSessionId) {
        alert("JIT Activated Successfully");
        window.location.href = "index.html";
    } else {
        alert(res.error || "Activation failed");
    }
}

loadPlans();
