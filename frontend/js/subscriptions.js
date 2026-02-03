const userId = getUserId();
if (!userId) window.location.href = "login.html";

async function loadPlans() {
    const profile = await apiGet(`/user/profile?userId=${encodeURIComponent(userId)}`);
    document.getElementById("credits").innerText =
        `Credits: ${profile.creditBalance}`;

    const plans = await apiGet(`/catalog/plans?productId=SKETCHUP`);
    const container = document.getElementById("plans");

    plans.forEach(p => {
        const div = document.createElement("div");
        div.className = "plan";
        div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Features: ${
            p.features
                .map(f => (typeof f === "string" ? f : f.S))
                .join(", ")
        }</p>

      <p>Cost/min: ${p.costPerMinute}</p>
      <button onclick="activate('${p.planId}', ${p.costPerMinute})">
        Activate JIT
      </button>
    `;
        container.appendChild(div);
    });
}

async function activate(planId, costPerMinute) {
    const minutes = prompt("Enter duration (minutes):");
    if (!minutes) return;

    const res = await apiPost("/jit/request-upgrade", {
        userId,
        productId: "SKETCHUP",
        planId: planId,
        durationMinutes: Number(minutes)
    });

    if (res.productSessionId) {
        alert("JIT Activated");
        window.location.href = "index.html";
    } else {
        alert(res.error || "Activation failed");
    }
}

loadPlans();
