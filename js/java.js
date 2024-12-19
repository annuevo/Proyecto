const marquee = document.getElementById('marquee');
const container = document.querySelector('.marquee-container');

// Define la posición inicial del texto
let position = container.offsetWidth;

// Función que mueve el texto
function moveText() {
    position--; // Reduce la posición para mover el texto hacia la izquierda
    if (position < -marquee.offsetWidth) { // Si el texto sale completamente del contenedor
        position = container.offsetWidth; // Reinicia la posición a la derecha
    }
    marquee.style.transform = `translateX(${position}px)`;
}

// Ejecuta la función de movimiento cada 10ms
setInterval(moveText, 10);

/*Parte de carrusel de imagenes */

var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Restablecer la animación del tiempo de ejecución
}

// Start the initial animation 
resetTimeAnimation()
/*Fin de carrusel de imagenes */


/*JavaScript del primer carrusel de productos con java scrip puro */

const products = [
    {
      id: 1,
      discount: "-50%",
      imgSrc: "img/perfume1.webp",
      alt: "Producto 1",
      title: "Shiseido",
      description: "Crema Waso Koshirice Calming Spot Treatment 20 ml",
      originalPrice: "S/139.00",
      discountedPrice: "S/69.50",
    },
    {
      id: 2,
      discount: "-20%",
      imgSrc: "img/perfume2.webp",
      alt: "Producto 2",
      title: "Shiseido",
      description: "Vital Perfection Uplifting and Firming Eye Cream 15 ml",
      originalPrice: "S/389.00",
      discountedPrice: "S/272.30",
    },
    {
      id: 3,
    discount: "-30%",
    imgSrc: "img/perfume3.jpg",
    alt: "Producto 3",
    title: "Shiseido",
    description: "Vital Perfection Uplifting and Firming Eye Cream 15 ml",
    originalPrice: "S/389.00",
    discountedPrice: "S/272.30",
  },
  {
    id: 4,
    discount: "-10%",
    imgSrc: "img/perfume4.webp",
    alt: "Producto 4",
    title: "Shiseido",
    description: "Vital Perfection Uplifting and Firming Eye Cream 15 ml",
    originalPrice: "S/389.00",
    discountedPrice: "S/272.30",
  },
  {
    id: 5,
    discount: "-5%",
    imgSrc: "img/perfume5.jpg",
    alt: "Producto 5",
    title: "Shiseido",
    description: "Vital Perfection Uplifting and Firming Eye Cream 15 ml",
    originalPrice: "S/389.00",
    discountedPrice: "S/272.30",
  },

    // Agrega más productos aquí...
  ];

  // Generar dinámicamente las diapositivas
  const trackk = document.querySelector('.carousel__track');
  products.forEach((product) => {
    const slide = document.createElement('li');
    slide.classList.add('carousel__slide');

    slide.innerHTML = `
      <div class="product">
        <span class="discount">${product.discount}</span>
        <img src="${product.imgSrc}" alt="${product.alt}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p class="price"><s>${product.originalPrice}</s> ${product.discountedPrice}</p>
        <button class="add-to-cart">Añadir al Carrito</button>
      </div>
    `;

    trackk.appendChild(slide);
  });

// /*codigo mejorado */
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');

const slideWidth = slides[0].getBoundingClientRect().width;
let isTransitioning = false; // Variable para controlar la transición

// Configura las posiciones iniciales de las diapositivas
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// Mover el carrusel
const moveToSlide = (direction) => {
  if (isTransitioning) return; // Evitar múltiples clics durante la transición
  isTransitioning = true;

  if (direction === 'next') {
    track.style.transition = 'transform var(--transition-duration)';
    track.style.transform = `translateX(-${slideWidth}px)`;

    track.addEventListener(
      'transitionend',
      () => {
        track.style.transition = 'none';
        track.appendChild(track.firstElementChild); // Mueve el primer slide al final
        track.style.transform = 'translateX(0)'; // Restablece la posición
        isTransitioning = false; // Habilitar clics nuevamente
      },
      { once: true }
    );
  } else if (direction === 'prev') {
    // Mover inmediatamente el último elemento al principio para evitar parpadeos
    track.style.transition = 'none';
    track.prepend(track.lastElementChild); // Mueve el último slide al principio
    track.style.transform = `translateX(-${slideWidth}px)`; // Ajusta la posición

    setTimeout(() => {
      // Inicia la animación hacia atrás
      track.style.transition = 'transform var(--transition-duration)';
      track.style.transform = 'translateX(0)';

      track.addEventListener(
        'transitionend',
        () => {
          isTransitioning = false; // Habilitar clics nuevamente
        },
        { once: true }
      );
    });
  }
};

// Botones
nextButton.addEventListener('click', () => moveToSlide('next'));
prevButton.addEventListener('click', () => moveToSlide('prev'));

/*agregando productos*/

/*fin del primer carrusel de productos */

/*Inicio del segundo carrusel de productos con bibliotecas swiper*/

const productos = [
  {
      imagen: "img/domi.jpg",
      categoria: "Adolfo-Dominguez",
      clase: "versace",
      titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      precioAnterior: "S/389.00",
      precioActual: "S/272.30"
  },
  {
      imagen: "img/burberry.avif",
      categoria: "Burberry",
      clase: "nina",
      titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      precioAnterior: "S/389.00",
      precioActual: "S/272.30"
  },
  {
      imagen: "img/marck Jacobs.jpg",
      categoria: "Marc Jacobs",
      clase: "paco",
      titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      precioAnterior: "S/389.00",
      precioActual: "S/272.30"
  },
  {
      imagen: "img/DIOR.jpg",
      categoria: "Dior",
      clase: "moschino",
      titulo: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      precioAnterior: "S/389.00",
      precioActual: "S/272.30"
  }
];

// Generar HTML dinámico
const containe = document.getElementById('carousel-container');

productos.forEach(producto => {
  const itemHTML = `
      <li class="card-item swiper-slide">
          <a href="#" class="card-link">
              <img src="${producto.imagen}" alt="card-image" class="card-image">
              <p class="badge ${producto.clase}">${producto.categoria}</p>
              <h2 class="card-title">${producto.titulo}</h2>
              <p class="price"><s>${producto.precioAnterior}</s> ${producto.precioActual}</p>
              <button class="card-button">
                  <span class="material-symbols-rounded">arrow_forward</span>
              </button>
              <button class="add-to-cart">Añadir al Carrito</button>
          </a>
      </li>
  `;
  containe.innerHTML += itemHTML;
});

// Inicializar Swiper
new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,
  autoplay: {
      delay: 2000,
      disableOnInteraction: false,
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
      0: {
          slidesPerView: 1,
      },
      768: {
          slidesPerView: 2,
      },
      1024: {
          slidesPerView: 3,
      },
  },
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart')) {
        event.preventDefault(); // Evita que el navegador realice cualquier acción predeterminada
        // Aquí puedes agregar la lógica para manejar la acción de "Añadir al Carrito"
        console.log("Producto añadido al carrito");
    }
});

  /*fin del segundo carrusel de productos */

  /* Carlos castañeda*/

  // Carrusel de marcas
  const carouselMarcas=document.querySelector('.carousel-marcas');
  const marcas = document.querySelectorAll('.marcas');
  let currentIndex = 0;
  
  function showSlideM(index) {
      const totalMarcas = marcas.length;
      if (index >= totalMarcas) {
          currentIndex = 0; // Volver a la primera imagen
      } else if (index < 0) {
          currentIndex = totalMarcas - 1; // Volver a la última imagen
      } else {
          currentIndex = index;
      }
      carouselMarcas.style.transform = `translateX(-${currentIndex*5}%)`;
  }
  
  const botonPrevio = document.querySelector('.carousel-button.prev');
  const botonSiguiente = document.querySelector('.carousel-button.next');
  
  botonPrevio.addEventListener('click',previo);
  botonSiguiente.addEventListener('click',siguiente);
  function previo(){    
      showSlideM(currentIndex-1);
  }
  function siguiente(){   
      showSlideM(currentIndex+1);
  }
  
  
  // Auto avance
  setInterval(() => {
      showSlideM(currentIndex + 1);  // Avanza automáticamente cada 3 segundos
  }, 1400);
/*fin de carrusel de marcas */
