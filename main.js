import './style.css'
import { BLOCK_SIZE, PIECES, BOARD_WIDTH, BOARD_HEIGHT, EVENT_MOVEMENTS } from './consts'

// 1. inicializar el canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const $score = document.querySelector('span')
const $section = document.querySelector('section')
const app = document.querySelector('app')
//const audio = new window.Audio('./public_tetris.mp3')
//audio.loop = true;
//audio.play();
const pausedMessage = document.createElement('h2');

// Establecer el texto interior
pausedMessage.textContent = 'Juego Pausado';

// Asignar la clase CSS (puedes definir estilos en tu CSS para esta clase)
pausedMessage.className = 'appPaused';

// Establecer estilos iniciales (opcional, para ocultar el mensaje por defecto)
pausedMessage.style.position = 'absolute';
pausedMessage.style.top = '200px'; // Ajusta la posición según sea necesario
pausedMessage.style.left = '50%';
pausedMessage.style.transform = 'translateX(-50%)';
pausedMessage.style.color = 'white';
pausedMessage.style.display = 'none'; // Ocultar el mensaje inicialmente

// Agregar el elemento al <body>
document.body.appendChild(pausedMessage);

let score = 0

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// 3. board
// const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT)

const board = [
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ],
  [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0
  ]
]

function createBoard (width, height) {
  return Array(height).fill().map(() => Array(width).fill(0))
}

// 4. pieza player
const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

// 2. game loop
// function update () {
//   draw()
//   window.requestAnimationFrame(update)
// }

// 8. auto drop
let dropCounter = 0;
let lastTime = 0;
let isPaused = false;

function update(time = 0) {
  if (isPaused) {
    pausedMessage.style.display = 'block'; // Mostrar mensaje
    draw(); // Llamar a draw para actualizar el estado visual cuando esté en pausa
    requestAnimationFrame(update);
    audio.pause();
    return;
  }
  //audio.play();
  pausedMessage.style.display = 'none'; // Ocultar mensaje

  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > 1000) {
    piece.position.y++;
    dropCounter = 0;

    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }

  draw();
  requestAnimationFrame(update);
}

function draw() {
  // Limpia el canvas
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const blockSize = 1; // Tamaño de cada celda en píxeles
  const borderWidth = blockSize * 0.2; // Ancho del borde (20% del tamaño del bloque)
  const innerSize = blockSize - borderWidth;
  const radius = blockSize * 0.05; // Radio del borde redondeado (5% del tamaño del bloque)

  function drawRoundedRect(x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arcTo(x + width, y, x + width, y + height, radius);
    context.arcTo(x + width, y + height, x, y + height, radius);
    context.arcTo(x, y + height, x, y, radius);
    context.arcTo(x, y, x + width, y, radius);
    context.closePath();
    context.stroke();
    context.fill();
  }
  // Dibuja el tablero
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.strokeStyle = 'white'; // Color del borde
        context.lineWidth = borderWidth;
        context.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);

        // Dibuja el centro del bloque
        context.fillStyle = 'lightBlue'; // Color del centro
        context.fillRect(x * blockSize + borderWidth / 2, 
                         y * blockSize + borderWidth / 2, 
                         innerSize, 
                         innerSize);
      }
    });
  });

  
  
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
        const px = x + piece.position.x;
        const py = y + piece.position.y;
        
        // Dibuja el borde redondeado
        context.strokeStyle = 'orange'; // Color del borde
        context.lineWidth = borderWidth;
        context.fillStyle = 'transparent'; // Fondo transparente para el borde
        drawRoundedRect(px, py, blockSize, blockSize, radius);

        // Dibuja el centro redondeado
        context.fillStyle = 'red'; // Color del centro
        const innerX = px + borderWidth / 2;
        const innerY = py + borderWidth / 2;
        drawRoundedRect(innerX, innerY, innerSize, innerSize, radius);
        }
      });
    });


  // Muestra la puntuación
  $score.innerText = score;
}

// Listener para detectar teclas
document.addEventListener('keydown', event => {
  if (isPaused) {
    const pausedMessage = document.createElement('h2');

    // Establecer el texto interior
    pausedMessage.textContent = 'Juego Pausado';
    
    // Asignar la clase CSS (puedes definir estilos en tu CSS para esta clase)
    pausedMessage.className = 'appPaused';
    
    // Establecer estilos iniciales (opcional, para ocultar el mensaje por defecto)
    pausedMessage.style.position = 'absolute';
    pausedMessage.style.top = '10px'; // Ajusta la posición según sea necesario
    pausedMessage.style.left = '50%';
    pausedMessage.style.transform = 'translateX(-50%)';
    pausedMessage.style.color = 'white';
    pausedMessage.style.fontSize = '24px';
    pausedMessage.style.display = 'none'; // Ocultar el mensaje inicialmente
    
    // Agregar el elemento al <body>
    document.body.appendChild(pausedMessage);
  }
  

  if (event.key === EVENT_MOVEMENTS.LEFT) {
    piece.position.x--;
    if (checkCollision()) {
      piece.position.x++;
    }
  }

  if (event.key === EVENT_MOVEMENTS.RIGHT) {
    piece.position.x++;
    if (checkCollision()) {
      piece.position.x--;
    }
  }

  if (event.key === EVENT_MOVEMENTS.DOWN) {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }

  if (event.key === 'ArrowUp') {
    const rotated = [];

    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = [];

      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i]);
      }

      rotated.push(row);
    }

    const previousShape = piece.shape;
    piece.shape = rotated;
    if (checkCollision()) {
      piece.shape = previousShape;
    }
  }
});

// Listener para la tecla de pausa 'P'
document.addEventListener('keydown', event => {
  if (event.key === 'p' || event.key === 'P') {
    isPaused = !isPaused;
  }
});

// Iniciar el bucle del juego
requestAnimationFrame(update);

function checkCollision () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value === 1 &&
        board[y + piece.position.y]?.[x + piece.position.x] !== 0
      )
    })
  })
}

function solidifyPiece () {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1
      }
    })
  })

  resetPiece()
}

function resetPiece () {
  piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2)
  piece.position.y = 0
  // get random shape
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
  // gameover
  if (checkCollision()) {
    window.alert('Game over!! Sorry!')
    board.forEach((row) => row.fill(0))
    score = 0
  }
}

function removeRows () {
  const rowsToRemove = []

  board.forEach((row, y) => {
    if (row.every(value => value === 1)) {
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach(y => {
    board.splice(y, 1)
    const newRow = Array(BOARD_WIDTH).fill(0)
    board.unshift(newRow)
    score += 10
  })
}

$section.addEventListener('click', () => {
  update()
  $section.remove()
  audio.volume = 0.01
  audio.play()
})