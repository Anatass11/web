//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return (n | 0) === n;
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    let mas = [];
    for (let i = 2; i < 21; i+=2){
        mas.push(i);
    }
    return mas;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let S = 0;
    for (let i = 1; i < n+1; ++i){
        S += i;
    }
    return S;
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    let S = 0;
    for (let i = n; i > 0; --i){
        S += i;
    }
    return S;
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    let F = 1;
    for (let i = 2; i < n+1; ++i){
        F *= i;
    }
    return F;
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    while (n !== 1){
        if(n % 2 !== 0 || n === 0) return false;
        n /= 2;
    }
    return true;
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    if(n === 1) return 1;
    else if (n <= 0) return 0;
    else return fibonacci(n-1)+fibonacci(n-2);
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    if (typeof (operatorFn) !== 'function') return (...args) => initialValue;
    else {
        let old = initialValue;
        return function (value){
            let a = operatorFn(old, value);
            old = a;
            return a;
        };
    }
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    if (typeof (step) !== 'number') step = 1;
    if (typeof (start) !== 'number') start = 0;
    let s1 = start;
    return function (){
        let s0 = s1;
        s1 += step;
        return s0;
    }
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject) {
        return true;
    } else if ((typeof firstObject == "object" && firstObject != null) && (typeof secondObject == "object" && secondObject != null)) {
        if (Object.keys(firstObject).length !== Object.keys(secondObject).length)
            return false;
        for (let prop in firstObject) {
            if (secondObject.hasOwnProperty(prop)) {
                if (!deepEqual(firstObject[prop], secondObject[prop]))
                    return false;
            } else
                return false;
        }
        return true;
    } else
        if(firstObject !== firstObject && secondObject !== secondObject){
            return true
        }
        return false;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
