
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            const storeContainer = document.getElementById("store");

            data.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product");

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>${product.description}...</p>
                    <p><strong>Categoría:</strong> ${product.category}</p>
                    <span><strong>Precio:</strong> $${product.price}</span>
                    <button>Agregar al carrito</button>
                `;

                storeContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error cargando productos:", error));
});
