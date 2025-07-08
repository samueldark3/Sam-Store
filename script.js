document.addEventListener('DOMContentLoaded', () => {
    // Toggle do Menu Mobile
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Animação do Botão de Carrinho
    const cartButtons = document.querySelectorAll('.cartButton');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('animate-pulse');
            setTimeout(() => {
                button.classList.remove('animate-pulse');
                alert('Produto adicionado ao carrinho!');
            }, 300);
        });
    });

    // Efeito Hover nas Categorias (gerenciado no CSS, mas garantindo transições suaves)
    const categoryCards = document.querySelectorAll('#categories .transform');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover:shadow-lg', 'hover:-translate-y-1');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover:shadow-lg', 'hover:-translate-y-1');
        });
    });
});