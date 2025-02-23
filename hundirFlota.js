window.addEventListener("DOMContentLoaded", function() {
    // Variables
    const tablero = document.getElementById("tablero");
    const tamanio = 10;
    let barcos = [];
    let turno = 0;

    /* Al clickar el botón de comenzar partida

    */
    function empezar(){

    }

    /* Cada turno se evaluará si se ha ganao' o todavía no */ 
    function victoria(){
        // aquí irá la condición de victoria.
        if(true){

        }
    }
    /* Crear el tablero de juego */
    function crearTablero() {
        for (let i = 0; i < tamanio * tamanio; i++) {
            const celda = document.createElement("div");
            celda.classList.add("celda");
            celda.dataset.indice = i;
            tablero.appendChild(celda);
        }
    }
   
    crearTablero();
});

