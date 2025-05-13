// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        category: "electronics",
        image: "images/headphones.jpg",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        category: "electronics",
        image: "images/smartwatch.jpg",
        description: "Track your fitness and stay connected with this smart watch."
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        image: "images/tshirt.jpg",
        description: "Comfortable cotton t-shirt available in multiple colors."
    },
    {
        id: 4,
        name: "Blender",
        price: 49.99,
        category: "home",
        image: "images/blender.jpg",
        description: "Powerful blender for all your kitchen needs."
    },
    {
        id: 5,
        name: "Running Shoes",
        price: 79.99,
        category: "clothing",
        image: "images/shoes.jpg",
        description: "Lightweight running shoes with great support."
    }
];

// DOM Elements
const navToggle = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const productsGrid = document.querySelector('.products-grid');
const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('toggle');
        });
    }

    // Load products based on current page
    if (window.location.pathname.includes('products.html') || 
        window.location.pathname.includes('index.html')) {
        displayProducts(products);
    }

    // Setup event listeners for filtering
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (sortBy) {
        sortBy.addEventListener('change', filterProducts);
    }

    // Update cart count
    updateCartCount();
});

// Display products in grid
function displayProducts(productsToDisplay) {
    if (!productsGrid) return;

    productsGrid.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                <a href="product-detail.html?id=${product.id}" class="btn view-details">View Details</a>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Filter and sort products
function filterProducts() {
    let filteredProducts = [...products];
    
    // Filter by category
    if (categoryFilter && categoryFilter.value !== 'all') {
        filteredProducts = filteredProducts.filter(
            product => product.category === categoryFilter.value
        );
    }
    
    // Sort products
    if (sortBy) {
        switch(sortBy.value) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
        }
    }
    
    displayProducts(filteredProducts);
}

// Add product to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show feedback to user
    alert(`${product.name} added to cart!`);
}

// Update cart count in navigation
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}