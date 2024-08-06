import './style.css'
import { BLOCK_SIZE, PIECES, BOARD_WIDTH, BOARD_HEIGHT, EVENT_MOVEMENTS } from './consts'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const controles = document.getElementById('controles')
controles.style.display = 'none'
const botonIzquierda = document.getElementById('izquierda')
const botonAbajo = document.getElementById('abajo')
const botonDerecha = document.getElementById('derecha')
const $score = document.querySelector('span')
const $section = document.querySelector('section')
const app = document.querySelector('app')
const botonPausa = document.getElementById('botonPausa')
botonPausa.style.display = 'none'
const botonRotar = document.getElementById('rotar')
botonRotar.style.display = 'none'
const audio = new window.Audio('./public_tetris.mp3')
audio.loop = true;
audio.volume = 0.4
audio.play();
let velocidadX = 1;
let velocidadY = 1;
let friccion = 0.95

const pausedMessage = document.createElement('h2');
document.addEventListener('DOMContentLoaded', () => {
  const moveLeftButton = document.getElementById('izquierda');
  
  moveLeftButton.addEventListener('click', () => {
    piece.position.x--;
    if (checkCollision()) {
      piece.position.x++;
    }
  });
});



botonRotar.addEventListener('click', () => {
  rotarPieza();
});

function rotarPieza() {
  const rotated = [];

  // Rotar la matriz de la pieza
  for (let i = 0; i < piece.shape[0].length; i++) {
    const row = [];

    for (let j = piece.shape.length - 1; j >= 0; j--) {
      row.push(piece.shape[j][i]);
    }

    rotated.push(row);
  }

  // Guardar la forma anterior para comprobar colisiones
  const previousShape = piece.shape;
  piece.shape = rotated;

  // Si hay colisión, revertir la rotación
  if (checkCollision()) {
    piece.shape = previousShape;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const moveRightButton = document.getElementById('derecha');
  
  moveRightButton.addEventListener('click', () => {
    piece.position.x++;
    if (checkCollision()) {
      piece.position.x--;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const moveDownButton = document.getElementById('abajo');
  
  moveDownButton.addEventListener('click', () => {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
    }
  });
});

pausedMessage.textContent = 'Juego Pausado';
pausedMessage.className = 'appPaused';
pausedMessage.style.position = 'absolute';
pausedMessage.style.top = '200px'; 
pausedMessage.style.left = '50%';
pausedMessage.style.transform = 'translateX(-50%)';
pausedMessage.style.color = 'white';
pausedMessage.style.display = 'none'; 
document.body.appendChild(pausedMessage);

let score = 0

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT
context.scale(BLOCK_SIZE, BLOCK_SIZE)
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

const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

let dropCounter = 0;
let lastTime = 0;
let isPaused = false;

function update(time = 0) {
  velocidadX *= friccion;
  velocidadY *= friccion;

  if (isPaused) {
    pausedMessage.style.display = 'block'; 
    draw(); 
    requestAnimationFrame(update);
    audio.pause();
    return;
  }
  
  pausedMessage.style.display = 'none'; 

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
  
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const blockSize = 1; 
  const borderWidth = blockSize * 0.2;
  const innerSize = blockSize - borderWidth;
  const radius = blockSize * 0.05; 

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
  
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.strokeStyle = 'white'; 
        context.lineWidth = borderWidth;
        context.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
        context.fillStyle = 'lightBlue'; 
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
        context.strokeStyle = 'orange'; 
        context.lineWidth = borderWidth;
        context.fillStyle = 'transparent'; 
        drawRoundedRect(px, py, blockSize, blockSize, radius);        
        context.fillStyle = 'red'; 
        const innerX = px + borderWidth / 2;
        const innerY = py + borderWidth / 2;
        drawRoundedRect(innerX, innerY, innerSize, innerSize, radius);
        }
      });
    });


  $score.innerText = score;
}



document.addEventListener('keydown', event => {
  if (isPaused) {
    const pausedMessage = document.createElement('h2');
    pausedMessage.textContent = 'Juego Pausado';
    pausedMessage.className = 'appPaused';
    pausedMessage.style.position = 'absolute';
    pausedMessage.style.top = '10px'; 
    pausedMessage.style.left = '50%';
    pausedMessage.style.transform = 'translateX(-50%)';
    pausedMessage.style.color = 'white';
    pausedMessage.style.fontSize = '24px';
    pausedMessage.style.display = 'none'; 
    
    
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


document.addEventListener('keydown', event => {
  if (event.key === 'p' || event.key === 'P') {
    isPaused = !isPaused;
  }
});


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
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
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

botonPausa.addEventListener('click', () => {
  isPaused = !isPaused
  audio.play();
})

$section.addEventListener('click', () => {
  update()
  $section.remove()
  controles.style.display = 'flex'
  botonPausa.style.display = 'block'
  botonRotar.style.display = 'block'
  audio.volume = 0.4
  audio.play()
})