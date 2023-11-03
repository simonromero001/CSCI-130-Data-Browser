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
                let data = JSON.parse(httpRequest.responseText);
                for (let i = 0; i < data.length; i++) {
                    const temp = new Idol(data[i].RomajiName, data[i].JapaneseName,
                        data[i].Birthday, data[i].Age, data[i].Height,
                        data[i].Weight, data[i].BloodType,
                        data[i].ProductionCompany, data[i].Image);
                    newArr[i] = temp;
                }
                let nextButton = document.createElement('input');
                let prevButton = document.createElement('input');
                let image = document.createElement('img');
                let myDiv = document.getElementById('insertStuffHere');
                let newDiv = document.createElement('div');
                //<image id = "show"></image>
                myDiv.innerHTML = '';
                image.setAttribute('id', 'show');
                newDiv.setAttribute('id', 'hldr');
                nextButton.type = 'button';
                prevButton.type = 'button';
                nextButton.value = 'Next';
                prevButton.value = 'Previous';
                image.setAttribute('src', newArr[0].Image);
                image.style.width = '400px';
                image.style.height = '400px';
                nextButton.onclick = function () { nextImage() };
                prevButton.onclick = function () { prevImage() };
                myDiv.appendChild(image);
                myDiv.appendChild(prevButton);
                myDiv.appendChild(nextButton);
                myDiv.appendChild(newDiv);
                newDiv.innerHTML = setHTMLforImage(0);
            }
        }
    }
    httpRequest.open('GET', './browser.php?getSelect='+1, true);
    httpRequest.send();
}

function setHTMLforImage(x) {
    return 'Romaji Name: ' + newArr[x].RomajiName + '<br>Kanji: ' + newArr[x].JapaneseName + '<br>Birthday: ' + newArr[x].Birthday +
        '<br> Height: ' + newArr[x].Height + '<br>Weight: ' + newArr[x].Weight + '<br>Blood Type: ' + newArr[x].BloodType
        + '<br>Production Company: ' + newArr[x].ProductionCompany;
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
    /*
    counter++;
    if (counter > newArr.length - 1) counter = 0;
    let image = document.getElementById('show');
    image.setAttribute('src', newArr[counter].Image);
    newDiv = document.getElementById('hldr');
    newDiv.innerHTML = '';
    newDiv.innerHTML = setHTMLforImage(counter);
    */
}

function prevImage() {
    counter--;
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
    /*
    counter--;
    if (counter < 0) counter = newArr.length - 1;
    let image = document.getElementById('show');
    image.setAttribute('src', newArr[counter].Image);
    newDiv = document.getElementById('hldr');
    newDiv.innerHTML = '';
    newDiv.innerHTML = setHTMLforImage(counter);
    */
}
