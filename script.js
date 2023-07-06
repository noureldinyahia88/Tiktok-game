const gameBoard = document.getElementById("gameboard")
const info = document.getElementById("info")

const starCell = [
    "","","","","","","","",""
]

let go = 'circle'
info.textContent = 'circle go first'

function createBoard() {
    starCell.forEach((cell, index)=>{
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        index = cellElement.id
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
}
createBoard()


function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)

    go = go === "circle" ? "cross" : "circle"
    info.textContent = go 
    e.target.removeEventListener('click', addGo)
    checkScore()
}

function checkScore() {
    const allSquare = document.querySelectorAll('.square') 
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach((array)=> {
        const circleWin = array.every(cell => allSquare[cell].firstChild?.classList.contains('circle'))

        if(circleWin) {
            info.textContent = "Circle win!"
            // remove Event Listener
            allSquare.forEach(square=>square.replaceWith(square.cloneNode(true)))
            return
        }

        const squareWin = array.every(cell => allSquare[cell].firstChild?.classList.contains('square'))

        if(squareWin) {
            info.textContent = "square win!"
            // remove Event Listener
            allSquare.forEach(square=>square.replaceWith(square.cloneNode(true)))
            return
        }
    })
}