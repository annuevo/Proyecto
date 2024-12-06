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