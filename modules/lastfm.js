var customCommands = {
    name: 'lastfm', // command to display last fm url, or whatever you like
    command: function(options) {
            options.cmbot.bot.speak("Our last fm page is here - http://www.last.fm/user/(your last fm)");
    },
    modonly: false,
    pmonly: false,
    hide: false,
    help: 'shows rules for the room',
    acl: false // 
};

exports.customCommands = customCommands;