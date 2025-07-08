document.addEventListener('DOMContentLoaded', () => {
    const ADMIN_PASSWORD = 'admin123'; // Altere para a senha desejada
    const loginSection = document.getElementById('loginSection');
    const adminPanel = document.getElementById('adminPanel');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const affiliateLinkInput = document.getElementById('affiliateLink');
    const categorySelect = document.getElementById('categorySelect');
    const fetchProductButton = document.getElementById('fetchProductButton');
    const productPreview = document.getElementById('productPreview');
    const productImage = document.getElementById('productImage');
    const productTitle = document.getElementById('productTitle');
    const productPrice = document.getElementById('productPrice');
    const productDescription = document.getElementById('productDescription');
    const saveProductButton = document.getElementById('saveProductButton');
    const productList = document.getElementById('productList');
    const fetchError = document.getElementById('fetchError');
    const loginError = document.getElementById('loginError');

    // Login
    loginButton.addEventListener('click', () => {
        const password = document.getElementById('adminPassword').value;
        if (password === ADMIN_PASSWORD) {
            loginSection.classList.add('hidden');
            adminPanel.classList.remove('hidden');
            renderProductList();
        } else {
            loginError.classList.remove('hidden');
        }
    });

    // Logout
    logoutButton.addEventListener('click', () => {
        adminPanel.classList.add('hidden');
        loginSection.classList.remove('hidden');
        document.getElementById('adminPassword').value = '';
        loginError.classList.add('hidden');
    });

    // Buscar dados do produto
    fetchProductButton.addEventListener('click', async () => {
        const link = affiliateLinkInput.value.trim();
        if (!link) {
            fetchError.classList.remove('hidden');
            fetchError.textContent = 'Por favor, insira um link válido.';
            return;
        }

        try {
            // Extrair item_id do link de afiliado
            const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(link)}`, { method: 'HEAD' });
            const finalUrl = response.url;
            const itemIdMatch = finalUrl.match(/MLB\d+/);
            if (!itemIdMatch) {
                throw new Error('Item ID não encontrado');
            }
            const itemId = itemIdMatch[0];

            // Buscar dados do produto
            const productResponse = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
            const productData = await productResponse.json();
            const descriptionResponse = await fetch(`https://api.mercadolibre.com/items/${itemId}/description`);
            const descriptionData = await descriptionResponse.json();

            // Exibir pré-visualização
            productImage.src = productData.pictures[0].url;
            productTitle.textContent = productData.title;
            productPrice.textContent = `R$ ${productData.price.toFixed(2)}`;
            productDescription.textContent = descriptionData.plain_text || 'Descrição não disponível';
            productPreview.classList.remove('hidden');
            fetchError.classList.add('hidden');

            // Configurar botão de salvar
            saveProductButton.onclick = () => {
                const product = {
                    id: itemId,
                    title: productData.title,
                    price: productData.price,
                    description: descriptionData.plain_text || 'Descrição não disponível',
                    image: productData.pictures[0].url,
                    link: link,
                    category: categorySelect.value
                };
                const products = JSON.parse(localStorage.getItem('products')) || [];
                products.push(product);
                localStorage.setItem('products', JSON.stringify(products));
                renderProductList();
                productPreview.classList.add('hidden');
                affiliateLinkInput.value = '';
            };
        } catch (error) {
            fetchError.classList.remove('hidden');
            fetchError.textContent = 'Erro ao buscar dados. Verifique o link.';
            console.error(error);
        }
    });

    // Renderizar lista de produtos
    function renderProductList() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = products.map(product => `
            <div class="bg-white p-6 rounded-lg shadow-md product-card">
                <img src="${product.image}" alt="${product.title}" class="w-full h-32 object-cover mb-4 rounded">
                <h3 class="text-lg font-semibold">${product.title}</h3>
                <p class="text-gray-600 text-sm">${product.description.slice(0, 50)}...</p>
                <p class="text-blue-900 font-bold">R$ ${product.price.toFixed(2)}</p>
                <p class="text-gray-600 text-sm">Categoria: ${product.category}</p>
                <a href="${product.link}" target="_blank" class="bg-orange-500 text-white px-4 py-2 mt-4 rounded-full hover:bg-orange-600 w-full block text-center">Ver no Mercado Livre</a>
            </div>
        `).join('');
    }
});
