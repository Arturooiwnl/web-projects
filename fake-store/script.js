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
    const cart = []; 

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

    const addCountCart = (product) => {
        cart.push(product);
        cartCount++;
        document.querySelector(".cart-counter").textContent = cartCount;
        console.log(`Productos en el carrito: ${cartCount}`);
    };
    const removeFromCart = (productId) => {
        const index = cart.findIndex(product => product.id === productId);
        
        if (index !== -1) {
            cart.splice(index, 1); 
            cartCount = Math.max(0, cartCount - 1); 
            document.querySelector(".cart-counter").textContent = cartCount;
    
            const productElement = document.querySelector(`.cart-item[data-id="${productId}"]`);
            if (productElement) productElement.remove();
    
            console.log(`Producto eliminado. Productos en el carrito: ${cartCount}`);
        } else {
            console.log("Producto no encontrado en el carrito.");
        }
    };

    const openModal = (product) => {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
        <div class="modal-content">
                <p class="buy-successful"><strong>¡Genial!</strong> Has agregado con éxito el producto ${product.title}</p>
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
        document.body.style.overflow = "hidden"; 

        const successfulMessage = modal.querySelector(".buy-successful");

        modal.querySelector(".info-button").addEventListener("click", () => {
            addCountCart(product);
            successfulMessage.style.opacity = "1";

            setTimeout(() => {
                successfulMessage.style.opacity = "0";
            }, 1000);
        });

        const closeButton = modal.querySelector(".close-button");
        closeButton.addEventListener("click", () => {
            modal.remove();
            document.body.style.overflow = "auto";
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.remove();
                document.body.style.overflow = "auto"; 
            }
        });
    };

    const openCartModal = () => {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        if (cart != 0){
            modal.innerHTML = `
            <div class="modal-cart-content">
                <h2>Carrito de Compras</h2>
                <span class="close-button">&times;</span>
                <div class="cart-items">
                    ${cart.map(product => `
                        <div class="cart-item" data-id="${product.id}">
                            <div class="modal-cart-product-image">
                                <img src="${product.image}" alt="${product.title}">
                                </div>
                                <div class="modal-cart-product-info">
                                <h2>${product.title}</h2>
                                <p class="modal-cart-product-price">$${product.price} </p>
                                <buttton class="remove-item-button" data-id="${product.id}" title="borrar" ><img src="assets/images/trash.svg" alt="trash"></button>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
            `;            
        }else{
            modal.innerHTML = `
            <div class="modal-cart-content">
                <h2>Carrito de Compras</h2>
                <span class="close-button">&times;</span>
                <div class="cart-items">
                    <p>Carrito vacio...</p>
                </div>
            </div>
            `;
        }

        document.body.appendChild(modal);
        document.body.style.overflow = "hidden"; 

        document.querySelectorAll(".remove-item-button").forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = parseInt(event.currentTarget.dataset.id);
                removeFromCart(productId);
            });
        });

        const closeButton = modal.querySelector(".close-button");
        closeButton.addEventListener("click", () => {
            modal.remove();
            document.body.style.overflow = "auto"; 
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.remove();
                document.body.style.overflow = "auto"; 
            }
        });
    };

    document.querySelector(".cart").addEventListener("click", openCartModal);

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

// 
// css, html, js vanilla :)
// 
// by https://dev.arturoiwnl.pro/
// 