import goblin from '../img/goblin.png';

const boardSize = 4;
let currentPosition = null;

const img = new Image();
img.src = goblin;
img.dataset.name = 'goblin';

function drawBoard() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const container = document.createElement('div');
  container.classList.add('container');
  wrapper.append(container);

  container.innerHTML = `
    <h1 class="title">Element Movement</h1>
    <div class="position">
      <div class="position__box">  
      <span data-id="current-position">Current position: n/a</span>
      <span data-id="previous-position">Previous position: n/a</span>
      </div>
      <div data-id="board-container" class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    </div>
   `;

  for (let i = 0; i < boardSize ** 2; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.id = i;
    container.querySelector('[data-id=board]').appendChild(cell);
  }
  document.body.append(wrapper);
}

function generateRandomPosition() {
  let number = Math.floor(Math.random() * boardSize ** 2);
  if (number === currentPosition) {
    do {
      number = Math.floor(Math.random() * boardSize ** 2);
    } while (number === currentPosition);
  }
  return number;
}

function showImage() {
  let prevPosToDisplay = 'n/a';
  if (currentPosition !== null) {
    prevPosToDisplay = currentPosition + 1;
  }

  const position = generateRandomPosition();

  const futureEl = document.querySelector(`[data-id="${position}"]`);
  futureEl.insertAdjacentElement('beforeend', img);

  const prevPos = document.querySelector('[data-id="previous-position"]');
  prevPos.innerHTML = `Previous position: ${prevPosToDisplay}`;

  const curPos = document.querySelector('[data-id="current-position"]');
  curPos.innerHTML = `Current position: ${position + 1}`;

  currentPosition = position;
}

function placeGoblin() {
  setTimeout(() => {
    showImage();
    placeGoblin();
  }, 1500);
}

drawBoard();
placeGoblin();
