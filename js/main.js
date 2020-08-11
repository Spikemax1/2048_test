const createDiv = (parent, classElem)=>{
    let div = document.createElement('div');
    div.classList.add(classElem);
    parent.appendChild(div);
    return div;
}

document.addEventListener('DOMContentLoaded', ()=>{
    let arrCell = [];
    let width = 4;
    
    const createBoard = ()=>{
        let main = createDiv(document.querySelector('body'), 'main');
        let game = createDiv(main, 'game');
        let header = createDiv(game, 'header');
        header.innerHTML = 'Score: ';
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
        let randomNumber = Math.floor(Math.random() * Math.floor(arrCell.length));
        if(arrCell[randomNumber].innerHTML == ''){
            arrCell[randomNumber].innerHTML = 2;
        }else{generate()}
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
    













});