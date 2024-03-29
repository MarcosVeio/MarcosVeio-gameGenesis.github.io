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
const nextButton = document.getElementById('next')
const comoJogar = document.getElementById('comoJogar')
const backComoJogar = document.getElementById('comoJogarBack')

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

    if(element == blue){
        setTimeout(() => {
            element.classList.add('selected-blue');
        }, number - 150);

        setTimeout(() => {
            element.classList.remove('selected-blue');
        }, number - 20);
    }else if(element == red){
        setTimeout(() => {
            element.classList.add('selected-red');
        }, number - 150);

        setTimeout(() => {
            element.classList.remove('selected-red');
        }, number - 20);
    }else if(element == green){
        setTimeout(() => {
            element.classList.add('selected-green');
        }, number - 150);

        setTimeout(() => {
            element.classList.remove('selected-green');
        }, number - 20);
    }else if(element == yellow){
        setTimeout(() => {
            element.classList.add('selected-yellow');
        }, number - 150);

        setTimeout(() => {
            element.classList.remove('selected-yellow');
        }, number - 20);
    }
}

let activeModal = () => {
    nextButton.style.display="block"
    document.querySelector('.window').classList.remove('loser');
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
    document.getElementById('modal').style.display = 'flex';
    document.querySelector('.window').classList.add('loser');
    document.getElementById('score').innerHTML = `GAME OVER!`;
    document.getElementById('scoreMax').innerHTML = `Score Máximo: ${localStorage.getItem('scoreStorege')}`
    document.getElementById('check').innerHTML = `Score: ${score}<br>Clique em avançar para iniciar um novo jogo`
}

let gameOver = () => {
    nextButton.style.display="block"
    score = score - 1;
    loser();
    order = [];
    clickedOrder = [];
    umclick = 0

    document.getElementById('next').onclick = () => {
        nextButton.style.display="none"
        umclick++;
        if (umclick <= 1) {
            iCounter = 4
            score = 0;
            document.getElementById('score').innerHTML = "O jogo vai começar em:"
            let contagem = setInterval(() => counter(), 700)
            setTimeout(() => clearInterval(contagem), 3500)
            setTimeout(() => document.getElementById('modal').style.display = 'none', 3500)
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
    document.querySelector('.window').classList.remove('loser');
    welcome();
    score = 0;

    document.getElementById('next').onclick = () => {
        comoJogar.style.display= 'none';
        umclick++;
        if (umclick <= 1) {
            nextButton.style.display="none"
            document.getElementById('check').innerHTML = ``
            document.getElementById('score').innerHTML = "O jogo vai começar em:"
            let contagem = setInterval(() => counter(), 700)
            setTimeout(() => clearInterval(contagem), 3300)
            setTimeout(() => document.getElementById('modal').style.display = 'none', 3400)
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

comoJogar.onclick = () => {
    document.querySelector('.comoJogar').style.opacity = '1'
    document.querySelector('.comoJogar').style.zIndex = '1'
    document.querySelector('.window').style.display = 'none'
}
comoJogarBack.onclick = () => {
    document.querySelector('.window').style.display = 'flex'
    document.querySelector('.comoJogar').style.opacity = '0'
    document.querySelector('.comoJogar').style.zIndex = '-1'
}
