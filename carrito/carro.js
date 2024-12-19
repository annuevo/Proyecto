// Selecciona todos los botones de "Añadir al Carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');
// Selecciona el contador del carrito
const cartCountElement = document.getElementById('cartCount');
// Variable para llevar la cuenta de los productos añadidos
let cartCount = 0;

// Agrega un evento 'click' a cada botón de "Añadir al Carrito"
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Incrementa el contador
        cartCount++;
        // Actualiza el contenido del elemento del contador
        cartCountElement.textContent = cartCount;
    });
});

/*carrusel numero tres hecho con bibliotecas swiper*/
/* carrusel de imagenes  */
const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

/* fin de carrusel de imagenes  */

//inicializacion de elementos del DOM
// Selecciona los elementos de la ventana del carrito
const cartIcon = document.getElementById('cart'); // Ícono del carrito
const cartSidebar = document.getElementById('cartSidebar'); // Sidebar del carrito
const closeSidebar = document.getElementById('closeSidebar'); // Botón de cierre
const cartContent = document.getElementById('cartContent'); // Contenido del carrito
const totalItems = document.getElementById('totalItems'); // Total de ítems
const totalPrice = document.getElementById('totalPrice'); // Precio total
const cartCountElemen = document.getElementById('cartCount'); // Contador del carrito

// Variables para el carrito
let cartCoun = 0; // Contador de productos en el carrito
let cart = []; // Arreglo para almacenar productos del carrito


// Combina los dos carruseles en una lista única
const allProducts = [...products, ...productos];

// Agrega un evento 'click' a cada botón de "Añadir al Carrito"
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
  button.addEventListener('click', () => {
    // Incrementa el contador
    cartCoun++;
    cartCountElemen.textContent = cartCoun;

    // Obtiene el producto según el índice funcion callback
    const product = allProducts[index];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++; // Incrementa la cantidad si ya existe
    } else {
      cart.push({ //uno o mas elementos al final del arreglo
        id: product.id,
        imgSrc: product.imgSrc,
        title: product.title,
        price: parseFloat(product.discountedPrice.replace('S/', '')),
        quantity: 1,
      });
    }

    updateCartContent(); // Actualiza la vista del carrito
    openCartSidebar(); // Abre la ventana del carrito al añadir un producto
  });
});

// Función para abrir la ventana del carrito
function openCartSidebar() {
  cartSidebar.classList.add('open');
}

// Función para cerrar la ventana del carrito
closeSidebar.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
});

// Función para actualizar el contenido del carrito
function updateCartContent() {
  if (cart.length === 0) {
    cartContent.innerHTML = `<p class="empty-cart-message">No tienes elementos en tu carrito de compras</p>`;
    totalItems.textContent = '0 Items en el carrito';
    totalPrice.textContent = 'Total: S/0.00';
  } else {
    cartContent.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');

      itemElement.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <p>S/${item.price.toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">&times;</button>
      `;

      cartContent.appendChild(itemElement);
      total += item.price * item.quantity;
    });

    totalItems.textContent = `${cart.length} Items en el carrito`;
    totalPrice.textContent = `Total: S/${total.toFixed(2)}`;
  }
}

// Función para actualizar la cantidad de un producto
function updateQuantity(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity === 0) {
    cart.splice(index, 1);
  }

  updateCartContent();
}

// Función para eliminar un producto del carrito
function removeItem(index) {
  cart.splice(index, 1);
  updateCartContent();
}