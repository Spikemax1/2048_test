const createDiv = (parent, classElem)=>{
    let div = document.createElement('div');
    div.classList.add(classElem);
    parent.appendChild(div);
    return div;
}

document.addEventListener('DOMContentLoaded', ()=>{
    let main = createDiv(document.querySelector('body'), 'main');
    let game = createDiv(main, 'game');
    let header = createDiv(game, 'header');
    header.innerHTML = 'Score: ';
    let field = createDiv(game, 'field');
    
    let arrCell = [];
    for(let i = 0; i < 16; i++){
        let cell = createDiv(field, 'cell');
        arrCell.push(cell);
    }
    

    











});