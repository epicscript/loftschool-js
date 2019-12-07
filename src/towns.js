
/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        xhr.responseType = 'json'
        xhr.send()
        xhr.addEventListener('load', () => {
            if (xhr.status >= 400) {
                reject()
            } else {
                const sortedCities = xhr.response.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }

                    return 0
                })

                resolve(sortedCities)
            }
        })
        xhr.addEventListener('abort', reject)
        xhr.addEventListener('error', reject)
    })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase())
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

function createTownNode(town) {
    const item = document.createElement('p');

    item.textContent = town;

    return item
}

filterInput.addEventListener('keyup', function(e) {
    // это обработчик нажатия кливиш в текстовом поле

    if (e.target.value) {
        loadTowns()
            .then((towns) => {
                const filteredTowns = towns.filter(town => isMatching(town.name, e.target.value))

                if (filteredTowns.length !== 0) {

                    filterResult.innerHTML = '';

                    for (const town of filteredTowns) {
                        const townNode = createTownNode(town.name)

                        filterResult.appendChild(townNode)
                    }
                }
            })

    } else {
        filterResult.innerHTML = '';
    }

});

window.addEventListener('load', windowLoadHandler)

function windowLoadHandler() {
    loadTowns()
        .then(towns => {
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';

            for (const town of towns) {
                const townNode = createTownNode(town.name)

                filterResult.appendChild(townNode)
            }
        })
        .catch(() => {
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';

            const errorMessage = document.createElement('p')
            const retryButton = document.createElement('button')

            filterBlock.innerHTML = ''
            retryButton.textContent = 'Повторить'
            errorMessage.textContent = 'Не удалось загрузить города'
            retryButton.addEventListener('click', windowLoadHandler)
            filterBlock.appendChild(errorMessage)
            filterBlock.appendChild(retryButton)

        })
}

export {
    loadTowns,
    isMatching
};
