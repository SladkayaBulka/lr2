var COLOR_GREEN = "#71ff71";
var COLOR_RED = "#ff5252";
var DEFAULT_COLOR = "black";

$(document).ready(function() {
    $('select').material_select();
});
$('.choicefg select').on('change', function() {
    console.log(this.value + " option selected!")
    // do your stuff here.
    loadimg(this.value);
})

var elements_array = [];

process();

function loadimg(ch) {

    field2 = document.getElementById('field2');

    //  if (next_hash != undefined)
    //  document.getElementById('output2').innerHTML = next_hash;

    if (ch <= 4)
        field2.src = `public/img/${ch}.png`;
    else
        field2.src = 'public/img/no_img.png';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'rgg', false);
    // 3. Отсылаем запрос
    xhr.send();

    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        var rgg = JSON.parse(xhr.responseText);
        //console.log(rgg);
    }
    loadimg2(rgg.rnd);
    CheckWinner(rgg, ch);
}

function loadimg2(chPc) {
    field1 = document.getElementById('field1');

    if (chPc <= 4)
        field1.src = `public/img/${chPc}.png`;
    else
        field1.src = 'public/img/no_img.png';
}

function createBtn(arr) {
    var elem = document.getElementsByClassName('button');

    for (var i = 0; i < arr.length; i++) {
        var btn = document.createElement("button");
        var textNode = document.createTextNode(arr[i]);
        btn.value = arr[i];
        btn.setAttribute('onclick', `loadimg(${i})`);
        btn.setAttribute('class', 'btn');
        btn.appendChild(textNode);
        elem[0].appendChild(btn);
    }
}

function createOp(arr) {
    var elem = document.getElementById("choicefg");

    for (var i = 0; i < arr.length; i++) {
        var op = document.createElement("option");
        var textNode = document.createTextNode(arr[i]);
        op.value = i;
        // btn.setAttribute('onclick', `loadimg(${i})`);
        //btn.setAttribute('class', 'btn');
        op.appendChild(textNode);
        elem.appendChild(op);
    }
}

function createLbl(arr) {
    var ul = document.getElementById("up_panel");

    for (var i = 0; i < arr.length; i++) {
        var li = document.createElement("li");
        var textNode = document.createTextNode(arr[i]);
        li.appendChild(textNode);
        ul.appendChild(li);
    }
}

function process() {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open('GET', 'config.json', false);
    xhr.send();

    if (xhr.status != 200) {
        // обработать ошибку
        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        elements_array = JSON.parse(xhr.responseText);
    }
    createLbl(elements_array);
    createOp(elements_array);
    createBtn(elements_array);

    xhr.open('GET', 'rgg', false);
    xhr.send();

    if (xhr.status != 200) {

        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
    } else {
        var rgg = JSON.parse(xhr.responseText);
    }
    //console.log(rgg);
    document.getElementById('output2').innerHTML = rgg.hash;
    loadimg2(rgg.rnd);
}

function CheckWinner(rgg, numbUs) {
    resetField(DEFAULT_COLOR);

    document.getElementById('outputPc').innerHTML = 'Pc - ' + rgg.elem;
    document.getElementById('outputKey').innerHTML = 'key - ' + rgg.key;
    document.getElementById('output2').innerHTML = 'hash - ' + rgg.hash;
    document.getElementById('hashgenerator').style.display = 'block';
    document.getElementById('Hr').style.display = 'block';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'newRgg', false);
    xhr.send();

    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        var new_rgg = JSON.parse(xhr.responseText);
        //console.log('newRgg -'+new_rgg.hash);
          document.getElementById('nextHash').innerHTML = 'NextHash ' + new_rgg.hash;
    }


    if (rgg.rnd == numbUs) {
        console.log('draw');
        field1.style.backgroundColor = COLOR_RED;
        field2.style.backgroundColor = COLOR_RED;
        return;
    }

    var i = numbUs - 2;

    if (i < 0) {
        i = elements_array.length + i;
        console.log(elements_array[i]);
    }

    if ((i == rgg.rnd) || (numbUs + 1 == rgg.rnd)) {
        console.log('user win');
        field2.style.backgroundColor = COLOR_GREEN;
        field1.style.backgroundColor = COLOR_RED;
    } else {
        console.log('user lose');
        field1.style.background = COLOR_GREEN;
        field2.style.backgroundColor = COLOR_RED;
    }
}

function resetField(color) {
    field1.style.backgroundColor = color;
    field2.style.backgroundColor = color;
}

function loadimg2(chPc) {
    field1 = document.getElementById('field1');

    if (chPc <= 4)
        field1.src = `public/img/${chPc}.png`;
    else
        field1.src = 'public/img/no_img.png';
}
