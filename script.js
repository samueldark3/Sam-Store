document.addEventListener('DOMContentLoaded', () => {
    // Toggle do Menu Mobile
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Carregar produtos do LocalStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Função para renderizar produtos
    const renderProducts = (containerId, category) => {
        const container = document.getElementById(containerId);
        const filteredProducts = products.filter(p => p.category === category);
        container.innerHTML = filteredProducts.map(product => `
            <div class="bg-white p-6 rounded-lg shadow-md product-card">
                <img src="${product.image}" alt="${product.title}" class="w-full h-32 object-cover mb-4 rounded">
                <h3 class="text-lg font-semibold">${product.title}</h3>
                <p class="text-gray-600 text-sm">${product.description.slice(0, 50)}...</p>
                <p class="text-blue-900 font-bold">R$ ${product.price.toFixed(2)}</p>
                <a href="${product.link}" target="_blank" class="bg-orange-500 text-white px-4 py-2 mt-4 rounded-full hover:bg-orange-600 w-full block text-center">Ver no Mercado Livre</a>
            </div>
        `).join('');
    };

    // Renderizar produtos por setor
    renderProducts('bestFindsProducts', 'Melhores Achados');
    renderProducts('electronicsProducts', 'Eletrônicos');
    renderProducts('cosmeticsProducts', 'Cosméticos');
    renderProducts('homeProducts', 'Casa');
    renderProducts('accessoriesProducts', 'Acessórios');
});
