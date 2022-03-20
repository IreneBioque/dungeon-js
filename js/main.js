let canvas;
let ctx;
let FPS = 50;

let anchoF = 50;
let altoF = 50;

let muro = "#044f14";
let puerta = "#3a1700";
let tierra = "#c6892f";
let llave = "#c6bc00";
let protagonista;
let enemigo = [];

let tileMap;
let imagenAntorcha;
let escenario = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0],
  [0, 2, 2, 3, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let messages = document.querySelector(".messages");
let victoriaPrimerEscenario = false;
let escenario2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0],
  [0, 2, 2, 3, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function dibujaEscenario() {
  for (y = 0; y < 10; y++) {
    for (x = 0; x < 15; x++) {
      let tile = escenario[y][x];
      // ctx.fillStyle = color;
      // ctx.fillRect(x * anchoF, y * altoF, anchoF, altoF);
      ctx.drawImage(
        tileMap,
        tile * 32,
        0,
        32,
        32,
        anchoF * x,
        altoF * y,
        anchoF,
        altoF
      );
    }
  }
}
// añadir antorcha en movimiento
let antorcha = function (x, y) {
  this.x = x;
  this.y = y;
  this.retraso = 10;
  this.contador = 0;
  this.fotograma = 0; // 0-3 Tendremos 4 fotogramas, siempre serán secuenciales
  // fotogramas secuenciales, primero 1, luego 2....
  this.cambiaFotograma = function () {
    if (this.fotograma < 3) {
      this.fotograma++;
    } else {
      this.fotograma = 0;
    }
  };
  this.dibuja = function () {
    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.contador = 0;
      this.cambiaFotograma();
    }

    ctx.drawImage(
      tileMap,
      this.fotograma * 32,
      64,
      32,
      32,
      anchoF * x,
      altoF * y,
      anchoF,
      altoF
    );
  };
};
let malo = function (x, y) {
  this.x = x;
  this.y = y;
  console.log("enemigo creado");

  this.direccion = Math.floor(Math.random() * 4);
  // retraso de 50 fotogramas para que el enemigo no se mueve tan rapido
  this.retraso = 50;
  this.fotograma = 0;
  this.dibuja = function () {
    ctx.drawImage(
      tileMap,
      0,
      32,
      32,
      32,
      this.x * anchoF,
      this.y * altoF,
      anchoF,
      altoF
    );
  };

  this.compruebaColision = function (x, y) {
    let colisiona = false;
    if (escenario[y][x] === 0) {
      colisiona = true;
    }
    return colisiona;
  };

  this.mueve = function () {
    // cada enemigo manda sus datos al protagonista
    protagonista.colisionEnemigo(this.x, this.y);
    // que se mueva cuando se haya rellenado el contador
    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.contador = 0;
      // Arriba
      if (this.direccion === 0) {
        if (this.compruebaColision(this.x, this.y - 1) === false) {
          this.y--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
      // abajo
      if (this.direccion === 1) {
        if (this.compruebaColision(this.x, this.y + 1) === false) {
          this.y++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
      // izquierda
      if (this.direccion === 2) {
        if (this.compruebaColision(this.x - 1, this.y) === false) {
          this.x--;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
      // derecha
      if (this.direccion === 3) {
        if (this.compruebaColision(this.x + 1, this.y) === false) {
          this.x++;
        } else {
          this.direccion = Math.floor(Math.random() * 4);
        }
      }
    }
  };
};

//OBJETO JUGADOR
let jugador = function () {
  this.x = 1;
  this.y = 1;

  this.color = "#820c01";
  // no tiene llave de inicio
  this.llave = false;

  this.dibuja = function () {
    ctx.drawImage(
      tileMap,
      32,
      32,
      32,
      32,
      this.x * anchoF,
      this.y * altoF,
      anchoF,
      altoF
    );
  };

  this.colisionEnemigo = function (x, y) {
    if (this.x === x && this.y === y) {
      this.muerte();
    }
  };
  // hace comprobación de donde se moverá el PJ en el futuro, para ver si colisiona o no

  this.margenes = function (x, y) {
    let colision = false;
    // si es 0, es que es un muro
    if (escenario[y][x] == 0) {
      colision = true;
    }

    return colision;
  };
  // si no hay colisión el PJ se mueve, si hay colisión no se mueve
  this.arriba = function () {
    if (this.margenes(this.x, this.y - 1) == false) {
      this.y--;
      this.logicaObjetos();
    }
  };

  this.abajo = function () {
    if (this.margenes(this.x, this.y + 1) == false) {
      this.y++;
      this.logicaObjetos();
    }
  };

  this.izquierda = function () {
    if (this.margenes(this.x - 1, this.y) == false) {
      this.x--;
      this.logicaObjetos();
    }
  };

  this.derecha = function () {
    if (this.margenes(this.x + 1, this.y) == false) {
      this.x++;
      this.logicaObjetos();
    }
  };

  this.victoria = function () {
    messages.innerHTML = "Has ganado!!";
    console.log("Has ganado");
    this.x = 1;
    this.y = 1;
    this.llave = false;
    escenario[8][3] = 3;
    // victoriaPrimerEscenario = true;
    // escenario = escenario2;
  };

  this.muerte = function () {
    messages.innerHTML = "Has perdido";
    console.log("Has perdido");
    this.x = 1;
    this.y = 1;
    this.llave = false; // el jugador pierde la llave
    escenario[8][3] = 3; // la llave vuelve a su sitio
  };

  // mirar si hay algo donde esta el protagonista
  this.logicaObjetos = function () {
    let objeto = escenario[this.y][this.x];
    // Obtiene la llave
    if (objeto === 3) {
      this.llave = true;
      escenario[this.y][this.x] = 2;
      messages.innerHTML = "Has obtenido la llave";
      console.log("Has obtenido la llave!!");
    }
    // Abrimos la puerta
    if (objeto === 1) {
      if (this.llave === true) {
        this.victoria();
      } else {
        messages.innerHTML = "Te falta la llave, no puedes pasar";
        console.log("Te falta la llave, no puedes pasar");
      }
    }
  };
};
function inicializa() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  tileMap = new Image();
  tileMap.src = "./images/tilemap.png";

  //CREAMOS AL JUGADOR
  protagonista = new jugador();

  // creamos antorcha
  imagenAntorcha = new antorcha(0, 0);

  //Creamos enemigos
  enemigo.push(new malo(3, 3));
  enemigo.push(new malo(5, 7));
  enemigo.push(new malo(7, 7));

  //LECTURA DEL TECLADO
  document.addEventListener("keydown", function (tecla) {
    if (tecla.code == "ArrowUp") {
      protagonista.arriba();
    }

    if (tecla.code == "ArrowDown") {
      protagonista.abajo();
    }

    if (tecla.code == "ArrowLeft") {
      protagonista.izquierda();
    }

    if (tecla.code == "ArrowRight") {
      protagonista.derecha();
    }
  });

  setInterval(function () {
    principal();
  }, 1000 / FPS);
}

function borraCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}

function principal() {
  borraCanvas();
  dibujaEscenario();
  imagenAntorcha.dibuja();
  protagonista.dibuja();
  for (c = 0; c < enemigo.length; c++) {
    enemigo[c].mueve();
    enemigo[c].dibuja();
  }
}
