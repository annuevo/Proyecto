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