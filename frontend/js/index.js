const userId = getUserId();
const productId = "SKETCHUP";

let lastRenderedPlanId = null;
let lastRenderedStatus = null;


if (!userId) window.location.href = "login.html";

let lastWarnShown = null;

async function loadStatus() {
    // 1. Load credits
    const profile = await apiGet(
        `/user/profile?userId=${encodeURIComponent(userId)}`
    );

    document.getElementById("credits").innerText =
        `Credits: ${profile.creditBalance}`;

    // 2. Load JIT status
    const statusApiRes = await apiGet(
        `/jit/status?userId=${encodeURIComponent(userId)}&productId=${productId}`
    );

    //  IMPORTANT: unwrap message
    const statusRes = statusApiRes.message;

    const dynamicTools = document.getElementById("dynamicTools");
    const buttonsDiv = document.getElementById("toolButtons");
    const notification = document.getElementById("notification");


    // 3. No active JIT
    if (!statusRes || statusRes.status === "NONE" || statusRes.status === "EXPIRED") {
        dynamicTools.style.display = "none";
        notification.innerText = "";
        lastWarnShown = null;
        return;
    }

    // 4. WARN popups (only once)
    if (statusRes.status === "WARN_50" && lastWarnShown !== "WARN_50") {
        alert("⚠️ 50% of your JIT time is used");
        lastWarnShown = "WARN_50";
    }

    if (statusRes.status === "WARN_90" && lastWarnShown !== "WARN_90") {
        alert("⏰ 90% of your JIT time is used, Please save your work");
        lastWarnShown = "WARN_90";
    }


    // 5. Fetch plans
    const plans = await apiGet(`/catalog/plans?productId=${productId}`);

    const activePlan = plans.find(p => p.planId === statusRes.planId);

    if (!activePlan) {
        console.error("Active plan not found:", statusRes.planId);
        return;
    }

    if (
        statusRes.status === lastRenderedStatus &&
        statusRes.planId === lastRenderedPlanId
    ) {
        return;
    }

// mark current state as rendered
    lastRenderedStatus = statusRes.status;
    lastRenderedPlanId = statusRes.planId;

    buttonsDiv.innerHTML = "";

// 6. Render buttons from ACTIVE PLAN ONLY
    activePlan.features.forEach(f => {
        const feature = typeof f === "string" ? f : f.S;
        const btn = document.createElement("button");
        btn.innerText = feature;
        buttonsDiv.appendChild(btn);
    });

    dynamicTools.style.display = "block";
    notification.innerText = `JIT Status: ${statusRes.status}`;

}

function goSubscriptions() {
    window.location.href = "subscriptions.html";
}


setInterval(loadStatus, 5000);
loadStatus();
