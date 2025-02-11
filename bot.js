const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const APP_ID = process.env.APP_ID;

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Привет! 🌤️ Чтобы узнать текущую погоду, отправь мне свою геопозицию, и я покажу актуальные данные! 📍'))
bot.on('message', async (ctx) => {
    if(ctx.message.location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=${APP_ID}`;
        const response = await axios.get(url);
        const temp = Math.ceil(response.data.main.temp - 273.15); 
        ctx.reply(`${response.data.name}: ${temp} C`);
    }
})
bot.launch()