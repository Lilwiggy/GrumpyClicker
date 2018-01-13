const {remote} = require('electron'),
    main = document.getElementById('main'),
    user1 = require('./modules/user.json'),
    heads = require('./modules/heads.json'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');


function checkCoins(price, head) {
    if (price > user1.coins) {
        if(heads[`${head}`].purchased == 1) {
            user1.head = head;
            fs.writeFile(`./modules/user.json`, JSON.stringify(user1), function(err) {
                if (err) {
                    console.log("Sorry but something broke. Please send this message to @lilwiggy123 on twitter.\nSorry 'bout that.\n\n" + err)
                }
                remote.getCurrentWindow().loadURL(url.format({
                    pathname: path.join(__dirname, 'main.html'),
                    protocol: 'file',
                    slashes: true
                }));
                alert(`${head} is now your grumphead. Please allow discord up to 15 seconds to make the changes.`)
            })
        } else {
        alert("Sorry looks like you need more Grump Coins for this. Get back to clickin'!")
        }
    } else {
        if (heads[`${head}`].purchased == 0) {
            alert(`Thank you for purchasing the ${head} head! ${price} GrumpCoins have been reduced from your account. Please allow discord to take up to 15 seconds to add your grumphead.`)
            heads[`${head}`].purchased = 1;
            fs.writeFile(`./modules/heads.json`, JSON.stringify(heads), function(err) {
                if (err) {
                    console.log("Sorry but something broke. Please send this message to @lilwiggy123 on twitter.\nSorry 'bout that.\n\n" + err)
                }
                user1.head = head;
                user1.coins = user1.coins - price;
                fs.writeFile(`./modules/user.json`, JSON.stringify(user1), function(err) {
                    if (err) {
                        console.log("Sorry but something broke. Please send this message to @lilwiggy123 on twitter.\nSorry 'bout that.\n\n" + err)
                    }
                    remote.getCurrentWindow().loadURL(url.format({
                        pathname: path.join(__dirname, 'main.html'),
                        protocol: 'file',
                        slashes: true
                    }));
                })
            });
        } else if(heads[`${head}`].purchased == 1) {
            user1.head = head;
            fs.writeFile(`./modules/user.json`, JSON.stringify(user1), function(err) {
                if (err) {
                    console.log("Sorry but something broke. Please send this message to @lilwiggy123 on twitter.\nSorry 'bout that.\n\n" + err)
                }
                remote.getCurrentWindow().loadURL(url.format({
                    pathname: path.join(__dirname, 'main.html'),
                    protocol: 'file',
                    slashes: true
                }));
                alert(`${head} is now your grumphead. Please allow discord up to 15 seconds to make the changes.`)
            })
        }
    }
}



main.onmousedown = () => {
    remote.getCurrentWindow().loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file',
        slashes: true
    }));
}