const userId = getUserId();
if (!userId) window.location.href = "login.html";

const PRODUCTS = [
    {
        id: "SKETCHUP",
        name: "SketchUp",
        description: "3D Modelling & Visualization"
    },
    {
        id: "TEKLA",
        name: "Tekla",
        description: "Structural Engineering Design"
    }
];

async function loadProducts() {

    const products = await apiGet("/catalog/products");

    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(p => {

        const div = document.createElement("div");
        div.className = "product-card";

        div.innerHTML = `
            
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <button onclick="selectProduct('${p.productId}')">
                Open
            </button>
        `;

        container.appendChild(div);
    });
}

function selectProduct(productId) {

    localStorage.setItem("selectedProduct", productId);

    window.location.href = "index.html";
}

loadProducts();
