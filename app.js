import { fetchProducts } from "./api.js";


// Application state

let products = [];
let filteredProducts = [];

let selectedCategory = "all";
let searchText = "";
let sortType = "default";

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// DOM elements

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("errorMessage");

const cartCount =
    document.getElementById("cartCount");


// Load products from API

async function loadProducts() {

    showLoading();

    try {

        products = await fetchProducts();

        filteredProducts = products;

        renderProducts();

    } catch (error) {

        showError(
            "Unable to load products. Please try again."
        );

        console.error(error);

    } finally {

        hideLoading();

    }
}


// Display products

function renderProducts() {

    productContainer.innerHTML = "";

    if (filteredProducts.length === 0) {

        productContainer.innerHTML = `
            <div class="no-products">
                <h2>No products found</h2>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    filteredProducts.forEach(product => {

        const productCard =
            document.createElement("article");

        productCard.className = "product-card";

        productCard.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.title}"
            >

            <div class="product-content">

                <h2>${product.title}</h2>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    $${product.price.toFixed(2)}
                </p>

                <button
                    class="add-cart"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>
        `;

        productContainer.appendChild(productCard);

    });


    // Add cart button events

    document.querySelectorAll(".add-cart")
        .forEach(button => {

            button.addEventListener("click", () => {

                const productId =
                    Number(button.dataset.id);

                addToCart(productId);

            });

        });

}


// Search products

searchInput.addEventListener("input", (event) => {

    searchText =
        event.target.value.toLowerCase();

    applyFilters();

});


// Category filtering

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory =
            button.dataset.category;

        applyFilters();

    });

});


// Sorting

sortSelect.addEventListener("change", (event) => {

    sortType = event.target.value;

    applyFilters();

});


// Apply search + category + sorting

function applyFilters() {

    filteredProducts = products.filter(product => {

        const matchesSearch =
            product.title
                .toLowerCase()
                .includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });


    // Sort by price - low to high

    if (sortType === "price-low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }


    // Sort by price - high to low

    else if (sortType === "price-high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }


    // Sort alphabetically

    else if (sortType === "name") {

        filteredProducts.sort(
            (a, b) =>
                a.title.localeCompare(b.title)
        );

    }


    renderProducts();

}


// Add product to cart

function addToCart(productId) {

    const product =
        products.find(
            product => product.id === productId
        );

    if (!product) return;

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


// Update cart number

function updateCartCount() {

    cartCount.textContent = cart.length;

}


// Show loading

function showLoading() {

    loading.style.display = "grid";

    productContainer.style.display = "none";

}


// Hide loading

function hideLoading() {

    loading.style.display = "none";

    productContainer.style.display = "grid";

}


// Show error

function showError(message) {

    errorMessage.textContent = message;

    errorMessage.style.display = "block";

}


// Start application

updateCartCount();

loadProducts();