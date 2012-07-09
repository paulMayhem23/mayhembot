var customCommands = {
    name: 'webs', // custom command to display website info
    command: function(options) {
            options.cmbot.bot.speak("http://www.kolektivmayhem.tk/?page_id=78 - http://www.last.fm/user/clubmayhem23");
    },
    modonly: false,
    pmonly: false,
    hide: false,
    help: 'shows rules for the room',
    acl: false // 
};

exports.customCommands = customCommands;