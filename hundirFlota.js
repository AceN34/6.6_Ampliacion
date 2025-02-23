window.onload = function() {
    const tablero = document.getElementById("tablero");
    const tamanio = 10;

    function crearTablero() {
        for (let i = 0; i < tamanio * tamanio; i++) {
            const celda = document.createElement("div");
            celda.classList.add("celda");
            celda.dataset.indice = i;
            tablero.appendChild(celda);
        }
    }
    crearTablero();
}