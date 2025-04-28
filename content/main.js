const telegramApi = require('node-telegram-bot-api');

const token = '8100310935:AAEW1lrN8JYe95zIqG-Su7HWvxel60fSZ4Q';

const bot = new telegramApi(token, {polling: true});


bot.on('message', msg => {
    console.log(msg);
})