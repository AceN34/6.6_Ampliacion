window.onload = function() {
    // variables
    const contenedor = document.getElementById('contenedor');
    const botones = document.getElementById('botones');
    const botonPrincipal = document.getElementById('botonPrincipal');
    const mensaje = document.getElementById('mensaje');
    const direccionBarco = document.getElementById('direccionBarco');
    const mensajeBarco = document.getElementById('mensajeBarco');
};
  // variables del programa
let jugadorRojo;
let turno = 0;


// empezar partida
function empezar(){
    let tamanio = 10;
    turno = 0;
    jugadorRojo = new Jugador("rojo", tamanio);
    jugadorRojo.mostrarTablero();
    jugadorRojo.cambiarModo(); // lo pongo en modo colocar
    direccionBarco.innerHTML = "Horizontal";
    
    botones.removeChild(this.botonPrincipal);
}
// objeto jugador
function Jugador(color, tamanio) {
    this.color = color;
    this.tablero = new Tablero(color, tamanio);
    this.modoColocar = false; // false -> jugando  true -> colocar

    // barcos
    this.botonRotar = null;
    this.direccion = "Horizontal";

    //métodos
    this.mostrarTablero = function(){
        this.tablero.mostrarTablero();
    }
    
    this.cambiarModo = function(){
        this.modoColocar =!this.modoColocar;
        if(!this.modoColocar){
            console.log("Modo jugando");
            if (this.botonRotar) {
                botones.removeChild(this.botonRotar);
                this.botonRotar = null; // Restablecer la referencia
            }

        }else{
            console.log("Modo colocar");
            this.botonRotar = document.createElement('button');
            this.botonRotar.textContent = "Rotar";
            this.botonRotar.addEventListener('click', this.rotarBarco.bind(this)); 
            botones.appendChild(this.botonRotar);
        }

    }

    this.getModo = function(){
        return this.modoColocar;
    }

    this.rotarBarco = function() {
        if (this.direccion === "Horizontal") {
            this.direccion = "Vertical";
            direccionBarco.innerHTML = this.direccion;
        } else {
            this.direccion = "Horizontal";
            direccionBarco.innerHTML = this.direccion;
        }
        console.log(this.direccion);
    }

    this.colocarBarco = function(i,j) {
        this.tablero.pintarBarco(i,j, this.direccion);
    }
}

// objeto tablero
function Tablero(color, tamanio) {
this.color = color;
this.tamanio = tamanio;
this.tablero = [];

// variables de los barcos (el indice 0 es la length del barco)
this.barcos = [[4],[2],[3],[2],[3],[2]];
this.barcosColocados = 0;

// pintar el tablero
this.pintarBarco = function(i, j, direccion) {
    if (this.barcosColocados >= this.barcos.length) {
        console.log("Todos los barcos han sido colocados.");
        return;
    }

    // AQUÍ REVISAR IS YA TIENE ANRTES LA CLASE BARCO, PARA NO PODER
    //PONER UN BARCO ENCIMAA DE OTRO

    if (this.barcos[this.barcosColocados].length === 1) {
        this.barcos[this.barcosColocados].push([]); 
    }

    this.barcos[this.barcosColocados][1].push([i, j]);

    this.tablero[i][j].classList.add('barco');

    // Comprobar si el barco está completamente colocado
    if (this.barcos[this.barcosColocados][1].length === this.barcos[this.barcosColocados][0]) {
        this.barcosColocados++; 
    }

    mensajeBarco.innerHTML = 
        this.barcosColocados < this.barcos.length 
        ? `Colocando barco de ${this.barcos[this.barcosColocados][0]} posiciones` 
        : "Todos los barcos han sido colocados.";
};


// inicializar tablero
this.inicializarTablero = function() {
    for (let i = 0; i < this.tamanio; i++) {
        this.tablero[i] = [];
        for (let j = 0; j < this.tamanio; j++) {
            let celda = document.createElement('div');
            celda.className = 'celda';
            this.tablero[i][j] = celda;
        }
    }
};

// devolver tablero
this.mostrarTablero = function() {
    contenedor.innerHTML = ''; // limpio lo que haya antes
    const tabla = document.createElement('table'); 

    for (let i = 0; i < this.tamanio; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < this.tamanio; j++) {
            let celda = this.tablero[i][j];
            let casilla = document.createElement('td');
            casilla.appendChild(celda);

            casilla.dataset.i = i; // yo mismo me siendo anonadado de que esto sea posible
            casilla.dataset.j = j;

            casilla.addEventListener('click', function(){
                devolverPosicion(i, j);
            });


            casilla.classList.add('celda');

            fila.appendChild(casilla);
        }
        tabla.appendChild(fila);
    }
    contenedor.appendChild(tabla);
};

this.inicializarTablero();

}

function devolverPosicion(i, j) {
console.log("Casilla seleccionada: ", i, j);
if(turno < 1) {
    if(jugadorRojo.getModo() === true){ // aquí el tipo está en modo bob el constructor 
        jugadorRojo.colocarBarco(i,j);
    }

} 
}
    /* Cada turno se evaluará si se ha ganao' o todavía no */ 
    function victoria() {
        for (let barco of this.barcos) {
            if (!barco.hundido) {
                return false;
            }
        }
        mensaje.innerHTML = ('Has ganado jugador ' + this.color);
        return true;
    }