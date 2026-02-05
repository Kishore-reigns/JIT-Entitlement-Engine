const API_BASE = window.env.API_BASE_URL

function getUserId() {
    return localStorage.getItem("userId");
}

function getSelectedProduct() {
    return localStorage.getItem("selectedProduct");
}

async function apiGet(path) {
    const res = await fetch(`${API_BASE}${path}`);
    return res.json();
}

async function apiPost(path, body) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    return res.json();
}
