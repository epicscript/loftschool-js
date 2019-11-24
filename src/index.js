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
    let accumulator, currrentValue, from;

    if (!array.length && initial === 'undefined') {
        throw new Error('массив пустой и не передан initialValue');
    }

    if (array.length === 1 && initial === 'undefined') {
        return array[0];
    } else if (array.length > 1) {
        accumulator = array[0];
        currrentValue = array[1];
        from = 2
    }

    if (!array.length && initial) {
        return initial
    } else if (initial) {
        accumulator = initial;
        currrentValue = array[0];
        from = 1
    }

    for (let i = from; i < array.length; i++) {
        if (array[i]) {
            accumulator = fn(accumulator, currrentValue, i, array)
            currrentValue = array[i]
        }
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
    let resultArray = []

    if (typeof array === 'undefined') {
        throw Error('array must have')
    }

    if (from > array.length) {
        return resultArray
    } else if (!from) {
        from = 0
    } else if (from < 0) {
        from = array.length - from
    }

    if (typeof to === 'undefined') {
        to = array.length
    } else if (to < 0) {
        to = array.length - to
    }

    for (let i = from; i < to; i++) {
        resultArray.push(array[i])
    }

    return resultArray
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
     */
function createProxy(obj) {
    return new Proxy(obj, {
        get(obj, p) {
            return p * p
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
