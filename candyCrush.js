// run the script after document loaded
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".game")
  const scoreDisplay = document.getElementById("score")
  const width = 8
  const cells = []
  let score = 0

  const candyColors = [
    "red", 
    "green", 
    "blue", 
    "purple", 
    "yellow", 
    "orange"
  ];
  
  // create board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const cell = document.createElement("div")
      cell.setAttribute('draggable', true)
      cell.setAttribute('id', i)
      
      let randomColor = Math.floor(Math.random() * candyColors.length)
      cell.className = candyColors[randomColor]

      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  createBoard()
  
  // drag candies
  let colorBeingDragged
  let colorBeingReplaced
  let cellIdBeingDragged
  let cellIdBeingReplaced

  cells.forEach(cell => cell.addEventListener('dragstart', dragStart))
  cells.forEach(cell => cell.addEventListener('dragend', dragEnd))
  cells.forEach(cell => cell.addEventListener('dragover', dragOver))
  cells.forEach(cell => cell.addEventListener('dragenter', dragEnter))
  cells.forEach(cell => cell.addEventListener('dragleave', dragLeave))
  cells.forEach(cell => cell.addEventListener('drop', dragDrop))

  function dragStart() {
    colorBeingDragged = this.className
    cellIdBeingDragged = parseInt(this.id)
    console.log(this.id)
  }
  function dragOver(e) {
    e.preventDefault()
  }
  function dragEnter(e) {
    e.preventDefault()
  }
  function dragLeave() {
    // this.className = ''
  }
  function dragDrop() {
    colorBeingReplaced = this.className
    cellIdBeingReplaced = parseInt(this.id)
    this.className = colorBeingDragged
  }
  function dragEnd() {
    // check if is a valid move
    let validMoves = [
      cellIdBeingDragged - 1, 
      cellIdBeingDragged - width,
      cellIdBeingDragged + 1,
      cellIdBeingDragged + width
    ];
    
    let isValidMove = validMoves.includes(cellIdBeingReplaced);
    
    if (cellIdBeingReplaced && isValidMove) {
      // valid move
      cellIdBeingReplaced = null
      cells[cellIdBeingDragged].className = colorBeingReplaced
    } else if (cellIdBeingReplaced && !isValidMove) {
      // invalid move inside board
      cells[cellIdBeingReplaced].className = colorBeingReplaced
      cells[cellIdBeingDragged].className = colorBeingDragged
    } else {
      // when dragged out of board
      cells[cellIdBeingDragged].className = colorBeingDragged
    }
  }

  function moveDown() {
    const range = width * width - width 
    const firstRow = []
    for (let i = 0; i < width; i++) {
      firstRow.push(i)
    }

    for (let i = 0; i < range; i++){
      const isFirstRow = firstRow.includes(i)
      if (cells[i + width].className === '') {
        cells[i + width].className = cells[i].className
        cells[i].className = ''
        if (isFirstRow && (cells[i].className === '')) {
          let randomColor = Math.floor(Math.random() * candyColors.length)
          cells[i].className = candyColors[randomColor]
        }
      } else if (isFirstRow && (cells[i].className === '')) {
        let randomColor = Math.floor(Math.random() * candyColors.length)
        cells[i].className = candyColors[randomColor]
      }
    }
  }

  // check for matches

  // check row of 4
  function checkRowForFour() {
    const range = width * width - 3
    const notValid = []
    let numberNotValid = width - 3
    while (numberNotValid < range) {
      notValid.push(numberNotValid)
      notValid.push(numberNotValid +1)
      notValid.push(numberNotValid +2)
      numberNotValid += 8
    }

    for (let i = 0; i < range; i++) {
      let rowOfFour = [i, i+1, i+2, i+3]
      let decidedColor = cells[i].className
      const isBlank = cells[i].className === ''

      if (notValid.includes(i)) continue

      if (rowOfFour.every(index => cells[index].className === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        rowOfFour.forEach(index => {
          cells[index].className = ''
        })
      }
    }
  }
  checkRowForFour()

  // check column of 4
  function checkColumnForFour() {
    const range = width * width - (3 * width)
    for (let i = 0; i < range; i++) {
      let columnOfFour = [i, i+width, i+width*2, i+width*3]
      let decidedColor = cells[i].className
      const isBlank = cells[i].className === ''

      if (columnOfFour.every(index => cells[index].className === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        columnOfFour.forEach(index => {
          cells[index].className = ''
        })
      }
    }
  }
  checkColumnForFour()

  // check row of 3
  function checkRowForThree() {
    const range = width * width - 2
    const notValid = []
    let numberNotValid = width - 2
    while (numberNotValid < range) {
      notValid.push(numberNotValid)
      notValid.push(numberNotValid +1)
      numberNotValid += 8
    }

    for (let i = 0; i < range; i++) {
      let rowOfThree = [i, i+1, i+2]
      let decidedColor = cells[i].className
      const isBlank = cells[i].className === ''

      if (notValid.includes(i)) continue

      if (rowOfThree.every(index => cells[index].className === decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        rowOfThree.forEach(index => {
          cells[index].className = ''
        })
      }
    }
  }
  checkRowForThree()

  // check column of 3
  function checkColumnForThree() {
    const range = width * width - (2 * width)
    for (let i = 0; i < range; i++) {
      let columnOfThree = [i, i+width, i+width*2]
      let decidedColor = cells[i].className
      const isBlank = cells[i].className === ''

      if (columnOfThree.every(index => cells[index].className === decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
          cells[index].className = ''
        })
      }
    }
  }
  checkColumnForThree()

  window.setInterval(function() {
    moveDown(),
    checkRowForFour(),
    checkColumnForFour(),
    checkRowForThree(),
    checkColumnForThree()
  }, 100)
  
});
