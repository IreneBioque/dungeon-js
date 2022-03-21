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
let antorchas = [];

let tileMap;
let imagenAntorcha;
let messages = document.querySelector(".messages");
const escenario1 = [
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

const escenario2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 2, 0, 2, 2, 2, 2, 0, 0, 2, 1, 0],
  [0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0],
  [0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 2, 0, 2, 0],
  [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0],
  [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0],
  [0, 0, 2, 2, 2, 2, 3, 0, 0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const escenario3 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 2, 2, 2, 2, 0, 1, 2, 2, 0, 2, 2, 0, 2, 0],
  [0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0],
  [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const escenario4 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 2, 0],
  [0, 2, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2, 0],
  [0, 0, 2, 0, 0, 2, 0, 2, 2, 0, 0, 2, 0, 2, 0],
  [0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0],
  [0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 2, 0],
  [0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 3, 0],
  [0, 0, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let escenario = escenario3;
function dibujaEscenario() {
  for (y = 0; y < 10; y++) {
    for (x = 0; x < 15; x++) {
      let tile = escenario[y][x];
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
  if (escenario === escenario3) {
    this.x = 1;
    this.y = 8;
  }
  if (escenario === escenario4) {
    this.x = 7;
    this.y = 6;
  }

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
    if (escenario === escenario1) {
      messages.innerHTML = "Tu viaje continúa";
      this.x = 1;
      this.y = 1;
      escenario = escenario2;
    } else if (escenario === escenario2) {
      messages.innerHTML = "Tu viaje continúa";
      this.x = 1;
      this.y = 1;
      escenario = escenario3;
    } else if (escenario === escenario3) {
      messages.innerHTML = "Tu viaje continúa";
      this.x = 1;
      this.y = 1;
      escenario = escenario4;
    } else if (escenario === escenario4) {
      messages.innerHTML = "Has ganado!!";
      this.x = 1;
      this.y = 1;
      this.llave = false;
      escenario[8][6] = 3;
      escenario = escenario4;
    }
  };

  this.muerte = function () {
    if (escenario === escenario1) {
      messages.innerHTML = "Has perdido";
      this.x = 1;
      this.y = 1;
      this.llave = false; // el jugador pierde la llave
      escenario[8][3] = 3; // la llave vuelve a su sitio
    } else if (escenario === escenario2) {
      messages.innerHTML = "Has perdido";
      this.x = 1;
      this.y = 1;
      this.llave = false;
      escenario[8][6] = 3;
    } else if (escenario === escenario3) {
      messages.innerHTML = "Has perdido";
      this.x = 1;
      this.y = 8;
      this.llave = false;
      escenario[1][1] = 3;
    } else if (escenario === escenario4) {
      messages.innerHTML = "Has perdido";
      this.x = 7;
      this.y = 6;
      this.llave = false;
      escenario[7][13] = 3;
    }
  };

  // mirar si hay algo donde esta el protagonista
  this.logicaObjetos = function () {
    let objeto = escenario[this.y][this.x];
    // Obtiene la llave
    if (objeto === 3) {
      this.llave = true;
      escenario[this.y][this.x] = 2;
      messages.innerHTML = "Has obtenido la llave";
    }
    // Abrimos la puerta
    if (objeto === 1) {
      if (this.llave === true) {
        this.victoria();
      } else {
        messages.innerHTML = "Te falta la llave, no puedes pasar";
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

  // creamos antorchas
  antorchas.push(new antorcha(0, 0));
  antorchas.push(new antorcha(14, 0));
  antorchas.push(new antorcha(14, 9));
  antorchas.push(new antorcha(0, 9));

  //Creamos enemigos
  if (escenario === escenario1 || escenario === escenario2) {
    enemigo.push(new malo(3, 3));
    enemigo.push(new malo(9, 1));
    enemigo.push(new malo(7, 7));
  } else if (escenario === escenario3) {
    enemigo.push(new malo(4, 4));
    enemigo.push(new malo(2, 2));
    enemigo.push(new malo(7, 7));
    enemigo.push(new malo(8, 3));
  } else if (escenario === escenario4) {
    enemigo.push(new malo(4, 4)); 
    enemigo.push(new malo(2, 2));
    enemigo.push(new malo(4, 8));
    enemigo.push(new malo(10, 4));
    enemigo.push(new malo(10, 6));
  }

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
  protagonista.dibuja();
  for (c = 0; c < enemigo.length; c++) {
    enemigo[c].mueve();
    enemigo[c].dibuja();
  }
  for (c = 0; c < antorchas.length; c++) {
    antorchas[c].dibuja();
  }
}
