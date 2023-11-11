"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    let words = fio.split(" ");
    return words[1] + ' ' + words[0]
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    let test = new Set();
    for (let i in array){
        if(!(array[i] in test)){
            test.add(array[i]);
        }
    }
    return Array.from(test)

}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
// присмотритесь к методу .reduce
function calculateSalaryDifference(array) {
    let start = array[0];
    let Min = array.reduce(
        (x, y) => (x<y)?x:y,
        start
    )
    let Max = array.reduce(
        (x,y) => (x>y)?x:y,
        start
    )
    return Max/Min
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    #core;
    constructor() {
        this.#core = new Map();
    }
    set(key, name){
        if(typeof(key) != "string" || typeof(name) != "string"){
            return "Not a string!";
        }
        else {
            this.#core.set(key,name);
        }
    }
    get(key){
        if(typeof(key) != "string"){
            return "Not a string!";
        }
        else {
            return this.#core.get(key);
        }
    }
    delete(key){
        if(typeof(key) != "string"){
            return "Not a string!";
        }
        else {
            this.#core.delete(key);
        }
    }
    has(key){
        if(typeof(key) != "string"){
            return "Not a string!";
        }
        else {
            return this.#core.has(key);
        }
    }
    clear(){
        this.#core.clear();
    }
    size(){
        return this.#core.size;
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};