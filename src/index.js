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
    let accumulator;

    if (array.length === 0 && typeof initial === 'undefined') {
        throw new Error('массив пустой и не передан initialValue')
    } else if (typeof initial === 'undefined' && array.length === 1) {
        return array[0];
    } else if (array.length === 0) {
        return initial
    } else if (typeof initial === 'undefined') {
        for (let i = 0; i < array.length - 2; i++) {
            if (typeof accumulator === 'undefined') {
                accumulator = fn(array[0], array[1], i, array)
                continue
            } else {
                accumulator = fn(accumulator, array[i + 1], i, array)
            }
        }

        return accumulator

    } else {
        for (let i = 0; i < array.length - 1; i++) {
            if (typeof accumulator === 'undefined') {
                accumulator = fn(initial, array[0], i, array)
                continue
            } else {
                accumulator = fn(accumulator, array[i + 1], i, array)
            }
        }

        return accumulator
    }
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
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
