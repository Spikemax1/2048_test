const createDiv = (parent, classElem, elem = 'div')=>{
    elem = document.createElement(elem);
    if(classElem){
        elem.className = classElem;
    }
    
    parent.appendChild(elem);
    return elem;
}

document.addEventListener('DOMContentLoaded', ()=>{
    let arrCell = [];
    let width = 4;
    let score = 0;
    let displayScore;
    
    const createBoard = ()=>{
        let main = createDiv(document.querySelector('body'), 'main');
        let game = createDiv(main, 'game');
        let header = createDiv(game, 'header');
        let scoreTitle = createDiv(header, '', 'span');
        scoreTitle.innerHTML = 'Score: ';
        displayScore = createDiv(header, '', 'span');        
        displayScore.innerHTML = score;
        
        let field = createDiv(game, 'field');
        
        for(let i = 0; i < width * width; i++){
        let cell = createDiv(field, 'cell');
        arrCell.push(cell);
        }
        generate()
        generate()
    }
    createBoard();

    //generate a number randomly
    function generate(){
        if(!checkFullCells()){
            let randomNumber = Math.floor(Math.random() * Math.floor(arrCell.length));
            if(arrCell[randomNumber].innerHTML == ''){
                arrCell[randomNumber].innerHTML = 2;
                arrCell[randomNumber].classList.add('colored');
            }else{generate()}
            checkForWin();
            checkForGameOver();
        }
        
    }
    
    //swipe right
    function moveRight(){
        for(let i = 0; i < 16; i++){
            if(i % 4 == 0){
                let totalOne = parseInt(arrCell[i].innerHTML);
                let totalTwo = parseInt(arrCell[i+1].innerHTML);
                let totalThree = parseInt(arrCell[i+2].innerHTML);
                let totalFour = parseInt(arrCell[i+3].innerHTML);
                let row = [totalOne, totalTwo, totalThree, totalFour];


                let filteredRow = row.filter(num => num);
                
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill("");
                let newRow = zeros.concat(filteredRow);
                arrCell[i].innerHTML = newRow[0];
                arrCell[i+1].innerHTML = newRow[1];
                arrCell[i+2].innerHTML = newRow[2];
                arrCell[i+3].innerHTML = newRow[3];
            }
        }
    }

    //swipe left
    function moveLeft(){
        for(let i = 0; i < 16; i++){
            if(i % 4 == 0){
                let totalOne = parseInt(arrCell[i].innerHTML);
                let totalTwo = parseInt(arrCell[i+1].innerHTML);
                let totalThree = parseInt(arrCell[i+2].innerHTML);
                let totalFour = parseInt(arrCell[i+3].innerHTML);
                let row = [totalOne, totalTwo, totalThree, totalFour];                

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill("");
                let newRow = filteredRow.concat(zeros);
                arrCell[i].innerHTML = newRow[0];
                arrCell[i+1].innerHTML = newRow[1];
                arrCell[i+2].innerHTML = newRow[2];
                arrCell[i+3].innerHTML = newRow[3];
            }
        }
    }

    //sum rows
    function combineRow(){
        for(let i=0; i < 15; i++){
            if(arrCell[i].innerHTML === arrCell[i+1].innerHTML && arrCell[i].innerHTML != ''){
                let combinedTotal = parseInt(arrCell[i].innerHTML) + parseInt(arrCell[i+1].innerHTML);
                arrCell[i+1].innerHTML = combinedTotal;
                arrCell[i].innerHTML = '';
                score += combinedTotal;
                displayScore.innerHTML = score;
            }
        }
        checkForWin()
    }

    //sum columns
    function combineColumn(){
        for(let i=0; i < 12; i++){
            if(arrCell[i].innerHTML === arrCell[i+width].innerHTML && arrCell[i].innerHTML != ''){
                let combinedTotal = parseInt(arrCell[i].innerHTML) + parseInt(arrCell[i+width].innerHTML);
                arrCell[i+width].innerHTML = combinedTotal;
                arrCell[i].innerHTML = '';
                score += combinedTotal;
                displayScore.innerHTML = score;
            }
        }
        checkForWin()
    }

    //swipe down
  function moveDown(){
    for(let i=0; i< 4; i++){
        let totalOne = parseInt(arrCell[i].innerHTML);
        let totalTwo = parseInt(arrCell[i+width].innerHTML);
        let totalThree = parseInt(arrCell[i+width * 2].innerHTML);
        let totalFour = parseInt(arrCell[i+width * 3].innerHTML);
        let column = [totalOne, totalTwo, totalThree, totalFour];

        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill('');
        let newColumn = zeros.concat(filteredColumn);

        arrCell[i].innerHTML = newColumn[0];
        arrCell[i+width].innerHTML = newColumn[1];
        arrCell[i+width*2].innerHTML = newColumn[2];
        arrCell[i+width*3].innerHTML = newColumn[3];

    }
}
    //swipe up
    function moveUp(){
        for(let i=0; i< 4; i++){
            let totalOne = parseInt(arrCell[i].innerHTML);
            let totalTwo = parseInt(arrCell[i+width].innerHTML);
            let totalThree = parseInt(arrCell[i+width * 2].innerHTML);
            let totalFour = parseInt(arrCell[i+width * 3].innerHTML);
            let column = [totalOne, totalTwo, totalThree, totalFour];
    
            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = filteredColumn.concat(zeros);
    
            arrCell[i].innerHTML = newColumn[0];
            arrCell[i+width].innerHTML = newColumn[1];
            arrCell[i+width*2].innerHTML = newColumn[2];
            arrCell[i+width*3].innerHTML = newColumn[3];
    
        }
    }

    //assign keycodes
  function control(e) {
    if(e.keyCode === 39){
        keyRight()
    }else if(e.keyCode ===37){
        keyLeft()
    }else if(e.keyCode === 38){
        keyUp();
    }else if(e.keyCode === 40){
        keyDown();
    }

}
document.addEventListener('keyup', control);

    function keyRight(){
        moveRight();
        combineRow();
        moveRight();        
        generate();
    }

    function keyLeft(){
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyDown(){
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }
    function keyUp(){
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

//check for the number 2048 in the arrCell to win

function checkForWin(){
    for(let i=0; i < arrCell.length; i++){
        if(arrCell[i].innerHTML == '') arrCell[i].classList.remove('colored');
        else arrCell[i].classList.add('colored');

        if(arrCell[i].innerHTML == 2048){
            displayScore.innerHTML = 'You win!';
            document.removeEventListener('keyup', control);
        }
    }
}

//check if there are no zeros on the board to lose

function checkNoMove(){
    let result = false;
    let count = 0;
    for(let i = 0; i < width; i++){
        let arrRow = arrCell.slice(count, width+count);
        let arrCol = [arrCell[i], arrCell[i+width], arrCell[i+width*2], arrCell[i+width*3]];
        
        
        for(let k = 0; k < arrRow.length - 1; k++){
            if(arrRow[k].innerHTML == arrRow[k+1].innerHTML && arrRow[k].innerHTML != ''){
                result = true;
            }
        }
        count += width;

        for(let l = 0; l < arrCol.length-1; l++){
            if(arrCol[l].innerHTML == arrCol[l+1].innerHTML){
                result = true;
            } 
        }        
    }
    return result;    
}

function checkFullCells(){
    let num = 0;
    for(let cell of arrCell){
        if(cell.innerHTML != ''){
            num++;
        }
    }
    return num === 16 ? true : false;
}

function checkForGameOver(){
    console.log(checkNoMove())
    if(checkFullCells() && !checkNoMove()){
        displayScore.innerHTML = 'You lose!';
        document.removeEventListener('keyup', control);
    }
}



});