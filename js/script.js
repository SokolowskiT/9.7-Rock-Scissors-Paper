var newGameBtn = document.getElementById('js-newGameButton'),
	pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    },
    newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    resultText = document.getElementById('js-winnerResult'),
    playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),
    playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');


newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('Rock') });
pickPaper.addEventListener('click', function() { playerPick('Paper') });
pickScissors.addEventListener('click', function() { playerPick('Scissors') });

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        resultText.style.display = 'none';
    	break;
    case 'ended':
        resultText.style.display = 'block';
        newGameBtn.innerText = 'Play again';
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
    	break;
    case 'notStarted':  	
    default:
    	resultText.style.display = 'none';
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none'; 
	}
}

setGameElements();

function newGame() {
	clearWinnerText()
	player.name = prompt('Please enter your name', 'Player name');
	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements();
		playerNameElem.innerHTML = player.name;
	}
}

function clearWinnerText(){
	resultText.innerHTML = '';
}

function playerPick(playerPick) {
	console.log(playerPick);
}

function getComputerPick() {
	var possiblePicks = ['Rock', 'Paper', 'Scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	checkRoundWinner(playerPick, computerPick);
	setGamePoints();
	checkGameWinner();
	setGamePoints();
	setGameElements();
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';
	var winnerIs = 'player';
    if (playerPick == computerPick) {
		winnerIs = 'tie';
	} else if (
		(computerPick == 'Rock' &&  playerPick == 'Scissors') ||
		(computerPick == 'Scissors' &&  playerPick == 'Paper') ||
		(computerPick == 'Paper' &&  playerPick == 'Rock')) {
		winnerIs = 'computer';
	}

	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Win!";
		player.score++;
		computerResultElem.innerHTML = "Lost";
        
	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Win!";
		computer.score++;
		playerResultElem.innerHTML = "Lost";
	}
	else {
		playerResultElem.innerHTML = "Tie!";
		computerResultElem.innerHTML = "Tie!";
	}
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function checkGameWinner(playerPointsElem, computerPointsElem){
	if (player.score == 10){
	gameState = 'ended';
	player.score = computer.score = 0;
	playerPickElem.innerHTML = computerPickElem.innerHTML = '';
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';
	resultText.innerHTML = "The winner is " + player.name;
	}
	else if (computer.score == 10){
	gameState = 'ended';
	player.score = computer.score = 0;
	playerPickElem.innerHTML = computerPickElem.innerHTML = '';
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';
	resultText.innerHTML = "The winner is Computer";
	}
}