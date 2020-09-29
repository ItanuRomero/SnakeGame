// assim que carrega a tela ele inicia
window.onload = function() {
    const canvas = document.getElementById('gc')
    ctx = canvas.getContext('2d')
    document.addEventListener('keydown', keyPush)
    setInterval(game, 1000/15)
}

// setando as variaveis
const canvas = document.getElementById('gc')
var ctx = canvas.getContext('2d')

var playerPositionX = 10
var playerPositionY = 10

var gridSize = 20
var tileCount = 20

var appleX = 15
var appleY = 15

var xValue = 0
var yValue = 0

var trail = []
var tail = 5

//aciona as funcionalidades do jogo
function game() {
    playerPositionX += xValue
    playerPositionY += yValue

    if (playerPositionX < 0) {
        playerPositionX = tileCount - 1
    }
    if (playerPositionX > tileCount - 1) {
        playerPositionX = 0
    }
    if (playerPositionY < 0) {
        playerPositionY = tileCount - 1
    }
    if (playerPositionY > tileCount - 1) {
        playerPositionY = 0
    }

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'lime'
    for(var count = 0; count < trail.length; count++) {
        ctx.fillRect(trail[count].x * gridSize, trail[count].y * gridSize, gridSize - 2, gridSize - 2)
        if (trail[count].x == playerPositionX && trail[count].y == playerPositionY) {
            tail = 5
        }
    }
    
    trail.push({x: playerPositionX, y: playerPositionY})

    while (trail.length > tail) {
        trail.shift()
    }

    if (appleX == playerPositionX && appleY == playerPositionY) {
        tail++

        appleX = Math.floor(Math.random()*tileCount)

        appleY = Math.floor(Math.random()*tileCount)
    }
    ctx.fillStyle = 'red'
    ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2)
}

// verifica qual tecla foi apertada
function keyPush(event) {
    switch(event.keyCode) {
        case 37:
            xValue = -1
            yValue = 0
            break
        case 38:
            xValue = 0
            yValue = -1
            break
        case 39:
            xValue = 1
            yValue = 0
            break
        case 40:
            xValue = 0
            yValue = 1
            break
    }
}