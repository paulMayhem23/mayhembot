var customCommands = {
    name: 'rules', // This is what the bot will respond to (ie, /beer)
    command: function(options) {
            options.cmbot.bot.speak("Club Mayhem is a hangout for hackers, coders and lurkers of all kinds, play mostly what you want, nothing too commercial, no wubstep, respect the other users, excessive lamers and haters will be banned. for guidance on what we like to hear, check http://www.last.fm/user/clubmayhem23");
    },
    modonly: false,
    pmonly: false,
    hide: false,
    help: 'shows rules for the room',
    acl: false // 
};

exports.customCommands = customCommands;