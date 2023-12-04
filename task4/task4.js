let size = 0;
document.getElementById('refresh').addEventListener('click', change);
let cards = localStorage.getItem('cards');
if(cards){
    document.getElementById('refresh').removeAttribute('disabled');
    refresh();
}

function change(){
    localStorage.clear()
    let cards = localStorage.getItem('cards');
    if(cards){
        cards = JSON.parse(cards);
    }
    else {
        cards = [];
    }
    console.log(size);
    for(let i = 0; i < size; ++i){
        let div = document.getElementById(('div_' + i));
        console.log(div);
        if(!div.childNodes[5].childNodes[1].checked) {
            let name = div.childNodes[0].value;
            let text = div.childNodes[1].value;
            let src = div.childNodes[2].value;
            let code = div.childNodes[3].value;
            let post = div.childNodes[4].value;
            let card = {i, name, text, src, code, post};
            console.log(card);
            cards.push(card);
        }
    }
    localStorage.setItem('cards', JSON.stringify(cards));
    refresh();
}

document.getElementById('input').addEventListener("submit", start);

function start(){
    if(document.getElementById('refresh').hasAttribute('disabled')) {
        document.getElementById('refresh').removeAttribute('disabled');
    }
    let name = document.getElementById('name').value;
    let text = document.getElementById('text').value;
    let src = document.getElementById('src').value;
    let code = document.getElementById('code').value;
    let post = document.getElementById('post').value;

    let cards = localStorage.getItem('cards');
    if(cards){
        cards = JSON.parse(cards);
    }
    else {
        cards = [];
    }
    let i = cards.length;
    let card = {i, name, text, src, code, post};
    cards.push(card);
    //console.log(card);
    localStorage.setItem('cards', JSON.stringify(cards));
    //refresh();
}

function refresh(){
    document.getElementById('containers').innerHTML = '';
    let cards = localStorage.getItem('cards');
    cards = JSON.parse(cards);
    size = 0;
    cards.forEach((card) => {
        let html = '<div class="conm">' +
            '<img alt="pic" src="' + card.src + '"/>' +
            '<div id="div_' + card.i + '" class="con2">' +
            '<input required id="name" value="' + card.name + '" />' +
            '<input required id="text" value="' + card.text + '" />' +
            '<input required id="src" value="' + card.src + '" />' +
            '<input required id="code" value="' + card.code + '" />' +
            '<input required id="post" value="' + card.post + '" />' +
            '<label>Удалить<input type="checkbox"/></label>'+
            '</div>' +
            '</div>';
        document.getElementById('containers').innerHTML += html;
        size += 1;
    });
}