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
    
    













});