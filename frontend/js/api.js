const API_BASE = "https://16ih3wa0c6.execute-api.eu-north-1.amazonaws.com/dev";

function getUserId() {
    return localStorage.getItem("userId");
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
