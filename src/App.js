import React from "react";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import logo from "./logo.png";

/*MIT License

Copyright (c) 2021 Mahfujur Rahman Shawon
Author - Mahfujur Rahman Shawon
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function App() {
  const [crossTitle, setCrossTitle] = useState("New Criss-Cross Puzzle");
  const [crossWords, setCrossWords] = useState("");
  // state variables for hidden message puzzle
  const [hiddenTitle, setHideenTitle] = useState("");
  const [hiddenMessage, setHiddenMessage] = useState("");
  const [hiddenSearchWords, setHiddenSearchWords] = useState("");
  // state variables for word-search puzzle
  const [searchTitle, setSearchTitle] = useState("New Word Search Puzzle");
  const [letterAcross, setAcross] = useState(15);
  const [letterDown, setDown] = useState(15);
  const [searchOption, setSearchOption] = useState(2);
  const [caseOption, setCaseOption] = useState(1);
  const [searchWords, setSearchWords] = useState("Enter puzzle words or clues");
  // state variables for double puzzle
  const [doubleTitle, setDoubleTitle] = useState("New Double Puzzle");
  const [doubleWords, setDoubleWords] = useState("");
  const [finalWord, setFinalWord] = useState("Enter Final Word or Phrase");
  const [doubleOption, setDoubeOption] = useState(2);
  // state variables for fallen phrase puzzle
  const [fallenTitle, setFallenTitle] = useState("New Fallen Phrase Puzzle");
  const [fallenWords, setFallenWords] = useState("");
  const [fallenClueNo, setFallenClueNo] = useState(10);
  // state variables for cryptogram puzzle
  const [cryptoTitle, setCryptoTitle] = useState("New Cryptogram Puzzle");
  const [cryptoPhrase, setCryptoPhrase] = useState("");
  const [cryptoOption, setCryptoOption] = useState(1);
  const [cryptoClues, setCryptoClues] = useState("");
  // state variables for letter tiles puzzle
  const [letterTitle, setLetterTitle] = useState("New Letter Tiles Puzzle");
  const [letterPhrase, setLetterPhrase] = useState("");
  const [numberOfLetter, setNumberOfLetter] = useState(3);
  const [showLetterAnswerArea, setShowLetterAnswerArea] = useState(true);
  // state variables for math square puzzle
  const [mathTitle, setMathTitle] = useState("New Math Squares Title");
  const [squireSize, setSquireSize] = useState(3);
  const [mathClueNo, setMathClueNo] = useState(2);
  const [opAddition, setOpAddition] = useState(true);
  const [opSubtraction, setOpSubtraction] = useState(true);
  const [opMultiiplication, setOpMultiiplication] = useState(true);
  const [opDivision, setOpDivision] = useState(true);
  const [upperNumber, setUpperNumber] = useState(9);
  // state variables for number block puzzle
  const [numberBlocksTitle, setNumberBlocksTitle] = useState(
    "New Number Blocks Title"
  );
  const [blockSize, setBlockSize] = useState(4);
  const [minNumber, setMinNumber] = useState(0);
  const [maxNumber, setMaxNumber] = useState(5);
  const [numberBlockClueNo, setNumberBlockClueNo] = useState(2);

  const [putInstructions, setPutInstructions] = useState(true);

  const currentPuzzle = useRef(null);
  const currentSettings = useRef("");
  const cryptoPhraseNoSpace = useRef("");
  const searchGrid = useRef([]);
  const crosslines = useRef([]);
  const hiddenAnswerPoints = useRef([]);

  var grid = [];
  var crossline = { x1: 0, y1: 0, x2: 0, y2: 0 };
  var grid_size = 30;
  var search_grid_size = 15;
  var grid_end = grid_size - 1;
  var grid_start = 0;
  var wordPlaced = [];
  var direction = ["across", "down"];
  var horizontalPoints = [];
  var verticalPoints = [];
  var hints = [];
  var wordsOriginal = [];
  var fallenPhrase = [];
  var strippedFallenPhrase = [];
  var fallenClueLetters = [];
  var scrambledLetterGroup = [];
  var letterGroup = [];
  var downCount = 0;
  var cellXY = [];
  var cellYX = [];
  var acrossNums = [];
  var downNums = [];
  var crossInstructiions =
    "<h4>Instructions</h4><p>Use the clues to fill in the words below. Words can go across or down. Letters are shared when the words intersect.</p>";
  var searchInstructions = "";
  var hiddenInstructions =
    "<h4>This puzzle is a word search puzzle that has a hidden message in it.</h4><p>First find all the words in the list.</p><p>Words can go in any direction and share letters as well as cross over each other.</p><p>Once you find all the words. Copy the unused letters starting in the top left corner into the blanks to reveal the hidden message.</P>";
  var doubleInstructions =
    "<h4>Solve the anagrams to reveal the letters for the final message</h4><p>Solve the anagrams in the top part of the puzzle.</p><p>Use the circled letters from the words in the top part to complete the final word or phrase at the bottom.</p><p>Each circled letter is used just once.</p><p>In case of numbered option, take the numbered letters and put them in the final phrase in their corresponding numbered cells</p>";
  var fallenInstructions =
    "<h4>Instructions</h4><p>The letters from each cell are below the puzzle. Try to rebuild the original message by choosing the letters for each cell.</p>";
  var mathInstructions =
    "<h4>Instructions</h4> <h5>Fill in the missing numbers</h5><p> The missing values are the whole numbers between 1 and " +
    upperNumber +
    ". </p><p> Each number is only used once.</p><p> Each row is a math equation.</p><p> Each column is a math equation.</p><p> Remember that multiplication and division are performed before addition and subtraction.</p>";
  var letterInstructions =
    "<h4>Unscramble the tiles to reveal a message.</h4><p>Each tile is used only once.</p><p>Use spacing, puncuation and common words to find adjacent tiles.</p><p>Some words may be split into two lines.</p>";
  var numberBlockInstructions =
    "<h4>Fill in the missing numbers</h4><p>The missing numbers are integers between 0 and 5.</p><p>The numbers in each row add up to totals to the right.</p><p>The numbers in each column add up to the totals along the bottom.</p><p>The diagonal lines also add up the totals to the right.</p>";
  var cryptoInstructions =
    "<h4>Decode the message.</h4><p>Each letter in the phrase has been replaced with a random letter or number.</p><p>Try to decode the message.</p>";
  var words = [
    "elephant",
    "tiger",
    "lion",
    "cat",
    "zebra",
    "penguin",
    "rhino",
    "monkey",
    "leopard",
    "kangaroo",
    "bird",
    "giraff",
    "bison",
    "dinosaur",
    "chitah",
    "python",
    "snake",

    "redemption",
    "school",
    "forrest",
    "remember",
    "private",
    "knight",
    "father",
    "fiction",
    "fight",
    "beautiful",
    "history",
    "story",
    "future",
    "lost",
  ];

  // one time hook to set word search puzzle the default opened puzzle
  // this hook is called when the page loads
  useEffect(() => {
    prepareSettings("search-settings");
    currentPuzzle.current = "search";
  }, []);

  // hides puzzle answer and shows the puzzle back
  function resetCanvas() {
    document.getElementById("answer-canvas").style.visibility = "hidden";
    document.getElementById("puzzle-canvas").style.visibility = "visible";
    document.getElementById("btnAnswer").innerText = "SHOW ANSWER";
  }

  // sends puzzle to printer
  function printPuzzle() {
    var dataUrl = document.getElementById("puzzle-canvas").toDataURL(); //attempt to save base64 string to server using this var
    var windowContent = "";
    windowContent += "<h1>Print Puzzle</h1>";
    windowContent += document.getElementById("puzzle-instructions").innerHTML;
    windowContent += '<img src="' + dataUrl + '">';
    printElement(null, true, windowContent);
    window.print();
    var printSection = document.getElementById("printSection");
    printSection.innerHTML = "";
  }
  // print helper function
  function printElement(elem, append, delimiter) {
    var printSection = document.getElementById("printSection");
    if (!printSection) {
      printSection = document.createElement("div");
      printSection.id = "printSection";
      document.getElementById("app").appendChild(printSection);
    }
    if (append !== true) {
      printSection.innerHTML = "";
    } else if (append === true) {
      if (typeof delimiter === "string") {
        printSection.innerHTML += delimiter;
      } else if (typeof delimiter === "object") {
        printSection.appendChild(delimiter);
      }
    }
  }
  // helper function to copy puzzle
  function SelectText(element) {
    var doc = document;
    if (doc.body.createTextRange) {
      var range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      var selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  // canvas copier function
  function writeClipCanvas(id) {
    var canvas = document.getElementById(id);
    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    var div = document.createElement("div");
    div.contentEditable = true;
    div.appendChild(img);
    document.body.appendChild(div);
    // do copy
    SelectText(div);
    document.execCommand("Copy");
    document.body.removeChild(div);
  }

  // this function prepares div which contains the puzzle canvas and
  // other buttons and instructions
  // and calls the puzzle making function sent in the puzzle parameter
  function preparePuzzle(instructions, clues, puzzle) {
    // display necessary settings button and instruction divs
    document.getElementById("puzzle-operations").style.display = "block";
    document.getElementById("puzzle-instructions").style.display = "block";
    document.getElementById("puzzle-instructions").innerHTML = "";
    document.getElementById("puzzle-instructions").innerHTML += instructions;
    // make the puzzle user clicked for.
    if (puzzle === "search") {
      makeWordSearch();
      return;
    }
    if (puzzle === "hidden") {
      makeHiddenMessage();
      return;
    }
    if (puzzle === "crypto") {
      makeCryptogram();
      return;
    }
    // a little bit of work needed for the cross-word puzzle instructions because you never know which
    // words will be across and which will be down.
    if (puzzle === "cross") {
      var clueDiv = document.getElementById("puzzle-clues");
      clueDiv.innerHTML = "";
      var para = document.createElement("P"); // Create a <p> element
      para.innerText = "Across"; // Insert text
      para.setAttribute("class", "pmedium");
      clueDiv.appendChild(para); // Append <p> to <body>
      var dv = document.createElement("DIV");
      dv.setAttribute("id", "across");
      clueDiv.appendChild(dv);
      para = document.createElement("P");
      para.innerText = "Down"; // Insert text
      para.setAttribute("class", "pmedium");
      clueDiv.appendChild(para);
      dv = document.createElement("DIV");
      dv.setAttribute("id", "down");
      clueDiv.appendChild(dv);
      wordPlaced = [];
      downCount = 0;
      while (downCount !== words.length / 2) {
        wordPlaced = [];
        while (wordPlaced.length !== words.length) {
          makeCrossWords();
        }
      }
      var a = document.getElementById("puzzle-canvas").offsetHeight;
      a += document.getElementById("puzzle-instructions").offsetHeight;
      a += document.getElementById("puzzle-operations").offsetHeight;
      a += 100;
      document.getElementById("puzzle-clues").style.top = a.toString() + "px";
      document.getElementById("puzzle-clues").style.display = "block";
      return;
    }
    if (puzzle === "double") {
      makeDoublePuzzle();
      return;
    }
    if (puzzle === "fallen") {
      makeFallenPuzzle();
      return;
    }
    if (puzzle === "math") {
      makeMathPuzzle();
      return;
    }
    if (puzzle === "letter") {
      makeLetterPuzzle();
      return;
    }
    if (puzzle === "number") {
      makeNumberBlockPuzzle();
      return;
    }
  }

  // this function shows the settings window where user can set parameters
  // to create the puzzle of their choice.
  // But before that it resets the canvas and other stuff.
  function prepareSettings(puzzleSettings) {
    document.getElementById("puzzle-operations").style.display = "none";
    document.getElementById("puzzle-instructions").style.display = "none";
    document.getElementById("puzzle-clues").style.display = "none";
    document.getElementById("answer-canvas").style.visibility = "hidden";
    if (currentSettings.current !== "")
      document.getElementById(currentSettings.current).style.display = "none";
    document.getElementById(puzzleSettings).style.display = "block";
    currentSettings.current = puzzleSettings;
  }

  // this function clear the two canvases for showing a new puzzle
  function clearCanvas() {
    var btnPuzzle = document.getElementById("btnReload");
    btnPuzzle.innerHTML = "RELOAD PUZZLE";
    var btnAnswer = document.getElementById("btnAnswer");
    btnAnswer.innerHTML = "SHOW ANSWER";
    var canvas = document.getElementById("answer-canvas");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("puzzle-canvas");
    var ctx2 = canvas2.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  }

  // remove duplicate characters from a string
  function removeDuplicateCharacters(string) {
    return string
      .split("")
      .filter(function (item, pos, self) {
        return self.indexOf(item) === pos;
      })
      .join("");
  }
  // shuffles s string
  String.prototype.shuffle = function () {
    var a = this.split(""),
      n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  };
  // a custom html5 canvas text wrapper function
  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(" ");
    var line = "";
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  // custom random integer functions
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // function to remove punctuation marks and replace them with a single space
  function removePunctuations(str) {
    const punctuationless = str.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    return punctuationless;
  }
  // function to remove space from a string
  function removeSpace(str) {
    const noSpace = str.replace(/\s+/g, "");
    return noSpace;
  }
  // reverses a string
  function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
      newString += str[i];
    }
    return newString;
  }
  // repeat a given string number of times and return the output
  function repeatStringNumTimes(string, times) {
    var repeatedString = "";
    while (times > 0) {
      repeatedString += string;
      times--;
    }
    return repeatedString;
  }
  // checks if character is a letter
  function isCharacterALetter(char) {
    return /[a-zA-Z]/.test(char);
  }
  /*********Word Search Puzzle Code Starts Here */
  /*
  1. processSearchWords()
  2. makeWordSearch()
  3. showSearchAnswer()
  */
  function processSearchWords() {
    // get textarea data
    var area = document.getElementById("search-words");
    // strip extra places, trim extra spaces from begin and start and then split the text by single words
    var wrds = area.value.replace(/\s+/g, " ").trim().split(" ");
    if (wrds.length < 10) {
      alert("Give at least 10 words");
      return false;
    }
    // store refined text in state variable
    setSearchWords(area.value.replace(/\s+/g, " ").trim());
    return true;
  }
  const makeWordSearch = () => {
    // get 2d canvas context first
    var canvas = document.getElementById("puzzle-canvas");
    var ctx = canvas.getContext("2d");
    // set drawing styles
    ctx.lineWidth = 2;
    ctx.font = "14px verdana";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // change case of the words according to what user selected
    if (caseOption === 1) {
      var puzzle_words = searchWords.toUpperCase().split(" ");
    }
    if (caseOption === 2) {
      puzzle_words = searchWords.split(" ");
    }
    if (caseOption === 3) {
      puzzle_words = searchWords.toLowerCase().split(" ");
    }

    // set the grid size from user input - row = column
    search_grid_size = letterAcross;

    const R = letterAcross,
      C = letterDown;
    const val = "_";
    // set the cell size
    const cellSize = 20;
    // empty the searchGrid
    searchGrid.current = [];
    // initialize the grid with "_"
    for (var i = 0; i < R; i++) {
      searchGrid.current[i] = [];
      for (var j = 0; j < C; j++) {
        searchGrid.current[i][j] = val;
      }
    }
    crosslines.current = []; // clear cross-out data
    // define orientations
    var orientations = ["leftright", "updown", "diagonalup", "diagonaldown"];

    // global loop for placing the words on puzzle
    for (var n = 0; n < puzzle_words.length; n++) {
      var word = puzzle_words[n];
      var word_length = puzzle_words[n].length;
      var placed = false;
      while (!placed) {
        // get random orientations
        var orientation =
          orientations[Math.floor(Math.random() * orientations.length)];
        // select the step values according to orientations
        // step values determine which direction a word will spread
        if (orientation === "leftright") {
          var step_x = 1;
          var step_y = 0;
        }
        if (orientation === "updown") {
          step_x = 0;
          step_y = 1;
        }
        if (orientation === "diagonalup") {
          step_x = 1;
          step_y = -1;
        }
        if (orientation === "diagonaldown") {
          step_x = 1;
          step_y = 1;
        }
        //these will be the direction choices and what happens with eacth . . .
        // make sure this is still in the while loop!
        // here we are just choosing a starting point for the word . . .
        var x_position = randomIntFromInterval(0, search_grid_size - 1);
        var y_position = randomIntFromInterval(0, search_grid_size - 1);
        // now we have to figure out if we can fit the word at this position
        var ending_x = x_position + word_length * step_x;
        var ending_y = y_position + word_length * step_y;
        if (ending_x < 0 || ending_x >= search_grid_size) continue;
        if (ending_y < 0 || ending_y >= search_grid_size) continue;
        // if we fall outside the dimensions of the grid in either direction
        // then we should restart the check . . . choose a new orientation and try again
        // otherwise, lets place the word
        // again checking with a boolean value
        var failed = false;
        // We do two things here
        // this first for loop determines whether or not we can realistically
        // place the word here. If every letter in the word has a free space
        // on the grid (denoted by the underscore), then we can use this setup
        // If it fails that test, we break out this for loop and continue on the bigger
        // while loop (choose a new orientation)
        for (i = 0; i < word_length; i++) {
          var character = word[i];
          var new_position_x = x_position + i * step_x;
          var new_position_y = y_position + i * step_y;
          var character_at_new_position =
            searchGrid.current[new_position_x][new_position_y];
          if (character_at_new_position !== "_") {
            if (character_at_new_position === character) continue;
            else {
              failed = true;
              break;
            }
          }
        }
        if (failed) continue;
        else {
          for (var k = 0; k < word_length; k++) {
            character = word[k];
            new_position_x = x_position + k * step_x;
            new_position_y = y_position + k * step_y;
            searchGrid.current[new_position_x][new_position_y] = character;
            ctx.fillText(
              searchGrid.current[new_position_x][new_position_y],
              new_position_x * cellSize + cellSize / 2,
              new_position_y * cellSize + cellSize / 2
            );
            // cross-out lines will be shown as answer to the puzzles
            // store the cross-out line's starting coordinates
            if (k === 0) {
              crossline.x1 = new_position_x * cellSize + cellSize / 2;
              crossline.y1 = new_position_y * cellSize + cellSize / 2;
            }
            // store the cross-out line's ending coordinates
            if (k === word_length - 1) {
              crossline.x2 = new_position_x * cellSize + cellSize / 2;
              crossline.y2 = new_position_y * cellSize + cellSize / 2;
            }
          }
          // save line coordinates to global ref
          crosslines.current.push({
            x1: crossline.x1,
            y1: crossline.y1,
            x2: crossline.x2,
            y2: crossline.y2,
          });
          placed = true;
        }
      }
    }

    // next populate the empty positions of the grid with random letters
    if (caseOption === 1) var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (caseOption === 2) randomChars = "AbCdEfGhIjKlMnOpQrStUvWxYz";
    if (caseOption === 3) randomChars = "abcdefghijklmnopqrstuvwxyz";
    for (var row = 0; row < search_grid_size; row++) {
      for (var col = 0; col < search_grid_size; col++) {
        if (searchGrid.current[row][col] === "_") {
          searchGrid.current[row][col] = randomChars.charAt(
            Math.floor(Math.random() * randomChars.length)
          );
          ctx.fillText(
            searchGrid.current[row][col],
            row * cellSize + cellSize / 2,
            col * cellSize + cellSize / 2
          );
        }
      }
    }

    // if reload or create puzzle clicked again, then reset the show answer button
    if (document.getElementById("btnAnswer").innerText === "HIDE ANSWER") {
      document.getElementById("btnAnswer").click();
    }

    // write the puzzle instructions below the puzzle
    var puzzle_words_string = "";
    for (var q = 0; q < puzzle_words.length; q++) {
      puzzle_words_string += puzzle_words[q] + "   ";
    }
    var maxWidth = 500;
    var lineHeight = 25;
    var x = 10;
    var y = search_grid_size * cellSize + 50;
    ctx.textAlign = "left";
    ctx.font = "20px verdana";
    ctx.fillText("Find the words below", x, y);
    ctx.font = "14px verdana";
    var helpString = "Words can go in any direction. \n";
    helpString += "Words can share letters as they cross over each other.";
    wrapText(ctx, helpString, x, y + 30, maxWidth, lineHeight);
    ctx.font = "16px verdana";
    wrapText(ctx, puzzle_words_string, x, y + 80, maxWidth, lineHeight);
  };

  // function to show answer of the word-search puzzle
  function showSearchAnswer() {
    // get context of the answer canvas and reset parameters
    var answerCanvas = document.getElementById("answer-canvas");
    var puzzleCanvas = document.getElementById("puzzle-canvas");
    var btnAnswer = document.getElementById("btnAnswer");
    if (btnAnswer.innerText === "SHOW ANSWER")
      puzzleCanvas.style.visibility = "hidden";
    else {
      document.getElementById("answer-canvas").style.visibility = "hidden";
      puzzleCanvas.style.visibility = "visible";
      btnAnswer.innerText = "SHOW ANSWER";
      return;
    }
    btnAnswer.innerText = "HIDE ANSWER";
    answerCanvas.style.visibility = "visible";
    var context = answerCanvas.getContext("2d");
    context.lineWidth = 2;
    context.font = "14px verdana";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "black";
    // clear canvas first
    context.clearRect(0, 0, answerCanvas.width, answerCanvas.height);
    // set the cell size
    const cellSize = 20;
    // print the puzzle first
    for (var row = 0; row < search_grid_size; row++) {
      for (var col = 0; col < search_grid_size; col++) {
        context.fillText(
          searchGrid.current[row][col],
          row * cellSize + cellSize / 2,
          col * cellSize + cellSize / 2
        );
      }
    }
    // now print the cross-out lines from previously stored line coordinates.
    //that's the answer.
    for (var i = 0; i < crosslines.current.length; i++) {
      context.beginPath();
      context.moveTo(crosslines.current[i].x1, crosslines.current[i].y1);
      context.lineTo(crosslines.current[i].x2, crosslines.current[i].y2);
      context.lineWidth = 1;
      context.strokeStyle = "#000000";
      context.stroke();
    }
    // print the instructions below the puzzle
    if (caseOption === 1)
      var puzzle_words = searchWords.toUpperCase().split(" ");
    if (caseOption === 2) puzzle_words = searchWords.split(" ");
    if (caseOption === 3) puzzle_words = searchWords.toLowerCase().split(" ");
    var puzzle_words_string = "";
    for (var q = 0; q < puzzle_words.length; q++) {
      puzzle_words_string += puzzle_words[q] + "   ";
    }
    var maxWidth = 500;
    var lineHeight = 25;
    var x = 10;
    var y = search_grid_size * cellSize + 50;
    context.textAlign = "left";
    context.font = "20px verdana";
    context.fillText("Find the words below", x, y);
    context.font = "14px verdana";
    var helpString = "Words can go in any direction. \n";
    helpString += "Words can share letters as they cross over each other.";
    wrapText(context, helpString, x, y + 30, maxWidth, lineHeight);
    context.font = "16px verdana";
    wrapText(context, puzzle_words_string, x, y + 80, maxWidth, lineHeight);
  }

  /*************** Hidden Message Puzzle Code Starts Here *******************/
  /*
  Hidden Message and Word Search Puzzles are almost same.
Functions that make this puzzle
1. processHiddenMessage()
2. makeHiddenMessage()
3. showHiddenAnswer()
*/
  // function to process hidden message input from the user
  function processHiddenMessage() {
    var message = hiddenMessage.replace(/\s+/g, " ").trim();
    if (message.length < 10) {
      alert("Give at least 10 letters in the hidden message");
      return false;
    }
    setHiddenMessage(message);
    var area = document.getElementById("hidden-search-words");
    var wrds = area.value.replace(/\s+/g, " ").trim().split(" ");
    if (wrds.length < 10) {
      alert("Give at least 10 words");
      return false;
    }
    setHiddenSearchWords(area.value.replace(/\s+/g, " ").trim());
    return true;
  }
  // function that makes Hidden Message Puzzle
  const makeHiddenMessage = () => {
    // get 2d drawing canvas context
    var canvas = document.getElementById("puzzle-canvas");
    var ctx = canvas.getContext("2d");
    // initialize the context
    ctx.lineWidth = 2;
    ctx.font = "14px verdana";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // change case of the search words according to user input
    if (caseOption === 1) {
      var puzzle_words = hiddenSearchWords.toUpperCase().split(" ");
    }
    if (caseOption === 2) {
      puzzle_words = hiddenSearchWords.split(" ");
    }
    if (caseOption === 3) {
      puzzle_words = hiddenSearchWords.toLowerCase().split(" ");
    }
    // initialize search grid size from user input
    search_grid_size = letterAcross;
    const R = letterAcross,
      C = letterDown;
    // initialize cell size
    const cellSize = 20;
    const val = "_";
    // empty search grid
    searchGrid.current = [];
    // fill the grid with "_"
    for (var i = 0; i < R; i++) {
      searchGrid.current[i] = [];
      for (var j = 0; j < C; j++) {
        searchGrid.current[i][j] = val;
      }
    }

    crosslines.current = []; // clear cross-out data
    // initialize the orientations
    var orientations = ["leftright", "updown", "diagonalup", "diagonaldown"];
    // global loop to place the search words on the canvas
    for (var n = 0; n < puzzle_words.length; n++) {
      var word = puzzle_words[n];
      var word_length = puzzle_words[n].length;
      var placed = false;
      var firstLine = false;
      while (!placed) {
        // get random orientation
        var orientation =
          orientations[Math.floor(Math.random() * orientations.length)];
        // set step direction based on orientation
        // step defines which direction the word will spread
        if (orientation === "leftright") {
          var step_x = 1;
          var step_y = 0;
        }
        if (orientation === "updown") {
          step_x = 0;
          step_y = 1;
        }
        if (orientation === "diagonalup") {
          step_x = 1;
          step_y = -1;
        }
        if (orientation === "diagonaldown") {
          step_x = 1;
          step_y = 1;
        }
        //these will be the direction choices and what happens with eacth . . .
        // make sure this is still in the while loop!
        // here we are just choosing a starting point for the word . . .
        var x_position = randomIntFromInterval(0, search_grid_size - 1);
        var y_position = randomIntFromInterval(0, search_grid_size - 1);
        if (x_position === 0 || y_position === 0) {
          firstLine = true;
        }
        if (!firstLine) continue;
        // now we have to figure out if we can fit the word at this position
        var ending_x = x_position + word_length * step_x;
        var ending_y = y_position + word_length * step_y;
        if (ending_x < 0 || ending_x >= search_grid_size) continue;
        if (ending_y < 0 || ending_y >= search_grid_size) continue;
        // if we fall outside the dimensions of the grid in either direction
        // then we should restart the check . . . choose a new orientation and try again
        // otherwise, lets place the word
        // again checking with a boolean value
        var failed = false;
        // We do two things here
        // this first for loop determines whether or not we can realistically
        // place the word here. If every letter in the word has a free space
        // on the grid (denoted by the underscore), then we can use this setup
        // If it fails that test, we break out this for loop and continue on the bigger
        // while loop (choose a new orientation)
        for (i = 0; i < word_length; i++) {
          var character = word[i];
          var new_position_x = x_position + i * step_x;
          var new_position_y = y_position + i * step_y;
          var character_at_new_position =
            searchGrid.current[new_position_x][new_position_y];
          if (character_at_new_position !== "_") {
            if (character_at_new_position === character) continue;
            else {
              failed = true;
              break;
            }
          }
        }
        if (failed) continue;
        else {
          for (var k = 0; k < word_length; k++) {
            character = word[k];
            new_position_x = x_position + k * step_x;
            new_position_y = y_position + k * step_y;
            searchGrid.current[new_position_x][new_position_y] = character;
            ctx.fillText(
              searchGrid.current[new_position_x][new_position_y],
              new_position_x * cellSize + cellSize / 2,
              new_position_y * cellSize + cellSize / 2
            );
            // cross-out lines are shown in the answer
            // calculate the starting coordinates of the line
            if (k === 0) {
              crossline.x1 = new_position_x * cellSize + cellSize / 2;
              crossline.y1 = new_position_y * cellSize + cellSize / 2;
            }
            // calculate the ending coordinate of the line
            if (k === word_length - 1) {
              crossline.x2 = new_position_x * cellSize + cellSize / 2;
              crossline.y2 = new_position_y * cellSize + cellSize / 2;
            }
          }
          // save the line to global array
          crosslines.current.push({
            x1: crossline.x1,
            y1: crossline.y1,
            x2: crossline.x2,
            y2: crossline.y2,
          });
          // word placed. go to next word in the array
          placed = true;
        }
      }
    }
    var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    // next populate the empty positions of the grid with random letters
    // befor that remove any unwanted puncutation marks from the phrase
    if (caseOption === 1) {
      var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var messageToPlace = hiddenMessage
        .replace(/\s/g, "")
        .toUpperCase()
        .replace(regex, "");
    }
    if (caseOption === 2) {
      randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .split("")
        .map((v) =>
          Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
        )
        .join("");
      messageToPlace = hiddenMessage
        .replace(/\s/g, "")
        .split("")
        .map((v) =>
          Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
        )
        .join("")
        .replace(regex, "");
    }
    if (caseOption === 3) {
      randomChars = "abcdefghijklmnopqrstuvwxyz";
      messageToPlace = hiddenMessage
        .replace(/\s/g, "")
        .toLowerCase()
        .replace(regex, "");
    }
    n = 0;
    // this is where hidden message letters' coordinates are saved for
    // showing the answer in future
    hiddenAnswerPoints.current = [];
    // write the hidden message starting from first row and first column
    // only the cell that has the letter "_" will get a letter from
    // the hidden message
    for (var row = 0; row < search_grid_size; row++) {
      for (var col = 0; col < search_grid_size; col++) {
        if (searchGrid.current[col][row] === "_") {
          if (n < messageToPlace.length) {
            // write the message letter to the grid
            searchGrid.current[col][row] = messageToPlace[n];
            // save the letter index for drawing circles around them when showing the answer
            hiddenAnswerPoints.current.push([col, row]);
            // write the message letter to the canvas
            ctx.fillText(
              searchGrid.current[col][row],
              col * cellSize + cellSize / 2,
              row * cellSize + cellSize / 2
            );
            n++;
          }
        }
      }
    }
    // this loop fills up the remaining cells with random letter
    for (row = 0; row < search_grid_size; row++) {
      for (col = 0; col < search_grid_size; col++) {
        if (searchGrid.current[col][row] === "_") {
          searchGrid.current[col][row] = randomChars.charAt(
            Math.floor(Math.random() * randomChars.length)
          );
          ctx.fillText(
            searchGrid.current[col][row],
            col * 20 + 20 / 2,
            row * 20 + 20 / 2
          );
        }
      }
    }
    // reset if puzzle reloads or recreated
    if (document.getElementById("btnAnswer").innerText === "HIDE ANSWER") {
      document.getElementById("btnAnswer").click();
    }

    // write the instruction bellow the puzzle
    var puzzle_words_string = "";
    for (var q = 0; q < puzzle_words.length; q++) {
      puzzle_words_string += puzzle_words[q] + "   ";
    }
    var maxWidth = 600;
    var lineHeight = 25;
    var x = 10;
    var y = search_grid_size * cellSize + 50;
    ctx.textAlign = "left";
    ctx.font = "20px verdana";
    wrapText(
      ctx,
      "Write the hidden message below after finding the words in the list",
      x,
      y,
      maxWidth,
      lineHeight
    );
    for (q = 0; q < hiddenMessage.length; q++) {
      if (isCharacterALetter(hiddenMessage[q]))
        ctx.fillText("_", x + q * 20, y + 60);
      else ctx.fillText(hiddenMessage[q], x + q * 20, y + 60);
    }
    ctx.font = "16px verdana";
    wrapText(ctx, puzzle_words_string, x, y + 100, maxWidth, lineHeight);
  };

  // function to show answer for Hidden Phrase puzzle
  function showHiddenAnswer() {
    // get the canvas handles and show/hide them as user wants
    var answerCanvas = document.getElementById("answer-canvas");
    var puzzleCanvas = document.getElementById("puzzle-canvas");
    var btnAnswer = document.getElementById("btnAnswer");
    if (btnAnswer.innerText === "SHOW ANSWER")
      puzzleCanvas.style.visibility = "hidden";
    else {
      document.getElementById("answer-canvas").style.visibility = "hidden";
      puzzleCanvas.style.visibility = "visible";
      btnAnswer.innerText = "SHOW ANSWER";
      return;
    }
    btnAnswer.innerText = "HIDE ANSWER";
    answerCanvas.style.visibility = "visible";
    // get context of answer canvas
    var context = answerCanvas.getContext("2d");
    // initialize it
    context.lineWidth = 2;
    context.font = "14px verdana";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "black";
    // clear the canvas
    context.clearRect(0, 0, answerCanvas.width, answerCanvas.height);

    const cellSize = 20;
    // draw the grid with it's letters
    for (var row = 0; row < search_grid_size; row++) {
      for (var col = 0; col < search_grid_size; col++) {
        context.fillText(
          searchGrid.current[row][col],
          row * cellSize + cellSize / 2,
          col * cellSize + cellSize / 2
        );
      }
    }
    // draw the cross-out lines on the answer
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    for (var i = 0; i < crosslines.current.length; i++) {
      context.beginPath();
      context.moveTo(crosslines.current[i].x1, crosslines.current[i].y1);
      context.lineTo(crosslines.current[i].x2, crosslines.current[i].y2);
      context.stroke();
    }
    // draw a circle around each Hidden message letter depicting the true answer
    context.beginPath();
    for (i = 0; i < hiddenAnswerPoints.current.length; i++) {
      context.beginPath();
      context.arc(
        hiddenAnswerPoints.current[i][0] * 20 + 20 / 2,
        hiddenAnswerPoints.current[i][1] * 20 + 20 / 2,
        10,
        0,
        2 * Math.PI
      );
      context.stroke();
    }
    // write instructions below the puzzle
    if (caseOption === 1)
      var puzzle_words = hiddenSearchWords.toUpperCase().split(" ");
    if (caseOption === 2) puzzle_words = hiddenSearchWords.split(" ");
    if (caseOption === 3)
      puzzle_words = hiddenSearchWords.toLowerCase().split(" ");
    var puzzle_words_string = "";
    for (var q = 0; q < puzzle_words.length; q++) {
      puzzle_words_string += puzzle_words[q] + "   ";
    }
    var maxWidth = 600;
    var lineHeight = 25;
    var x = 10;
    var y = search_grid_size * cellSize + 50;
    context.textAlign = "left";
    context.font = "20px verdana";
    wrapText(
      context,
      "Write the hidden message below after finding the words in the list",
      x,
      y,
      maxWidth,
      lineHeight
    );

    for (q = 0; q < hiddenMessage.length; q++) {
      if (isCharacterALetter(hiddenMessage[q]))
        context.fillText("_", x + q * cellSize, y + 60);
      else context.fillText(hiddenMessage[q], x + q * cellSize, y + 60);
    }
    context.font = "16px verdana";
    wrapText(context, puzzle_words_string, x, y + 100, maxWidth, lineHeight);
  }

  /*********** Cross Words Puzzle Code Starts Here *****************/
  // checks if a grid cell is empty
  function isEmpty(x, y) {
    return grid[y][x] === "_";
  }
  // checks if a grid cell contains a letter
  function isLetter(x, y) {
    return grid[y][x] !== "_";
  }
  // returns the letter from a grid cell
  function letterAt(x, y) {
    return grid[y][x];
  }
  //draws letter vertically on the canvas
  function putLetterAtVertically(x, y, letter, ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(x * 30, y * 30, 30, 30);
    ctx.stroke();
    ctx.fillRect(x * 30, y * 30, 30, 30);
    ctx.fillStyle = "black";
    grid[y][x] = letter;
    ctx.fillText(grid[y][x], x * 30 + 30 / 2, y * 30 + 30 / 2);
  }
  // draws cell vertically on the canvas
  function putCellVertically(x, y, ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(x * 30, y * 30, 30, 30);
    ctx.stroke();
    ctx.fillRect(x * 30, y * 30, 30, 30);
    ctx.fillStyle = "black";
  }
  // draws word serial number vertically on the canvas
  function putNumberVertically(x, y, number, ctx) {
    var cxy = [x, y];
    cellYX.push(cxy);
    downNums.push(number);
    ctx.fillStyle = "black";
    ctx.fillText(number, x * 30 + 20, y * 30 + 20);
  }
  // draws letter horizontally on the canvas
  function putLetterAtHorizontally(x, y, letter, ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(x * 30, y * 30, 30, 30);
    ctx.stroke();
    ctx.fillRect(x * 30, y * 30, 30, 30);
    ctx.fillStyle = "black";
    grid[y][x] = letter;
    ctx.fillText(grid[y][x], x * 30 + 30 / 2, y * 30 + 30 / 2);
  }
  // draws cell horizontally on the canvas
  function putCellHorizontally(x, y, ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(x * 30, y * 30, 30, 30);
    ctx.stroke();
    ctx.fillRect(x * 30, y * 30, 30, 30);
    ctx.fillStyle = "black";
  }
  // draws word serial number horizontally on the canvas
  function putNumberHorizontally(x, y, number, ctx) {
    var cxy = [x, y];
    cellXY.push(cxy);
    acrossNums.push(number);
    ctx.fillStyle = "black";
    ctx.fillText(number, x * 30 + 10, y * 30 + 10);
  }
  // is the horizontal word's right cell empty?
  function isCleanHeadAcross(x, y, word) {
    var len = word.length;
    var head = x + len;
    if (head >= grid_size) return true;
    return isEmpty(head, y);
  }
  // is the vertical word's bottom cell empty?
  function isCleanHeadDown(x, y, word) {
    var len = word.length;
    var head = y + len;
    if (head >= grid_size) return true;
    return isEmpty(x, head);
  }
  // is the horizontal word's left cell empty?
  function isCleanTailAcross(x, y) {
    if (x === grid_start) return true;
    return isEmpty(x - 1, y);
  }
  // is the vertical word's top cell empty?
  function isCleanTailDown(x, y) {
    if (y === grid_start) return true;
    return isEmpty(x, y - 1);
  }
  // is the word to be placed across overlapping another word?
  function isOverlappingAcross(x, y, word) {
    var len = word.length;
    var grid_word = "";
    for (var j = 0; j < len; j++) {
      grid_word += letterAt(x + j, y);
    }
    return wordPlaced.includes(grid_word);
  }
  // is the word to be placed down overlapping another word?
  function isOverlappingDown(x, y, word) {
    var len = word.length;
    var grid_word = "";
    for (var j = 0; j < len; j++) {
      if (y + j >= grid_size) continue;
      if (y + j <= grid_start) continue;
      grid_word += letterAt(x, y + j);
    }
    return wordPlaced.includes(grid_word);
  }
  // check if the word to be placed across is touching another word's head
  function touchTopAcross(x, y, word) {
    if (y < 1) return false;
    var len = word.length;
    for (var j = 0; j < len; j++) {
      var u = y - 1;
      var grid_word = "";
      while (isLetter(x + j, u)) {
        grid_word += letterAt(x + j, u);
        u--;
        if (u === -1) break;
      }
      var reverse = reverseString(grid_word);
      if (wordPlaced.includes(reverse)) return true;
    }
    return false;
  }
  // check if the word to be placed across is touching another word's tail
  function touchBottomAcross(x, y, word) {
    if (y === grid_end) return false;
    var len = word.length;
    for (var j = 0; j < len; j++) {
      var u = y + 1;
      var grid_word = "";
      while (isLetter(x + j, u)) {
        grid_word += letterAt(x + j, u);
        u++;
        if (u === grid_size) break;
      }
      if (wordPlaced.includes(grid_word)) return true;
    }
    return false;
  }
  // check if the word to be placed down is touching another word's head
  function touchleftDown(x, y, word) {
    if (x === 0) return false;
    var len = word.length;
    for (var j = 0; j < len; j++) {
      var u = x - 1;
      var grid_word = "";
      if (y + j >= grid_size) continue;
      if (y + j <= grid_start) continue;
      while (isLetter(u, y + j)) {
        grid_word += letterAt(u, y + j);
        u--;
        if (u === -1) break;
      }
      var reverse = reverseString(grid_word);
      if (wordPlaced.includes(reverse)) return true;
    }
    return false;
  }
  // check if the word to be placed down is touching another word's tail
  function touchRightDown(x, y, word) {
    if (x === grid_end) return false;
    var len = word.length;
    for (var j = 0; j < len; j++) {
      var u = x + 1;
      var grid_word = "";
      if (y + j >= grid_size) continue;
      if (y + j <= grid_start) continue;
      while (isLetter(u, y + j)) {
        grid_word += letterAt(u, y + j);
        u++;
        if (u === grid_size) break;
      }
      if (wordPlaced.includes(grid_word)) return true;
    }
    return false;
  }
  // check if the word to be placed across is fully lonely
  function isValidIsolateAcross(x, y, word) {
    var len = word.length;
    var answer = true;
    for (var j = 0; j < len; j++) {
      answer = isEmpty(x + j, y);
      if (!answer) break;
    }
    return answer;
  }
  // check if the word to be placed down is fully lonely
  function isValidIsolateDown(x, y, word) {
    var len = word.length;
    var answer = true;
    for (var j = 0; j < len; j++) {
      answer = isEmpty(x, y + j);
      if (!answer) break;
    }
    return answer;
  }
  // check if the word to be placed across is crossing another word legitimately
  function isValidCrossAcross(x, y, word) {
    var len = word.length;
    var c = 0;
    for (var j = 0; j < len; j++) {
      if (letterAt(x + j, y) === word[j] || letterAt(x + j, y) === "_") c++;
    }
    if (len === c) return true;
    else return false;
  }
  // check if the word to be placed down is crossing another word legitimately
  function isValidCrossDown(x, y, word) {
    var len = word.length;
    var c = 0;
    for (var j = 0; j < len; j++) {
      if (y + j >= grid_size) break;
      if (y + j <= grid_start) break;
      if (letterAt(x, y + j) === word[j] || letterAt(x, y + j) === "_") c++;
    }
    if (len === c) return true;
    else return false;
  }
  // place a word on the canvas spreading horizontally
  function placeWordAcross(x, y, word, index, ctx, ctx2) {
    var len = word.length;
    for (var j = 0; j < len; j++) {
      putCellHorizontally(x + j, y, ctx2);
      putLetterAtHorizontally(x + j, y, word[j], ctx);
    }
    wordPlaced.push(word);
    var i = wordsOriginal.indexOf(word);
    putNumberHorizontally(x, y, i, ctx2);
    document.getElementById("across").innerHTML +=
      i + ". " + hints[i] + "<br/>";
  }
  // place a word on the canvas spreading vertically
  function placeWordDown(x, y, word, index, ctx, ctx2) {
    var len = word.length;
    for (var j = 0; j < len; j++) {
      putCellVertically(x, y + j, ctx2);
      putLetterAtVertically(x, y + j, word[j], ctx);
    }
    wordPlaced.push(word);
    downCount++;
    var i = wordsOriginal.indexOf(word);
    putNumberVertically(x, y, i, ctx2);
    document.getElementById("down").innerHTML += i + ". " + hints[i] + "<br/>";
  }
  // checks if a word can be placed crossing another word on the canvas
  function canPlaceOnGridCross(word, index, direction, ctx, ctx2) {
    if (direction === "down") return canPlaceCrossDown(word, index, ctx, ctx2);
    if (direction === "across")
      return canPlaceCrossAcross(word, index, ctx, ctx2);
  }
  // checks if a word can be placed at a lonely place on the canvas
  function canPlaceOnGridIsolate(x, y, word, index, direction, ctx, ctx2) {
    if (direction === "down")
      return canPlaceIsolateDown(x, y, word, index, ctx, ctx2);
    if (direction === "across")
      return canPlaceIsolateAcross(x, y, word, index, ctx, ctx2);
  }
  // checks if a word can be placed horizontally crossing another word
  function canPlaceCrossAcross(word, index, ctx, ctx2) {
    var placed = false;
    for (var i = 0; i < word.length; i++) {
      var result = matchVerPoints(word[i]);
      if (result.length > 0 && !placed) {
        for (var j = 0; j < result.length; j++) {
          var xp = result[j].x - i;
          var yp = result[j].y;
          if (isValidCrossAcross(xp, yp, word))
            if (isCleanHeadAcross(xp, yp, word))
              if (isCleanTailAcross(xp, yp))
                if (!touchTopAcross(xp, yp, word))
                  if (!touchBottomAcross(xp, yp, word)) {
                    //if (isValidCrossAcross(xp, yp, word))
                    // if (!isOverlappingAcross(xp, yp, word))
                    placeWordAcross(xp, yp, word, index, ctx, ctx2);
                    addHorPoints(xp, yp, word.length);
                    placed = true;
                    break;
                  }
        }
      }
      if (placed) break;
    }
    return placed;
  }
  // checks if a word can be placed vertically crossing another word
  function canPlaceCrossDown(word, index, ctx, ctx2) {
    var placed = false;
    for (var i = 0; i < word.length; i++) {
      var result = matchHorPoints(word[i]);
      if (result.length > 0 && !placed) {
        for (var j = 0; j < result.length; j++) {
          var xp = result[j].x;
          var yp = result[j].y - i;
          if (isValidCrossDown(xp, yp, word))
            if (isCleanHeadDown(xp, yp, word))
              if (isCleanTailDown(xp, yp))
                if (!touchleftDown(xp, yp, word))
                  if (!touchRightDown(xp, yp, word)) {
                    //if (isValidCrossDown(xp, yp, word))
                    // if (!isOverlappingDown(xp, yp, word))
                    placeWordDown(xp, yp, word, index, ctx, ctx2);
                    addVerPoints(xp, yp, word.length);
                    placed = true;
                    break;
                  }
        }
      }
      if (placed) break;
    }
    return placed;
  }
  // checks if a word can be placed horizontally at a lonely place
  function canPlaceIsolateAcross(x, y, word, index, ctx, ctx2) {
    if (isCleanHeadAcross(x, y, word)) {
      if (isCleanTailAcross(x, y)) {
        if (!isOverlappingAcross(x, y, word)) {
          if (!touchTopAcross(x, y, word)) {
            if (!touchBottomAcross(x, y, word)) {
              if (isValidIsolateAcross(x, y, word)) {
                placeWordAcross(x, y, word, index, ctx, ctx2);
                addHorPoints(x, y, word.length);
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  // checks if a word can be placed vertically at a lonely place
  function canPlaceIsolateDown(x, y, word, index, ctx, ctx2) {
    if (isCleanHeadDown(x, y, word))
      if (isCleanTailDown(x, y))
        if (!isOverlappingDown(x, y, word))
          if (!touchleftDown(x, y, word))
            if (!touchRightDown(x, y, word))
              if (isValidIsolateDown(x, y, word)) {
                placeWordDown(x, y, word, index, ctx, ctx2);
                addVerPoints(x, y, word.length);
                return true;
              }
    return false;
  }
  // stores all the letter positions a horizontal word occupies
  function addHorPoints(x, y, len) {
    var point = { x: 0, y: 0 };
    for (var i = 0; i < len; i++) {
      point.x = x + i;
      point.y = y;
      horizontalPoints.push({ x: point.x, y: point.y });
    }
  }
  // stores all the letter positions a vertical word occupies
  function addVerPoints(x, y, len) {
    var point = { x: 0, y: 0 };
    for (var i = 0; i < len; i++) {
      point.x = x;
      point.y = y + i;
      verticalPoints.push({ x: point.x, y: point.y });
    }
  }
  // check if a letter of a horizontal word matches with any letter of the words placed so far
  function matchHorPoints(letter) {
    var matchingPoints = [];
    var point = { x: 0, y: 0 };
    for (var i = 0; i < horizontalPoints.length; i++) {
      point.x = horizontalPoints[i].x;
      point.y = horizontalPoints[i].y;
      if (letterAt(point.x, point.y) === letter)
        matchingPoints.push({ x: point.x, y: point.y });
    }
    return matchingPoints;
  }
  // check if a letter of a vertical word matches with any letter of the words placed so far
  function matchVerPoints(letter) {
    var matchingPoints = [];
    var point = { x: 0, y: 0 };
    for (var i = 0; i < verticalPoints.length; i++) {
      point.x = verticalPoints[i].x;
      point.y = verticalPoints[i].y;
      if (letterAt(point.x, point.y) === letter)
        matchingPoints.push({ x: point.x, y: point.y });
    }
    return matchingPoints;
  }

  // initialize variable with sample cross words.
  function fillCrossData() {
    var data = "Heller, Catch-22 (1961)\n";
    data += "Fitzgerald, The Great Gatsby\n";
    data += "Williams, The Glass Menagerie\n";
    data += "Buck, The Good Earth (1931)\n";
    data += "London, The Call of the Wild\n";
    data += "Miller, Death of a Salesman\n";
    data += "Hemingway, A Farewell to Arms\n";
    data += "Orwell, 1984\n";
    data += "Kesey, One Flew Over the Cuckoo's Nest\n";
    data += "Steinbeck, The Grapes of Wrath(1939)";
    setCrossWords(data);
  }

  // checks necessary requirements before signaling that the
  // cross word puzzle can be generated.
  function processCrossWords() {
    var area = document.getElementById("cross-words");
    var lines = area.value.replace(/\r\n/g, "\n").split("\n");
    words = [];
    hints = [];
    if (lines.length < 10) {
      alert("Give at least 10 words");
      return false;
    }
    for (var i = 0; i < lines.length; i++) {
      var word_hint = lines[i].split(",");
      words.push(word_hint[0].toUpperCase());
      hints.push(word_hint[1]);
    }
    wordsOriginal = [...words];
    return true;
  }

  // cross word puzzle generator function
  function makeCrossWords() {
    // initializes the two canvases - puzzle and answer
    var btnPuzzle = document.getElementById("btnReload");
    btnPuzzle.innerHTML = "RELOAD PUZZLE";
    var btnAnswer = document.getElementById("btnAnswer");
    btnAnswer.innerHTML = "SHOW ANSWER";
    var canvas = document.getElementById("answer-canvas");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("puzzle-canvas");
    var ctx2 = canvas2.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx.font = "14px verdana";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx2.font = "14px verdana";
    ctx2.textAlign = "center";
    ctx2.textBaseline = "middle";
    ctx2.fillStyle = "black";
    var isolateCount = words.length;
    // zero outing the variables
    wordPlaced = [];
    downCount = 0;
    acrossNums = [];
    downNums = [];
    cellXY = [];
    cellYX = [];
    // initialize the puzzle grid with "_". "_" means nothing or empty
    for (var r = 0; r < grid_size; r++) {
      grid[r] = [];
      for (var c = 0; c < grid_size; c++) {
        grid[r][c] = "_";
      }
    }

    document.getElementById("across").innerHTML = "";
    document.getElementById("down").innerHTML = "";
    ctx2.fillText(crossTitle, 100, 20);
    ctx.fillText(crossTitle, 100, 20);

    // sort the words from biggest to smallest
    words.sort(function (a, b) {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return b.length - a.length;
    });

    // this loop places all the cross words on the canvas
    // runs a while loop 100 times for every single word to place the word across or down the grid
    // but place the first word in a random direction starting from cell 3,3
    for (var i = 0; i < isolateCount; i++) {
      var word = words[i];
      var counter = 100;
      while (counter > 0) {
        var currentDirection =
          direction[Math.floor(Math.random() * direction.length)];
        if (i < 1) break;
        if (canPlaceOnGridCross(word, i, currentDirection, ctx, ctx2)) {
          break;
        }
        counter--;
      }

      if (i < 1) {
        canPlaceOnGridIsolate(3, 3, word, i, currentDirection, ctx, ctx2);
      }
    }
    // number the starting cell of each word accordingly
    ctx.fillStyle = "black";
    for (i = 0; i < cellXY.length; i++) {
      ctx2.fillText(
        acrossNums[i],
        cellXY[i][0] * 30 + 10,
        cellXY[i][1] * 30 + 10
      );
    }
    for (i = 0; i < cellYX.length; i++) {
      ctx2.fillText(
        downNums[i],
        cellYX[i][0] * 30 + 20,
        cellYX[i][1] * 30 + 20
      );
    }
  }

  // show cross word puzzle answer
  // answers are already drawn in hidden answer canvas
  // the canvas is shown when user clicks the
  // show answer button
  function showCrossAnswer() {
    var answerCanvas = document.getElementById("answer-canvas");
    var puzzleCanvas = document.getElementById("puzzle-canvas");
    var btnAnswer = document.getElementById("btnAnswer");
    if (
      answerCanvas.style.visibility === "" ||
      answerCanvas.style.visibility === "hidden"
    ) {
      answerCanvas.style.visibility = "visible";
      puzzleCanvas.style.visibility = "hidden";
      btnAnswer.innerHTML = "HIDE ANSWER";
    } else {
      answerCanvas.style.visibility = "hidden";
      puzzleCanvas.style.visibility = "visible";
      btnAnswer.innerHTML = "SHOW ANSWER";
    }
  }

  /******************* Double Puzzle Code Starts Here **************/
  /*
  Functions for this puzzle
  1. fillDoubleData()
  2. fillFinalWord()
  3. processDoubleWords()
  4. makeDoublePuzzle()
  5. showDoubleAnswer()
  */
  // fills storage variable with sample data
  function fillDoubleData() {
    var data = "noun\n";
    data += "verb\n";
    data += "pronoun\n";
    data += "preposition\n";
    data += "adverb\n";
    data += "adjective\n";
    data += "phrase\n";
    data += "participle";
    setDoubleWords(data);
  }
  // fills storage variable with sample final phrase
  function fillFinalWord() {
    var data = "Parts of Speech";
    setFinalWord(data.toUpperCase());
  }
  // ensures that the required number of words are given before okaying for
  // generating the puzzle
  function processDoubleWords() {
    var area = document.getElementById("double-words");
    var lines = area.value.replace(/\r\n/g, "\n").split("\n");
    words = [];
    hints = [];
    if (lines.length < 5) {
      alert("Give at least 5 words");
      return false;
    }
    for (var i = 0; i < lines.length; i++) {
      words.push(lines[i].toUpperCase());
    }
    wordsOriginal = [...words];
    return true;
  }
  // this function generates the double puzzle
  function makeDoublePuzzle() {
    //initializes the two canvas - puzzle and answer
    var btnPuzzle = document.getElementById("btnReload");
    btnPuzzle.innerHTML = "RELOAD PUZZLE";
    var btnAnswer = document.getElementById("btnAnswer");
    btnAnswer.innerHTML = "SHOW ANSWER";
    var canvas = document.getElementById("puzzle-canvas");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("answer-canvas");
    var ctx2 = canvas2.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx.font = "16px verdana";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx2.font = "16px verdana";
    ctx2.textBaseline = "middle";
    ctx2.fillStyle = "black";
    ctx.textAlign = "left";
    ctx2.textAlign = "left";
    var startX = 50;
    var startY = 60;
    //var startYRect = 80;
    var finalY = 0;
    var letterMatrix = [];
    var singleSpaceString = finalWord.replace(/\s+/g, " ").trim();
    var noSpaceString = singleSpaceString.split(" ").join(""); // remove any space from the final phrase
    var uniqueLetterWords = removeDuplicateCharacters(noSpaceString); // remove any duplicate letters from the final phrase
    var allWords = "";
    var finalString = [];
    var matchedString = [];
    var groupLetter = [];
    var smallLetterPos = [];
    var l = 1;
    var z = 0;
    ctx.beginPath();
    ctx2.beginPath();

    if (doubleOption === 1) {
      for (var n = 0; n < words.length; n++) {
        // shuffle the letters of every word
        var shuf = words[n].shuffle();
        // draw the words one below one
        ctx.fillText(shuf, startX, 20 + startY * n);
        ctx2.fillText(shuf, startX, 20 + startY * n);
        // draw cell around every letter of every word
        for (var i = 0; i < words[n].length; i++) {
          ctx.rect(i * 30 + startX, 30 + startY * n, 30, 30);
          ctx2.rect(i * 30 + startX, 30 + startY * n, 30, 30);
          // draw the answer - the original word supplied by the user
          ctx2.fillText(
            words[n][i],
            i * 30 + startX + 10,
            30 + 15 + startY * n
          );
          for (var j = 0; j < uniqueLetterWords.length; j++)
            if (uniqueLetterWords[j] === words[n][i]) {
              letterMatrix.push({ letter: uniqueLetterWords[j], n: n, i: i });
            }
        }
        smallLetterPos.push(30 + 15 + startY * n);
      }
      ctx.stroke();
      ctx2.stroke();
      for (var p = 0; p < words.length; p++) {
        allWords += words[p];
      }
      for (var q = 0; q < singleSpaceString.length; q++) {
        if (allWords.includes(singleSpaceString[q])) {
          finalString.push("_");
          matchedString.push(singleSpaceString[q]);
        } else finalString.push(singleSpaceString[q]);
      }

      for (i = 0; i < singleSpaceString.length; i++) {
        groupLetter = [];
        for (var k = 0; k < letterMatrix.length; k++)
          if (letterMatrix[k].letter === singleSpaceString[i]) {
            groupLetter.push(k);
          }
        if (groupLetter.length > 0) {
          ctx.beginPath();
          ctx2.beginPath();
          var randomPosition = Math.floor(Math.random() * groupLetter.length);
          var idx = groupLetter[randomPosition];
          var wordInWords = letterMatrix[idx].n;
          var letterInWord = letterMatrix[idx].i;
          ctx.arc(
            letterInWord * 30 + startX + 15,
            smallLetterPos[wordInWords],
            15,
            0,
            2 * Math.PI
          );
          ctx2.arc(
            letterInWord * 30 + startX + 15,
            smallLetterPos[wordInWords],
            15,
            0,
            2 * Math.PI
          );
          ctx.stroke();
          ctx2.stroke();
          // if (groupLetter.length > 1)
          letterMatrix.splice(idx, 1);
          l++;
        } else {
          finalString[i] = singleSpaceString[i];
          console.log(singleSpaceString[i]);
        }
      }
      finalY = 30 + 10 + startY * n;
      ctx.beginPath();
      ctx2.beginPath();
      for (i = 0; i < singleSpaceString.length; i++) {
        if (singleSpaceString[i] === " ") continue;
        ctx.rect(startX + i * 30, finalY, 30, 30);
        ctx2.rect(startX + i * 30, finalY, 30, 30);
        ctx2.fillText(singleSpaceString[i], startX + 10 + i * 30, finalY + 15);
        if (finalString[i] !== "_") {
          ctx.fillText(singleSpaceString[i], startX + 10 + i * 30, finalY + 15);
          continue;
        }
        z++;
      }
      ctx.stroke();
      ctx2.stroke();
      return;
    }
    // loop to put shuffled words line by line
    for (n = 0; n < words.length; n++) {
      shuf = words[n].shuffle(); // shuffle the word first
      ctx.fillText(shuf, startX, 20 + startY * n); // draw the word in both canvas
      ctx2.fillText(shuf, startX, 20 + startY * n);
      for (i = 0; i < words[n].length; i++) {
        ctx.rect(i * 30 + startX, 30 + startY * n, 30, 30); // draw box around the word
        ctx2.rect(i * 30 + startX, 30 + startY * n, 30, 30);
        ctx2.fillText(words[n][i], i * 30 + startX + 10, 30 + 15 + startY * n); // draw the original word letter in answer canvas
        for (j = 0; j < uniqueLetterWords.length; j++)
          if (uniqueLetterWords[j] === words[n][i]) {
            // uniqueLetterWords has the final phrase without any duplicate char
            letterMatrix.push({ letter: uniqueLetterWords[j], n: n, i: i }); // if any letter of the word matches with final phrase save it and it's location
          }
      }
      smallLetterPos.push(30 + 38 + startY * n); // save the Y position of the numbering letters as hint
    }
    // append all words in a single string
    for (p = 0; p < words.length; p++) {
      allWords += words[p];
    }
    // check if final phrase has any matching letter from the anagram words
    for (q = 0; q < singleSpaceString.length; q++) {
      if (allWords.includes(singleSpaceString[q])) {
        finalString.push("_"); // if it has, then that letter will be hidden in the puzzle, which will be solved by the user
        matchedString.push(singleSpaceString[q]); // save that letter in matchedString variable for later use
      } else finalString.push(singleSpaceString[q]); // else that letter will be printed in the puzzle, so add it in the final phrase string
    }

    // here we number the letters of the anagrams that occur in the final phrase
    // If there are more thatn one letters for the corresponding letter in the final phrase
    // we randomly number only one of them
    ctx.font = "12px verdana";
    ctx2.font = "12px verdana";
    finalY = 30 + 10 + startY * n;
    var wl = [];
    var finalIndices = [];
    for (i = 0; i < matchedString.length; i++) {
      // mathedSting has all the letters that matched with the anagram words. Run a loop for every matched string and find how many times they match
      groupLetter = [];
      for (k = 0; k < letterMatrix.length; k++)
        if (letterMatrix[k].letter === matchedString[i]) {
          groupLetter.push(k);
        }
      if (groupLetter.length > 0) {
        // group letter has the indices of the matched letters and their location in anagram words
        randomPosition = Math.floor(Math.random() * groupLetter.length); // get a random index from thoses indices
        idx = groupLetter[randomPosition];
        wordInWords = letterMatrix[idx].n; // get the anagram word that has that matched index
        letterInWord = letterMatrix[idx].i; // get the letter index in that word
        var positionInWords = wordInWords * 100 + letterInWord; // every anagram word is 100 pixel apart
        var matched = false; // now run a loop to find out if the letter is already numbered
        for (var a = 0; a < wl.length; a++) {
          if (positionInWords === wl[a]) {
            matched = true;
            break;
          }
        }
        wl.push(positionInWords); // save the position in an array to check later if that position is already numbered
        if (matched) {
          finalIndices.push(a + 1); // if there is already a match, then just push the lowest index
          continue;
        } else {
          // else print the index of the matching final phrase letter below the anagram letter, so that user can use it to solve the final phrase
          ctx.fillText(
            l,
            letterInWord * 30 + startX + 10,
            smallLetterPos[wordInWords]
          );
          ctx2.fillText(
            l,
            letterInWord * 30 + startX + 10,
            smallLetterPos[wordInWords]
          );
          finalIndices.push(l); // save that index for later printing below the final phrase
        }
        if (groupLetter.length > 1) letterMatrix.splice(idx, 1); // already a match found, so reduce the number of groupLetter element by 1
        l++;
      }
    }
    // print the final phrase letter celss with numbering
    for (i = 0; i < singleSpaceString.length; i++) {
      if (singleSpaceString[i] === " ") continue; // dont' print any cell for blank space
      ctx.rect(startX + i * 30, finalY, 30, 30);
      ctx2.rect(startX + i * 30, finalY, 30, 30);
      ctx2.fillText(singleSpaceString[i], startX + 10 + i * 30, finalY + 15); // print the letters in the answer no matter what
      if (finalString[i] !== "_") {
        // only print the letter in the puzzle if no match found
        ctx.fillText(singleSpaceString[i], startX + 10 + i * 30, finalY + 15);
        continue; // dont print the hint number below the letter printed
      }
      ctx.fillText(finalIndices[z], startX + 10 + i * 30, finalY + 40); // print the number below the letter
      ctx2.fillText(finalIndices[z], startX + 10 + i * 30, finalY + 40);
      z++;
    }
    ctx.stroke();
    ctx2.stroke();
  }
  // this shows the answer of the Double puzzle
  function showDoubleAnswer() {
    var answerCanvas = document.getElementById("answer-canvas");
    var puzzleCanvas = document.getElementById("puzzle-canvas");
    var btnAnswer = document.getElementById("btnAnswer");
    if (
      answerCanvas.style.visibility === "" ||
      answerCanvas.style.visibility === "hidden"
    ) {
      answerCanvas.style.visibility = "visible";
      puzzleCanvas.style.visibility = "hidden";
      btnAnswer.innerHTML = "HIDE ANSWER";
    } else {
      answerCanvas.style.visibility = "hidden";
      puzzleCanvas.style.visibility = "visible";
      btnAnswer.innerHTML = "SHOW ANSWER";
    }
  }
  /***************Fallen Phrase Puzzle Code Starts Here   ******************/
  /**
   Functions to generate Fallen Phrase Puzzle
   1. fillFallenData()
   2. processFallenWords()
   3. makeFallenPuzzle()
   4. showFallenAnswer()
   */
  function fillFallenData() {
    var data =
      '"Some are born great, some achieve greatness, and some have greatness thrust upon them."';
    data += " - William Shakespeare";
    setFallenWords(data);
  }

  var fallenArray = [];
  var upperFallenPhrase = "";
  // process user inputs and confirms if the puzzle can be made
  function processFallenWords() {
    var area = document.getElementById("fallen-words");
    var lines = area.value.replace(/\s+/g, " ").trim().split(" ").join("");
    words = [];
    if (lines.length < 40) {
      alert("Give at least 40 letters phrase");
      return false;
    }
    fallenPhrase = area.value.replace(/\s+/g, " ").trim();
    fallenArray = [];
    while (fallenPhrase.length > 28) {
      if (fallenPhrase[28] !== " ") {
        for (var i = 27; i > 0; i--) {
          if (fallenPhrase[i] === " ") break;
        }
        var letter28 = fallenPhrase.substring(0, i);
        var extraEmptyChars = 28 - letter28.length;
        var leftOver = extraEmptyChars % 2;
        var padding = Math.floor(extraEmptyChars / 2);
        var fineLine =
          repeatStringNumTimes(" ", padding) +
          letter28 +
          repeatStringNumTimes(" ", padding) +
          repeatStringNumTimes(" ", leftOver);
        fallenArray.push(fineLine);
        fallenPhrase = fallenPhrase.substring(i + 1);
      } else {
        letter28 = fallenPhrase.substring(0, 28);
        fallenArray.push(letter28);
        fallenPhrase = fallenPhrase.substring(28);
      }
    }
    extraEmptyChars = 28 - fallenPhrase.length;
    leftOver = extraEmptyChars % 2;
    padding = Math.floor(extraEmptyChars / 2);
    fineLine =
      repeatStringNumTimes(" ", padding) +
      fallenPhrase +
      repeatStringNumTimes(" ", padding) +
      repeatStringNumTimes(" ", leftOver);
    fallenArray.push(fineLine);

    fallenPhrase = "";
    for (var j = 0; j < fallenArray.length; j++) {
      fallenPhrase += fallenArray[j];
    }
    upperFallenPhrase = fallenPhrase.toUpperCase();
    var count = 0;
    fallenClueLetters = [];
    while (count < fallenClueNo) {
      var randomCharIndex = Math.floor(Math.random() * fallenPhrase.length);
      if (isCharacterALetter(fallenPhrase[randomCharIndex])) {
        var sameChar = false;
        for (var p = 0; p < fallenClueLetters.length; p++) {
          if (fallenClueLetters[p] === randomCharIndex) {
            sameChar = true;
            break;
          }
        }
        if (sameChar) continue;
        fallenClueLetters.push(randomCharIndex);
        var newString =
          upperFallenPhrase.slice(0, randomCharIndex) +
          upperFallenPhrase.slice(
            randomCharIndex + 1,
            upperFallenPhrase.length
          );
        upperFallenPhrase = newString.slice(0);
        count++;
      }
    }
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    var str = upperFallenPhrase.replace(regex, "");
    strippedFallenPhrase = str.split(" ").join("").shuffle();
    upperFallenPhrase = fallenPhrase.toUpperCase();
    return true;
  }
  // function to generate fallen phrase puzzle
  function makeFallenPuzzle() {
    var btnPuzzle = document.getElementById("btnReload");
    btnPuzzle.innerHTML = "RELOAD PUZZLE";
    var btnAnswer = document.getElementById("btnAnswer");
    btnAnswer.innerHTML = "SHOW ANSWER";
    var canvas = document.getElementById("puzzle-canvas");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("answer-canvas");
    var ctx2 = canvas2.getContext("2d");
    // initializes the contexts and clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx.font = "16px verdana";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx2.font = "16px verdana";
    ctx2.textBaseline = "middle";
    ctx2.fillStyle = "black";
    ctx.textAlign = "center";
    ctx2.textAlign = "center";
    var startX = 10;
    var startY = 50;
    var cellWidth = 30;
    var cellHeight = 30;
    var iChars = "~`!#$%^&*+=-[]\\';,/{}|\":<>?";
    ctx.beginPath();
    ctx2.beginPath();
    // initialize the grid
    var fallenLetterGrid = [];
    for (var r = 0; r < fallenArray.length; r++) {
      fallenLetterGrid[r] = [];
      for (var c = 0; c < 28; c++) {
        fallenLetterGrid[r][c] = "_";
      }
    }
    // fallenArray has the phrase already formatted for canvas printing
    // any space will be printed as black box, any punctuation letter will be printed as it is
    // otherwise, an empty box will be printed
    // but on the answer canvas, the original phrase letters will be printed as well
    // fallenLetterGrid will get a "*" for any blank or punctuation char
    for (var n = 0; n < fallenArray.length; n++) {
      for (var i = 0; i < fallenArray[n].length; i++) {
        if (fallenArray[n][i] === " ") {
          fallenLetterGrid[n][i] = "*";
          ctx.rect(
            startX + i * cellWidth,
            startY + n * 30,
            cellWidth,
            cellHeight
          );
          ctx.fillRect(
            startX + i * cellWidth,
            startY + n * 30,
            cellWidth,
            cellHeight
          );
          ctx2.rect(
            startX + i * cellWidth,
            startY + n * 30,
            cellWidth,
            cellHeight
          );
          ctx2.fillRect(
            startX + i * cellWidth,
            startY + n * 30,
            cellWidth,
            cellHeight
          );
        } else {
          ctx.rect(
            startX + i * cellWidth,
            startY + n * 30,
            cellWidth,
            cellHeight
          );
          ctx2.rect(
            startX + i * cellWidth,
            startY + n * 30,
            cellWidth,
            cellHeight
          );
        }
        if (iChars.indexOf(fallenArray[n].charAt(i)) !== -1) {
          ctx.fillText(
            fallenArray[n][i].toUpperCase(),
            startX + i * cellWidth + 15,
            startY + n * 30 + 15
          );
          fallenLetterGrid[n][i] = "*";
        }
        ctx2.fillText(
          fallenArray[n][i].toUpperCase(),
          startX + i * cellWidth + 15,
          startY + n * 30 + 15
        );
        ctx.stroke();
        ctx2.stroke();
      }
    }
    // now print the clue letters given by the user. add a "*" for a clue letter
    var startClueY = startY + n * 30 + 50;
    for (i = 0; i < fallenClueLetters.length; i++) {
      var idx = fallenClueLetters[i];
      var row = Math.floor(idx / 28);
      var col = idx % 28;
      ctx.fillText(
        upperFallenPhrase[idx],
        startX + col * cellWidth + 15,
        startY + row * 30 + 15
      );
      fallenLetterGrid[row][col] = "*";
    }
    // below are codes for formatting clue letters output
    for (row = 0; row < fallenArray.length; row++) {
      for (col = 0; col < 28; col++) {
        if (
          fallenLetterGrid[row][col] === "_" &&
          strippedFallenPhrase[0] !== undefined
        ) {
          fallenLetterGrid[row][col] = strippedFallenPhrase[0];
          var res = strippedFallenPhrase.slice(1);
          strippedFallenPhrase = res;
        }
      }
    }
    for (row = fallenArray.length - 1; row > -1; row--) {
      for (col = 0; col < 28; col++) {
        if (fallenLetterGrid[row][col] === "*") {
          for (n = row - 1; n > -1; n--) {
            if (fallenLetterGrid[n][col] !== "*") {
              fallenLetterGrid[row][col] = fallenLetterGrid[n][col];
              fallenLetterGrid[n][col] = "*";
              break;
            }
          }
        }
      }
    }
    for (row = 0; row < fallenArray.length; row++) {
      for (col = 0; col < 28; col++) {
        if (fallenLetterGrid[row][col] !== "*") {
          ctx.fillText(
            fallenLetterGrid[row][col],
            startX + col * cellWidth + 15,
            startClueY + row * cellWidth + 15
          );
          ctx2.fillText(
            fallenLetterGrid[row][col],
            startX + col * cellWidth + 15,
            startClueY + row * cellWidth + 15
          );
        }
      }
    }
  }
  // function to show answer of Fallen Phrase puzzle
  function showFallenAnswer() {
    var answerCanvas = document.getElementById("answer-canvas");
    var puzzleCanvas = document.getElementById("puzzle-canvas");
    var btnAnswer = document.getElementById("btnAnswer");
    if (
      answerCanvas.style.visibility === "" ||
      answerCanvas.style.visibility === "hidden"
    ) {
      answerCanvas.style.visibility = "visible";
      puzzleCanvas.style.visibility = "hidden";
      btnAnswer.innerHTML = "HIDE ANSWER";
    } else {
      answerCanvas.style.visibility = "hidden";
      puzzleCanvas.style.visibility = "visible";
      btnAnswer.innerHTML = "SHOW ANSWER";
    }
  }
  /*********************** Math Squares Puzzle Code Starts Here **********************
   * Functions
   * 1. processMathSquares()
   * 2. makeMathPuzzle()
   * 3. showMathAnswer()
   */
  // nothing to process, just returns true
  function processMathSquares() {
    return true;
  }
  var mathGrid = [];
  var mathAnswerGrid = [];
  var mathGridSize = 0;
  // this function generates the math square puzzle
  function makeMathPuzzle() {
    // usual canvas setup
    var btnPuzzle = document.getElementById("btnReload");
    btnPuzzle.innerHTML = "RELOAD PUZZLE";
    var btnAnswer = document.getElementById("btnAnswer");
    btnAnswer.innerHTML = "SHOW ANSWER";
    var canvas = document.getElementById("puzzle-canvas");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("answer-canvas");
    var ctx2 = canvas2.getContext("2d");
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx.font = "16px verdana";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx2.font = "16px verdana";
    ctx2.textBaseline = "middle";
    ctx2.fillStyle = "black";
    ctx.textAlign = "center";
    ctx2.textAlign = "center";
    var startX = 10;
    var startY = 50;

    ctx.beginPath();
    ctx2.beginPath();

    mathGridSize = squireSize * 2 - 1;
    // initialize the grids
    for (var row = 0; row < mathGridSize; row++) {
      mathGrid[row] = [];
      mathAnswerGrid[row] = [];
      for (var col = 0; col < mathGridSize; col++) {
        mathGrid[row][col] = "_";
        mathAnswerGrid[row][col] = "_";
      }
    }
    var arr = [];
    // the upperNumber is the square of the grid size
    // that is if the math square is 3, then upper number is 9
    // fill up the array with random number between 1 and the upper number
    // a number is never repeated
    while (arr.length < upperNumber) {
      var r = Math.floor(Math.random() * upperNumber) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    // operator signs
    var mul = "x";
    var divide = "\u00f7";
    var ops = [];
    // to avoid division by a bigger number, addition or subtraction is used
    var opsWithoutDiv = ["+", "-"];
    if (opAddition) ops.push("+");
    if (opSubtraction) ops.push("-");
    if (opMultiiplication) ops.push(mul);
    if (opDivision) ops.push(divide);
    if (!opAddition && !opSubtraction && !opMultiiplication && !opDivision)
      ops.push("+"); // in case, no operation is selected, addition is used

    var n = 0;
    var c = 1;
    var rightResult = []; // two results array
    var bottomResult = [];
    for (row = 0; row < mathGridSize; row = row + 2) {
      // generate and  solve the row wise equations
      var equation = []; // empty the equation array
      for (col = 0; col < mathGridSize; col = col + 2) {
        mathAnswerGrid[row][col] = arr[n]; // write the numbers in answer grid - numbers are in every odd numbered col
        n++;
      }
      for (c = 1; c < mathGridSize; c = c + 2) {
        var op = ops[Math.floor(Math.random() * ops.length)];
        if (mathAnswerGrid[row][c - 1] < mathAnswerGrid[row][c + 1])
          op = opsWithoutDiv[Math.floor(Math.random() * opsWithoutDiv.length)];
        mathAnswerGrid[row][c] = op; // write the operator sign in the answer grid - operator signs are in every even numbered col
      }
      for (c = 0; c < mathGridSize; c++) {
        equation.push(mathAnswerGrid[row][c]); // now make the complete equation by pushing every col
      }
      while (equation.length > 1) {
        // solve the equation for every row now
        for (var m = 0; m < equation.length; m++) {
          if (equation[m] === mul || equation[m] === divide) {
            // first find the multiplication or division because of their operator precedence
            if (equation[m] === mul) {
              var res = equation[m - 1] * equation[m + 1]; // the numbers are before and after the operator
              equation[m + 1] = res; // over write the number that is after the operator with the multiplication
              equation.splice(m - 1, 2); // now the number and the operator from the equation
              break;
            }
            if (equation[m] === divide) {
              // same formula for the division
              res = Math.floor(equation[m - 1] / equation[m + 1]);
              equation[m + 1] = res;
              equation.splice(m - 1, 2);
              break;
            }
          }
        }
        for (m = 0; m < equation.length; m++) {
          // second find the addition or subtraction because of their operator precedence
          if (equation[m] === "+" || equation[m] === "-") {
            if (equation[m] === "+") {
              //same formula like before
              res = equation[m - 1] + equation[m + 1];
              equation[m + 1] = res;
              equation.splice(m - 1, 2);
              break;
            }
            if (equation[m] === "-") {
              res = equation[m - 1] - equation[m + 1];
              equation[m + 1] = res;
              equation.splice(m - 1, 2);
              break;
            }
          }
        }
      }
      rightResult.push(equation); // after splicing all the operators and numbers we now only have the result, lets save it
    }
    // lets store the operators that come between every two rows
    for (row = 1; row < mathGridSize; row = row + 2) {
      for (col = 0; col < mathGridSize; col = col + 2) {
        op = ops[Math.floor(Math.random() * ops.length)];
        if (mathAnswerGrid[row - 1][col] < mathAnswerGrid[row + 1][col])
          op = opsWithoutDiv[Math.floor(Math.random() * opsWithoutDiv.length)];
        mathAnswerGrid[row][col] = op;
      }
    }
    // now make the equations for the columns the same way we did for the rows
    for (col = 0; col < mathGridSize; col = col + 2) {
      equation = [];
      for (row = 0; row < mathGridSize; row++) {
        equation.push(mathAnswerGrid[row][col]);
      }
      while (equation.length > 1) {
        for (m = 0; m < equation.length; m++) {
          if (equation[m] === mul || equation[m] === divide) {
            if (equation[m] === mul) {
              res = equation[m - 1] * equation[m + 1];
              equation[m + 1] = res;
              equation.splice(m - 1, 2);
              break;
            }
            if (equation[m] === divide) {
              res = Math.floor(equation[m - 1] / equation[m + 1]);
              equation[m + 1] = res;
              equation.splice(m - 1, 2);
              break;
            }
          }
        }
        for (m = 0; m < equation.length; m++) {
          if (equation[m] === "+" || equation[m] === "-") {
            if (equation[m] === "+") {
              res = equation[m - 1] + equation[m + 1];
              equation[m + 1] = res;
              equation.splice(m - 1, 2);
              break;
            }
            if (equation[m] === "-") {
              res = equation[m - 1] - equation[m + 1];
              equation[m + 1] = res;
              equation.splice(m - 1, 2);
              break;
            }
          }
        }
      }
      bottomResult.push(equation); // save the bottom results
    }
    // now lets print everything on the two canvas - puzzle and answer
    var giveAwayNo = [];
    while (giveAwayNo.length < mathClueNo) {
      r = Math.floor(Math.random() * upperNumber) + 1;
      if (giveAwayNo.indexOf(r) === -1) giveAwayNo.push(r);
    }

    ctx.beginPath();
    for (row = 0; row < mathGridSize; row++) {
      for (col = 0; col < mathGridSize; col++) {
        ctx.rect(startX + 30 * col, startY + 30 * row, 30, 30);
        ctx.stroke();
        ctx2.rect(startX + 30 * col, startY + 30 * row, 30, 30);
        if (
          mathAnswerGrid[row][col] === "+" ||
          mathAnswerGrid[row][col] === "-" ||
          mathAnswerGrid[row][col] === mul ||
          mathAnswerGrid[row][col] === divide
        )
          ctx.fillText(
            mathAnswerGrid[row][col],
            startX + 30 * col + 15,
            startY + 30 * row + 15
          );
        ctx2.fillText(
          mathAnswerGrid[row][col],
          startX + 30 * col + 15,
          startY + 30 * row + 15
        );
        ctx2.stroke();
        if (mathAnswerGrid[row][col] === "_") {
          ctx.fillRect(startX + 30 * col, startY + 30 * row, 30, 30);
          ctx2.fillRect(startX + 30 * col, startY + 30 * row, 30, 30);
        }
      }
      ctx.stroke();
      ctx2.stroke();
    }
    for (var rc = 0; rc < giveAwayNo.length; rc++) {
      for (row = 0; row < mathGridSize; row++) {
        for (col = 0; col < mathGridSize; col++) {
          if (mathAnswerGrid[row][col] === giveAwayNo[rc])
            ctx.fillText(
              mathAnswerGrid[row][col],
              startX + 30 * col + 15,
              startY + 30 * row + 15
            );
        }
      }
    }
    if (Math.max(...rightResult) > 999) {
      ctx.font = "10px verdana";
      ctx2.font = "10px verdana";
    }
    if (Math.max(...bottomResult) > 999) {
      ctx.font = "10px verdana";
      ctx2.font = "10px verdana";
    }
    var answerX = startX + 30 * col;
    var answerY = startY + 30 * row;

    for (row = 0, rc = 0; row < mathGridSize; row = row + 2, rc++) {
      ctx.rect(answerX + 10, startY + 30 * row, 40, 30);
      ctx.fillText(rightResult[rc], answerX + 10 + 20, startY + 30 * row + 15);
      ctx.stroke();
      ctx2.rect(answerX + 10, startY + 30 * row, 40, 30);
      ctx2.fillText(rightResult[rc], answerX + 10 + 20, startY + 30 * row + 15);
      ctx2.stroke();
    }

    for (col = 0, rc = 0; col < mathGridSize; col = col + 2, rc++) {
      ctx.rect(startX + 30 * col, answerY + 10, 40, 30);
      ctx.fillText(bottomResult[rc], startX + 30 * col + 20, answerY + 10 + 15);
      ctx.stroke();
      ctx2.rect(startX + 30 * col, answerY + 10, 40, 30);
      ctx2.fillText(
        bottomResult[rc],
        startX + 30 * col + 20,
        answerY + 10 + 15
      );
      ctx2.stroke();
    }
  }

  // function to show math square puzzle answer
  function showMathAnswer() {
    var answerCanvas = document.getElementById("answer-canvas");
    var puzzleCanvas = document.getElementById("puzzle-canvas");
    var btnAnswer = document.getElementById("btnAnswer");
    if (
      answerCanvas.style.visibility === "" ||
      answerCanvas.style.visibility === "hidden"
    ) {
      answerCanvas.style.visibility = "visible";
      puzzleCanvas.style.visibility = "hidden";
      btnAnswer.innerHTML = "HIDE ANSWER";
    } else {
      answerCanvas.style.visibility = "hidden";
      puzzleCanvas.style.visibility = "visible";
      btnAnswer.innerHTML = "SHOW ANSWER";
    }
  }
  /******************* Letter Tiles Puzzle Starts Here **********************
   * functions
   * 1. fillLetterData()
   * 2. processLetterTiles()
   * 3. makeLetterPuzzle()
   */
  // this function fills variable with sample phrase
  function fillLetterData() {
    var data =
      "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.";
    setLetterPhrase(data);
  }
  // checks if user has given at least one sentence required to make the puzzle
  // then processes it
  function processLetterTiles() {
    var lines = letterPhrase.replace(/\s+/g, " ").trim(); //.split(" ").join("");
    if (lines.length < 6) {
      alert("Put a sentence at least!");
      return false;
    }
    setLetterPhrase(lines); // removes extra white spaces
    var scrambledPhrase = lines.shuffle(); // scramble the whole phrase
    letterGroup = [];
    scrambledLetterGroup = [];
    // in this loop we divide the whole paragraph by number of letters selected by the user.
    // save each group letterGroup array
    while (lines.length > 0) {
      var str = "";
      for (var j = 0; j < numberOfLetter; j++) {
        if (lines[j] === undefined) break;
        str += lines[j];
      }
      if (str !== "") letterGroup.push(str);
      lines = lines.slice(str.length);
    }
    // here we do the same thing but with the scrambled paragraph.
    // the groups are saved in scrambledLetterGroup array
    while (scrambledPhrase.length > 0) {
      str = "";
      for (j = 0; j < numberOfLetter; j++) {
        if (scrambledPhrase[j] === undefined) break;
        str += scrambledPhrase[j];
      }
      if (str !== "") scrambledLetterGroup.push(str);
      scrambledPhrase = scrambledPhrase.slice(str.length);
    }
    return true;
  }
  // this function generates the letter tiles puzzle
  function makeLetterPuzzle() {
    // usual canvas initialize stuff
    var btnPuzzle = document.getElementById("btnReload");
    btnPuzzle.innerHTML = "RELOAD PUZZLE";
    var btnAnswer = document.getElementById("btnAnswer");
    btnAnswer.innerHTML = "SHOW ANSWER";
    var canvas = document.getElementById("puzzle-canvas");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("answer-canvas");
    var ctx2 = canvas2.getContext("2d");
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx.font = "16px verdana";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx2.font = "16px verdana";
    ctx2.textBaseline = "middle";
    ctx2.fillStyle = "black";
    ctx.textAlign = "center";
    ctx2.textAlign = "center";
    var startX = 1;
    var startY = 50;
    ctx.beginPath();
    ctx2.beginPath();
    var numberOfCellsInARow = 10;
    var numberOfRow = Math.floor(
      scrambledLetterGroup.length / numberOfCellsInARow
    );
    var lastRowColumn = scrambledLetterGroup.length % numberOfCellsInARow;
    var letterWidth = 10;
    var cellWidth =
      (numberOfLetter + numberOfLetter - 1) * letterWidth + letterWidth * 2;
    var cellHeight = 30;
    var n = 0;
    var answerStartY = numberOfRow * cellHeight + 100;
    if (lastRowColumn > 0) answerStartY += cellHeight;
    // this loop draws the puzzle on the canvas
    for (var i = 0; i < numberOfRow; i++) {
      for (var j = 0; j < numberOfCellsInARow; j++) {
        // first draw the cells
        ctx.rect(
          startX + cellWidth * j + 5,
          startY + cellHeight * i + 5,
          cellWidth,
          cellHeight
        );
        ctx2.rect(
          startX + cellWidth * j + 5,
          startY + cellHeight * i + 5,
          cellWidth,
          cellHeight
        );
        // then draw the scrambled phrases inside the cells
        var cText = scrambledLetterGroup[n].split("").join("  ");
        ctx.fillText(
          cText,
          startX + cellWidth * j + numberOfLetter * 10 + 10,
          startY + cellHeight * i + 20
        );
        ctx2.fillText(
          cText,
          startX + cellWidth * j + numberOfLetter * 10 + 10,
          startY + cellHeight * i + 20
        );
        ctx.stroke();
        ctx2.stroke();
        // if show the answer area checkbox is not selected
        // then clear the answer canvas and print the answer in the same celss when answer
        // button is clicked
        if (!showLetterAnswerArea) {
          ctx2.clearRect(
            startX + cellWidth * j + 5,
            startY + cellHeight * i + 5,
            cellWidth,
            cellHeight
          );
          var originalText = letterGroup[n].split("").join("  ");
          ctx2.fillText(
            originalText,
            startX + cellWidth * j + numberOfLetter * 10 + 10,
            startY + cellHeight * i + 20
          );
          ctx2.stroke();
        }
        n++;
      }
    }
    // this loop draws the last row of the puzzle
    for (j = 0; j < lastRowColumn; j++) {
      ctx.rect(
        startX + cellWidth * j + 5,
        startY + cellHeight * i + 5,
        cellWidth,
        cellHeight
      );
      ctx2.rect(
        startX + cellWidth * j + 5,
        startY + cellHeight * i + 5,
        cellWidth,
        cellHeight
      );
      cText = scrambledLetterGroup[n].split("").join("  ");
      ctx.fillText(
        cText,
        startX + cellWidth * j + numberOfLetter * 10 + 10,
        startY + cellHeight * i + 20
      );
      ctx2.fillText(
        cText,
        startX + cellWidth * j + numberOfLetter * 10 + 10,
        startY + cellHeight * i + 20
      );
      ctx.stroke();
      ctx2.stroke();
      if (!showLetterAnswerArea) {
        ctx2.clearRect(
          startX + cellWidth * j + 5,
          startY + cellHeight * i + 5,
          cellWidth,
          cellHeight
        );
        originalText = letterGroup[n].split("").join("  ");

        ctx2.fillText(
          originalText,
          startX + cellWidth * j + numberOfLetter * 10 + 10,
          startY + cellHeight * i + 20
        );
        ctx2.stroke();
      }
      n++;
    }
    // if show the answer area is selected then a seperate grid is drawn with the answer
    // below the puzzle
    if (showLetterAnswerArea) {
      n = 0;
      for (i = 0; i < numberOfRow; i++) {
        for (j = 0; j < numberOfCellsInARow; j++) {
          originalText = letterGroup[n].split("").join("  ");
          ctx.rect(
            startX + cellWidth * j + 5,
            answerStartY + cellHeight * i + 5,
            cellWidth,
            cellHeight
          );
          ctx.stroke();
          ctx2.rect(
            startX + cellWidth * j + 5,
            answerStartY + cellHeight * i + 5,
            cellWidth,
            cellHeight
          );
          ctx2.fillText(
            originalText,
            startX + cellWidth * j + numberOfLetter * 10 + 10,
            answerStartY + cellHeight * i + 20
          );
          ctx2.stroke();
          n++;
        }
      }
      // this draws the last row of the grid
      for (j = 0; j < lastRowColumn; j++) {
        ctx.rect(
          startX + cellWidth * j + 5,
          answerStartY + cellHeight * i + 5,
          cellWidth,
          cellHeight
        );
        ctx2.rect(
          startX + cellWidth * j + 5,
          answerStartY + cellHeight * i + 5,
          cellWidth,
          cellHeight
        );
        ctx.stroke();
        ctx2.stroke();
        originalText = letterGroup[n].split("").join("  ");
        ctx2.fillText(
          originalText,
          startX + cellWidth * j + numberOfLetter * 10 + 10,
          answerStartY + cellHeight * i + 20
        );
        n++;
      }
    }
  }
  // this function shows the answer of the puzzle
  function showLetterAnswer() {
    var answerCanvas = document.getElementById("answer-canvas");
    var puzzleCanvas = document.getElementById("puzzle-canvas");
    var btnAnswer = document.getElementById("btnAnswer");
    if (
      answerCanvas.style.visibility === "" ||
      answerCanvas.style.visibility === "hidden"
    ) {
      answerCanvas.style.visibility = "visible";
      puzzleCanvas.style.visibility = "hidden";
      btnAnswer.innerHTML = "HIDE ANSWER";
    } else {
      answerCanvas.style.visibility = "hidden";
      puzzleCanvas.style.visibility = "visible";
      btnAnswer.innerHTML = "SHOW ANSWER";
    }
  }
  /*************** Number Blocks Puzzle Starts Here ********************
   * Functions
   * 1. processNumberBlocks()
   * 2. makeNumberBlockPuzzle()
   * 3. showNumberAnswer()
   */
  // just a dummy function that returns true
  function processNumberBlocks() {
    return true;
  }
  // this function generates the number blocks puzzle
  function makeNumberBlockPuzzle() {
    //usual canvas initialization stuff
    var btnPuzzle = document.getElementById("btnReload");
    btnPuzzle.innerHTML = "RELOAD PUZZLE";
    var btnAnswer = document.getElementById("btnAnswer");
    btnAnswer.innerHTML = "SHOW ANSWER";
    var canvas = document.getElementById("puzzle-canvas");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("answer-canvas");
    var ctx2 = canvas2.getContext("2d");
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx.font = "16px verdana";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx2.font = "16px verdana";
    ctx2.textBaseline = "middle";
    ctx2.fillStyle = "black";
    ctx.textAlign = "center";
    ctx2.textAlign = "center";
    var startX = 10;
    var startY = 50;
    var numberGrid = [];
    var rowSum = [];
    var colSum = [];
    var diag1 = 0;
    var diag2 = 0;
    var clueIdx = [];
    var cellWidth = 60;
    var cellHeight = 30;
    ctx.beginPath();
    ctx2.beginPath();
    // fill up every row of the grid with random integer and save the sums
    for (var row = 0; row < blockSize; row++) {
      numberGrid[row] = [];
      var sum = 0;
      for (var col = 0; col < blockSize; col++) {
        var randomInteger =
          Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        numberGrid[row][col] = randomInteger; // fill up the cells with random integer
        sum += randomInteger; // add the integers
      }
      rowSum.push(sum); // save the result
    }
    // fill up every column of the grid with random integer and save the sums
    for (col = 0; col < blockSize; col++) {
      sum = 0;
      for (row = 0; row < blockSize; row++) {
        sum += numberGrid[row][col]; // add the integers
      }
      colSum.push(sum); // save the result
    }
    // calculate the diagonal sums
    diag1 = 0;
    for (row = 0; row < blockSize; row++) {
      for (col = 0; col < blockSize; col++) {
        if (row === col) diag1 += numberGrid[row][col];
      }
    }
    diag2 = 0;
    for (row = blockSize - 1, col = 0; row > -1; row--, col++) {
      diag2 += numberGrid[row][col];
    }
    var i = 1;
    var clueCells = [];
    clueCells.push(Math.floor(Math.random() * blockSize)); //save the row
    clueCells.push(Math.floor(Math.random() * blockSize)); // save the col
    clueIdx.push(clueCells); // save one cell as clue number
    while (i < numberBlockClueNo) {
      // calculate all the clue number cells
      var matching = false;
      clueCells = [];
      clueCells.push(Math.floor(Math.random() * blockSize)); //save the row
      clueCells.push(Math.floor(Math.random() * blockSize)); // save the col
      for (var j = 0; j < clueIdx.length; j++) {
        // check if the cell is already present.
        var currentClue = clueIdx[j];
        if (currentClue === clueCells) {
          matching = true; // if it does, the skip
          break;
        }
      }
      if (matching) continue;
      clueIdx.push(clueCells); // else save the cell. these cells will be printed as clues
      i++;
    }
    //now print the puzzle and answer
    for (row = 0; row < blockSize; row++) {
      for (col = 0; col < blockSize; col++) {
        ctx.rect(
          startX + col * cellWidth,
          startY + row * cellHeight,
          cellWidth,
          cellHeight
        );
        ctx2.rect(
          startX + col * cellWidth,
          startY + row * cellHeight,
          cellWidth,
          cellHeight
        );
        ctx2.fillText(
          numberGrid[row][col],
          startX + col * cellWidth + cellWidth / 2,
          startY + row * cellHeight + cellHeight / 2
        );
        ctx.stroke();
        ctx2.stroke();
      }
    }
    //diagonal 2 resullt
    ctx.rect(
      startX + 10 + col * cellWidth,
      startY - cellHeight + 0 * cellHeight,
      cellWidth,
      cellHeight
    );
    ctx.fillText(
      diag2,
      startX + 10 + col * cellWidth + cellWidth / 2,
      startY - cellHeight + 0 * cellHeight + cellHeight / 2
    );
    ctx2.rect(
      startX + 10 + col * cellWidth,
      startY - cellHeight + 0 * cellHeight,
      cellWidth,
      cellHeight
    );
    ctx2.fillText(
      diag2,
      startX + 10 + col * cellWidth + cellWidth / 2,
      startY - cellHeight + 0 * cellHeight + cellHeight / 2
    );
    ctx.stroke();
    ctx2.stroke();

    // right-left sum
    for (row = 0; row < blockSize; row++) {
      ctx.rect(
        startX + 10 + col * cellWidth,
        startY + row * cellHeight,
        cellWidth,
        cellHeight
      );
      ctx.fillText(
        rowSum[row],
        startX + 10 + col * cellWidth + cellWidth / 2,
        startY + row * cellHeight + cellHeight / 2
      );
      ctx2.rect(
        startX + 10 + col * cellWidth,
        startY + row * cellHeight,
        cellWidth,
        cellHeight
      );
      ctx2.fillText(
        rowSum[row],
        startX + 10 + col * cellWidth + cellWidth / 2,
        startY + row * cellHeight + cellHeight / 2
      );
      ctx.stroke();
      ctx2.stroke();
    }
    // top-bottom sup
    for (col = 0; col < blockSize; col++) {
      ctx.rect(
        startX + col * cellWidth,
        startY + 10 + row * cellHeight,
        cellWidth,
        cellHeight
      );
      ctx.fillText(
        colSum[col],
        startX + col * cellWidth + cellWidth / 2,
        startY + 10 + row * cellHeight + cellHeight / 2
      );
      ctx2.rect(
        startX + col * cellWidth,
        startY + 10 + row * cellHeight,
        cellWidth,
        cellHeight
      );
      ctx2.fillText(
        colSum[col],
        startX + col * cellWidth + cellWidth / 2,
        startY + 10 + row * cellHeight + cellHeight / 2
      );
      ctx.stroke();
      ctx2.stroke();
    }
    // diagonal 1 sum
    ctx.rect(
      startX + 10 + col * cellWidth,
      startY + 10 + row * cellHeight,
      cellWidth,
      cellHeight
    );
    ctx.fillText(
      diag1,
      startX + 10 + col * cellWidth + cellWidth / 2,
      startY + 10 + row * cellHeight + cellHeight / 2
    );
    ctx2.rect(
      startX + 10 + col * cellWidth,
      startY + 10 + row * cellHeight,
      cellWidth,
      cellHeight
    );
    ctx2.fillText(
      diag1,
      startX + 10 + col * cellWidth + cellWidth / 2,
      startY + 10 + row * cellHeight + cellHeight / 2
    );
    ctx.stroke();
    ctx2.stroke();

    //print the clue numbers
    for (var n = 0; n < numberBlockClueNo; n++) {
      clueCells = clueIdx[n];
      row = clueCells[0];
      col = clueCells[1];
      ctx.fillText(
        numberGrid[row][col],
        startX + col * cellWidth + cellWidth / 2,
        startY + row * cellHeight + cellHeight / 2
      );
    }
  }
  // function to show the answer
  function showNumberAnswer() {
    var answerCanvas = document.getElementById("answer-canvas");
    var puzzleCanvas = document.getElementById("puzzle-canvas");
    var btnAnswer = document.getElementById("btnAnswer");
    if (
      answerCanvas.style.visibility === "" ||
      answerCanvas.style.visibility === "hidden"
    ) {
      answerCanvas.style.visibility = "visible";
      puzzleCanvas.style.visibility = "hidden";
      btnAnswer.innerHTML = "HIDE ANSWER";
    } else {
      answerCanvas.style.visibility = "hidden";
      puzzleCanvas.style.visibility = "visible";
      btnAnswer.innerHTML = "SHOW ANSWER";
    }
  }
  /********************** Cryptogram Code Starts Here ************************
   * Functions
   * 1. fillCryptoData()
   * 2. processCryptoWords()
   * 3. makeCryptogram()
   * 4. showCryptoAnswer()
   */
  // this function fills the storage with sample data
  function fillCryptoData() {
    var data =
      "\"Don't cry because it's over, smile because it happened.\"– Dr. Seuss";
    setCryptoPhrase(data);
  }
  // this function process the user input and signals if the makeCryptogram can be called
  function processCryptoWords() {
    var message = cryptoPhrase.replace(/\s+/g, " ").trim();
    if (message.length < 10) {
      alert("Give at least 10 letters in the cryto phrase");
      return false;
    }
    var clueletter = cryptoClues.replace(/\s+/g, "").trim();
    if (clueletter.length < 2) {
      alert("Give at least 2 letters as clues");
      return false;
    }
    var area = document.getElementById("crypto-phrase");
    var lines = area.value.replace(/\s+/g, " ");
    setCryptoPhrase(lines);
    var noPunc = removePunctuations(lines);
    cryptoPhraseNoSpace.current = removeSpace(noPunc);
    return true;
  }
  // this is the cryptogram puzzle generator
  const makeCryptogram = () => {
    // usual canvas initialization
    var canvas = document.getElementById("puzzle-canvas");
    var ctx = canvas.getContext("2d");
    var canvas2 = document.getElementById("answer-canvas");
    var ctx2 = canvas2.getContext("2d");
    ctx.lineWidth = 2;
    ctx.font = "14px verdana";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx2.lineWidth = 2;
    ctx2.font = "14px verdana";
    ctx2.textBaseline = "middle";
    ctx2.fillStyle = "black";
    ctx2.textAlign = "center";
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);

    var startX = 50;
    var startY = 100;
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // A-Z alphabet letters
    var shuffledAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    while (
      shuffledAlphabet[0] === "A" ||
      shuffledAlphabet[shuffledAlphabet.length - 1] === "Z" // make sure first letter is not A and last letter is not Z
    )
      // to avoid being too predictable
      shuffledAlphabet = alphabet.shuffle(); // Shuffled A-Z alphabet letters
    ctx.beginPath();
    ctx2.beginPath(); // Draw the A-Z alphabet letters
    for (var i = 0; i < alphabet.length; i++) {
      ctx.rect(startX + i * 30, startY, 30, 30);
      ctx.stroke();
      ctx.fillText(alphabet[i], startX + i * 30 + 15, startY + 15);
      ctx2.rect(startX + i * 30, startY, 30, 30);
      ctx2.stroke();
      ctx2.fillText(alphabet[i], startX + i * 30 + 15, startY + 15);
    }
    ctx2.fillStyle = "gray";
    for (i = 0; i < alphabet.length; i++) {
      ctx.rect(startX + i * 30, startY + 30, 30, 30);
      ctx.stroke();
      ctx2.rect(startX + i * 30, startY + 30, 30, 30);
      ctx2.stroke();
      if (cryptoOption === 1) {
        // if option one is selected, then print the answer letters' crypto number
        var x = shuffledAlphabet.indexOf(alphabet[i]);
        ctx2.fillText(x + 1, startX + i * 30 + 15, startY + 30 + 15);
      }
      if (cryptoOption === 2) {
        // if option two is selected, then print the answer letters themselves
        ctx2.fillText(
          shuffledAlphabet[i],
          startX + i * 30 + 15,
          startY + 30 + 15
        );
      }
    }
    for (i = 0; i < cryptoClues.length; i++) {
      if (cryptoOption === 1) {
        // if option 1 is selected, then print the clue letter's crypto number
        var cellIndex = alphabet.indexOf(cryptoClues[i].toUpperCase());
        x = shuffledAlphabet.indexOf(cryptoClues[i].toUpperCase());
        ctx.fillText(x + 1, startX + cellIndex * 30 + 15, startY + 30 + 15);
      }
      if (cryptoOption === 2) {
        // if option 2 is seleccted, then print the clue letters themselves
        cellIndex = alphabet.indexOf(cryptoClues[i].toUpperCase());
        ctx.fillText(
          shuffledAlphabet[cellIndex],
          startX + cellIndex * 30 + 15,
          startY + 30 + 15
        );
      }
    }

    var answerY = startY + 100;
    var lettersPerLine = 26;
    var lineNo = Math.floor(cryptoPhrase.length / lettersPerLine);
    // now print the answers that sit below the puzzle
    for (var n = 0; n <= lineNo; n++) {
      for (i = 0; i < lettersPerLine; i++) {
        if (cryptoPhrase[i + n * lettersPerLine] === undefined) break;
        var cl = cryptoClues.toUpperCase();
        var cryptoPhraseUpper = cryptoPhrase.toUpperCase();
        if (cl.includes(cryptoPhraseUpper[i + n * lettersPerLine]))
          ctx.fillText(
            cryptoPhraseUpper[i + n * lettersPerLine],
            startX + i * 30 + 15,
            answerY + n * 50 + 15
          );
        ctx2.fillText(
          cryptoPhraseUpper[i + n * lettersPerLine],
          startX + i * 30 + 15,
          answerY + n * 50 + 15
        );
        if (isCharacterALetter(cryptoPhraseUpper[i + n * lettersPerLine])) {
          ctx.moveTo(startX + i * 30 + 5, answerY + n * 50 + 30);
          ctx.lineTo(startX + i * 30 + 25, answerY + n * 50 + 30);
          ctx.stroke();
          ctx2.moveTo(startX + i * 30 + 5, answerY + n * 50 + 30);
          ctx2.lineTo(startX + i * 30 + 25, answerY + n * 50 + 30);
          ctx2.stroke();
          if (cryptoOption === 1) {
            x = shuffledAlphabet.indexOf(
              cryptoPhraseUpper[i + n * lettersPerLine]
            );
            ctx.fillText(
              x + 1,
              startX + i * 30 + 15,
              answerY + n * 50 + 30 + 10
            );
            ctx2.fillText(
              x + 1,
              startX + i * 30 + 15,
              answerY + n * 50 + 30 + 10
            );
          }
          if (cryptoOption === 2) {
            x = alphabet.indexOf(cryptoPhraseUpper[i + n * lettersPerLine]);
            ctx.fillText(
              shuffledAlphabet[x],
              startX + i * 30 + 15,
              answerY + n * 50 + 30 + 10
            );
            ctx2.fillText(
              shuffledAlphabet[x],
              startX + i * 30 + 15,
              answerY + n * 50 + 30 + 10
            );
          }
        }
      }
    }
  };
  // function to show the crypto answer
  function showCryptoAnswer() {
    var answerCanvas = document.getElementById("answer-canvas");
    var puzzleCanvas = document.getElementById("puzzle-canvas");
    var btnAnswer = document.getElementById("btnAnswer");
    if (
      answerCanvas.style.visibility === "" ||
      answerCanvas.style.visibility === "hidden"
    ) {
      answerCanvas.style.visibility = "visible";
      puzzleCanvas.style.visibility = "hidden";
      btnAnswer.innerHTML = "HIDE ANSWER";
    } else {
      answerCanvas.style.visibility = "hidden";
      puzzleCanvas.style.visibility = "visible";
      btnAnswer.innerHTML = "SHOW ANSWER";
    }
  }

  // render jsx code starts here
  // React's html rendering code
  return (
    <div className="App" id="app">
      <div className="topArea">
        <img src={logo} alt="Logo" />
      </div>
      <div className="container">
        <div className="row">
          <div className="column-left">
            <div>
              <button id="creator" className="button">
                Creator
              </button>
            </div>
          </div>
          <div className="column-left2">
            <div className="btn-group">
              <button
                id="search"
                onClick={(e) => {
                  if (currentPuzzle.current === "search") return;
                  currentPuzzle.current = "search";
                  clearCanvas();
                  setSearchTitle("New Word Search Puzzle");
                  setSearchWords("Enter puzzle words or clues");
                  prepareSettings("search-settings");
                }}
              >
                Word Search
              </button>
              <button
                id="cross"
                onClick={(e) => {
                  if (currentPuzzle.current === "cross") return;
                  currentPuzzle.current = "cross";
                  clearCanvas();
                  prepareSettings("cross-settings");
                }}
              >
                Cross Word
              </button>
              <button
                id="double"
                onClick={(e) => {
                  if (currentPuzzle.current === "double") return;
                  currentPuzzle.current = "double";
                  clearCanvas();
                  prepareSettings("double-settings");
                }}
              >
                Double Puzzle
              </button>
              <button
                id="fallen"
                onClick={(e) => {
                  if (currentPuzzle.current === "fallen") return;
                  currentPuzzle.current = "fallen";
                  clearCanvas();
                  prepareSettings("fallen-settings");
                }}
              >
                Fallen Phrase
              </button>
              <button
                id="math"
                onClick={(e) => {
                  if (currentPuzzle.current === "math") return;
                  currentPuzzle.current = "math";
                  clearCanvas();
                  prepareSettings("math-settings");
                }}
              >
                Math Squares
              </button>
              <button
                id="letter"
                onClick={(e) => {
                  if (currentPuzzle.current === "letter") return;
                  currentPuzzle.current = "letter";
                  clearCanvas();
                  prepareSettings("letter-settings");
                }}
              >
                Letter Tiles
              </button>
              <button
                id="number"
                onClick={(e) => {
                  if (currentPuzzle.current === "number") return;
                  currentPuzzle.current = "number";
                  clearCanvas();
                  prepareSettings("numberblock-settings");
                }}
              >
                Number Blocks
              </button>
              <button
                id="hidden"
                onClick={(e) => {
                  if (currentPuzzle.current === "hidden") return;
                  currentPuzzle.current = "hidden";
                  clearCanvas();
                  prepareSettings("hidden-settings");
                }}
              >
                Hidden Message
              </button>
              <button
                id="crypto"
                onClick={(e) => {
                  if (currentPuzzle.current === "crypto") return;
                  currentPuzzle.current = "crypto";
                  clearCanvas();
                  prepareSettings("crypto-settings");
                }}
              >
                Cryptogram
              </button>
            </div>
          </div>
          <div id="puzzle-data" className="column-middle">
            <div id="cross-settings">
              <h3>Criss-Cross Puzzle</h3>
              <p>
                To create your criss-cross puzzle, follow the steps below and
                click the "Create My Puzzle" button when you are done.
              </p>
              <h5>1. Enter Puzzle Title</h5>
              <p>
                The title will appear at the top of your page. (24 characters or
                fewer.)
              </p>
              <input
                type="text"
                size="25"
                className="textinput"
                value={crossTitle}
                placeholder={crossTitle}
                onChange={(e) => {
                  setCrossTitle((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>2. Enter Your Words and Clues</h5>
              <p>
                On each line enter a word followed by a comma and then the clue
                for that word. Press enter to go to next line.
              </p>
              <textarea
                id="cross-words"
                name="words"
                rows="5"
                cols="40"
                value={crossWords}
                placeholder={crossWords}
                spellCheck="false"
                onChange={(e) => {
                  setCrossWords(e.target.value);
                }}
              ></textarea>
              <a
                href="/"
                onClick={(ev) => {
                  ev.preventDefault();
                  fillCrossData();
                }}
              >
                <p>Fill with sample data</p>
              </a>
              <h5>3. Show instructions</h5>
              <input
                type="checkbox"
                id="instructions"
                name="instructions"
                checked={putInstructions}
                onChange={(e) => {
                  if (putInstructions)
                    document.getElementById("instruction").style.visibility =
                      "hidden";
                  else
                    document.getElementById("instruction").style.visibility =
                      "visible";
                  setPutInstructions(e.target.checked);
                  //console.log(e);
                }}
              ></input>
              <label htmlFor="instructions">
                {" "}
                Check this box if you want instructions to appear above the
                puzzle.
              </label>
              <br></br>
              <br></br>
              <button
                id="createCross"
                className="button"
                onClick={(e) => {
                  if (processCrossWords()) {
                    preparePuzzle(crossInstructiions, "clues", "cross");
                    resetCanvas();
                  }
                }}
              >
                CREAT MY PUZZLE
              </button>
              <br></br>
              <br></br>
            </div>
            <div id="numberblock-settings">
              <h3>Number Blocks Puzzle</h3>
              <p>
                To create your number blocks puzzle, follow the steps below and
                click the "Create My Puzzle" button when you are done.
              </p>
              <h5>1. Enter a title for your puzzle</h5>
              <p>
                The title will appear at the top of your page. (24 characters or
                fewer.)
              </p>
              <input
                type="text"
                size="50"
                className="textinput"
                value={numberBlocksTitle}
                placeholder={numberBlocksTitle}
                onChange={(e) => {
                  setNumberBlocksTitle((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>2. Enter the size of your number block</h5>
              <p>
                Your number block can be as small as 3 x 3 or as large as 10 x
                10. Enter a number below.
              </p>
              <input
                type="text"
                size="5"
                className="textinput"
                value={blockSize}
                placeholder={blockSize}
                onChange={(e) => {
                  setBlockSize((pre) => (pre = e.target.value));
                  // setUpperNumber(e.target.value * e.target.value);
                }}
              ></input>
              <br></br>
              <h5>3. Enter a range for the numbers that will fill the grid</h5>
              <p>
                Specify the range of numbers for the values of the grid. The
                smaller the range of numbers, the easier the puzzle.
              </p>
              <input
                type="text"
                size="5"
                className="textinput"
                value={minNumber}
                placeholder={"Minimum " + minNumber}
                onChange={(e) => {
                  setMinNumber((pre) => (pre = e.target.value));
                }}
              ></input>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                size="5"
                className="textinput"
                value={maxNumber}
                placeholder={"Maximum " + maxNumber}
                onChange={(e) => {
                  setMaxNumber((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>4. Giveaway some numbers?</h5>
              <p>
                To make the puzzle a little easier you can choose to fill in
                some of the numbers to start.
              </p>
              <input
                type="text"
                size="5"
                className="textinput"
                value={numberBlockClueNo}
                placeholder={numberBlockClueNo}
                onChange={(e) => {
                  setNumberBlockClueNo((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>5. Show instructions</h5>
              <input
                type="checkbox"
                id="numberblock-instruction"
                name="numberblock-instructions"
                checked={putInstructions}
                onChange={(e) => {
                  if (putInstructions)
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "none";
                  else
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "block";
                  setPutInstructions(e.target.checked);
                }}
              ></input>
              <label htmlFor="numberblock-instruction">
                {" "}
                Check this box if you want instructions to appear above the
                puzzle.
              </label>
              <br></br>
              <br></br>
              <button
                id="createNumberBlock"
                className="button"
                onClick={(e) => {
                  if (processNumberBlocks()) {
                    preparePuzzle(numberBlockInstructions, "clues", "number");
                    resetCanvas();
                  }
                }}
              >
                CREAT MY PUZZLE
              </button>
              <br></br>
              <br></br>
            </div>
            <div id="letter-settings">
              <h3>Letter Tiles Puzzle</h3>
              <p>
                To create your letter tiles puzzle, follow the steps below and
                click the "Create My Puzzle" button when you are done.
              </p>
              <h5>1. Enter a title for your puzzle</h5>
              <p>
                The title will appear at the top of your page. (24 characters or
                fewer.)
              </p>
              <input
                type="text"
                size="50"
                className="textinput"
                value={letterTitle}
                placeholder={letterTitle}
                onChange={(e) => {
                  setLetterTitle((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>2. Enter the phrase</h5>
              <p>Enter the phrase to be scrambled.</p>
              <textarea
                id="letter-words"
                name="letter"
                rows="5"
                cols="40"
                value={letterPhrase}
                placeholder="Write the phrase here."
                spellCheck="false"
                onChange={(e) => {
                  var ip = e.target.value;
                  setLetterPhrase(ip);
                }}
              ></textarea>
              <a
                href="/"
                onClick={(ev) => {
                  ev.preventDefault();
                  fillLetterData();
                }}
              >
                <p>Fill with sample data</p>
              </a>
              <h5>3. How many letters should be on each tile?</h5>
              <p>Three is a typical number</p>
              <input
                type="radio"
                id="letter-option1"
                name="letterOption"
                checked={numberOfLetter === 2 ? true : false}
                onChange={(e) => {
                  setNumberOfLetter(2);
                }}
              ></input>
              <label htmlFor="letter-option1">Two</label>
              <br></br>
              <input
                type="radio"
                id="letter-option2"
                name="letterOption"
                checked={numberOfLetter === 3 ? true : false}
                onChange={(e) => {
                  setNumberOfLetter(3);
                }}
              ></input>
              <label htmlFor="letter-option2">Three</label>
              <br></br>
              <input
                type="radio"
                id="letter-option3"
                name="letterOption"
                checked={numberOfLetter === 4 ? true : false}
                onChange={(e) => {
                  setNumberOfLetter(4);
                }}
              ></input>
              <label htmlFor="letter-option3">Four</label>
              <br></br>
              <h5>4. Show the answer area</h5>
              <input
                type="checkbox"
                id="letter-answer"
                name="letter-answer"
                checked={showLetterAnswerArea}
                onChange={(e) => {
                  setShowLetterAnswerArea(e.target.checked);
                }}
              ></input>
              <label htmlFor="letter-answer">
                Check this box if you want empty boxes to appear below the
                tiles. These boxes will give the solver a place to write the
                letters.
              </label>
              <br></br>
              <h5>5. Show instructions</h5>
              <input
                type="checkbox"
                id="letter-instruction"
                name="letter-instructions"
                checked={putInstructions}
                onChange={(e) => {
                  if (putInstructions)
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "none";
                  else
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "block";
                  setPutInstructions(e.target.checked);
                }}
              ></input>
              <label htmlFor="letter-instruction">
                {" "}
                Check this box if you want instructions to appear above the
                puzzle.
              </label>
              <br></br>
              <br></br>
              <button
                id="createLetter"
                className="button"
                onClick={(e) => {
                  if (processLetterTiles()) {
                    preparePuzzle(letterInstructions, "clues", "letter");
                    resetCanvas();
                  }
                }}
              >
                CREAT MY PUZZLE
              </button>
              <br></br>
              <br></br>
            </div>
            <div id="math-settings">
              <h3>Math Squares Puzzle</h3>
              <p>
                To create your math squares puzzle, follow the steps below and
                click the "Create My Puzzle" button when you are done.
              </p>
              <h5>1. Enter a title for your puzzle</h5>
              <p>
                The title will appear at the top of your page. (24 characters or
                fewer.)
              </p>
              <input
                type="text"
                size="50"
                className="textinput"
                value={mathTitle}
                placeholder={mathTitle}
                onChange={(e) => {
                  setMathTitle((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>2. Enter the size of your math square</h5>
              <p>
                Your math square can be as small as 3 x 3 or as large as 10 x
                10. The dimensions must equal. Enter a number below.
              </p>
              <input
                type="text"
                size="5"
                className="textinput"
                value={squireSize}
                placeholder={squireSize}
                onChange={(e) => {
                  setSquireSize((pre) => (pre = e.target.value));
                  setUpperNumber(e.target.value * e.target.value);
                }}
              ></input>
              <br></br>
              <h5>3. Giveaway some numbers?</h5>
              <p>
                To make the puzzle a little easier you can choose to fill in
                some of the numbers to start.
              </p>
              <input
                type="text"
                size="5"
                className="textinput"
                value={mathClueNo}
                placeholder={mathClueNo}
                onChange={(e) => {
                  setMathClueNo((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>4. Choose the operators</h5>
              <p>
                Select the mathematical operators you would like to use.
                Addition may be used in some puzzles when not selected.
              </p>
              <input
                type="checkbox"
                id="math-addition"
                name="math-addition"
                checked={opAddition}
                onChange={(e) => {
                  setOpAddition(e.target.checked);
                }}
              ></input>
              <label htmlFor="math-addition">Addition</label>
              <br></br>
              <input
                type="checkbox"
                id="math-subtraction"
                name="math-subtraction"
                checked={opSubtraction}
                onChange={(e) => {
                  setOpSubtraction(e.target.checked);
                }}
              ></input>
              <label htmlFor="math-subtraction">Subtraction</label>
              <br></br>
              <input
                type="checkbox"
                id="math-multiplication"
                name="math-multiplication"
                checked={opMultiiplication}
                onChange={(e) => {
                  setOpMultiiplication(e.target.checked);
                }}
              ></input>
              <label htmlFor="math-multiplication">Multiplication</label>
              <br></br>
              <input
                type="checkbox"
                id="math-division"
                name="math-division"
                checked={opDivision}
                onChange={(e) => {
                  setOpDivision(e.target.checked);
                }}
              ></input>
              <label htmlFor="math-division">Division</label>
              <br></br>
              <h5>5. Show instructions</h5>
              <input
                type="checkbox"
                id="math-instruction"
                name="math-instructions"
                checked={putInstructions}
                onChange={(e) => {
                  if (putInstructions)
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "none";
                  else
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "block";
                  setPutInstructions(e.target.checked);
                }}
              ></input>
              <label htmlFor="fallen-instruction">
                {" "}
                Check this box if you want instructions to appear above the
                puzzle.
              </label>
              <br></br>
              <br></br>
              <button
                id="createMath"
                className="button"
                onClick={(e) => {
                  if (processMathSquares()) {
                    preparePuzzle(mathInstructions, "clues", "math");
                    resetCanvas();
                  }
                }}
              >
                CREAT MY PUZZLE
              </button>
              <br></br>
              <br></br>
            </div>
            <div id="fallen-settings">
              <h3>Fallen Phrase Puzzle</h3>
              <p>
                To create your fallen phrase puzzle, follow the steps below and
                click the "Create My Puzzle" button when you are done.
              </p>
              <h5>1. Enter a title for your puzzle</h5>
              <p>
                The title will appear at the top of your page. (24 characters or
                fewer.)
              </p>
              <input
                type="text"
                size="50"
                className="textinput"
                value={fallenTitle}
                placeholder={fallenTitle}
                onChange={(e) => {
                  setFallenTitle((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>2. Enter your phrase</h5>
              <p>
                Enter the phrase to be solved. The phrase must be at least 40
                characters long to property scramble the puzzle.
              </p>
              <textarea
                id="fallen-words"
                name="fallen"
                rows="5"
                cols="40"
                value={fallenWords}
                placeholder={fallenWords}
                spellCheck="false"
                onChange={(e) => {
                  var ip = e.target.value;
                  setFallenWords(ip.toUpperCase());
                }}
              ></textarea>
              <a
                href="/"
                onClick={(ev) => {
                  ev.preventDefault();
                  fillFallenData();
                }}
              >
                <p>Fill with sample data</p>
              </a>
              <h5>3. Giveaway a some letters?</h5>
              <p>
                To make the puzzle a little easier you can choose to fill in
                some of the letters to start.
              </p>
              <input
                type="text"
                size="5"
                className="textinput"
                value={fallenClueNo}
                placeholder={fallenClueNo}
                onChange={(e) => {
                  setFallenClueNo((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>5. Show instructions</h5>
              <input
                type="checkbox"
                id="fallen-instruction"
                name="fallen-instructions"
                checked={putInstructions}
                onChange={(e) => {
                  if (putInstructions)
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "none";
                  else
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "block";
                  setPutInstructions(e.target.checked);
                  //console.log(e);
                }}
              ></input>
              <label htmlFor="fallen-instruction">
                {" "}
                Check this box if you want instructions to appear above the
                puzzle.
              </label>
              <br></br>
              <br></br>
              <button
                id="createFallen"
                className="button"
                onClick={(e) => {
                  if (processFallenWords()) {
                    preparePuzzle(fallenInstructions, "clues", "fallen");
                    resetCanvas();
                  }
                }}
              >
                CREAT MY PUZZLE
              </button>
              <br></br>
              <br></br>
            </div>
            <div id="crypto-settings">
              <h3>Cryptogram Puzzle</h3>
              <p>
                To create your cryptogram puzzle, follow the steps below and
                click the "Create My Puzzle" button when you are done.
              </p>
              <h5>1. Enter a title for your puzzle</h5>
              <p>
                The title will appear at the top of your page. (24 characters or
                fewer.)
              </p>
              <input
                type="text"
                size="50"
                className="textinput"
                value={cryptoTitle}
                placeholder={"Enter Title"}
                onChange={(e) => {
                  setCryptoTitle(e.target.value);
                }}
              ></input>
              <br></br>
              <h5>2. Enter your phrase you want to encrypt</h5>
              <textarea
                id="crypto-phrase"
                name="crypto"
                rows="5"
                cols="40"
                value={cryptoPhrase}
                placeholder={"Enter Phrase"}
                spellCheck="false"
                onChange={(e) => {
                  var ip = e.target.value;
                  setCryptoPhrase(ip);
                }}
              ></textarea>
              <a
                href="/"
                onClick={(ev) => {
                  ev.preventDefault();
                  fillCryptoData();
                }}
              >
                <p>Fill with sample data</p>
              </a>
              <h5>3. Choose a character style</h5>
              <p>
                Pick the type of characters you want to use to replace the
                letters in the phrase.
              </p>
              <input
                type="radio"
                id="crypto-option1"
                name="cryptoOption"
                checked={cryptoOption === 1 ? true : false}
                onChange={(e) => {
                  setCryptoOption(1);
                }}
              ></input>
              <label htmlFor="crypto-option1">Numbers</label>
              <br></br>
              <input
                type="radio"
                id="crypto-option2"
                name="cryptoOption"
                checked={cryptoOption === 2 ? true : false}
                onChange={(e) => {
                  setCryptoOption(2);
                }}
              ></input>
              <label htmlFor="crypto-option2">English Letters</label>
              <br></br>
              <h5>4. Giveaway a some letters?</h5>
              <p>
                You can choose to give away some of the letters in the
                cryptogram to give the solver a head start. Enter the letters
                you want to give away below.
              </p>
              <input
                type="text"
                size="20"
                className="textinput"
                value={cryptoClues}
                placeholder={"Enter letters"}
                onChange={(e) => {
                  setCryptoClues(e.target.value);
                }}
              ></input>
              <br></br>
              <h5>5. Show instructions</h5>
              <input
                type="checkbox"
                id="crypto-instruction"
                name="crypto-instructions"
                checked={putInstructions}
                onChange={(e) => {
                  if (putInstructions)
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "none";
                  else
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "block";
                  setPutInstructions(e.target.checked);
                }}
              ></input>
              <label htmlFor="crypto-instruction">
                {" "}
                Check this box if you want instructions to appear above the
                puzzle.
              </label>
              <br></br>
              <br></br>
              <button
                id="createCrypto"
                className="button"
                onClick={(e) => {
                  if (processCryptoWords()) {
                    preparePuzzle(cryptoInstructions, "clues", "crypto");
                    resetCanvas();
                  }
                }}
              >
                CREAT MY PUZZLE
              </button>
              <br></br>
              <br></br>
            </div>

            <div id="double-settings">
              <h3>Double Puzzle</h3>
              <p>
                To create your double puzzle, follow the steps below and click
                the "Create My Puzzle" button when you are done.
              </p>
              <h5>1. Enter a title for your puzzle</h5>
              <p>
                The title will appear at the top of your page. (24 characters or
                fewer.)
              </p>
              <input
                type="text"
                size="50"
                className="textinput"
                value={doubleTitle}
                placeholder={doubleTitle}
                onChange={(e) => {
                  setDoubleTitle((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>2. Enter your words</h5>
              <p>Enter each word or phrase on its own line.</p>
              <textarea
                id="double-words"
                name="double"
                rows="5"
                cols="40"
                value={doubleWords}
                placeholder={doubleWords}
                spellCheck="false"
                onChange={(e) => {
                  var ip = e.target.value;
                  setDoubleWords(ip.toUpperCase());
                }}
              ></textarea>
              <a
                href="/"
                onClick={(ev) => {
                  ev.preventDefault();
                  fillDoubleData();
                }}
              >
                <p>Fill with sample data</p>
              </a>
              <h5>3. Enter the final word or phrase for your puzzle</h5>
              <p>
                Enter the word or phrase that will be created by combining the
                letters from the words input in the box above.
              </p>
              <input
                type="text"
                size="50"
                className="textinput"
                value={finalWord}
                placeholder={finalWord}
                onChange={(e) => {
                  var ip = e.target.value;
                  setFinalWord((pre) => (pre = ip.toUpperCase()));
                }}
              ></input>
              <a
                href="/"
                onClick={(ev) => {
                  ev.preventDefault();
                  fillFinalWord();
                }}
              >
                <p>Fill with sample data</p>
              </a>
              <h5>4. Numbered or scrambled phrase</h5>
              <p>
                The final phrase is made up of letters from the clue words you
                input above. The letters can be scrambled, giving the solver
                another challenge, or the letters can be numbered, making the
                puzzle a little easier to solve.
              </p>
              <input
                type="radio"
                id="double-option1"
                name="doubleOption"
                checked={doubleOption === 1 ? true : false}
                onChange={(e) => {
                  setDoubeOption(1);
                }}
              ></input>
              <label htmlFor="double-option1">
                Scrambled (this option is best for short words)
              </label>
              <br></br>
              <input
                type="radio"
                id="double-option2"
                name="doubleOption"
                checked={doubleOption === 2 ? true : false}
                onChange={(e) => {
                  setDoubeOption(2);
                }}
              ></input>
              <label htmlFor="double-option2">
                Numbered (this option is best for longer phrases, names or
                unusual words)
              </label>
              <br></br>
              <h5>5. Show instructions</h5>
              <input
                type="checkbox"
                id="double-instruction"
                name="double-instructions"
                checked={putInstructions}
                onChange={(e) => {
                  if (putInstructions)
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "none";
                  else
                    document.getElementById(
                      "puzzle-instructions"
                    ).style.display = "block";
                  setPutInstructions(e.target.checked);
                  //console.log(e);
                }}
              ></input>
              <label htmlFor="double-instruction">
                {" "}
                Check this box if you want instructions to appear above the
                puzzle.
              </label>
              <br></br>
              <br></br>
              <button
                id="createDouble"
                className="button"
                onClick={(e) => {
                  if (processDoubleWords()) {
                    preparePuzzle(doubleInstructions, "clues", "double");
                    resetCanvas();
                  }
                }}
              >
                CREAT MY PUZZLE
              </button>
              <br></br>
              <br></br>
            </div>
            <div id="hidden-settings">
              <h3>Hidden Message Puzzle</h3>
              <p>
                To create your hidden message puzzle, follow the steps below and
                click the “Create My Puzzle” button when you are done.
              </p>
              <h5>1. Enter a title for your puzzle</h5>
              <p>
                The title will appear at the top of your page. (24 characters or
                fewer.)
              </p>
              <input
                type="text"
                size="50"
                className="textinput"
                value={hiddenTitle}
                placeholder={"Enter Title"}
                onChange={(e) => {
                  setHideenTitle((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>2. Enter the message to be hidden in your puzzle</h5>
              <p>
                The letters in the message will be hidden between the words you
                input below. When the person solving the puzzle finds all the
                words, the hidden message will be revealed.
              </p>
              <input
                type="text"
                size="50"
                className="textinput"
                value={hiddenMessage}
                placeholder={"Enter the hidden message"}
                onChange={(e) => {
                  setHiddenMessage((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <button
                className="buttonSmall"
                onClick={(e) => {
                  var sw = "Let's go to the zoo!";
                  setHiddenMessage(sw);
                }}
              >
                Fill with Sample Data
              </button>
              <br></br>
              <h5>3. Enter the size of your word search puzzle</h5>
              <p>
                Your puzzle can be up to 40 letters by 40 letters and still fit
                on one page. The optimum puzzle size is 15 letters by 15
                letters.
              </p>
              <div className="sameLine">
                <p>Number of Letters </p>
                <input
                  type="text"
                  size="10"
                  className="textinput"
                  value={letterAcross}
                  placeholder={letterAcross}
                  onChange={(e) => {
                    setAcross((pre) => (pre = e.target.value));
                    setDown((pre) => (pre = e.target.value));
                  }}
                ></input>
              </div>
              <br></br>
              <h5>4. Case Options</h5>
              <p>
                Choose if you would like your puzzle to be built using all
                uppercase, all lowercase or mixed case letters.
              </p>
              <input
                type="radio"
                id="option-upper"
                name="caseoption"
                checked={caseOption === 1 ? true : false}
                onChange={(e) => {
                  setCaseOption(1);
                }}
              ></input>
              <label htmlFor="option-upper">All Uppercase Letters</label>
              <br></br>
              <input
                type="radio"
                id="option-mixed"
                name="caseoption"
                checked={caseOption === 2 ? true : false}
                onChange={(e) => {
                  setCaseOption(2);
                }}
              ></input>
              <label htmlFor="option-mixed">
                Mixed Uppercase and Lowercase Letters
              </label>
              <br></br>
              <input
                type="radio"
                id="option-lower"
                name="caseoption"
                checked={caseOption === 3 ? true : false}
                onChange={(e) => {
                  setCaseOption(3);
                }}
              ></input>
              <label htmlFor="option-lower">All Lowercase Letters</label>
              <br></br>
              <h5>5. Enter your words</h5>
              <p>Separate your words with a single space.</p>
              <textarea
                id="hidden-search-words"
                name="hidden-search-words"
                rows="3"
                cols="40"
                value={hiddenSearchWords}
                placeholder={"Enter puzzle words or clues"}
                spellCheck="false"
                onChange={(e) => {
                  setHiddenSearchWords(e.target.value);
                }}
              ></textarea>
              <br></br>
              <button
                className="buttonSmall"
                onClick={(e) => {
                  var sw =
                    "Penguin Goat Panda Giraffe PolarBear Lion Tiger Elephant Meerkat Bear Toad Frog Alligator Stork Monkey";
                  setHiddenSearchWords(sw);
                }}
              >
                Fill with Sample Data
              </button>
              <br></br>
              <br></br>
              <h5>6. Show instructions</h5>
              <input
                type="checkbox"
                id="instructions"
                name="instructions"
                checked={putInstructions}
                onChange={(e) => {
                  setPutInstructions(e.target.checked);
                }}
              ></input>
              <label htmlFor="instructions">
                {" "}
                Check this box if you want instructions to appear below the
                puzzle.
              </label>
              <br></br>
              <button
                className="button"
                onClick={(e) => {
                  if (processHiddenMessage()) {
                    preparePuzzle(hiddenInstructions, "no clues", "hidden");
                    console.log(searchGrid.current);
                  }

                  resetCanvas();
                  console.log(searchGrid.current);
                }}
              >
                Create My Puzzle
              </button>
              <br></br>
              <br></br>
            </div>

            <div id="search-settings">
              <h3>Word Search Puzzle</h3>
              <p>
                To create your word search puzzle, follow the steps below and
                click the “Create My Puzzle” button when you are done.
              </p>
              <h5>1. Enter a title for your puzzle</h5>
              <p>
                The title will appear at the top of your page. (24 characters or
                fewer.)
              </p>
              <input
                type="text"
                size="50"
                className="textinput"
                value={searchTitle}
                placeholder={searchTitle}
                onChange={(e) => {
                  setSearchTitle((pre) => (pre = e.target.value));
                }}
              ></input>
              <br></br>
              <h5>2. Enter the size of your word search puzzle</h5>
              <p>
                Your puzzle can be up to 40 letters by 40 letters and still fit
                on one page. The optimum puzzle size is 15 letters by 15
                letters.
              </p>
              <div className="sameLine">
                <p>Number of Letters </p>
                <input
                  type="text"
                  size="10"
                  className="textinput"
                  value={letterAcross}
                  placeholder={letterAcross}
                  onChange={(e) => {
                    setAcross((pre) => (pre = e.target.value));
                    setDown((pre) => (pre = e.target.value));
                  }}
                ></input>
              </div>
              <br></br>
              <h5>3. Word search puzzle options</h5>
              <p>
                Puzzles where the words do not share any letters are faster to
                generate and easier to solve. If you choose to share letters as
                much as possible, the computer will take a little longer to
                generate the puzzle.
              </p>
              <input
                type="radio"
                id="search-option1"
                name="searchOption"
                checked={searchOption === 1 ? true : false}
                //value={searchOption}
                onChange={(e) => {
                  setSearchOption(1);
                  //console.log(e.target.value + 1);
                }}
              ></input>
              <label htmlFor="search-option1">Use each letter only once.</label>
              <br></br>
              <input
                type="radio"
                id="search-option2"
                name="searchOption"
                //value={searchOption}
                checked={searchOption === 2 ? true : false}
                onChange={(e) => {
                  setSearchOption(2);
                  //console.log(e.target.value + 2);
                }}
              ></input>
              <label htmlFor="search-option2">
                Share letters occasionally.
              </label>
              <br></br>
              <input
                type="radio"
                id="search-option3"
                name="searchOption"
                checked={searchOption === 3 ? true : false}
                onChange={(e) => {
                  setSearchOption(3);
                }}
              ></input>
              <label htmlFor="search-option3">
                Share letters as much as possible.
              </label>
              <br></br>
              <h5>4. Case Options</h5>
              <p>
                Choose if you would like your puzzle to be built using all
                uppercase, all lowercase or mixed case letters.
              </p>
              <input
                type="radio"
                id="option-upper"
                name="caseoption"
                checked={caseOption === 1 ? true : false}
                onChange={(e) => {
                  setCaseOption(1);
                }}
              ></input>
              <label htmlFor="option-upper">All Uppercase Letters</label>
              <br></br>
              <input
                type="radio"
                id="option-mixed"
                name="caseoption"
                checked={caseOption === 2 ? true : false}
                onChange={(e) => {
                  setCaseOption(2);
                }}
              ></input>
              <label htmlFor="option-mixed">
                Mixed Uppercase and Lowercase Letters
              </label>
              <br></br>
              <input
                type="radio"
                id="option-lower"
                name="caseoption"
                checked={caseOption === 3 ? true : false}
                onChange={(e) => {
                  setCaseOption(3);
                }}
              ></input>
              <label htmlFor="option-lower">All Lowercase Letters</label>
              <br></br>
              <h5>6. Enter your words</h5>
              <p>Separate your words with a single space.</p>
              <textarea
                id="search-words"
                name="searchwords"
                rows="3"
                cols="40"
                value={searchWords}
                placeholder={searchWords}
                spellCheck="false"
                onChange={(e) => {
                  setSearchWords(e.target.value);
                }}
              ></textarea>
              <br></br>
              <button
                className="buttonSmall"
                onClick={(e) => {
                  var sw =
                    "Penguin Goat Panda Giraffe PolarBear Lion Tiger Elephant Meerkat Bear Toad Frog Alligator Stork Monkey";
                  setSearchWords(sw);
                }}
              >
                Fill with Sample Data
              </button>
              <br></br>
              <br></br>
              <h5>7. Show instructions</h5>
              <input
                type="checkbox"
                id="instructions"
                name="instructions"
                checked={putInstructions}
                onChange={(e) => {
                  setPutInstructions(e.target.checked);
                  //console.log(e);
                }}
              ></input>
              <label htmlFor="instructions">
                {" "}
                Check this box if you want instructions to appear below the
                puzzle.
              </label>
              <br></br>
              <button
                className="button"
                onClick={(e) => {
                  if (processSearchWords())
                    preparePuzzle(searchInstructions, "no clues", "search");
                  resetCanvas();
                }}
              >
                Create My Puzzle
              </button>
              <br></br>
              <br></br>
            </div>
          </div>
          <div className="column-right" id="div-puzzle-output">
            <div id="puzzle-operations">
              <button
                id="btnReload"
                className="hor-button"
                onClick={(e) => {
                  if (currentPuzzle.current === "cross") {
                    preparePuzzle(crossInstructiions, "no clues", "cross");
                  }
                  if (currentPuzzle.current === "search") {
                    preparePuzzle(searchInstructions, "no clues", "search");
                  }
                  if (currentPuzzle.current === "double") {
                    preparePuzzle(doubleInstructions, "no clues", "double");
                  }
                  if (currentPuzzle.current === "fallen") {
                    if (processFallenWords()) {
                      preparePuzzle(fallenInstructions, "clues", "fallen");
                    }
                  }
                  if (currentPuzzle.current === "math") {
                    if (processMathSquares()) {
                      preparePuzzle(mathInstructions, "clues", "math");
                    }
                  }
                  if (currentPuzzle.current === "letter") {
                    if (processLetterTiles()) {
                      preparePuzzle(letterInstructions, "clues", "letter");
                    }
                  }
                  if (currentPuzzle.current === "number") {
                    if (processNumberBlocks()) {
                      preparePuzzle(numberBlockInstructions, "clues", "number");
                    }
                  }
                  if (currentPuzzle.current === "hidden") {
                    console.log(searchGrid.current);
                    if (processHiddenMessage()) {
                      preparePuzzle(hiddenInstructions, "clues", "hidden");
                    }
                  }
                  if (currentPuzzle.current === "crypto") {
                    if (processCryptoWords()) {
                      preparePuzzle(cryptoInstructions, "clues", "crypto");
                    }
                  }
                  resetCanvas();
                }}
              >
                RELOAD PUZZLE
              </button>
              <button
                id="btnAnswer"
                className="hor-button"
                onClick={(e) => {
                  if (currentPuzzle.current === "cross") showCrossAnswer();
                  if (currentPuzzle.current === "search") showSearchAnswer();
                  if (currentPuzzle.current === "double") showDoubleAnswer();
                  if (currentPuzzle.current === "fallen") showFallenAnswer();
                  if (currentPuzzle.current === "math") showMathAnswer();
                  if (currentPuzzle.current === "letter") showLetterAnswer();
                  if (currentPuzzle.current === "number") showNumberAnswer();
                  if (currentPuzzle.current === "crypto") showCryptoAnswer();
                  if (currentPuzzle.current === "hidden") {
                    showHiddenAnswer();
                  }
                }}
              >
                SHOW ANSWER
              </button>
              <button
                id="btnPrint"
                className="hor-button"
                onClick={(e) => {
                  printPuzzle();
                }}
              >
                PRINT PUZZLE
              </button>
              <button
                id="btnCopyPuzzle"
                className="hor-button"
                onClick={(e) => {
                  writeClipCanvas("puzzle-canvas");
                }}
              >
                COPY PUZZLE
              </button>
              <button
                id="btnCopyAnswer"
                className="hor-button"
                onClick={(e) => {
                  writeClipCanvas("answer-canvas");
                }}
              >
                COPY ANSWER
              </button>
            </div>
            <div id="puzzle-instructions"></div>
            <div id="puzzle-container">
              <canvas id="puzzle-canvas" width={910} height={800}></canvas>
              <canvas id="answer-canvas" width={910} height={800}></canvas>
            </div>
            <div id="puzzle-clues"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
