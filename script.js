let order = []
let clickedOrder = []
let scoreOfApp = 0
let iCounter = 4
let umclick = 0

window.addEventListener('load', () => {
    let score = scoreOfApp

    if (localStorage.getItem('scoreStorege')) {
        localStorage.getItem('scoreStorege')
    } else {
        localStorage.setItem("scoreStorege", score);
    }
})

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')

let shuffleOrder = () => {

    let verification = localStorage.getItem('scoreStorege')
    if (score > parseInt(verification)) {
        localStorage.setItem("scoreStorege", score);
    }

    let colorOrder = Math.floor(Math.random() * 4)
    order[order.length] = colorOrder
    clickedOrder = []

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 150);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number - 20);
}

let activeModal = () => {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('score').innerHTML = `Score: ${score}`
    document.getElementById('scoreMax').innerHTML = `Score Máximo: ${localStorage.getItem('scoreStorege')}`
    document.getElementById('check').innerHTML = `Você acertou! Próximo nível`
}

let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
        if (clickedOrder.length == order.length) {
            activeModal()
            document.getElementById('next').onclick = () => nextLevel();

            console.log(clickedOrder)
        }
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250)

}

let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

let nextLevel = () => {
    shuffleOrder();
    document.getElementById('modal').style.display = 'none';
    score++;
}

let loser = () => {
    document.getElementById('modal').style.color = 'white';
    document.getElementById('modal').style.display = 'flex';
    document.querySelector('.window').classList.add('loser');
    document.getElementById('score').innerHTML = `GAME OVER!`;
    document.getElementById('scoreMax').innerHTML = `Score Máximo: ${localStorage.getItem('scoreStorege')}`
    document.getElementById('check').innerHTML = `Score: ${score}<br>Clique em avançar para iniciar um novo jogo`
}

let gameOver = () => {
    score = score - 1;
    loser();
    order = [];
    clickedOrder = [];
    umclick = 0

    document.getElementById('next').onclick = () => {
        umclick++;
        if (umclick <= 1) {
            iCounter = 4
            score = 0;
            document.getElementById('score').innerHTML = "O jogo vai começar em:"
            let contagem = setInterval(() => counter(), 700)
            setTimeout(() => clearInterval(contagem), 3500)
            setTimeout(() => document.getElementById('modal').style.display = 'none', 3600)
            setTimeout(() => shuffleOrder(), 3900)
            score++;
        }
    }
}

let welcome = () => {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('score').innerHTML = `Bem vindo ao Gênesis!`
    document.getElementById('check').innerHTML = `Iniciar novo jogo`
}


let playGame = () => {
    document.getElementById('modal').style.color = 'black';
    document.querySelector('.window').classList.remove('loser');
    welcome();
    score = 0;

    document.getElementById('next').onclick = () => {
        umclick++;
        if (umclick <= 1) {
            document.getElementById('score').innerHTML = "O jogo vai começar em:"
            let contagem = setInterval(() => counter(), 700)
            setTimeout(() => clearInterval(contagem), 3500)
            setTimeout(() => document.getElementById('modal').style.display = 'none', 3600)
            setTimeout(() => shuffleOrder(), 3900)
            score++;
        }

    }
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();

function counter() {
    iCounter--
    document.getElementById('scoreMax').innerHTML = iCounter
}
