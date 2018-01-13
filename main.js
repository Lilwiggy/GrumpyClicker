const {remote} = require('electron'),
    grump = document.getElementById('button'),
    change = document.getElementById('change'),
    head = document.getElementById('head'),
    counter = document.getElementById('coins'),
    user = require('./modules/user.json'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

window.coins = user.coins;
window.head = user.head;

function addCoin() {
    window.coins++;
    var fileName = `./modules/user.json`;
    var file = require(fileName);
    file.coins = window.coins;
    fs.writeFile(fileName, JSON.stringify(file), function(err) {
        if (err) {
            console.log("Sorry but something broke. Please send this message to @lilwiggy123 on twitter.\nSorry 'bout that.\n\n" + err)
        }
    });

    counter.innerHTML = `${window.coins} GrumpCoins`;
}

grump.onmousedown = () => {
    grump.style['width'] = '290px';
    grump.style['height'] = '140px';
    addCoin();
};

grump.onmouseup = () => {
    grump.style['width'] = '300px';
    grump.style['height'] = '150px';
};
change.onmousedown = () => {
    remote.getCurrentWindow().loadURL(url.format({
        pathname: path.join(__dirname, 'selectgrump.html'),
        protocol: 'file',
        slashes: true
    }));
}

head.onload = () => {
    head.src = `assets/${user.head}.png`;
}

head.onmousedown = () => {
    head.src = `assets/${user.head}.png`;
}