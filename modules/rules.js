var customCommands = {
    name: 'rules', // rules of the room
    command: function(options) {
            options.cmbot.bot.speak("these are the rules for this room");
    },
    modonly: false,
    pmonly: false,
    hide: false,
    help: 'shows rules for the room',
    acl: false // 
};

exports.customCommands = customCommands;