import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { SearchOutlined } from '@ant-design/icons';
import {Select, Button, Input} from "antd";
import './task5.css';
let size = 0;
let url = 'http://localhost:3000/films';
let films = [];
let response = await fetch(url);
let json = await response.json();
let i = json.length;
let state;
state = !i;

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
          <Input size="small" className="in" required id="name" defaultValue={name} />
          <Input size="small" className="in" required id="year" defaultValue={year} />
          <Input size="small" className="in" required id="text" defaultValue={text} />
          <Input size="small" className="in" required id="src" defaultValue={src} />
          <Input size="small" className="in" required id="rate" defaultValue={rate}/>
          <Input size="small" className="in" required id="act" defaultValue={act} />
          <Input size="small" className="in" required id="rej" defaultValue={rej}/>
          <label>{s}<Input size="small" className="in" id='star' type='checkbox' defaultChecked={star}/></label>
          <label>Удалить<Input size="small" className="in" type="checkbox"/></label>
        </div>
      </div>
  )
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


function Form() {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [text, setText] = useState('');
  const [src, setSrc] = useState('');
  const [rate, setRate] = useState('');
  const [act, setAct] = useState('');
  const [rej, setRej] = useState('');

  return (
      <form className="con2" id="input" onSubmit={e => {
        let card = {name, year, text, src, rate, act, rej}
        console.log(card);
        save(card);
        e.preventDefault();
      }}>
        <label>Название <Input className="in" type="text" id="name" value={name} required
                               onChange={e => setName(e.target.value)}/></label>
        <label>Год выпуска <Input className="in" type="text" id="year" value={year} required
                                  onChange={e => setYear(e.target.value)}/></label>
        <label>Описание <Input className="in" type="text" id="text" value={text} required
                               onChange={e => setText(e.target.value)}/></label>
        <label>Ссылка на обложку <Input className="in" type="text" id="src" value={src} required
                                        onChange={e => setSrc(e.target.value)}/></label>
        <label>Рейтинг <Input className="in" type="text" id="rate" value={rate} required
                              onChange={e => setRate(e.target.value)}/></label>
        <label>Актёры <Input className="in" type="text" id="act" value={act} required
                             onChange={e => setAct(e.target.value)}/></label>
        <label>Режисер <Input className="in" type="text" id="rej" value={rej} required
                              onChange={e => setRej(e.target.value)}/></label>
        <Button className="in" htmlType="submit">Отправить</Button>
      </form>
  );
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
  let i = 0;
  for(let q = 0; q < size; ++q){
    let div = document.getElementById(('div_' + q));
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
    else {
      i -= 1;
    }
    i += 1;
  }
  reload();
}

function Con(){
  return (
      <div className="con">
        <div className="but">
          <Button className='butt' id="refresh" disabled={state} onClick={change}>Сохранить изменения</Button>
        </div>
        <div className="but" id="search">
          <Select className="sel" defaultValue="name" id="type" name="type" options={[
            { value: 'name', label: 'Название' },
            { value: 'year', label: 'Год' },
            { value: 'text', label: 'Описание' },
            { value: 'rate', label: 'Рейтинг' },
            { value: 'act', label: 'Актёры' },
            { value: 'rej', label: 'Режисер' },
          ]}>
          </Select>
          <Input className="in" type="text" id="stext" required/>
            <Button className='butt' id="find" onClick={search} icon={<SearchOutlined />}>
            Поиск
            </Button>
        <Button className='butt' id="back" hidden onClick={reload}>Назад</Button>
        </div>
        <div id="container"></div>
      </div>
  )
}

async function save(ncard){
  console.log(ncard);
  let name = ncard.name;
  let year = ncard.year;
  let text = ncard.text;
  let src = ncard.src;
  let rate = ncard.rate;
  let act = ncard.act;
  let rej = ncard.rej;

  let response = await fetch(url);
  let json = await response.json();
  let i = json.length;
  let star = false;
  let card = {i, name, year, text, src, rate, act, rej, star};
  console.log(card)
  let cj = JSON.stringify(card);
  console.log(cj)
  let response2 = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: cj
  });
  if(!state){
    refresh();
  }
  else {
    reload();
  }
}

async function refresh(){
  let response = await fetch(url);
  let json = await response.json();
  size = 0;
  films = [];
  json.forEach((card) => {
    films.push(card);
    size += 1;
  });
  if(!root) {
    root = ReactDOM.createRoot(document.getElementById('container'))
  }
  root.render(
      <Films></Films>
  );
  //console.log(films);
  //let dom1 = document.getElementById('router');
  //let root1 = ReactDOM.createRoot(dom1);
  //root1.render(<R></R>);
}

async function search(){
  const searchText = document.getElementById('stext').value;
  if(searchText !== '') {
    document.getElementById('back').removeAttribute('hidden');
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
    window.location.reload();
  }
}

function reload(){
  window.location.reload();
}


function App() {
  return (
    <div className="conm1">
      <Form></Form>
      <Con></Con>
    </div>
  );
}
let root;
refresh();

export default App;
