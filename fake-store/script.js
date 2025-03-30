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
                <button class="info-button" onclick="openModal(${product})">Más Información</button>
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

    let cartCount = 0; 

    const addCountCart = (count) => {
        cartCount += count;
        document.querySelector(".cart-counter").textContent = cartCount; 
        console.log(`Productos en el carrito: ${cartCount}`);
    };

    const openModal = (product) => {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
        <div class="modal-content">
                <p class="buy-successful"><strong>¡Genial!</strong> Has agregado con exito el producto ${product.title}</p>
                <span class="close-button">&times;</span>
                <div class="modal-product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="modal-product-info">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p class="modal-product-price">$${product.price}</p>
                    <button class="info-button">Agregar al carrito</button>
                </div>
            </div>
        `;


        document.body.appendChild(modal);

        const successfulMessage = modal.querySelector(".buy-successful");

        modal.querySelector(".info-button").addEventListener("click", () => {
            addCountCart(1);
            successfulMessage.style.opacity = "1"; 

            setTimeout(() => {
                successfulMessage.style.opacity = "0"; 
            }, 1000); 

        });

        const closeButton = modal.querySelector(".close-button");
        closeButton.addEventListener("click", () => {
            modal.remove();
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.remove();
            }
        });
    };

    storeContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("info-button")) {
            const productCard = event.target.closest(".product");
            const productTitle = productCard.querySelector(".product-title").textContent;

            fetch(`https://fakestoreapi.com/products`)
                .then(response => response.json())
                .then(products => {
                    const product = products.find(p => p.title === productTitle);
                    if (product) {
                        openModal(product);
                    }
                })
                .catch(error => console.error("Error cargando información del producto:", error));
        }
    });


});

