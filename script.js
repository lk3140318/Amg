document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, title: 'Smartphone', price: 29999, image: 'assets/product1.jpg' },
        { id: 2, title: 'Laptop', price: 79999, image: 'assets/product2.jpg' },
    ];

    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card bg-white p-4 rounded shadow';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-cover mb-2">
            <h3 class="text-lg font-semibold">${product.title}</h3>
            <p class="text-gray-600">₹${product.price}</p>
            <button class="bg-yellow-400 text-black px-4 py-2 rounded mt-2">Add to Cart</button>
        `;
        productGrid.appendChild(card);
    });
});
