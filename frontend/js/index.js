const userId = getUserId();
const productId = getSelectedProduct();


let lastRenderedPlanId = null;
let lastRenderedStatus = null;
let lastRenderedSessionId = null;



if (!userId) window.location.href = "login.html";
if (!productId) window.location.href = "products.html";

document.getElementById("productTitle").innerText = productId;


let lastWarnShown = null;

async function loadStatus() {

    const profile = await apiGet(
        `/user/profile?userId=${encodeURIComponent(userId)}`
    );

    document.getElementById("credits").innerText =
        `Credits: ${profile.creditBalance}`;

    const statusApiRes = await apiGet(
        `/jit/status?userId=${encodeURIComponent(userId)}&productId=${productId}`
    );

    const statusRes = statusApiRes.message;

    const basicButtonsDiv = document.getElementById("basicToolButtons");
    const dynamicTools = document.getElementById("dynamicTools");
    const buttonsDiv = document.getElementById("toolButtons");
    const notification = document.getElementById("notification");

    /* ===============================
       LOAD PLANS ONCE
    =============================== */

    const plans = await apiGet(`/catalog/plans?productId=${productId}`);

    const basicPlan = plans.find(p => p.planId === "BASIC");

    if (basicPlan) {

        basicButtonsDiv.innerHTML = "";

        basicPlan.features.forEach(f => {
            const feature = typeof f === "string" ? f : f.S;

            const btn = document.createElement("button");
            btn.innerText = feature;

            basicButtonsDiv.appendChild(btn);
        });
    }

    /* ===============================
       NO ACTIVE JIT
    =============================== */

    if (!statusRes || statusRes.status === "NONE" || statusRes.status === "EXPIRED") {

        dynamicTools.style.display = "none";
        notification.innerText = "";

        lastWarnShown = null;
        lastRenderedSessionId = null;
        lastRenderedStatus = null;
        lastRenderedPlanId = null;

        return;
    }

    /* ===============================
       WARN ALERTS
    =============================== */

    if (statusRes.status === "WARN_50" && lastWarnShown !== "WARN_50") {
        alert("50% of your JIT time is used");
        lastWarnShown = "WARN_50";
    }

    if (statusRes.status === "WARN_90" && lastWarnShown !== "WARN_90") {
        alert("90% of your JIT time is used");
        lastWarnShown = "WARN_90";
    }

    if (statusRes.status === "COMPLETE" && lastWarnShown !== "COMPLETE") {
        alert("JIT completed. Grace period started.");
        lastWarnShown = "COMPLETE";
    }

    /* ===============================
       ACTIVE PLAN FEATURES
    =============================== */

    const activePlan = plans.find(p => p.planId === statusRes.planId);

    if (!activePlan) return;

    if (
        statusRes.sessionId === lastRenderedSessionId &&
        statusRes.status === lastRenderedStatus &&
        statusRes.planId === lastRenderedPlanId
    ) {
        return;
    }

    buttonsDiv.innerHTML = "";

    activePlan.features.forEach(f => {
        const feature = typeof f === "string" ? f : f.S;

        const btn = document.createElement("button");
        btn.innerText = feature;

        buttonsDiv.appendChild(btn);
    });

    dynamicTools.style.display = "block";
    notification.innerText = `JIT Status: ${statusRes.status}`;

    lastRenderedSessionId = statusRes.sessionId;
    lastRenderedStatus = statusRes.status;
    lastRenderedPlanId = statusRes.planId;
}


function goSubscriptions() {
    window.location.href = "subscriptions.html";
}


setInterval(loadStatus, 5000);
loadStatus();
