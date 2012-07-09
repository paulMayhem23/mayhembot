// another silly example speak event, if a user says 'lame' in chat, a url is displayed

var customEvents = {
    on: 'speak',
    setup: function(cmbot) {
        // Code in here gets run when the module is loaded. See the example module 'greeting.js'.
    },
    event: function(cmbot, data) {
        if(data.text.match(/\blame\b/i)) {
            cmbot.bot.speak("http://i.imgur.com/yIXkX.gif");
        }
    }
};

exports.customEvents = customEvents;