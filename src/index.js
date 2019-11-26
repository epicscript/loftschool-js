/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array)
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let reultArray = []

    for (let i = 0; i < array.length; i++) {
        reultArray.push(fn(array[i], i, array))
    }

    return reultArray
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    if (!array.length && initial === 'undefined') {
        throw new Error('массив пустой и не передан initialValue');
    }

    let index = 0;
    let accumulator = initial ? initial : array[index++];

    for (index;index < array.length; index++) {
        accumulator = fn(accumulator, array[index], index, array)
    }

    return accumulator
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    return Object.keys(obj).map(key => key.toUpperCase())
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let resultArray = [];
    let begin = from === undefined ? 0 : from;
    let end = to === undefined ? array.length : to;

    if (begin > 0) {
        if (begin > array.length) {
            begin = array.length;
        }
    } else if (begin < 0) {
        if (Math.abs(begin) > array.length) {
            begin = 0;
        } else {
            begin = begin + array.length;
        }
    }

    if (end > 0) {
        if (end > array.length) {
            end = array.length;
        }
    } else if (end < 0) {
        if (Math.abs(end) > array.length) {
            end = 0;
        } else {
            end = end + array.length;
        }
    }

    for (let i = begin; i < end; i++) {
        resultArray.push(array[i]);
    }

    return resultArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
     */
function createProxy(obj) {
    return new Proxy(obj, {
        get(obj, p) {
            return obj[p] * obj[p];
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
