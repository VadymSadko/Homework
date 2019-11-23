'use strict';

let collect = document.querySelectorAll('.books'),
    book = document.querySelectorAll('.book');


// расстановка по порядку книг
collect[0].appendChild(book[1]);
collect[0].appendChild(book[0]);
collect[0].appendChild(book[4]);
collect[0].appendChild(book[3]);
collect[0].appendChild(book[5]);
collect[0].appendChild(book[2]);

// замена фонового изображения
let elemBody = document.querySelector('body');
elemBody.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');


let headLine = document.getElementsByTagName('a')[2];
headLine.textContent = 'Книга 3. this и Прототипы Объектов';

// удаление рекламного блока
let elemAdv = document.querySelector('.adv');
elemAdv .setAttribute('style', 'display: none');

// расстановка элементов в оглавлении 2 и 5 кригах
let listUl = document.querySelectorAll('ul');
let listLi = document.querySelectorAll('li');
console.log(listUl, listLi);

// второя книга
listUl[1].insertBefore(listLi[8], listLi[16]);
listUl[1].insertBefore(listLi[12], listLi[10]);
listUl[1].insertBefore(listLi[14], listLi[10]);

// пятая книга
listUl[4].insertBefore(listLi[45], listLi[38]);
listUl[4].insertBefore(listLi[38], listLi[42]);
listUl[4].insertBefore(listLi[41], listLi[44]);

// добавление элемента в оглавление
let newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
listUl[5].appendChild(newElem);
let listLiNew = document.querySelectorAll('li');
console.log(listLiNew);
listUl[5].insertBefore(listLiNew[57], listLiNew[56]);