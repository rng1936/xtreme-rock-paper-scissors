function initialize()
{
	numCompRock = 5;
	numCompPaper = 5;
	numCompScissors = 5;
	
	numHumRock = 5;
	numHumPaper = 5;
	numHumScissors = 5;
	
	humRockLimit = 0;
	humPaperLimit = 0; 
	humScissorsLimit = 0;
	
	compRockLimit = 0;
	compPaperLimit = 0;
	compScissorsLimit = 0;
	
	tieBreaker = 0;					
	roundNum = 1;
	logOutput = "";
	messageOutput = "";
	
	userInput = true; // Determines if user selected an option or not. 
	
	humRockBreak = false;
	humPaperBreak = false;
	humScissorsBreak = false;
	
	compRockBreak = false;
	compPaperBreak = false;
	compScissorsBreak = false;
	
	humanLoss = false;
	computerLoss = false;
	
	computerRock = document.getElementById("compRockTracker");
	computerPaper = document.getElementById("compPaperTracker");
	computerScissors = document.getElementById("compScissorsTracker");
	humanRock = document.getElementById("humRockTracker");
	humanPaper = document.getElementById("humPaperTracker");
	humanScissors = document.getElementById("humScissorsTracker");					
	logTracker = document.getElementById("log");
	messageTracker = document.getElementById("message");
	roundTracker = document.getElementById("round");					
	blueBack = document.getElementById("background"); // This is the user's interface.
	compBack = document.getElementById("mysterybackground"); // This is the computer's interface.
	
	compWeaponChoice();
}

function checkSelection(imageNum) // Checks if user's choice is valid. For example, if the weapon is broken or they ran out of weapons user's choice will be invalid.
{
	if (humanLoss || computerLoss)
	{
		messageOutput = "Click reset game to play again.";
		display();
	} else if (!userInput) {
		messageOutput = "You've already selected. Click next round to continue.";
		display();
	}
	if (userInput)
	{
		userChoice = imageNum;
		var invalidSelection = false;
		if (userChoice == 4 && numHumRock == 0)
		{
			if (humRockBreak) 
			{
				messageOutput = "Your weapon broke and cannot be used for the rest of the game.";
				invalidSelection = true;
			} else {							
				invalidSelection = true;
				messageOutput = "You've ran out of rocks.";
			}
		}
		if (userChoice == 5 && numHumPaper == 0)
		{
			if (humPaperBreak)
			{
				messageOutput = "Your weapon broke and cannot be used for the rest of the game.";
				invalidSelection = true;
			} else {
				invalidSelection = true;
				messageOutput = "You've ran out of paper.";
			}
		}
		if (userChoice == 6 && numHumScissors == 0)
		{
			if (humScissorsBreak)
			{
				messageOutput = "Your weapon broke and cannot be used for the rest of the game.";
				invalidSelection = true;
			} else {
				invalidSelection = true;
				messageOutput = "You've ran out of scissors.";
			}
		}
		if (invalidSelection) 
		{
			display();
		} else {
			checkWeapon();
		}
	}
}

function checkWeapon()
{
	if (userChoice == 4)
	{
		if (humPaperLimit !== 0 || humScissorsLimit !==0) /* If user has selected a different weapon the previous round, it will reset the 
		limits for every weapon before adding one limit to current chosen weapon. */
		{
			humRockLimit = 0;
			humPaperLimit = 0;
			humScissorsLimit = 0;
		}
		humRockLimit++;
		if (humRockLimit == 3) /* If limit reaches 3, weapon will "break" and cannot be used for the rest of the game, but the weapon will still be used for 
		the results of the current round. */
		{
			humRockBreak = true;
		}
	}
	if (userChoice == 5)
	{
		if (humRockLimit !== 0 || humScissorsLimit !==0)
		{
			humPaperLimit = 0;
			humRockLimit = 0;
			humScissorsLimit = 0;
		}
		humPaperLimit++;
		if (humPaperLimit == 3)
		{
			humPaperBreak = true;
		}
	}
	if (userChoice == 6)
	{
		if (humRockLimit !== 0 || humPaperLimit !==0)
		{
			humPaperLimit = 0;
			humRockLimit = 0;
			humScissorsLimit = 0;
		}
		humScissorsLimit++;
		if (humScissorsLimit == 3)
		{
			humScissorsBreak = true;
		}
	}
	changeImage();
}

function changeImage()
{
	if (userChoice == 4) // Changes display of user's choice to rock.
	{
		blueBack.src = "images/humRock.png";
	}
	if (userChoice == 5) // Changes display of user's choice to paper.
	{
		blueBack.src = "images/humPaper.png";							
	}
	if (userChoice == 6) // Changes display of user's choice to scissors.
	{
		blueBack.src = "images/humScissor.png";
	}
	changeCompImage();
}

function compWeaponChoice()
{
	var validSelection = false;
	while (!validSelection)
	{
		compChoice = parseInt((Math.random()* 3) + 1);
		if (compChoice == 1 && (numCompRock == 0 || compRockBreak || compRockLimit == 2 || numHumScissors == 0)) /* First, the function checks if arsenal has weapon or if 
		it is broken. */
		{
			validSelection = false;
		} else if (compChoice == 1 && (compPaperLimit !== 0 || compScissorsLimit !== 0)) { /* Then, it checks if the computer chose a different 
		weapon the previous round. */
			compRockLimit = 0;
			compRockLimit++;
			validSelection = true;
		} else if (compChoice == 1) { 					
			compRockLimit++;
			validSelection = true;
		}
		if (compChoice == 2 && (numCompPaper == 0 || compPaperBreak || compPaperLimit == 2 || numHumRock == 0))
		{
			validSelection = false;
		} else if (compChoice == 2 && (compRockLimit !== 0 || compScissorsLimit !== 0)) {
			compPaperLimit = 0;
			compPaperLimit++;
			validSelection = true;
		} else if (compChoice == 2) {
			compPaperLimit++;
			validSelection = true;
		}
		if (compChoice == 3 && (numCompScissors == 0 || compScissorsBreak || compScissorsLimit == 2 || numHumPaper == 0))
		{
			validSelection = false;
		} else if (compChoice == 3 && (compRockLimit !== 0 || compPaperLimit !== 0)) {
			compScissorsLimit = 0;
			compScissorsLimit++;
			validSelection = true;
		} else if (compChoice == 3) {
			compScissorsLimit++;
			validSelection = true;
		}
	}
	if (compRockLimit == 3)
	{
		compRockBreak = true;
		logOutput = "Round " + roundNum + ": Due to three consecutive uses, computer cannot use rock for the remainder of the game.<br />" + logOutput;
	}
	if (compPaperLimit == 3)
	{
		compPaperBreak = true;
		logOutput = "Round " + roundNum + ": Due to three consecutive uses, computer cannot use paper for the remainder of the game.<br />" + logOutput;
	}
	if (compScissorsLimit == 3)
	{
		compScissorsBreak = true;
		logOutput = "Round " + roundNum + ": Due to three consecutive uses, computer cannot use scissors for the remainder of the game.<br />" + logOutput;
	}
}

function changeCompImage()
{
	if (compChoice == 1) // Changes display of computer's choice to rock.
	{
		compBack.src = "images/comRock.png";
	}
	if (compChoice == 2) // Changes display of computer's choice to paper.
	{	
		compBack.src = "images/comPaper.png";
	} 
	if (compChoice == 3) // Changes display of computer's choice to scissors.
	{
		compBack.src = "images/comScissor.png";
	}
	roundResult();
}

function roundResult() // Determines and displays results of the round
{
	userInput = false;
	if (userChoice == 4 && compChoice == 1)
	{
		numCompRock--;
		numHumRock--;
		if (humRockBreak) 
		{
			messageOutput = "Round tied, but rock was used three times in a row and broke as a result.";
			logOutput = "Round " + roundNum + ": You chose rock against rock. Round was tied. Your rock broke.<br />" + logOutput;
		} else {
			logOutput = "Round " + roundNum + ": You chose rock against rock. Round was tied.<br />" + logOutput;
			messageOutput = "Round tied. Click next round to continue.";
		} 
		numCompRock++;
		numHumRock++;
		tieBreaker++;
	}
	if (userChoice == 4 && compChoice == 2)
	{
		numCompPaper--;
		numHumRock--;
		if (humRockBreak)
		{
			messageOutput = "Round lost and rock was used three times in a row and broke as a result.";
			logOutput = "Round " + roundNum + ": You chose rock against paper. Computer won the round. Your rock broke.<br />" + logOutput;
		} else {
			logOutput = "Round " + roundNum + ": You chose rock against paper. Computer won the round.<br />" + logOutput;
			messageOutput = "Round lost. Click next round to continue.";
		}
		numCompRock++;
		tieBreaker = 0;					
	}
	if (userChoice == 4 && compChoice == 3)
	{
		numCompScissors--;
		numHumRock--;
		if (humRockBreak)
		{
			messageOutput = "Round won, but rock was used three times in a row and broke as a result.";
			logOutput = "Round " + roundNum + ": You chose rock against scissors. You won the round. Your rock broke.<br />" + logOutput;
		} else {
			logOutput = "Round " + roundNum + ": You chose rock against scissors. You won the round.<br />" + logOutput;
			messageOutput = "Round won. Click next round to continue.";
		}
		numHumScissors++;
		tieBreaker = 0;
	}
	if (userChoice == 5 && compChoice == 1)
	{
		numCompRock--;
		numHumPaper--;
		if (humPaperBreak)
		{
			messageOutput = "Round won, but paper was used three times in a row and broke as a result.";
			logOutput = "Round " + roundNum + ": You chose paper against rock. You won the round. Your paper broke.<br />" + logOutput;
		} else {
			logOutput = "Round " + roundNum + ": You chose paper against rock. You won the round.<br />" + logOutput;
			messageOutput = "Round won. Click next round to continue.";
		}
		numHumRock++;
		tieBreaker = 0;
	}
	if (userChoice == 5 && compChoice == 2)
	{
		numCompPaper--;
		numHumPaper--;
		if (humPaperBreak)
		{
			messageOutput = "Round tied, but paper was used three times in a row and broke as a result.";
			logOutput = "Round " + roundNum + ": You chose paper against paper. Round was tied. Your paper broke.<br />" + logOutput;
		} else {
			logOutput = "Round " + roundNum + ": You chose paper against paper. Round was tied.<br />" + logOutput;
			messageOutput = "Round tied. Click next round to continue.";
		}
		numCompPaper++;
		numHumPaper++;
		tieBreaker++;
	}
	if (userChoice == 5 && compChoice == 3)
	{
		numCompScissors--;
		numHumPaper--;
		if (humPaperBreak)
		{
			messageOutput = "Round lost and paper was used three times in a row and broke as a result.";
			logOutput = "Round " + roundNum + ": You chose paper against scissors. Computer won the round. Your paper broke.<br />" + logOutput;
		} else {
			logOutput = "Round " + roundNum + ": You chose paper against scissors. Computer won the round.<br />" + logOutput;
			messageOutput = "Round lost. Click next round to continue.";
		}
		numCompPaper++;
		tieBreaker = 0;
	}
	if (userChoice == 6 && compChoice == 1)
	{
		numCompRock--;
		numHumScissors--;
		if (humScissorsBreak)
		{
			messageOutput = "Round lost and scissors were used three times in a row and broke as a result.";
			logOutput = "Round " + roundNum + ": You chose scissors against rock. Computer won the round. Your scissors broke.<br />" + logOutput;
		} else {
			logOutput = "Round " + roundNum + ": You chose scissors against rock. Computer won the round.<br />" + logOutput;
			messageOutput = "Round lost. Click next round to continue.";
		}
		numCompScissors++;
		tieBreaker = 0;
	}
	if (userChoice == 6 && compChoice == 2)
	{
		numCompPaper--;
		numHumScissors--;
		if (humScissorsBreak)
		{
			messageOutput = "Round won, but scissors were used three times in a row and broke as a result.";
			logOutput = "Round " + roundNum + ": You chose scissors against paper. You won the round. Your scissors broke.<br />" + logOutput;
		} else {
			logOutput = "Round " + roundNum + ": You chose scissors against paper. You won the round.<br />" + logOutput;
			messageOutput = "Round won. Click next round to continue.";
		}
		numHumPaper++;
		tieBreaker = 0;
	}
	if  (userChoice == 6 && compChoice == 3)
	{
		numCompScissors--;
		numHumScissors--;
		if (humScissorsBreak)
		{
			messageOutput = "Round tied, but scissors were used three times in a row and broke as a result.";
			logOutput = "Round " + roundNum + ": You chose scissors against scissors. Round was tied. Your scissors broke.<br />" + logOutput;
		} else {
			logOutput = "Round " + roundNum + ": You chose scissors against scissors. Round was tied.<br />" + logOutput;
			messageOutput = "Round tied. Click next round to continue.";
		}
		numCompScissors++;
		numHumScissors++;
		tieBreaker++;
	}
	if (humRockBreak)
	{
		numHumRock = 0;
	}
	if (humPaperBreak)
	{
		numHumPaper = 0;
	}
	if (humScissorsBreak)
	{
		numHumScissors = 0;
	}
	if (compRockBreak)
	{
		numCompRock = 0;
	}
	if (compPaperBreak)
	{
		numCompPaper = 0;
	}
	if (compScissorsBreak)
	{
		numCompScissors = 0;
	}
	if (tieBreaker == 3) // If there was a tie 3 times in a row, a random weapon will be removed from each player's side.
	{
		removeHumWeapon = parseInt((Math.random()* 3) + 1); // Chooses random weapon to remove
		removeCompWeapon = parseInt((Math.random()* 3) + 1);
		breakTie();
	} else {
		checkLoss();
	}
}

function breakTie()
{
	var removable = true;
	if (removeHumWeapon == 1 && !humRockBreak && numHumRock !== 0) // Checks if random weapon chosen can be removed.
	{
		numHumRock--;
		messageOutput = "A rock was removed from your side while a random weapon was removed from the computer's side due to three consecutive ties.";
		logOutput = "Round " + roundNum + ": Due to three consecutive ties, a rock was removed from your side.<br />" + logOutput;
	} else if (humRockBreak || numHumRock == 0) { 
		while (removeHumWeapon == 1) /* If the arsenal does not contain the weapon chosen to be removed or the weapon is broken, repeat until the random weapon 
		chosen can be removed from the arsenal. */
		{
			removable = false;
			removeHumWeapon = parseInt((Math.random()* 3) + 1);
		}
	}
	if (removeHumWeapon == 2 && !humPaperBreak && numHumPaper !== 0)
	{
		numHumPaper--;
		messageOutput = "A paper was removed from your side while a random weapon was removed from the computer's side due to three consecutive ties.";
		logOutput = "Round " + roundNum + ": Due to three consecutive ties, a paper was removed from your side.<br />" + logOutput;
	} else if (humPaperBreak || numHumPaper == 0) {
		while (removeHumWeapon == 2)
		{
			removable = false;
			removeHumWeapon = parseInt((Math.random()* 3) + 1);
		}
	}
	if (removeHumWeapon == 3 && !humScissorsBreak && numHumScissors !== 0)
	{
		numHumScissors--;
		messageOutput = "A scissor was removed from your side while a random weapon was removed from the computer's side due to three consecutive ties.";
		logOutput = "Round " + roundNum + ": Due to three consecutive ties, a scissor was removed from your side.<br />" + logOutput;
	} else if (humScissorsBreak || numHumScissors == 0) { 
		while (removeHumWeapon == 3)
		{
			removable = false;
			removeHumWeapon = parseInt((Math.random()* 3) + 1);
		}
	}
	if (removeCompWeapon == 1 && !compRockBreak && numCompRock !== 0) 
	{
		numCompRock--;
		logOutput = "Round " + roundNum + ": Due to three consecutive ties, a rock was removed from the computer's side.<br />" + logOutput;
	} else if (compRockBreak || numCompRock == 0) {
		while (removeCompWeapon == 1)
		{
			removable = false;
			removeCompWeapon = parseInt((Math.random()* 3) + 1);
		}
	}
	if (removeCompWeapon == 2 && !compPaperBreak && numCompPaper !== 0)
	{
		numCompPaper--;
		logOutput = "Round " + roundNum + ": Due to three consecutive ties, a paper was removed from the computer's side.<br />" + logOutput;
	} else if (compPaperBreak || numCompPaper == 0) {
		while (removeCompWeapon == 2)
		{
			removable = false;
			removeCompWeapon = parseInt((Math.random()* 3) + 1);
		}
	}
	if (removeCompWeapon == 3 && !compScissorsBreak && numCompScissors !== 0)
	{
		numCompScissors--;
		logOutput = "Round " + roundNum + ": Due to three consecutive ties, a scissor was removed from the computer's side.<br />" + logOutput;
	} else if (compScissorsBreak || numCompScissors == 0) {
		while (removeCompWeapon == 3)
		{
			removable = false;
			removeCompWeapon = parseInt((Math.random()* 3) + 1);
		}
	}
	if (!removable)
	{
		breakTie();
	} else {
		tieBreaker = 0; 
		checkLoss();
	}
} 

function checkLoss() 
{
	if ((numHumRock == 0 && numHumPaper == 0) || (numHumRock == 0 && numHumScissors == 0) || (numHumPaper == 0 && numHumScissors == 0) 
	|| (numHumRock + numHumPaper + numHumScissors == 0))
	{
		humanLoss = true; 
		messageOutput = "You lose. Click reset game to play again.";
		logOutput = "Round " + roundNum + ": You lose. Computer wins.<br />" + logOutput;
		numCompRock += numHumRock;
		numCompPaper += numHumPaper;
		numCompScissors += numHumScissors;
		numHumRock = 0;
		numHumPaper = 0;
		numHumScissors = 0;
	}
	if ((numCompRock == 0 && numCompPaper == 0) || (numCompRock == 0 && numCompScissors == 0) || (numCompPaper == 0 && numCompScissors == 0) 
	|| (numCompRock + numCompPaper + numCompScissors == 0))
	{
		computerLoss = true;
		messageOutput = "You win. Click reset game to play again.";
		logOutput = "Round " + roundNum + ": You win. Computer loses.<br />" + logOutput;
		numHumRock += numCompRock;
		numHumPaper += numCompPaper;
		numHumScissors += numCompScissors;
		numCompRock = 0;
		numCompPaper = 0;
		numCompScissors = 0;
	}
	display();
}
		
function newRound() 
{
	if (humanLoss || computerLoss) 
	{
		messageOutput = "Click reset game to play again.";
	} else if (!userInput) { // Checks if current round is completed and results are recorded.
		roundNum++;
		compBack.src = "images/question.png";
		blueBack.src = "images/blue background.png";							
		messageOutput = "Click on rock, paper or scissors below.";
		userInput = true; // Allows user to select an option again.
		compWeaponChoice();
	} else {
		messageOutput = "You haven't selected an option yet.";
	}
	display();
}

function reset()
{
	initialize();
	compBack.src = "images/question.png";
	blueBack.src = "images/blue background.png";
	messageOutput = "Click on rock, paper or scissors below.";
	display();
}

function display()
{
	computerRock.innerHTML = numCompRock;
	computerPaper.innerHTML = numCompPaper;
	computerScissors.innerHTML = numCompScissors;
	humanRock.innerHTML = numHumRock;
	humanPaper.innerHTML = numHumPaper;
	humanScissors.innerHTML = numHumScissors;
	logTracker.innerHTML = logOutput;
	messageTracker.innerHTML = messageOutput;
	roundTracker.innerHTML = roundNum;
}