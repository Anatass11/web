let size = 0;
let url = 'http://localhost:3000/cards';
let info = 'http://localhost:3000/info';
document.getElementById('refresh').addEventListener('click', change);
async function start() {
    let response = await fetch(info);
    let json = await response.json();
    document.getElementById('info').innerHTML = json[0]['text'];
    response = await fetch(url);
    json = await response.json();
    console.log(json.length);
    if (json) {
        document.getElementById('refresh').removeAttribute('disabled');
        await refresh();
    }
}
start();

async function change(){
    let response = await fetch(url);
    let json = await response.json();
    console.log(json.length);
    for(let i = 0; i < json.length; ++i){
        let url2 = url + '/' + json[i]['id'];
        console.log(url2);
        await fetch(url2, {
            method: 'DELETE'
        });
    }
    for(let i = 0; i < size; ++i){
        let div = document.getElementById(('div_' + i));
        if(!div.childNodes[5].childNodes[1].checked) {
            let name = div.childNodes[0].value;
            let text = div.childNodes[1].value;
            let src = div.childNodes[2].value;
            let code = div.childNodes[3].value;
            let post = div.childNodes[4].value;
            let card = {i, name, text, src, code, post};
            let cj = JSON.stringify(card);
            let response2 = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: cj
            });
        }
    }
    refresh();
}

document.getElementById('input').addEventListener("submit", save);

async function save(){
    if(document.getElementById('refresh').hasAttribute('disabled')) {
        document.getElementById('refresh').removeAttribute('disabled');
    }
    let name = document.getElementById('name').value;
    let text = document.getElementById('text').value;
    let src = document.getElementById('src').value;
    let code = document.getElementById('code').value;
    let post = document.getElementById('post').value;

    let response = await fetch(url);
    let json = await response.json();
    let i = json.length;
    let card = {i, name, text, src, code, post};
    let cj = JSON.stringify(card);
    let response2 = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: cj
    });
    refresh();
}

async function refresh(){
    document.getElementById('containers').innerHTML = '';
    let loader = '<div class="loader">' +
        '  <div class="loader_inner"></div>' +
        '</div>';
    document.getElementById('containers').innerHTML += loader;
    let response = await fetch(url);
    let json = await response.json();
    size = 0;
    json.forEach((card) => {
        let html = '<div class="conm">' +
            '<img alt="pic" src="' + card['src'] + '"/>' +
            '<div id="div_' + card['i'] + '" class="con2">' +
            '<input required id="name" value="' + card['name'] + '" />' +
            '<input required id="text" value="' + card['text'] + '" />' +
            '<input required id="src" value="' + card['src'] + '" />' +
            '<input required id="code" value="' + card['code'] + '" />' +
            '<input required id="post" value="' + card['post'] + '" />' +
            '<label>Удалить<input type="checkbox"/></label>'+
            '</div>' +
            '</div>';
        document.getElementById('containers').innerHTML += html;
        size += 1;
    });
    window.setTimeout(function (){
        $(".loader_inner").fadeOut();
        $(".loader").delay(400).fadeOut("slow");
    }, 500);
}