class Idol {
    RomajiName;
    JapaneseName;
    Birthday;
    Age;
    Height;
    Weight;
    BloodType;
    ProductionCompany;
    Image;

    constructor(romajiName, japaneseName, birthday, age, height, weight, bloodType, productionCompany, image) {
        this.RomajiName = romajiName;
        this.JapaneseName = japaneseName;
        this.Birthday = birthday;
        this.Age = age;
        this.Height = height;
        this.Weight = weight
        this.BloodType = bloodType;
        this.ProductionCompany = productionCompany;
        this.Image = image;
    }
}

const Haruka = new Idol("Haruka Amami", "天海春香", "April 3rd", 17, "158 cm", "46 kg", "O", "765", "Haruka.png");
const Miki = new Idol("Miki Hoshii", "星井美希", " November 23rd", 15, "161 cm", "45 kg", "B", "765", "Miki.png");
const Chihaya = new Idol("Chihaya Kisaragi", "如月千早", "February 25th", 16, "162 cm", "41 kg", "A", "765", "Chihaya.png");
const Makoto = new Idol("Makoto Kikuchi", "菊地真", "August 29th", 17, "159 cm", "44 kg", "O", "765", "Makoto.png");
const Fuka = new Idol("Fuka Toyokawa", "豊川風花", "September 2nd", 17, "158 cm", "51 kg", "O", "765", "Fuka.png");

const arr = [Haruka, Miki, Chihaya, Makoto, Fuka];

function GenerateFunction() {
    document.getElementById("insertJson").innerHTML = JSON.stringify(arr);
}

let counter = 0;
var newArr = [];

function DisplayIdols() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                newArr = [];
                let data = JSON.parse(httpRequest.responseText);
                for (let i = 0; i < data.length; i++) {
                    const temp = new Idol(data[i].RomajiName, data[i].JapaneseName,
                        data[i].Birthday, data[i].Age, data[i].Height,
                        data[i].Weight, data[i].BloodType,
                        data[i].ProductionCompany, data[i].Image);
                    newArr[i] = temp;
                }
                counter = 0;
                let nextButton = document.createElement('input');
                let prevButton = document.createElement('input');
                let editButton = document.createElement('button');
                let insertButton = document.createElement('button');
                let deleteButton = document.createElement('button');
                let saveAllButton = document.createElement('button');
                let firstButton = document.createElement('button');
                let lastButton = document.createElement('button');
                let image = document.createElement('img');
                let myDiv = document.getElementById('insertStuffHere');
                let newDiv = document.createElement('div');
                //<image id = "show"></image>
                myDiv.innerHTML = '';
                image.setAttribute('id', 'show');
                newDiv.setAttribute('id', 'hldr');
                editButton.setAttribute('id', 'edit');
                insertButton.setAttribute('id', 'insert');
                deleteButton.setAttribute('id', 'delete');
                nextButton.setAttribute('id', 'next');
                prevButton.setAttribute('id', 'prev');
                nextButton.type = 'button';
                prevButton.type = 'button';
                nextButton.value = 'Next';
                prevButton.value = 'Previous';
                editButton.innerText = 'Edit';
                insertButton.innerText = 'Insert';
                deleteButton.innerText = 'Delete';
                saveAllButton.innerText = 'Save All'
                firstButton.innerText = 'First'
                lastButton.innerText = 'Last';
                image.setAttribute('src', newArr[0].Image);
                image.style.width = '400px';
                image.style.height = '400px';
                nextButton.onclick = function () { nextImage() };
                prevButton.onclick = function () { prevImage() };
                editButton.onclick = function () { edit(counter) };
                insertButton.onclick = function () { insert() };
                deleteButton.onclick = function () { deleteAt(counter) };
                saveAllButton.onclick = function () { saveAll() };
                firstButton.onclick = function () { firstImage() };
                lastButton.onclick = function () { lastImage() };
                myDiv.appendChild(image);
                myDiv.appendChild(lastButton)
                myDiv.appendChild(prevButton);
                myDiv.appendChild(nextButton);
                myDiv.appendChild(firstButton);
                myDiv.appendChild(editButton);
                myDiv.appendChild(insertButton);
                myDiv.appendChild(deleteButton);
                myDiv.appendChild(saveAllButton);
                myDiv.appendChild(newDiv);
                newDiv.innerHTML = setHTMLforImage(0);
            }
        }
    }
    httpRequest.open('GET', './browser.php?getSelect=' + 1, true);
    httpRequest.send();
}

function setHTMLforImage(x) {
    return 'Array Length: ' + newArr.length + ' Current Index: ' + (counter + 1) + '<br>Romaji Name: ' + newArr[x].RomajiName + '<br>Kanji: ' + newArr[x].JapaneseName + '<br>Birthday: ' + newArr[x].Birthday +
        '<br> Height: ' + newArr[x].Height + '<br>Weight: ' + newArr[x].Weight + '<br>Blood Type: ' + newArr[x].BloodType
        + '<br>Production Company: ' + newArr[x].ProductionCompany;
}

function saveAll() {
    var httpRequest1 = new XMLHttpRequest();
    httpRequest1.onreadystatechange = function () {
        if (httpRequest1.readyState === XMLHttpRequest.DONE) {
            if (httpRequest1.status === 200) {
            }
        }
    }
    httpRequest1.open('GET', './database.php', true);
    httpRequest1.send();
}

function saveInsert() {
    let getRomanji = document.getElementById('nameInput').value;
    let getKanji = document.getElementById('kanjiInput').value;
    let getBirthday = document.getElementById('birthdayInput').value;
    let getHeight = document.getElementById('heightInput').value;
    let getWeight = document.getElementById('weightInput').value;
    let getBlood = document.getElementById('bloodInput').value;
    let getProduction = document.getElementById('productionInput').value;
    let getImageName = document.getElementById('imageNameInput').value;

    var httpRequest1 = new XMLHttpRequest();
    httpRequest1.onreadystatechange = function () {
        if (httpRequest1.readyState === XMLHttpRequest.DONE) {
            if (httpRequest1.status === 200) {
                window.location.reload();
            }
        }
    }


    httpRequest1.open('GET', './insert.php?getRomanji=' + getRomanji +
        '&getKanji=' + getKanji +
        '&getBirthday=' + getBirthday + '&getHeight=' + getHeight +
        '&getWeight=' + getWeight + '&getBlood=' + getBlood +
        '&getProduction=' + getProduction +
        '&getImageName=' + getImageName, true);
    httpRequest1.send();
}

function deleteAt(x) {
    var httpRequest1 = new XMLHttpRequest();
    httpRequest1.onreadystatechange = function () {
        if (httpRequest1.readyState === XMLHttpRequest.DONE) {
            if (httpRequest1.status === 200) {
                window.location.reload();
            }
        }
    }

    httpRequest1.open('GET', './delete.php?counter=' + x, true);
    httpRequest1.send();
}

function save(x) {
    let getRomanji = document.getElementById('nameInput').value;
    let getKanji = document.getElementById('kanjiInput').value;
    let getBirthday = document.getElementById('birthdayInput').value;
    let getHeight = document.getElementById('heightInput').value;
    let getWeight = document.getElementById('weightInput').value;
    let getBlood = document.getElementById('bloodInput').value;
    let getProduction = document.getElementById('productionInput').value;

    var httpRequest1 = new XMLHttpRequest();
    httpRequest1.onreadystatechange = function () {
        if (httpRequest1.readyState === XMLHttpRequest.DONE) {
            if (httpRequest1.status === 200) {
                window.location.reload();
            }
        }
    }


    httpRequest1.open('GET', './edit.php?getCounter=' + x +
        '&getRomanji=' + getRomanji + '&getKanji=' + getKanji +
        '&getBirthday=' + getBirthday + '&getHeight=' + getHeight +
        '&getWeight=' + getWeight + '&getBlood=' + getBlood +
        '&getProduction=' + getProduction, true);
    httpRequest1.send();
}

function insert() {
    let editButton = document.getElementById('edit');
    let div = document.getElementById('hldr');
    let nextButton = document.getElementById('next');
    let prevButton = document.getElementById('prev');
    let insertButton = document.getElementById('insert');
    let deleteButton = document.getElementById('delete');
    if (insertButton.innerText === 'Insert') {
        let saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.onclick = function () { saveInsert() };
        nextButton.hidden = true;
        prevButton.hidden = true;
        editButton.hidden = true;
        deleteButton.hidden = true;

        insertButton.innerText = 'Exit';

        div.innerHTML = '';


        div.innerHTML = 'Romaji Name: ';
        let nameInput = document.createElement('input');
        nameInput.setAttribute('id', 'nameInput');
        nameInput.setAttribute('name', 'nameInput');
        div.appendChild(nameInput);

        div.innerHTML += '<br>Kanji: ';
        let kanjiInput = document.createElement('input');
        kanjiInput.setAttribute('id', 'kanjiInput');
        kanjiInput.setAttribute('name', 'kanjiInput');
        div.appendChild(kanjiInput);

        div.innerHTML += '<br>Birthday: ';
        let birthdayInput = document.createElement('input');
        birthdayInput.setAttribute('id', 'birthdayInput');
        birthdayInput.setAttribute('name', 'birthdayInput');
        div.appendChild(birthdayInput);

        div.innerHTML += '<br>Height: ';
        let heightInput = document.createElement('input');
        heightInput.setAttribute('id', 'heightInput');
        heightInput.setAttribute('name', 'heightInput');
        div.appendChild(heightInput);

        div.innerHTML += '<br>Weight: ';
        let weightInput = document.createElement('input');
        weightInput.setAttribute('id', 'weightInput');
        weightInput.setAttribute('name', 'weightInput');
        div.appendChild(weightInput);

        div.innerHTML += '<br>Blood Type: ';
        let bloodInput = document.createElement('input');
        bloodInput.setAttribute('id', 'bloodInput');
        bloodInput.setAttribute('name', 'bloodInput');
        div.appendChild(bloodInput);

        div.innerHTML += '<br>Production Company: ';
        let productionInput = document.createElement('input');
        productionInput.setAttribute('id', 'productionInput');
        productionInput.setAttribute('name', 'productionInput');
        div.appendChild(productionInput);

        div.innerHTML += '<br>Image Name: ';
        let imageNameInput = document.createElement('input');
        imageNameInput.setAttribute('id', 'imageNameInput');
        imageNameInput.setAttribute('name', 'imageNameInput');
        div.appendChild(imageNameInput);

        div.innerHTML += '<br>';
        div.append(saveButton);
    }
    else {
        insertButton.innerText = 'Insert';
        nextButton.hidden = false;
        prevButton.hidden = false;
        editButton.hidden = false;
        deleteButton.hidden = false;
        let div = document.getElementById('hldr');
        div.innerHTML = '';

        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    //alert(httpRequest.responseText);
                    const data = JSON.parse(httpRequest.responseText);
                    console.log(data);
                    document.getElementById('show').setAttribute('src', data.Image);
                    document.getElementById('hldr').innerHTML = setHTMLforImage(counter);
                }
            }
        }
        httpRequest.open('GET', './browser.php?getIndex=' + counter + '&getSelect=' + 0, true);
        httpRequest.send();

    }
}

function edit(x) {
    let editButton = document.getElementById('edit');
    let div = document.getElementById('hldr');
    let nextButton = document.getElementById('next');
    let prevButton = document.getElementById('prev');
    let insertButton = document.getElementById('insert');
    let deleteButton = document.getElementById('delete');
    if (editButton.innerText === 'Edit') {
        let saveButton = document.createElement('button');
        saveButton.onclick = function () { save(counter) };
        saveButton.innerText = 'Save';
        nextButton.hidden = true;
        prevButton.hidden = true;
        insertButton.hidden = true;
        deleteButton.hidden = true;

        editButton.innerText = 'Exit';

        div.innerHTML = '';


        div.innerHTML = 'Romaji Name: ';
        let nameInput = document.createElement('input');
        nameInput.setAttribute('id', 'nameInput');
        nameInput.setAttribute('name', 'nameInput');
        nameInput.setAttribute('value', newArr[x].RomajiName);
        div.appendChild(nameInput);

        div.innerHTML += '<br>Kanji: ';
        let kanjiInput = document.createElement('input');
        kanjiInput.setAttribute('id', 'kanjiInput');
        nameInput.setAttribute('name', 'kanjiInput');
        kanjiInput.setAttribute('value', newArr[x].JapaneseName);
        div.appendChild(kanjiInput);

        div.innerHTML += '<br>Birthday: ';
        let birthdayInput = document.createElement('input');
        birthdayInput.setAttribute('id', 'birthdayInput');
        nameInput.setAttribute('name', 'birthdayInput');
        birthdayInput.setAttribute('value', newArr[x].Birthday);
        div.appendChild(birthdayInput);

        div.innerHTML += '<br>Height: ';
        let heightInput = document.createElement('input');
        heightInput.setAttribute('id', 'heightInput');
        nameInput.setAttribute('name', 'heightInput');
        heightInput.setAttribute('value', newArr[x].Height);
        div.appendChild(heightInput);

        div.innerHTML += '<br>Weight: ';
        let weightInput = document.createElement('input');
        weightInput.setAttribute('id', 'weightInput');
        nameInput.setAttribute('name', 'weightInput');
        weightInput.setAttribute('value', newArr[x].Weight);
        div.appendChild(weightInput);

        div.innerHTML += '<br>Blood Type: ';
        let bloodInput = document.createElement('input');
        bloodInput.setAttribute('id', 'bloodInput');
        nameInput.setAttribute('name', 'bloodInput');
        bloodInput.setAttribute('value', newArr[x].BloodType);
        div.appendChild(bloodInput);

        div.innerHTML += '<br>Production Company: ';
        let productionInput = document.createElement('input');
        productionInput.setAttribute('id', 'productionInput');
        nameInput.setAttribute('name', 'productionInput');
        productionInput.setAttribute('value', newArr[x].ProductionCompany);
        div.appendChild(productionInput);

        div.innerHTML += '<br>';
        div.append(saveButton);

    }
    else {
        editButton.innerText = 'Edit';
        nextButton.hidden = false;
        prevButton.hidden = false;
        insertButton.hidden = false;
        deleteButton.hidden = false;
        let div = document.getElementById('hldr');
        div.innerHTML = '';

        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    //alert(httpRequest.responseText);
                    const data = JSON.parse(httpRequest.responseText);
                    console.log(data);
                    document.getElementById('show').setAttribute('src', data.Image);
                    document.getElementById('hldr').innerHTML = setHTMLforImage(counter);
                }
            }
        }
        httpRequest.open('GET', './browser.php?getIndex=' + counter + '&getSelect=' + 0, true);
        httpRequest.send();

    }
}

function nextImage() {
    counter++;
    if (counter > newArr.length - 1) counter = 0;
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                //alert(httpRequest.responseText);
                const data = JSON.parse(httpRequest.responseText);
                console.log(data);
                document.getElementById('show').setAttribute('src', data.Image);
                document.getElementById('hldr').innerHTML = setHTMLforImage(counter);
            }
        }
    }
    httpRequest.open('GET', './browser.php?getIndex=' + counter + '&getSelect=' + 0, true);
    httpRequest.send();
}

function prevImage() {
    counter--;
    if (counter < 0) counter = newArr.length - 1;
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                //alert(httpRequest.responseText);
                const data = JSON.parse(httpRequest.responseText);
                console.log(data);
                document.getElementById('show').setAttribute('src', data.Image);
                document.getElementById('hldr').innerHTML = setHTMLforImage(counter);
            }
        }
    }
    httpRequest.open('GET', './browser.php?getIndex=' + counter + '&getSelect=' + 0, true);
    httpRequest.send();
}

function firstImage() {
    counter = 0;
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                //alert(httpRequest.responseText);
                const data = JSON.parse(httpRequest.responseText);
                console.log(data);
                document.getElementById('show').setAttribute('src', data.Image);
                document.getElementById('hldr').innerHTML = setHTMLforImage(counter);
            }
        }
    }
    httpRequest.open('GET', './browser.php?getIndex=' + counter + '&getSelect=' + 0, true);
    httpRequest.send();
}

function lastImage() {
    counter = newArr.length - 1;
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                //alert(httpRequest.responseText);
                const data = JSON.parse(httpRequest.responseText);
                console.log(data);
                document.getElementById('show').setAttribute('src', data.Image);
                document.getElementById('hldr').innerHTML = setHTMLforImage(counter);
            }
        }
    }
    httpRequest.open('GET', './browser.php?getIndex=' + counter + '&getSelect=' + 0, true);
    httpRequest.send();
}

function nextImageDB() {
    counter++;
    if (counter > newArr.length - 1) counter = 0;
    let image = document.getElementById('show');
    image.setAttribute('src', newArr[counter].Image);
    newSection = document.getElementById('hldr');
    newSection.innerHTML = '';
    newSection.innerHTML = setHTMLforImage(counter);
}

function prevImageDB() {
    counter--;
    if (counter < 0) counter = newArr.length - 1;
    let image = document.getElementById('show');
    image.setAttribute('src', newArr[counter].Image);
    newSection = document.getElementById('hldr');
    newSection.innerHTML = '';
    newSection.innerHTML = setHTMLforImage(counter);
}

function sortDBByIndex() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                newArr = [];
                let data = JSON.parse(httpRequest.responseText);
                for (let i = 0; i < data.length; i++) {
                    const temp = new Idol(data[i].romajiname, data[i].japanesename,
                        data[i].birthday, 0, data[i].height,
                        data[i].weight, data[i].bloodtype,
                        data[i].productioncompany, data[i].image);
                    newArr[i] = temp;
                }
                counter = 0;
                let nextButton = document.createElement('input');
                let prevButton = document.createElement('input');
                let editButton = document.createElement('button');
                let insertButton = document.createElement('button');
                let deleteButton = document.createElement('button');
                let saveAllButton = document.createElement('button');
                let firstButton = document.createElement('button');
                let lastButton = document.createElement('button');
                let image = document.createElement('img');
                let myDiv = document.getElementById('insertStuffHere');
                let newDiv = document.createElement('div');
                //<image id = "show"></image>
                myDiv.innerHTML = '';
                image.setAttribute('id', 'show');
                newDiv.setAttribute('id', 'hldr');
                editButton.setAttribute('id', 'edit');
                insertButton.setAttribute('id', 'insert');
                deleteButton.setAttribute('id', 'delete');
                nextButton.setAttribute('id', 'next');
                prevButton.setAttribute('id', 'prev');
                nextButton.type = 'button';
                prevButton.type = 'button';
                nextButton.value = 'Next';
                prevButton.value = 'Previous';
                editButton.innerText = 'Edit';
                insertButton.innerText = 'Insert';
                deleteButton.innerText = 'Delete';
                saveAllButton.innerText = 'Save All'
                firstButton.innerText = 'First'
                lastButton.innerText = 'Last';
                image.setAttribute('src', newArr[0].Image);
                image.style.width = '400px';
                image.style.height = '400px';
                nextButton.onclick = function () { nextImageDB() };
                prevButton.onclick = function () { prevImageDB() };
                editButton.onclick = function () { edit(counter) };
                insertButton.onclick = function () { insert() };
                deleteButton.onclick = function () { deleteAt(counter) };
                saveAllButton.onclick = function () { saveAll() };
                firstButton.onclick = function () { firstImage() };
                lastButton.onclick = function () { lastImage() };
                myDiv.appendChild(image);
                myDiv.appendChild(lastButton)
                myDiv.appendChild(prevButton);
                myDiv.appendChild(nextButton);
                myDiv.appendChild(firstButton);
                myDiv.appendChild(editButton);
                myDiv.appendChild(insertButton);
                myDiv.appendChild(deleteButton);
                myDiv.appendChild(saveAllButton);
                myDiv.appendChild(newDiv);
                newDiv.innerHTML = setHTMLforImage(0);
            }
        }
    }
    httpRequest.open('GET', './sortindex.php', true);
    httpRequest.send();
}

function sortDBByName() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                newArr = [];
                let data = JSON.parse(httpRequest.responseText);
                for (let i = 0; i < data.length; i++) {
                    const temp = new Idol(data[i].romajiname, data[i].japanesename,
                        data[i].birthday, 0, data[i].height,
                        data[i].weight, data[i].bloodtype,
                        data[i].productioncompany, data[i].image);
                    newArr[i] = temp;
                }
                counter = 0;
                let nextButton = document.createElement('input');
                let prevButton = document.createElement('input');
                let editButton = document.createElement('button');
                let insertButton = document.createElement('button');
                let deleteButton = document.createElement('button');
                let saveAllButton = document.createElement('button');
                let firstButton = document.createElement('button');
                let lastButton = document.createElement('button');
                let image = document.createElement('img');
                let myDiv = document.getElementById('insertStuffHere');
                let newDiv = document.createElement('div');
                //<image id = "show"></image>
                myDiv.innerHTML = '';
                image.setAttribute('id', 'show');
                newDiv.setAttribute('id', 'hldr');
                editButton.setAttribute('id', 'edit');
                insertButton.setAttribute('id', 'insert');
                deleteButton.setAttribute('id', 'delete');
                nextButton.setAttribute('id', 'next');
                prevButton.setAttribute('id', 'prev');
                nextButton.type = 'button';
                prevButton.type = 'button';
                nextButton.value = 'Next';
                prevButton.value = 'Previous';
                editButton.innerText = 'Edit';
                insertButton.innerText = 'Insert';
                deleteButton.innerText = 'Delete';
                saveAllButton.innerText = 'Save All'
                firstButton.innerText = 'First'
                lastButton.innerText = 'Last';
                image.setAttribute('src', newArr[0].Image);
                image.style.width = '400px';
                image.style.height = '400px';
                nextButton.onclick = function () { nextImageDB() };
                prevButton.onclick = function () { prevImageDB() };
                editButton.onclick = function () { edit(counter) };
                insertButton.onclick = function () { insert() };
                deleteButton.onclick = function () { deleteAt(counter) };
                saveAllButton.onclick = function () { saveAll() };
                firstButton.onclick = function () { firstImage() };
                lastButton.onclick = function () { lastImage() };
                myDiv.appendChild(image);
                myDiv.appendChild(lastButton)
                myDiv.appendChild(prevButton);
                myDiv.appendChild(nextButton);
                myDiv.appendChild(firstButton);
                myDiv.appendChild(editButton);
                myDiv.appendChild(insertButton);
                myDiv.appendChild(deleteButton);
                myDiv.appendChild(saveAllButton);
                myDiv.appendChild(newDiv);
                newDiv.innerHTML = setHTMLforImage(0);
            }
        }
    }
    httpRequest.open('GET', './sortname.php', true);
    httpRequest.send();
}