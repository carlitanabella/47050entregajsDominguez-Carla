
class Producto {
    constructor(id, nombre, precio, categoria, imagen) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.categoria = categoria;
      this.imagen = imagen;
    }
}
  

class BaseDeDatos {
    constructor() {
   
      this.productos = [];

      this.cargarRegistros();

    }

    async cargarRegistros(){
      const resultado = await fetch("./jason/productos.json");
      this.productos = await resultado.json();
      console.log(this.productos);
    }
  

    agregarRegistro(id, nombre, precio, categoria, imagen) {
      const producto = new Producto(id, nombre, precio, categoria, imagen);
      this.productos.push(producto);
    }
  
 
    traerRegistros() {
      return this.productos;
    }
  

    registroPorId(id) {
      return this.productos.find((producto) => producto.id === id);
    }
  

    registrosPorNombre(palabra) {
      return this.productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(palabra.toLowerCase())
      );
    }
}
  

class Carrito {
    constructor() {

      const carritoStorage = JSON.parse(localStorage.getItem("carrito"));

      this.carrito = carritoStorage || [];
      this.total = 0; 

      this.cantidadProductos = 0; 
      this.listar();
    }
  

    estaEnCarrito({ id }) {
      return this.carrito.find((producto) => producto.id === id);
    }
  

    agregar(producto) {
      const productoEnCarrito = this.estaEnCarrito(producto);

      if (!productoEnCarrito) {
        this.carrito.push({ ...producto, cantidad: 1 });
      } else {

        productoEnCarrito.cantidad++;
      }
  
      localStorage.setItem("carrito", JSON.stringify(this.carrito));

      this.listar();
    }
  

    quitar(id) {

      const indice = this.carrito.findIndex((producto) => producto.id === id);

      if (this.carrito[indice].cantidad > 1) {
        this.carrito[indice].cantidad--;
      } else {
    
        this.carrito.splice(indice, 1);
      }

      localStorage.setItem("carrito", JSON.stringify(this.carrito));

      this.listar();
    }
  

    listar() {

      this.total = 0;
      this.cantidadProductos = 0;
      divCarrito.innerHTML = "";

      for (const producto of this.carrito) {
        divCarrito.innerHTML += `
          <div class="productoCarrito">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <a href="#" class="btnQuitar" data-id="${producto.id}">Quitar del carrito</a>
          </div>
        `;
 
        this.total += producto.precio * producto.cantidad;
        this.cantidadProductos += producto.cantidad;
      }

      const botonesQuitar = document.querySelectorAll(".btnQuitar");
 
      for (const boton of botonesQuitar) {
        boton.addEventListener("click", (event) => {
          event.preventDefault();

          const idProducto = Number(boton.dataset.id);

          this.quitar(idProducto);
        });
      }

      spanCantidadProductos.innerText = this.cantidadProductos;
      spanTotalCarrito.innerText = this.total;
    }
}
  

const bd = new BaseDeDatos();
  

const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const inputBuscar = document.querySelector("#inputBuscar");
const botonCarrito = document.querySelector("section h1");
  

const carrito = new Carrito();
 
cargarProductos(bd.traerRegistros());
  

function cargarProductos(productos) {
  
    divProductos.innerHTML = "";

    for (const producto of productos) {
      divProductos.innerHTML += `
        <div class="col-12 producto">
          <div>
          <h2 class="divpro textnav">${producto.nombre}</h2>
          <p class="divpro textnav">$${producto.precio}</p>
          <div class="imagen divpro">
            <img class="imagen divpro" src="img/${producto.imagen}" />
          </div>
          <a href="#" class="btnAgregar divpro" data-id="${producto.id}">Agregar al carrito</a>
          </div>
        </div>
      `;
    }
  

    const botonesAgregar = document.querySelectorAll(".btnAgregar");
  

    for (const boton of botonesAgregar) {
      boton.addEventListener("click", (event) => {
 
        event.preventDefault();
  
        const idProducto = Number(boton.dataset.id);
    
        const producto = bd.registroPorId(idProducto);
  
        carrito.agregar(producto);
      });
    }
}
  
//buscador
inputBuscar.addEventListener("input", (event) => {
    event.preventDefault();
    const palabra = inputBuscar.value;
    const productos = bd.registrosPorNombre(palabra);
    cargarProductos(productos);
});
//Filtros
const botonVerTodos = document.querySelector("#verTodo");
const botonFaldas = document.querySelector("#verFaldas");
const botonPantalones = document.querySelector("#verPantalones");
const botonTops = document.querySelector("#verTops");

const main = document.querySelector("#main");

function quitarClaseActiva() {
  const botonesFiltro = [
    botonVerTodos,
    botonFaldas,
    botonPantalones,
    botonTops,
  ];
  botonesFiltro.forEach((boton) => {
    boton.classList.remove("filtrosActivo");
  });
}

botonVerTodos.addEventListener("click", () => {
  cargarProductos(bd.traerRegistros());
  quitarClaseActiva();
  botonVerTodos.classList.add("filtrosActivo");
  main.style.height = "auto";
});

botonFaldas.addEventListener("click", () => {
  const faldasEcontrado = bd.productos.filter(
    (producto) => producto.categoria === "Faldas"
  );
  cargarProductos(faldasEcontrado);
  quitarClaseActiva();
  botonFaldas.classList.add("filtrosActivo");
  main.style.height = "auto";
});
botonPantalones.addEventListener("click", () => {
  const pantalonEcontrado = bd.productos.filter(
    (producto) => producto.categoria === "Pantalones"
  );
  cargarProductos(pantalonEcontrado);
  quitarClaseActiva();
  botonPantalones.classList.add("filtrosActivo");
  main.style.height = "auto";
});
botonTops.addEventListener("click", () => {
  const topEcontrado = bd.productos.filter(
    (producto) => producto.categoria === "Tops"
  );
  cargarProductos(topEcontrado);
  quitarClaseActiva();
  botonTops.classList.add("filtrosActivo");
  main.style.height = "auto";
});


botonCarrito.addEventListener("click", (event) => {
  document.querySelector("section").classList.toggle("ocultar");
});

//para registrarse

function logIn(nombre, password) {
  const userNombre = localStorage.getItem("userNombre");
  const userPassword = localStorage.getItem("userPassword");
  if (userNombre != "" && userPassword != "") {
    if (nombre == userNombre && password == userPassword) {
      document.querySelector("#nombre_usuario_ini").value = "";
      document.querySelector("#contrasenia_usuario_ini").value = "";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Bienvenido!",
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario y/o contraseña incorrectos",
      });
    }
  }
}

function logUp(nombre, password) {
  const chekName = localStorage.getItem("userNombre");
  if (chekName != nombre) {
    localStorage.setItem("userNombre", nombre);
    localStorage.setItem("userPassword", password);
    document.querySelector("#nombre_usuario_log").value = "";
    document.querySelector("#contrasenia_usuario_log").value = "";
    document.querySelector("#contrasenia_usuario_rep_log").value = "";
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario registrado ¡Bienvenido!",
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El nombre de usuario ya esta en uso",
    });
  }
}

  