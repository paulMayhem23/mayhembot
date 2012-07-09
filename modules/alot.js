// silly example speak event module, triggers when a user says 'alot' instead of 'a lot' in chat

var customEvents = {
    on: 'speak',
    setup: function(cmbot) {
        // Code in here gets run when the module is loaded. See the example module 'greeting.js'.
    },
    event: function(cmbot, data) {
        if(data.text.match(/\balot\b/i)) {
            cmbot.bot.speak("http://hyperboleandahalf.blogspot.com/2010/04/alot-is-better-than-you-at-everything.html");
        }
    }
};

exports.customEvents = customEvents;