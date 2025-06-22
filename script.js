// Inicjalizacja EmailJS
emailjs.init('MYW_ScB7KBIjTaLWr');

// Globalne zmienne
let cart = [];
let cartTotal = 0;

// Produkty
const products = {
    'mountain-x1': {
        name: 'Mountain Pro X1',
        price: 2999,
        description: 'Zaawansowany rower górski z pełną amortyzacją. Idealny do ekstremalnych tras górskich.',
        category: 'mountain',
        image: 'images/products/mountain-x1.jpg'
    },
    'city-cruiser': {
        name: 'City Cruiser S2',
        price: 1799,
        description: 'Elegancki rower miejski z koszykiem. Komfort i styl w codziennych podróżach.',
        category: 'city',
        image: 'images/products/city-cruiser.jpg'
    },
    'road-master': {
        name: 'Road Master R3',
        price: 3499,
        description: 'Lekki rower szosowy do sportowej jazdy. Aerodynamiczna konstrukcja.',
        category: 'road',
        image: 'images/products/road-master.jpg'
    },
    'e-rider': {
        name: 'E-Rider Plus',
        price: 4299,
        description: 'Elektryczny rower z zasięgiem do 80km. Nowoczesna technologia.',
        category: 'electric',
        image: 'images/products/e-rider.jpg'
    },
    'hybrid-sport': {
        name: 'Hybrid Sport H1',
        price: 2299,
        description: 'Uniwersalny rower hybrydowy. Łączy zalety rowerów miejskich i sportowych.',
        category: 'hybrid',
        image: 'images/products/hybrid-sport.jpg'
    },
    'kids-fun': {
        name: 'Kids Fun K1',
        price: 899,
        description: 'Bezpieczny rower dla dzieci. Kolorowy design i najwyższa jakość.',
        category: 'kids',
        image: 'images/products/kids-fun.jpg'
    }
};

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Inicjalizacja strony
function initializePage() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupContactForm();
    setupNewsletterForm();
    updateCartCounter();
    
    // Ładowanie koszyka z localStorage (jeśli potrzebne w przyszłości)
    // loadCartFromStorage();
}

// Menu mobilne
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Zamykanie menu po kliknięciu w link
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Formularz kontaktowy
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

async function handleContactForm(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Animacja ładowania
    submitBtn.textContent = 'Wysyłanie...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(e.target);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        await emailjs.send('service_7dekkgy', 'template_contact', templateParams);
        
        showNotification('Wiadomość została wysłana pomyślnie!', 'success');
        e.target.reset();
        
    } catch (error) {
        console.error('Błąd wysyłania wiadomości:', error);
        showNotification('Wystąpił błąd. Spróbuj ponownie.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Newsletter
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
}

async function handleNewsletterForm(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.newsletter-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Zapisywanie...';
    submitBtn.disabled = true;
    
    try {
        const email = document.getElementById('newsletterEmail').value;
        
        // Tutaj można dodać integrację z prawdziwym systemem newsletter
        await new Promise(resolve => setTimeout(resolve, 1000)); // Symulacja
        
        showNotification('Dziękujemy za zapisanie się do newslettera!', 'success');
        e.target.reset();
        
    } catch (error) {
        showNotification('Wystąpił błąd. Spróbuj ponownie.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Wyświetlanie kategorii
function showCategory(category) {
    const categoryNames = {
        mountain: 'Rowery Górskie',
        road: 'Rowery Szosowe', 
        city: 'Rowery Miejskie',
        electric: 'Rowery Elektryczne'
    };
    
    showNotification(`Przeglądasz kategorię: ${categoryNames[category]}`, 'info');
    
    // Tutaj można dodać filtrowanie produktów
    // filterProductsByCategory(category);
}

// Wyświetlanie szczegółów produktu
function showProduct(productId) {
    const product = products[productId];
    if (!product) return;
    
    createModal('product-details', `
        <div class="product-details">
            <div class="product-image-large">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;">
            </div>
            <div class="product-info-detailed">
                <h2>${product.name}</h2>
                <p class="product-description">${product.description}</p>
                <div class="product-price-large">
                    <span class="price-large">${product.price.toLocaleString()} zł</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-large" onclick="addToCart('${productId}'); closeModal()">
                        Dodaj do Koszyka
                    </button>
                </div>
            </div>
        </div>
    `);
}

// Zarządzanie koszykiem
function addToCart(productId) {
    const product = products[productId];
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    updateCartCounter();
    showNotification(`${product.name} dodano do koszyka!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCounter();
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCounter();
            updateCartDisplay();
        }
    }
}

function updateCartCounter() {
    const counter = document.getElementById('cartCounter');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (counter) {
        if (totalItems > 0) {
            counter.textContent = totalItems;
            counter.style.display = 'flex';
        } else {
            counter.style.display = 'none';
        }
    }
    
    // Oblicz total
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function showCart() {
    if (cart.length === 0) {
        createModal('cart', `
            <div class="empty-cart">
                <h2>🛒 Koszyk</h2>
                <p>Twój koszyk jest pusty</p>
                <button class="continue-shopping" onclick="closeModal()">Kontynuuj zakupy</button>
            </div>
        `);
        return;
    }
    
    const cartItems = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} zł</p>
                </div>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity('${item.id}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', 1)">+</button>
                <button onclick="removeFromCart('${item.id}')" style="color: red; margin-left: 10px;">🗑️</button>
            </div>
        </div>
    `).join('');
    
    createModal('cart', `
        <div class="cart-content">
            <h2>🛒 Koszyk</h2>
            <div class="cart-items">
                ${cartItems}
            </div>
            <div class="cart-total">
                <h3>Razem: ${cartTotal.toLocaleString()} zł</h3>
            </div>
            <div class="cart-actions">
                <button class="checkout-btn" onclick="showCheckout()">Przejdź do płatności</button>
                <button class="continue-shopping" onclick="closeModal()">Kontynuuj zakupy</button>
            </div>
        </div>
    `);
}

function updateCartDisplay() {
    // Jeśli modal koszyka jest otwarty, odśwież jego zawartość
    const modal = document.querySelector('.modal.active');
    if (modal) {
        closeModal();
        showCart();
    }
}

function showCheckout() {
    if (cart.length === 0) {
        showNotification('Koszyk jest pusty!', 'error');
        return;
    }
    
    const orderItems = cart.map(item => 
        `${item.name} x ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} zł`
    ).join('\n');
    
    createModal('checkout', `
        <div class="checkout-content">
            <h2>💳 Finalizacja zamówienia</h2>
            
            <div class="order-summary">
                <h3>Podsumowanie zamówienia:</h3>
                <div class="order-items">
                    ${cart.map(item => `
                        <div class="order-item">
                            <span>${item.name} x ${item.quantity}</span>
                            <span>${(item.price * item.quantity).toLocaleString()} zł</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <strong>Razem: ${cartTotal.toLocaleString()} zł</strong>
                </div>
            </div>
            
            <form id="checkoutForm" class="checkout-form">
                <div class="form-section">
                    <h3>Dane kontaktowe</h3>
                    <div class="form-row">
                        <input type="text" name="firstName" placeholder="Imię" required>
                        <input type="text" name="lastName" placeholder="Nazwisko" required>
                    </div>
                    <div class="form-row">
                        <input type="email" name="email" placeholder="Email" required>
                        <input type="tel" name="phone" placeholder="Telefon" required>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Adres dostawy</h3>
                    <input type="text" name="address" placeholder="Ulica i numer" required>
                    <div class="form-row">
                        <input type="text" name="city" placeholder="Miasto" required>
                        <input type="text" name="postalCode" placeholder="Kod pocztowy" required>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Sposób płatności</h3>
                    <select name="paymentMethod" required>
                        <option value="">Wybierz sposób płatności</option>
                        <option value="transfer">Przelew bankowy</option>
                        <option value="card">Karta płatnicza</option>
                        <option value="blik">BLIK</option>
                        <option value="cash">Gotówka przy odbiorze</option>
                    </select>
                </div>
                
                <div class="form-section">
                    <label class="checkbox-label">
                        <input type="checkbox" name="terms" required>
                        Akceptuję regulamin sklepu i politykę prywatności
                    </label>
                </div>
                
                <button type="submit" class="place-order-btn">Złóż zamówienie</button>
            </form>
        </div>
    `);
    
    // Dodaj obsługę formularza checkout
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

async function handleCheckout(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.place-order-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Przetwarzanie...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(e.target);
        const orderNumber = 'RW' + Date.now().toString().slice(-6);
        
        const orderData = {
            orderNumber: orderNumber,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            postalCode: formData.get('postalCode'),
            paymentMethod: formData.get('paymentMethod'),
            items: cart,
            total: cartTotal,
            shipping: cartTotal > 2000 ? 0 : 29 // Darmowa dostawa powyżej 2000 zł
        };
        
        // Wysłanie emaila z potwierdzeniem
        const emailSent = await sendOrderConfirmationEmail(orderData);
        
        if (emailSent) {
            // Wyczyszczenie koszyka
            cart = [];
            updateCartCounter();
            
            // Wyświetlenie potwierdzenia
            closeModal();
            createModal('order-success', `
                <div class="order-success">
                    <div class="success-icon">✅</div>
                    <h2>Zamówienie złożone pomyślnie!</h2>
                    <p>Numer zamówienia: <strong>${orderNumber}</strong></p>
                    <p>Potwierdzenie zostało wysłane na adres: <strong>${orderData.email}</strong></p>
                    <p>Skontaktujemy się z Tobą w sprawie realizacji zamówienia.</p>
                    <button class="continue-shopping" onclick="closeModal()">Zamknij</button>
                </div>
            `);
        } else {
            throw new Error('Błąd wysyłania emaila');
        }
        
    } catch (error) {
        console.error('Błąd składania zamówienia:', error);
        showNotification('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Wysyłanie emaila z potwierdzeniem zamówienia
async function sendOrderConfirmationEmail(orderData) {
    const templateParams = {
        to_email: orderData.email,
        to_name: orderData.firstName + ' ' + orderData.lastName,
        customer_name: orderData.firstName + ' ' + orderData.lastName,
        order_number: orderData.orderNumber,
        total_amount: orderData.total.toLocaleString() + ' zł',
        order_date: new Date().toLocaleDateString('pl-PL'),
        customer_phone: orderData.phone,
        shipping_address: `${orderData.address}, ${orderData.city} ${orderData.postalCode}`,
        payment_method: getPaymentMethodName(orderData.paymentMethod),
        order_items: orderData.items.map(item => 
            `${item.name} x ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} zł`
        ).join('\n'),
        shipping_cost: orderData.shipping === 0 ? 'Gratis' : orderData.shipping + ' zł'
    };
    
    try {
        const response = await emailjs.send('service_7dekkgy', 'template_f46lo6h', templateParams);
        console.log('Email wysłany pomyślnie!', response);
        return true;
    } catch (error) {
        console.error('Błąd wysyłania emaila:', error);
        return false;
    }
}

function getPaymentMethodName(method) {
    const methods = {
        'transfer': 'Przelew bankowy',
        'card': 'Karta płatnicza', 
        'blik': 'BLIK',
        'cash': 'Gotówka przy odbiorze'
    };
    return methods[method] || method;
}

// Wyświetlanie wszystkich produktów
function showAllProducts() {
    showNotification('Wyświetlanie wszystkich produktów...', 'info');
    // Tutaj można dodać rozwinięcie wszystkich produktów
}

// System modali
function createModal(type, content) {
    // Usuń istniejący modal
    closeModal();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animacja pojawienia się
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Zamykanie po kliknięciu w tło
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Zamykanie ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// System powiadomień
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Style dla powiadomień
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        border-left: 4px solid ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    `;
    
    document.body.appendChild(notification);
    
    // Animacja pojawienia się
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Automatyczne usuwanie
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
    
    // Kliknięcie aby zamknąć
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Dodatkowe style CSS dla elementów JS (dodaj do head jeśli potrzeba)
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        .notification-message {
            font-weight: 500;
        }
        
        .checkout-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .form-section h3 {
            margin-bottom: 15px;
            color: #333;
            border-bottom: 2px solid #eda900;
            padding-bottom: 5px;
        }
        
        .checkout-form input,
        .checkout-form select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .checkout-form input:focus,
        .checkout-form select:focus {
            outline: none;
            border-color: #eda900;
        }
        
        .order-summary {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .order-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #dee2e6;
        }
        
        .order-total {
            padding-top: 15px;
            border-top: 2px solid #eda900;
            margin-top: 15px;
            font-size: 1.2rem;
        }
        
        .place-order-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #eda900, #ffc107);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .place-order-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(237, 169, 0, 0.3);
        }
        
        .order-success {
            text-align: center;
            padding: 40px 20px;
        }
        
        .success-icon {
            font-size: 4rem;
            margin-bottom: 20px;
        }
        
        .order-success h2 {
            color: #28a745;
            margin-bottom: 20px;
        }
        
        .order-success p {
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .continue-shopping {
            margin-top: 20px;
            padding: 12px 30px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .continue-shopping:hover {
            background: #5a6268;
            transform: translateY(-2px);
        }
        
        .cart-item-controls {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .cart-item-controls button {
            width: 30px;
            height: 30px;
            border: 1px solid #dee2e6;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .cart-item-controls button:hover {
            background: #f8f9fa;
            border-color: #eda900;
        }
        
        .empty-cart {
            text-align: center;
            padding: 40px 20px;
        }
        
        .empty-cart h2 {
            margin-bottom: 20px;
            color: #666;
        }
        
        .cart-actions {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        
        .cart-actions button {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .product-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            align-items: start;
        }
        
        .product-info-detailed h2 {
            margin-bottom: 15px;
            color: #333;
        }
        
        .product-description {
            margin-bottom: 20px;
            line-height: 1.6;
            color: #666;
        }
        
        .price-large {
            font-size: 1.8rem;
            font-weight: 700;
            color: #eda900;
        }
        
        .add-to-cart-large {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #eda900, #ffc107);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.3s ease;
        }
        
        .add-to-cart-large:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(237, 169, 0, 0.3);
        }
        
        @media (max-width: 768px) {
            .product-details {
                grid-template-columns: 1fr;
            }
            
            .cart-actions {
                flex-direction: column;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Uruchomienie stylów dynamicznych
addDynamicStyles();