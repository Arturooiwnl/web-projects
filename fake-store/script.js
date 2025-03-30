document.addEventListener("DOMContentLoaded", () => {
    
    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
    const categoryNames = {
        "electronics": "Electrónica",
        "jewelery": "Joyería",
        "men's clothing": "Ropa de Hombre",
        "women's clothing": "Ropa de Mujer"
    };

    const selectElement = document.getElementById("category-select");

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = categoryNames[category] || category;
        selectElement.appendChild(option);
    });




    const categorySelect = document.getElementById("category-select");
    const storeContainer = document.getElementById("store");

    const loadProducts = (category) => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(response => response.json())
            .then(data => {
                storeContainer.innerHTML = ""; 

                data.forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product");

                    productCard.innerHTML = `
        <div class="product-card">
            <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="buy-button" onclick="alert('Añadido al carrito: ${product.title}')">Comprar Ahora</button>
            </div>
        </div>
    `;

                    storeContainer.appendChild(productCard);
                });
            })
            .catch(error => console.error("Error cargando productos:", error));
    };

    loadProducts(categorySelect.value);

    categorySelect.addEventListener("change", () => {
        loadProducts(categorySelect.value);
    });
});

