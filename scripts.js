/* ----------------------------------------------------------------------
// Versão Original - Digitalinnovation.one
// Por Dalmo Silva Mendes, New Verson: Genius Play Sonoro v1.0
// Boa Vista-RR, 27/11/2021 - Git: https://github.com/DalmoMendes/
-------------------------------------------------------------------------
Além dos recursos iniciais, este projeto tem o objetivo de não executar
uma música no início da segunda rodada do game. Além disso, cada clique,
respostas corretas ou erradas são emitidos avisos sonoros antes e após
clicar em OK. Para isso, criei 4 funções Acertou, Errou, ClickSom e Start.
Também adicionei alguns recursos de css como genius:hover, 
transition-duration, box-shadow, background: linear-gradient, 
cursor: pointer e tela responsive usando 
@media screen and (max-width: 320px) etc. 
Divirta-se com o Genius Play Sonoro v1.0! 
Tente fazer a música parar.
---------------------------------------------------------------------------
*/
let order = []; // Arrey
let clickedOrder = []; // Arrey clicados Verificar Ordem
let score = 0; // quantidade de cliques

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

// Selecionar as cores:
const green = document.querySelector('.green'); // 0 Verde 
const red = document.querySelector('.red'); // 1 Vermelho
const yellow = document.querySelector('.yellow'); // 2 Amarelo
const blue = document.querySelector('.blue'); // 3 Azul

// Funções de Audios
let Acertou = () => {
    const audioAcerto = new Audio('acertou.wav');
    audioAcerto.play();
}
let Errou = () => {
    const audioErrou = new Audio('errou.wav');
    audioErrou.play();
}
let ClickSom = () => {
    const audioClick = new Audio('click.wav');
    audioClick.play();
}
let Start = () => {
    const audioStart = new Audio('start.mp3');
    audioStart.play();
}
// Função para criar ordem aleatoria de cores
let shuffletOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    // For
    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}
// Acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;

    setTimeout(() => {
        element.classList.add('selected');

    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}
// Checa se os botões clicados são os mesmos da ordem gerado no jogo
let checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]) {
            gameOver();
            Errou();
            break;
        }
    }
    if(clickedOrder.length == order.length){
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        Acertou();
        nextLevel();    
    }
}

// Função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    ClickSom();

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

// Função para retornar a cor
// com IF e else IF para verificação de cores
let createColorElement = (color) => {
    if(color == 0){
        return green;
    } else if(color == 1){
        return red;
    } else if(color == 2){
        return yellow;
    } else if(color == 3){
        return blue;
    }
}

// Função para o proxímo nível do jogo
let nextLevel = () => {
    score++;
    shuffletOrder();
}

// Função para Game Over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    playGame();
}

// Função de início de jogo
let playGame = () => {
        Start(); // Toca um som ao iníciar o Game ao iníciar o 
        alert('Genius! Start Game Play!');
        score = 0;
        nextLevel();
    
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// Início do Jogo
playGame();
Start();
