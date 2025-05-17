const telegramApi = require('node-telegram-bot-api');
const {gameOptions} = require('./options.js');
const token = '8100310935:AAEW1lrN8JYe95zIqG-Su7HWvxel60fSZ4Q';

const bot = new telegramApi(token, {polling: true});

const chats = {};

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Початок спілкування'},
        {command: '/info', description: 'Інформація'},
        {command: '/game', description: 'Вгадай число'},
    ]);
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if (text === '/start'){
            await bot.sendSticker(chatId, 'https://cdn2.combot.org/krutoposmesh1she/webp/1xf09f96bc.webp');   
            return bot.sendMessage(chatId, `Вітаю в боті FootBot`);
        }
        if (text === '/info'){
            return bot.sendMessage(chatId, `Тебе звати ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if (text === '/game'){
            await bot.sendMessage(chatId, 'Я загадав число від 0 до 9');
            const randNum = Math.floor(Math.random() * 10);
            chats[chatId] = randNum;
            return bot.sendMessage(chatId, 'Вгадай', gameOptions);
        }
        return bot.sendMessage(chatId, 'Напиши щось інше');
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        
        if (data === chats[chatId]){
            return bot.sendMessage(`Ти відгадав цифру ${chats[chatId]}`);
        }
        else {
            return bot.sendMessage(`Ти невгадав цифру ${chats[chatId]}`);
        }
    })
};

start();