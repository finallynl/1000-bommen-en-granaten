(function() {

    /*
    Define colors ****************************************
    Define colors ****************************************
    Define colors ****************************************
    Define colors ****************************************
    */

    const black         = ("rgb(000, 000, 000)");
    const white         = ("rgb(255, 255, 255");
    const lightBlue     = "radial-gradient(rgb(135, 206, 250), transparent 60%)";
    const red           = "radial-gradient(rgb(255, 0, 0), transparent 60%)";
    const gold          = "radial-gradient(rgb(255, 215, 0), transparent 60%)";

    /*
    Unlock players ****************************************
    Unlock players ****************************************
    Unlock players ****************************************
    Unlock players ****************************************
    */

    const unlockplayer_array = document.getElementsByClassName("js-unlockplayer");

    for(let i = 0; i < unlockplayer_array.length; i++) {
      unlockplayer_array[i].addEventListener('click', function() {
          unlockPlayer(this);
      });
    }

    function unlockPlayer(th) {

        /*
        Get: Player ID
        */
        const i = (th.dataset.id-1) // -1 omdat het een array is;

        /*
        Set: Random name
        */
        let pirateNames         = ["Zwartbaard", "Piet", "Aadje", "Sparrow", "Haddock"];
        let randomPirateName    = Math.floor(Math.random() * pirateNames.length);
        
        // (Re)name a player
        let namePlayer = document.getElementsByClassName("namePlayer")[i];
        let playerNameInput = document.getElementsByClassName("playerNameInput")[i].value;
        if (playerNameInput === "") {
            namePlayer.innerHTML = pirateNames[randomPirateName];
        } else {
            namePlayer.innerHTML = playerNameInput;
        };
        
        namePlayer.classList.remove("disabled");
        namePlayer.classList.add("bounceIn");
        setTimeout(() => {
            namePlayer.classList.remove("bounceIn");
        }, 2500);

        // Enable column and buttons
        let headerPlayer = document.getElementsByClassName("headerPlayer")[i];
        headerPlayer.classList.replace("disabled", "enabled");

        let scorePlayer = document.getElementsByClassName("scorePlayer")[i];
        scorePlayer.style.background = lightBlue ;
        scorePlayer.classList.replace("disabled", "enabled");
        
        let plus100 = document.getElementsByClassName("plus100")[i];
        let min100 = document.getElementsByClassName("min100")[i];
        let plus1000 = document.getElementsByClassName("plus1000")[i];
        let min1000 = document.getElementsByClassName("min1000")[i];
        let bonus = document.getElementsByClassName("bonus")[i];
        const allButtons = [scorePlayer, plus100, min100, plus1000, min1000, bonus];
        allButtons.forEach((button) => {
            button.removeAttribute('disabled');
            button.classList.add('enabled');
        });

        /*
        Change text on button
        */
        let newButtonTexts = ["Aaarghh!", "Yo ho ho!", "Enteren!", "Ahoy!"];

        let randomText = Math.floor(Math.random() * newButtonTexts.length);

        let joinedPlayer = document.getElementsByClassName("join")[i];
        joinedPlayer.innerHTML = newButtonTexts[randomText];

    };

    /*
    Players: Actions *******************************************
    Players: Actions *******************************************
    Players: Actions *******************************************
    Players: Actions *******************************************
    */ 

    function initPlayers() {

       const playeraction_array = document.getElementsByClassName("js-player-action");

       for(let i = 0; i < playeraction_array.length; i++) {
          playeraction_array[i].addEventListener('click', function() {
                
                /*
                Get: This
                */
                var _th             = this;

                /*
                Get: Player ID defined in data-id in HTML file
                */
                var _player_id      = (_th.closest('.player-container').dataset.id-1);

                /*
                Get: Action defined in HTML file in data attr action and do the action
                */
                changeScore(_player_id,Number(_th.dataset.action));

            });

        }

    }

    function changeScore(i, n) {

        resetButton.removeAttribute("disabled");
        let scorePlayer = document.getElementsByClassName("scorePlayer")[i];
        let currentScore = scorePlayer.valueAsNumber;
        let updatedScore = currentScore + n;
        scorePlayer.value = updatedScore;

        if (updatedScore >= 6000) {
            scorePlayer.style.background = gold;
        } else if (updatedScore >= 0 && updatedScore < 6000) {
            scorePlayer.style.background = lightBlue;
        } else if (updatedScore < 0) {
            scorePlayer.style.background = red;
        };
    }

    /*
    Rest niet naar gekeken ***********************************
    Rest niet naar gekeken ***********************************
    Rest niet naar gekeken ***********************************
    Rest niet naar gekeken ***********************************
    */ 

    // Reset button
    const resetButton = document.querySelector("#resetButton");
    resetButton.addEventListener('click', resetGame);

    function resetGame() {
        let allPlayers = document.querySelectorAll(".scorePlayer");
        allPlayers.forEach((scorePlayer) => {
            if (!scorePlayer.disabled) {
                scorePlayer.value = 0;
                scorePlayer.style.background = lightBlue;
            };
        });
        resetButton.setAttribute('disabled', true);
    };

    // Hide & reveal column 3 and 4
    let inputPlayer1 = document.getElementById("inputPlayer1");
    let inputPlayer2 = document.getElementById("inputPlayer2");
    let inputPlayer3 = document.getElementById("inputPlayer3");
    let inputPlayer4 = document.getElementById("inputPlayer4");

    let columnPlayer3 = document.getElementById("columnPlayer3");
    let columnPlayer4 = document.getElementById("columnPlayer4");

    let addPlayer3 = document.getElementById("addPlayer3");
    let addPlayer4 = document.getElementById("addPlayer4");

    let scorePlayer = document.querySelectorAll("input.scorePlayer");
    let h3 = document.querySelectorAll("h3");
    let p = document.querySelectorAll("p");

    let showInputContainer = document.getElementById("showInputContainer");
    let hideInputContainer = document.getElementById("hideInputContainer")

    // Starting point
    inputPlayer3.hidden = true;
    columnPlayer3.hidden = true;
    inputPlayer4.hidden = true;
    columnPlayer4.hidden = true;

    addPlayer4.hidden = true;
    showInputContainer.hidden = true;
    hideInputContainer.hidden = true;

    function revealPlayer3() {
        inputPlayer3.hidden = false;
        columnPlayer3.hidden = false;
        addPlayer3.hidden = true;
        addPlayer4.hidden = false;
        h3.forEach((el) => {
            el.classList.add("heading-fontsize-3players");
        });
        scorePlayer.forEach((score) => {
            score.classList.replace("score-fontsize-2players", "score-fontsize-3players");
        });
    };

    function revealPlayer4() {
        inputPlayer4.hidden = false;
        columnPlayer4.hidden = false;
        addPlayer4.hidden = true;
        hideInputContainer.hidden = false;
        h3.forEach((el) => {
            el.classList.replace("heading-fontsize-3players", "heading-fontsize-4players");
        });
        p.forEach((el) => {
            el.classList.add("heading-fontsize-4players");
        });
        scorePlayer.forEach((score) => {
            score.classList.replace("score-fontsize-3players", "score-fontsize-4players");
        });
    };

    addPlayer3.addEventListener('click', revealPlayer3);
    addPlayer4.addEventListener('click', revealPlayer4);

    // Hide & show all inputs
    showInputContainer.addEventListener('click', showAllInputs);
    hideInputContainer.addEventListener('click', hideAllInputs);

    function hideAllInputs() {
        inputPlayer1.hidden = true;
        inputPlayer2.hidden = true;
        inputPlayer3.hidden = true;
        inputPlayer4.hidden = true;
        showInputContainer.hidden = false;
        hideInputContainer.hidden = true;
    }

    function showAllInputs() {
        inputPlayer1.hidden = false;
        inputPlayer2.hidden = false;
        inputPlayer3.hidden = false;
        inputPlayer4.hidden = false;
        showInputContainer.hidden = true;
        hideInputContainer.hidden = false;
    }

    /*
    Init ********************************************
    Init ********************************************
    Init ********************************************
    Init ********************************************
    */
    initPlayers();

})();