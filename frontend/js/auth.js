async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await apiPost("/auth/login", {
        action: "login",
        email,
        password
    });

    if (res.userId) {
        localStorage.setItem("userId", res.userId);
        window.location.href = "index.html";
    } else {
        alert(res.error || "Login failed");
    }
}

async function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await apiPost("/auth/register", {
        action: "register",
        email,
        password
    });

    if (res.userId) {
        alert("Registered successfully. Login now.");
        window.location.href = "login.html";
    } else {
        alert(res.error || "Registration failed");
    }
}
