/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function deleteTargetCook(e) {
    const cookie = parseCookieToObj(document.cookie);
    const cookName = e.target.parentNode.getAttribute('data-cook');
    const cookValue = cookie[cookName];

    document.cookie = `${cookName}=${cookie[cookValue]}; max-age=0`;
    e.target.parentNode.remove();
}

function renderTableItem(item) {
    const cookie = parseCookieToObj(document.cookie);
    const cookItemNode = document.createElement('tr');
    const cookNameNode = document.createElement('td');
    const cookValueNode = document.createElement('td');
    const cookRemove = document.createElement('button');

    cookNameNode.textContent = item;
    cookValueNode.textContent = cookie[item];
    cookRemove.textContent = 'Удалить';
    cookItemNode.setAttribute('data-cook', item);
    cookRemove.addEventListener('click', deleteTargetCook);

    cookItemNode.appendChild(cookNameNode);
    cookItemNode.appendChild(cookValueNode);
    cookItemNode.appendChild(cookRemove);

    return cookItemNode;
}

window.addEventListener('load', () => {
    const cookie = parseCookieToObj(document.cookie);

    Object.keys(cookie).forEach(cook => {
        const cookItemNode = renderTableItem(cook);

        listTable.appendChild(cookItemNode);
    });
});

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    const cookie = parseCookieToObj(document.cookie);

    listTable.textContent = '';
    Object.keys(cookie).forEach(cook => {
        if (
            isMatching(cookie[cook], filterNameInput.value) ||
      isMatching(cook, filterNameInput.value)
        ) {
            const cookItemNode = renderTableItem(cook);

            listTable.appendChild(cookItemNode);
        }
    });
});

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

function parseCookieToObj() {
    return document.cookie.split('; ').reduce((prev, curr) => {
        const [name, value] = curr.split('=');

        prev[name] = value;

        return prev;
    }, {});
}

addButton.addEventListener('click', () => {
    const cookie = parseCookieToObj(document.cookie);

    if (addNameInput.value && addValueInput.value) {
        if (
            filterNameInput.value &&
      !(
          isMatching(addValueInput.value, filterNameInput.value) ||
        isMatching(addNameInput.value, filterNameInput.value)
      )
        ) {
            document.cookie = `${addNameInput.value}=${addValueInput.value}`;
            addNameInput.value = '';
            addValueInput.value = '';
        } else if (
            filterNameInput.value &&
      !isMatching(addValueInput.value, filterNameInput.value) &&
      Object.keys(cookie).includes(addNameInput.value)
        ) {
            document.cookie = `${addNameInput.value}=${addValueInput.value}`;

            const target = document.querySelector(
                `[data-cook=${addNameInput.value}]`
            );

            if (target) {
                target.remove();
            }

            addNameInput.value = '';
            addValueInput.value = '';
        } else if (!filterNameInput.value) {
            {
                document.cookie = `${addNameInput.value}=${addValueInput.value}`;
                addNameInput.value = '';
                addValueInput.value = '';
            }
        }
    }
});
