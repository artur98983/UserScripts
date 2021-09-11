// ==UserScript==
// @name         [My] ПДД - Тёмная тема 3
// @namespace    https://github.com/
// @version      0.1
// @description  Изменяет внешний вид ПДД на темный
// @author       Artur_Averin
// @include      *pdd24.com/pdd-onlain*
// @exclude      https://vk.com/notifier.php?*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @run-at       document-start
// @license MIT
// ==/UserScript==
// Пункт меню, добавляется после старта браузера

const styles = {
    'vkdark-main': `

.navbar-default {
  background-color: #1a1a1a !important;
  border-color: #1a1a1a !important;
}
.navbar-default .navbar-nav>.active>a, .navbar-default .navbar-nav>.active>a:focus, .navbar-default .navbar-nav>.active>a:hover {
    color: #555;
    background-color: #1a1a1a !important;
}
.list-group-item {
    background-color: #1a1a1a !important;
    border-color: #1a1a1a !important;
}
.list-group-item.warning, .list-group-item.warning:hover, .list-group-item.warning:focus {
    background-color: #d9534f !important;
    border-color: #d9534f !important;
}
.list-group-item.success, .list-group-item.success:hover, .list-group-item.success:focus {
    background-color: #5cb85c !important;
    border-color: #5cb85c !important;
}
`,
};
const styleStorage = {};
const storageName = `vk_dark`;
const defaultStorage = `{
    "vkdark-main": true,
    "menu-promo": true,
    "dialog-float": false,
    "dialog-friend_online": true,
    "audio-subscribe": true,
    "audio-promo": true,
    "disable-all_promo": false
}`;

// Работа с локальным хранилищем.
function getStorage(){
    return JSON.parse(localStorage.getItem(storageName));
}

function mutationStorageAfterSave(key, value, storage){
    switch (key) {
        case 'disable-all_promo':
            if(value) {
                storage['audio-subscribe'] = true;
                storage['audio-promo'] = true;
                storage['menu-promo'] = true;
            }
            break;
        case 'audio-subscribe':
        case 'audio-promo':
        case 'menu-promo':
            if(!value) {
                storage['disable-all_promo'] = false;
            }
            break;
    }
    return storage;
}

function setStorage(key, value) {
    let storage = getStorage();
    if(storage === null) {
        storage = JSON.parse(defaultStorage);
    }
    storage = mutationStorageAfterSave(key, value, storage);
    storage[key] = value;
    localStorage.setItem(storageName, JSON.stringify(storage));
    setStyles();
    setCheckbox();
}

if(getStorage() === null) {
    localStorage.setItem(storageName, defaultStorage);
}
function deleteAllStyles() {
    Object.keys(styleStorage).forEach(key => styleStorage[key].remove());
}

function setStyles() {
    //сначала удаляем стили.
    deleteAllStyles();
    const storage = getStorage();
    Object.keys(storage).forEach(key => {
        if(!!storage[key]) {
            styleStorage[key] = GM_addStyle(styles[key]);
        }
    });
}
//Получаем состояние чекбоксов из сторейжа и проставляешь их значения
function setCheckbox(){
    const storage = getStorage();
    Object.keys(storage).forEach(key => document.getElementById(key).checked = storage[key]);
}


GM_addStyle(styles['settings']);
setStyles();

GM_registerMenuCommand('Github.com', () => {
    GM_openInTab('https://github.com/Dmitiry1921/VK-Dark/blob/master/README.md', {active: true, insert: true});
});
GM_registerMenuCommand('Check Update', () => {
    GM_openInTab('https://github.com/Dmitiry1921/VK-Dark/raw/master/vkdark.user.js', {active: true, insert: true});
});
GM_registerMenuCommand('Настройки', () => {
    const elMain = '.vk-dark.vk-dark-sittings-main-position';
    if(document.querySelector(elMain) !== null) return;
    //Добавляем блок на страницу
    document.body.insertAdjacentHTML('beforeEnd', `<div class="vk-dark vk-dark-sittings-main-position"> <div class="vk-dark vk-dark-settings-container"> <h2 class="vk-dark vk-dark-main-header"> <div class="vk-dark-title">Настройки</div> <div class="vk-dark-close-settings"></div> </h2> <div class="vk-dark vk-dark-main-container"> <div class="vk-dark vk-dark-settings-group"> <div class="vk-dark vk-dark-row"> <div class="vk-dark vk-dark-cell-left">Основные</div> <div class="vk-dark vk-dark-cell-right"> <div class="vk-dark vk-dark-settings-narrow-row"> <input type="checkbox" id="vkdark-main" class="vk-dark vk-dark-hidden-checkbox" checked/> <label for="vkdark-main" class="vk-dark vk-dark-settings-label"> Включить VK-Dark </label> </div> </div> </div> </div> <div class="vk-dark vk-dark-settings-group"> <div class="vk-dark vk-dark-row"> <div class="vk-dark vk-dark-cell-left">Меню</div> <div class="vk-dark vk-dark-cell-right"> <div class="vk-dark vk-dark-settings-narrow-row"> <input type="checkbox" id="menu-promo" class="vk-dark vk-dark-hidden-checkbox" checked/> <label for="menu-promo" class="vk-dark vk-dark-settings-label"> Скрыть блок "Реклама" </label> </div> </div> </div> </div> <div class="vk-dark vk-dark-settings-group"> <div class="vk-dark vk-dark-row"> <div class="vk-dark vk-dark-cell-left">Диалоги</div> <div class="vk-dark vk-dark-cell-right"> <div class="vk-dark vk-dark-settings-narrow-row"> <input type="checkbox" id="dialog-float" class="vk-dark vk-dark-hidden-checkbox" /> <label for="dialog-float" class="vk-dark vk-dark-settings-label"> Расположить переписки справа </label> </div> <div class="vk-dark vk-dark-settings-narrow-row"> <input type="checkbox" id="dialog-friend_online" class="vk-dark vk-dark-hidden-checkbox" checked/> <label for="dialog-friend_online" class="vk-dark vk-dark-settings-label"> Скрыть блок чата с друзьями </label> </div> </div> </div> </div> <div class="vk-dark vk-dark-settings-group"> <div class="vk-dark vk-dark-row"> <div class="vk-dark vk-dark-cell-left">Аудиозаписи</div> <div class="vk-dark vk-dark-cell-right"> <div class="vk-dark vk-dark-settings-narrow-row"> <input type="checkbox" id="audio-subscribe" class="vk-dark vk-dark-hidden-checkbox" checked/> <label for="audio-subscribe" class="vk-dark vk-dark-settings-label"> Скрыть блок "Подписка на музыку" </label> </div> <div class="vk-dark vk-dark-settings-narrow-row"> <input type="checkbox" id="audio-promo" class="vk-dark vk-dark-hidden-checkbox" checked/> <label for="audio-promo" class="vk-dark vk-dark-settings-label"> Скрыть блок "Промо" </label> </div> </div> </div> </div> <div class="vk-dark vk-dark-settings-group"> <div class="vk-dark vk-dark-row"> <div class="vk-dark vk-dark-cell-left">Реклама</div> <div class="vk-dark vk-dark-cell-right"> <div class="vk-dark vk-dark-settings-narrow-row"> <input type="checkbox" id="disable-all_promo" class="vk-dark vk-dark-hidden-checkbox" /> <label for="disable-all_promo" class="vk-dark vk-dark-settings-label"> Отключить всю рекламу на сайте </label> </div> </div> </div> </div> </div> <div class="vk-dark vk-dark-settings-support"> Вы можете <a href="https://vk.me/join/AJQ1d7U5CANH4MRXOBNPuzB4">связаться с нами</a> </div> </div></div>`);
    const main = document.querySelector(elMain);
    //Закрытие настроек
    function close() {
        document.body.removeChild(main);
    }
    document.querySelector('.vk-dark-close-settings').onclick = close;
    //Клик мне поля закрывает окно.
    main.onclick = (e) => {if(main === e.target) close()}
    //Вешаем события onchange на пункты настроек
    document.querySelectorAll('.vk-dark-hidden-checkbox').forEach(element => element.onchange = (e) => setStorage(e.target.id, e.target.checked));
    setCheckbox();
});
GM_registerMenuCommand('Сообщить об ошибке', () => {
    GM_openInTab('https://vk.me/join/AJQ1d7U5CANH4MRXOBNPuzB4', {active: true, insert: true});
});

console.info('VK Dark version: ', '0.2.3');
