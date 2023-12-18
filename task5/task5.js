
let size = 0;
let size2 = 0;
let url = 'http://localhost:3000/films';
let films = [];
document.getElementById('refresh').addEventListener('click', change);
let dom = document.getElementById('containers');
let root = ReactDOM.createRoot(dom);
async function start() {
    let response = await fetch(url);
    let json = await response.json();
    //console.log(json.length);
    if (json) {
        document.getElementById('refresh').removeAttribute('disabled');
        await refresh();
    }
}
start();


function Card(card){
    //console.log(card);
    let div = "div_"+card['card']['i'];
    let name = card['card']['name'];
    let year = card['card']['year'];
    let text = card['card']['text'];
    let src = card['card']['src'];
    let rate = card['card']['rate'];
    let act = card['card']['act'];
    let rej = card['card']['rej'];
    let star = card['card']['star'];
    let s;
    if(star){
        s = '★';
    }
    else {
        s = '☆';
    }
    return (
        <div className="conm">
            <img alt="pic" src={src}/>
            <div id={div} className="con2">
                <input required id="name" defaultValue={name} />
                <input required id="year" defaultValue={year} />
                <input required id="text" defaultValue={text} />
                <input required id="src" defaultValue={src} />
                <input required id="rate" defaultValue={rate}/>
                <input required id="act" defaultValue={act} />
                <input required id="rej" defaultValue={rej}/>
                <label>{s}<input id='star' type='checkbox' defaultChecked={star}/></label>
                <label>Удалить<input type="checkbox"/></label>
            </div>
        </div>
    )
}

async function change(){
    let response = await fetch(url);
    let json = await response.json();
    //console.log(json.length);
    for(let i = 0; i < json.length; ++i){
        let url2 = url + '/' + json[i]['id'];
        //console.log(url2);
        await fetch(url2, {
            method: 'DELETE'
        });
    }
    for(let i = 0; i < size; ++i){
        let div = document.getElementById(('div_' + i));
        if(!div.childNodes[8].childNodes[1].checked) {
            let name = div.childNodes[0].value;
            let year = div.childNodes[1].value;
            let text = div.childNodes[2].value;
            let src = div.childNodes[3].value;
            let rate = div.childNodes[4].value;
            let act = div.childNodes[5].value;
            let rej = div.childNodes[6].value;
            let star = div.childNodes[7].childNodes[1].checked;
            let card = {i, name, year, text, src, rate, act, rej, star};
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
document.getElementById('find').addEventListener("click", search);
document.getElementById('back').addEventListener("click", refresh);

async function save(){
    if(document.getElementById('refresh').hasAttribute('disabled')) {
        document.getElementById('refresh').removeAttribute('disabled');
    }
    let name = document.getElementById('name').value;
    let year = document.getElementById('year').value;
    let text = document.getElementById('text').value;
    let src = document.getElementById('src').value;
    let rate = document.getElementById('rate').value;
    let act = document.getElementById('act').value;
    let rej = document.getElementById('rej').value;

    let response = await fetch(url);
    let json = await response.json();
    let i = json.length;
    let star = false;
    let card = {i, name, year, text, src, rate, act, rej, star};
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
    root.unmount();
    root = ReactDOM.createRoot(dom);
    let response = await fetch(url);
    let json = await response.json();
    size = 0;
    films = [];
    json.forEach((card) => {
        films.push(card);
        size += 1;
    });
    //console.log(films);
    root.render(<Films></Films>);
    //let dom1 = document.getElementById('router');
    //let root1 = ReactDOM.createRoot(dom1);
    //root1.render(<R></R>);
}

async function search(){
    const searchText = document.getElementById('stext').value;
    if(searchText !== '') {
        const element = document.getElementById('type');
        const selectedType = element.value;
        //console.log(selectedType);
        let id = 0;
        switch (selectedType) {
            case 'name':
                id = 0;
                break;
            case 'year':
                id = 1;
                break;
            case 'text':
                id = 2;
                break;
            case 'rate':
                id = 4;
                break;
            case 'act':
                id = 5;
                break;
            case 'rej':
                id = 6;
                break;
        }

        for (let i = 0; i < size; ++i) {
            let div = document.getElementById(('div_' + i));
            let val = div.childNodes[id].value;
            //console.log(val);
            if (val.indexOf(searchText) < 0) {
                let par = div.parentNode;
                par.style.display = 'none';
                //console.log(par);
            }
        }
    }
    else {
        refresh();
    }
}

function Films(){
    return(
        <section className='con1'>
            {films.map((film) => {
                return (<Card key={film['i']} card={film}></Card>);
            })}
        </section>
    );
}

function R(){
    return(
        <div>
            <Routes>
                {films.map((film) => {
                    let path = '/' + film['i'];
                    return (
                      <Route path={path} element={<Card card={film}/>}/>
                    )
                })}
            </Routes>
        </div>
    )
}

