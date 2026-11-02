/**
 * KOPI NUSANTARA — Global Preview Application Script
 * Handles toast alerts, global cart counter sync, navbar behaviors,
 * and preview navigation across pages.
 */

// Shared Cart State in localStorage
const CART_STORAGE_KEY = 'kopi_nusantara_preview_cart';

// Default initial items if not set
const DEFAULT_CART = [
    { id: 1, name: 'Americano', price: 25000, qty: 1, image: '../public/images/Americano.jpg', category: 'Coffee' },
    { id: 7, name: 'Butter Croissant', price: 24000, qty: 2, image: '../public/images/Butter Croissant.jpg', category: 'Pastry' }
];

function getCartItems() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed reading cart:', e);
    }
    // Set default if empty
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(DEFAULT_CART));
    return DEFAULT_CART;
}

function saveCartItems(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    updateCartBadges();
}

function getTotalCartCount() {
    const items = getCartItems();
    return items.reduce((sum, item) => sum + (item.qty || 1), 0);
}

function updateCartBadges() {
    const totalCount = getTotalCartCount();
    document.querySelectorAll('.cart-badge-count').forEach(badge => {
        badge.textContent = totalCount;
        badge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    });
}

function addToCart(menu) {
    const items = getCartItems();
    const existingIndex = items.findIndex(item => item.id === menu.id || item.name === menu.name);
    
    if (existingIndex > -1) {
        items[existingIndex].qty = (items[existingIndex].qty || 1) + 1;
    } else {
        items.push({
            id: menu.id || Date.now(),
            name: menu.name,
            price: Number(menu.price),
            qty: 1,
            image: menu.image || '../public/images/Americano.jpg',
            category: menu.category || 'Menu'
        });
    }
    
    saveCartItems(items);
    showToast('Berhasil Ditambahkan', `${menu.name} telah dimasukkan ke keranjang.`, 'bi-cup-hot-fill');
}

/**
 * Toast Notification System
 */
function showToast(title, message, iconClass = 'bi-check-circle-fill') {
    let container = document.querySelector('.coffee-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'coffee-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'coffee-toast';
    toast.innerHTML = `
        <div class="coffee-toast-icon">
            <i class="bi ${iconClass}"></i>
        </div>
        <div class="coffee-toast-content">
            <div class="coffee-toast-title">${title}</div>
            <div class="coffee-toast-desc">${message}</div>
        </div>
    `;

    container.appendChild(toast);

    // Auto dismiss after 3.8 seconds
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 350);
    }, 3800);
}

// Format Rupiah helper
function formatRupiah(amount) {
    return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadges();

    // Setup navbar scroll listener for glassmorphism effect
    const nav = document.querySelector('.navbar-custom');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                nav.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            } else {
                nav.style.boxShadow = 'none';
            }
        });
    }

    // Delegate generic add to cart buttons
    document.querySelectorAll('[data-add-cart]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute('data-id') || Date.now());
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));
            const image = btn.getAttribute('data-image');
            const category = btn.getAttribute('data-category');

            addToCart({ id, name, price, image, category });
        });
    });
});

