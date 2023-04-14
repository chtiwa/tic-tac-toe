const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const board = document.querySelector('.board')
const cellElements = document.querySelectorAll('[data-cell]')
let circleTurn
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// when the user clicks on the player we set the currentClass as x or circle class
startGame()
restartButton.addEventListener('click', startGame)
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    // remove the classes
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    // remove the event listener so that it could be fired again
    cell.removeEventListener('click', handleClick)
    // only fire the function once
    cell.addEventListener('click', handleClick, { once: 1 })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  // place mark
  placeMark(cell, currentClass)
  // check for win
  if (checkWin(currentClass)) {
    endGame()
  } else if (isDraw()) {
    // check for draw
    console.log('draw')
    endGame(true)
  } else {
    // switch turns
    swapTurns()
    setBoardHoverClass(currentClass)
  }
}

function endGame(draw) {
  // if there is a draw , the draw is passed a true
  if (draw) {
    winningMessageTextElement.innerText = "It's a draw!"
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O is the winner!" : "X is the winner!"}`
  }
  winningMessageElement.classList.add("show")
}

function placeMark(cell, currentClass) {
  // console.log(cell?.classList?.add(currentClass))
  cell?.classList?.add(currentClass)
  // cell.calssList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass(currentClass) {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (currentClass === X_CLASS) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  // if any of the combination
  return WINNING_COMBINATIONS.some(combination => {
    // if every index in that combination
    return combination.every(index => {
      // returns boolean
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function isDraw() {
  // descturing the cell elements so that the every method works
  const draw = [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
  console.log(draw)
  return draw
} 