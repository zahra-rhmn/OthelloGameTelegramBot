const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '364708744:AAHGiKUcs1n5p__ZJcbTA9hrQ5IKWTQUzkM';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, msg.text+'!');
});


bot.onText(/^\/start$/, function (msg) {
  chooseN(msg);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

function chooseN(msg){
    const opts = {
        // reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: '6*6', callback_data: '6' },{ text: '8*8', callback_data: '8' }]
          ]
        })
        
    };

    bot.sendMessage(msg.chat.id, "Choose Game Mode", opts);
};

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  var opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  }
  if (action === '6') {
     bot.editMessageReplyMarkup(
      JSON.stringify({
          inline_keyboard: [
            [{ text: '(6*6)', callback_data: '6' },{ text: '8*8', callback_data: '8' }]
          ]
        })
      ,opts);
  }else if (action === '8') {
    bot.editMessageReplyMarkup(
      JSON.stringify({
          inline_keyboard: [
            [{ text: '6*6', callback_data: '6' },{ text: '(8*8)', callback_data: '8' }]
          ]
        })
      ,opts);
  }
});

bot.on('inline_query', function(msg)
{

    // Received inline query
    // console.warn(msg);
    bot.answerInlineQuery(msg.id,[{title: "OthelloGame" , message_text: "@"+msg.from.username , options: opts, type: 'article', id: msg.id}]);
    // console.warn("1");
});