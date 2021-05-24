// Speech Recognitionwindow.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;window.SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;window['grammar'] = '#JSGF V1.0; grammar colors; public <color> = a1 | a2 | a3 | a4 | a5 | a6 | a7 | a8 | ' +                                                                  'b1 | b2 | b3 | b4 | b5 | b6 | b7 | b8 | ' +                                                                 'c1 | c2 | c3 | c4 | c5 | c6 | c7 | c8 | ' +                                                                 'd1 | d2 | d3 | d4 | d5 | d6 | d7 | d8 | ' +                                                                 'e1 | e2 | e3 | e4 | e5 | e6 | e7 | e8 | ' +                                                                 'f1 | f2 | f3 | f4 | f5 | f6 | f7 | f8 | ' +                                                                 'g1 | g2 | g3 | g4 | g5 | g6 | g7 | g8 | ' +                                                                 'h1 | h2 | h3 | h4 | h5 | h6 | h7 | h8 | ' +                                                                 'cavalo | bispo | rei | dama | rainha | ' +                                                                 'torre | por | roque | grande | ' +                                                                 'a | b | c | d | e | f | g | h | ' +                                                                  '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ;'window['recognition'] = new SpeechRecognition();window['speechRecognitionList'] = new SpeechGrammarList();speechRecognitionList.addFromString(grammar, 1);recognition.grammars = speechRecognitionList;recognition.continuous = false;recognition.lang = 'pt-BR';recognition.interimResults = false;recognition.maxAlternatives = 1;recognition.onresult = function(e) {        var text = Array.from(e.results)      .map((result) => result[0])      .map((result) => result.transcript)      .join("");          if (e.results[0].isFinal) {            console.log("Original: " + text);                text = text.toLowerCase();            // ativar voz para lances do adversário        if (text.includes("deficiente visual")) {            window['deficienteVisual'] = true;            var deficienteVisualMessage = "Modo para Deficiencia Visual Ativado!"            speech.text = deficienteVisualMessage;            window.speechSynthesis.speak(speech);        }        else if (text.includes("desativar")) {            enableDisableFreedomMode();        }        else if ((text.includes("confirmar")) && (pageType == "daily")) {            document.querySelector('.ui_v5-button-component.ui_v5-button-primary').click();        }        else if ((text.includes("cancelar")) && (pageType == "daily")) {            document.querySelector('.ui_v5-button-component.ui_v5-button-basic').click();        }        else if ((text.includes("dama")) && (window['promotionQueen'] != null)) {            window['promotionQueen'].click();        }        else if ((text.includes("bispo")) && (window['promotionBishop'] != null)) {            window['promotionBishop'].click();        }        else if ((text.includes("cavalo")) && (window['promotionKnight'] != null)) {            window['promotionKnight'].click();        }        else if ((text.includes("torre")) && (window['promotionRook'] != null)) {            window['promotionRook'].click();        }        else if ((text.includes("cancelar")) && (document.querySelector('.promotion-window'))) {            console.log("Cancelaaaaar");            chess.undo();            console.log(document.querySelector('.close-button'));            document.querySelector('.close-button').click();        }                 else {                    // remove spaces if only square for pawn move            if (text.length <= 3) {                text = text.replace(/ +/g, "");            }                        // Roque            text = text.replace(/rock/, "roque");                        // replace for column C            text = text.replace(/cavalos e /i, "cavalo c ");            text = text.replace(/torres e /i, "torre c ");            text = text.replace(/bispos e /i, "bispo c ");            text = text.replace(/damas e /i, "dama c ");            text = text.replace(/rainhas e /i, "dama c ");            text = text.replace(/reis e /i, "rei c ");            text = text.replace(/61/, "c1");            text = text.replace(/62/, "c2");            text = text.replace(/63/, "c3");            text = text.replace(/64/, "c4");            text = text.replace(/65/, "c5");            text = text.replace(/66/, "c6");            text = text.replace(/67/, "c7");            text = text.replace(/68/, "c8");                        // replace for column D            text = text.replace(/ de /, " d ");            text = text.replace(/depor /, "d por ");            text = text.replace(/depois /, "d por ");                        // replace for column F            text = text.replace(/cavalete/, "cavalo f");                        // replace for column B            text = text.replace(/^bê/, "b");                        // replace for column C            text = text.replace(/^se /, "c ");                        // replace for column H            text = text.replace(/agapor /, "h por ");                        // replace Rainha for Dama            text = text.replace(/rainha /i, "dama ");            text = text.replace(/deu uma /i, "dama ");                        // replace hey for Rei            text = text.replace(/hey /i, "rei ");                        // replace hey for Bispo            text = text.replace(/disco /i, "bispo ");                        // replace text for numbers            text = text.replace(/ um/, "1");            text = text.replace(/ dois/, "2");            text = text.replace(/ três/, "3");            text = text.replace(/ quatro/, "4");            text = text.replace(/ cinco/, "5");            text = text.replace(/ seis/, "6");            text = text.replace(/ sete/, "7");            text = text.replace(/ oito/, "8");                                    // remove space between column and row            if (text.match(/[a-zA-Z]+\s\d/g)) {                let myRegexp = /[a-zA-Z]+\s\d/g;                let match = myRegexp.exec(text);                let alteredText = match[0].replace(/\s+/g, "");                text = text.replace(match[0], alteredText);            }                        // remove - between column and row            if (text.match(/[a-zA-Z]+\-\d/g)) {                let myRegexp = /[a-zA-Z]+\-\d/g;                let match = myRegexp.exec(text);                let alteredText = match[0].replace(/\-/g, "");                text = text.replace(match[0], alteredText);            }                        console.log("Modificado: " + text);                        var legalMovesIfWhitesTurn = chessWhite.moves();            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/N/, 'Cavalo ');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/R/, 'Torre ');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/K/, 'Rei ');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/Q/, 'Dama ');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/B/, 'Bispo ');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/x/, ' por ');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/O-O-O/, 'Grande roque');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/O-O/, 'Roque');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/#/, '');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/=/, ' ');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/\+/g, '');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.replace(/  +/g, ' ');});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.trim();});            legalMovesIfWhitesTurn = legalMovesIfWhitesTurn.map(function(x){return x.toLowerCase();});                        var legalMovesIfBlacksTurn = chessBlack.moves();            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/N/, 'Cavalo ');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/R/, 'Torre ');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/K/, 'Rei ');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/Q/, 'Dama ');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/B/, 'Bispo ');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/x/, ' por ');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/O-O-O/, 'Grande roque');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/O-O/, 'Roque');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/#/, '');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/=/, ' ');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/\+/g, '');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.replace(/  +/g, ' ');});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.trim();});            legalMovesIfBlacksTurn = legalMovesIfBlacksTurn.map(function(x){return x.toLowerCase();});                        var bestMoveForWhite = "";            var bestMoveForBlack = "";            var similarityReferenceForWhite = [0, 0];            var similarityReferenceForBlack = [0, 0];            var bestIndexForWhite = -1;            var bestIndexForBlack = -1;                        var levenshteinScoresArrayForWhite = []            var jaroWrinkerScoresArrayForWhite = [];            var passedMatchTestsForWhite = 0;                        var levenshteinScoresArrayForBlack = []            var jaroWrinkerScoresArrayForBlack = [];            var passedMatchTestsForBlack = 0;                        for (var move in legalMovesIfWhitesTurn) {                levenshteinScoresArrayForWhite.push(similarity(text, legalMovesIfWhitesTurn[move]));                jaroWrinkerScoresArrayForWhite.push(JaroWrinker(text, legalMovesIfWhitesTurn[move]));              }                        for (var move in legalMovesIfBlacksTurn) {                levenshteinScoresArrayForBlack.push(similarity(text, legalMovesIfBlacksTurn[move]));                jaroWrinkerScoresArrayForBlack.push(JaroWrinker(text, legalMovesIfBlacksTurn[move]));              }                                    // to be the chosen move:                 // a) has to be the winner in all 2 metrics                 // b) one of the metrics needs to be higher than 0.9                 // c) the average of the three metrics must be highr than 0.6                         var winnerIndexForLevenshteinForWhite = -1;            var winnerIndexForJaroWrinkerForWhite = -1;                        var winnerIndexForLevenshteinForBlack = -1;            var winnerIndexForJaroWrinkerForBlack = -1;                        for (var index in legalMovesIfWhitesTurn) {                if ((levenshteinScoresArrayForWhite[index] > similarityReferenceForWhite[0])) {                    winnerIndexForLevenshteinForWhite = index;                    similarityReferenceForWhite[0] = levenshteinScoresArrayForWhite[index];                }                if ((jaroWrinkerScoresArrayForWhite[index] > similarityReferenceForWhite[1])) {                    winnerIndexForJaroWrinkerForWhite = index;                    similarityReferenceForWhite[1] = jaroWrinkerScoresArrayForWhite[index];                }            }                        for (var index in legalMovesIfBlacksTurn) {                if ((levenshteinScoresArrayForBlack[index] > similarityReferenceForBlack[0])) {                    winnerIndexForLevenshteinForBlack = index;                    similarityReferenceForBlack[0] = levenshteinScoresArrayForBlack[index];                }                if ((jaroWrinkerScoresArrayForBlack[index] > similarityReferenceForBlack[1])) {                    winnerIndexForJaroWrinkerForBlack = index;                    similarityReferenceForBlack[1] = jaroWrinkerScoresArrayForBlack[index];                }            }                        if (winnerIndexForLevenshteinForWhite == winnerIndexForJaroWrinkerForWhite) {                 if ( (levenshteinScoresArrayForWhite[winnerIndexForLevenshteinForWhite] >= 0.9) ||                      (jaroWrinkerScoresArrayForWhite[winnerIndexForJaroWrinkerForWhite] >= 0.9) ) {                                        passedMatchTestsForWhite = 1;                    var bestIndexForWhite = winnerIndexForLevenshteinForWhite;                 }                        }            if (winnerIndexForLevenshteinForBlack == winnerIndexForJaroWrinkerForBlack) {                 if ( (levenshteinScoresArrayForBlack[winnerIndexForLevenshteinForBlack] >= 0.9) ||                      (jaroWrinkerScoresArrayForBlack[winnerIndexForJaroWrinkerForBlack] >= 0.9) ) {                                    passedMatchTestsForBlack = 1;                    var bestIndexForBlack = winnerIndexForLevenshteinForBlack;                }            }                        if (text.split(' ').length == 1) {                if (text.length > 2) {                    passedMatchTestsForWhite = 0;                    passedMatchTestsForBlack = 0;                }            }                        /*            if ( (winnerIndexForLevenshteinForWhite == winnerIndexForCosineForWhite) && (winnerIndexForCosineForWhite == winnerIndexForJaroWrinkerForWhite) ) {                 // get maximum and average                var total = 0;                var maximum = 0;                for(var i = 0; i < similarityReferenceForWhite.length; i++) {                    total += similarityReferenceForWhite[i];                    if (similarityReferenceForWhite[i] > maximum) {                        maximum = similarityReferenceForWhite[i];                    }                }                console.log(maximum);                var avgWhite = total / similarityReferenceForWhite.length;                if ( ((avgWhite > 0.6) && (maximum > 0.9)) || (maximum >= 0.95) ) {                    passedMatchTestsForWhite = 1;                    var bestIndexForWhite = winnerIndexForLevenshteinForWhite;                }            }                        if ( (winnerIndexForLevenshteinForBlack == winnerIndexForCosineForBlack) && (winnerIndexForCosineForBlack == winnerIndexForJaroWrinkerForBlack) ) {                 // get maximum and average                var total = 0;                var maximum = 0;                for(var i = 0; i < similarityReferenceForBlack.length; i++) {                    total += similarityReferenceForBlack[i];                    if (similarityReferenceForBlack[i] > maximum) {                        maximum = similarityReferenceForBlack[i];                    }                }                console.log(maximum);                var avgBlack = total / similarityReferenceForBlack.length;                if ( ((avgBlack > 0.6) && (maximum > 0.9)) || (maximum >= 0.95) ) {                    passedMatchTestsForBlack = 1;                    var bestIndexForBlack = winnerIndexForLevenshteinForBlack;                }            } */                        if (passedMatchTestsForWhite == 1) {                legalMovesForWhite = chessWhite.moves();                var chosenMoveWhite = legalMovesForWhite[bestIndexForWhite];                    console.log(chosenMoveWhite, levenshteinScoresArrayForWhite[bestIndexForWhite], jaroWrinkerScoresArrayForWhite[bestIndexForWhite]);                chessWhite.move(chosenMoveWhite);                var movesHistory = chessWhite.history({ verbose: true });                var lastHistoryMove = movesHistory[movesHistory.length -1];                var source = lastHistoryMove.from;                var destination = lastHistoryMove.to;                chessWhite.undo();                makeMove(source, destination);;             }            else if (passedMatchTestsForBlack == 1) {                legalMovesForBlack = chessBlack.moves();                var chosenMoveBlack = legalMovesForBlack[bestIndexForBlack];                    console.log(chosenMoveBlack, levenshteinScoresArrayForBlack[bestIndexForBlack], jaroWrinkerScoresArrayForBlack[bestIndexForBlack]);                chessBlack.move(chosenMoveBlack);                var movesHistory = chessBlack.history({ verbose: true });                var lastHistoryMove = movesHistory[movesHistory.length -1];                var source = lastHistoryMove.from;                var destination = lastHistoryMove.to;                chessBlack.undo();                makeMove(source, destination);;             }            else {                console.log("Não passou");                console.log(legalMovesIfWhitesTurn);                console.log(similarityReferenceForWhite);                console.log(legalMovesIfBlacksTurn);                console.log(similarityReferenceForBlack);                                // force callback to make sure position os being read correctly                            window["callback"]();                   // play beep sound                // Play beep                //let context = new (window.AudioContext || window.webkitAudioContext)();                //var osc = context.createOscillator(); // instantiate an oscillator                //osc.type = 'sine'; // this is the default - also square, sawtooth, triangle                //osc.frequency.value = 440; // Hz                //osc.connect(context.destination); // connect it to the destination                //osc.start(); // start the oscillator                // osc.stop(context.currentTime + 0.5); // stop 2 seconds after the current time            }        }     }};recognition.onend = function () {    if (freedomEnabled == true) {        recognition.start();    }    else {        recognition.stop();    }};