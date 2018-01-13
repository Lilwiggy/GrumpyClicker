const electron = require('electron'),
    url = require('url'),
    path = require('path'),
    user = require('./modules/user.json');

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file',
        slashes: true
    }));

})


const { Client } = require('discord-rpc');

const client = new Client({
    transport: 'ipc'
});
const startTimestamp = new Date();
function update() {
    const c = mainWindow.webContents.executeJavaScript('window.coins').then(GC => {
        const d = mainWindow.webContents.executeJavaScript('window.head').then(head => {
        client.setActivity({
            details: `Total GrumpCoins: ${GC}`,
            largeImageKey: `${head}`,
            largeImageText: `Total GrumpCoins: ${GC}`,
            instance: true,
            startTimestamp
            })
        })
    })
}

client.on('ready', () => {
    console.log('Done didily doing it!');
    update();
    setInterval(() => {
        update();
      }, 15e3);
});


client.login('401463097220530186').catch(console.error)