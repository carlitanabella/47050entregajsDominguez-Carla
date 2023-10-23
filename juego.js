// document.addEventListener('DOMContentLoaded', () => {

// const cardarray = [
//     {
//         name: 'osito',
//         img: 'img/caramelo.png'
//     },
//     {
//         name: 'bomba',
//         img: 'img/bomba.png'

//     }

// ]

// cardArray.sort(() => 0.5 - Math.random())

// const grid = document.querySelector.apply('.grid')
// const resultDisplay = document.querySelector('#puntos')
// let cardsElegir = []
// let cardsElegirId = []
// let cardspuntos = []

// function tablero() {
//     for (let i = 0; i < cardarray.length; i++) {
//         var card = document.createElement('img')
//         card.setAttribute('src', 'img/frontcard.jpg')
//         card.setAttribute('data-id', i)
//         card.addEventListener('click', flipCard)
//         grid.appendChild(card)
//     }
// }




    
// })

class Item {
    constructor(nombre, puntos, imagen, vida) {
      this.nombre = nombre;
      this.puntos = puntos;
      this.imagen = imagen;
      this.vida = vida;
    }
  }

const caramelo = new Item("Caramelo", 100, "caramelo.png",0);
const bomba = new Item("Bomba", -100, "bomba.png",(-1));

  // Array para ir metiendo puntos que ganemos

const puntos = [];
const vidas = [];

  // oportunidades probar

  let vida = 3;


  //elem DOM
  const lasvidas = document.querySelector("#vidas span");
  const lospuntos = document.getElementById("puntos");
  const lasbombas = document.querySelectorAll(".bombas");
  const losositos = document.querySelectorAll(".osito");

  // 



function creartablero(tablero){
    lasbombas.innerHTML="";
    losositos.innerHTML="";

    for ( const itemjuego of tablero ) {
        lasbombas.innerHTML += `
        <div class= card> 
          <div class= frontcard></div>
          <img src="img/${itemjuego.imagen}" width=100% />
        </div>`;

    }


    console.log(html)



}
function sumar(itemjuego) {



    

    if (vida + itemjuego.vida >= 1) {
        vidas.push(itemjuego);
        vida = vida + itemjuego.vida;
        actualizarHTML();
        console.log("vidas:, vida");

    } 
    else {
        alert(`¡Perdiste! Podes volver a intentarlo. ¡Suerte!`);
        window.location.reload();
  }
}
