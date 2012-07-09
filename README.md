#MayhemBOT

An advanced turntable fm bot, based heavily on atom jack's CMBOT - https://github.com/atomjack/cmbot

## Features
* If desired, your bot will enforce a queue, as well as a configurable number of songs each DJ is allowed to play before the bot escorts them down, to give others a chance to DJ.
* If a user on the queue leaves the room, the bot automatically marks them afk, skipping them when announcing who is next in the queue, and automatically marking them unafk when they return. If they don't return within 5 minutes, however, they are removed from the queue.
* Can automatically add a song to it's queue if it gets enough votes, and mods can make the bot DJ. When the bot steps up to the decks, it will randomly put a song at the top of it's queue, and again once it finishes playing the song. This way it always plays a random song.
* Modpm feature lets mods send a message that goes out to all the other mods currently in the room.
* Automatically awesomes a song if it gets 5 awesomes or 20% of the room's population awesomes - whichever is lowest.
* Automatically scrobble songs played to last.fm.
* Automatically save song plays to a mysql or sqlite database.
* Get last.fm tags for the currently playing song or any artist.
* Ban any artist from being played in the room. If a DJ attempts to play any song by a banned artist, the bot will immediately escort the DJ down from the decks.
* Shitlist a user, causing the bot to automatically kick them from the room when they join. Keep those trolls away!
* Warn a user that their song is either not loading or is off genre for the room, and that they have 15 seconds to skip the song or else the bot will escort them down from the decks.
* Autodj - if there are 2 open spots on the decks, the bot will wait 1 minute before automatically stepping up to DJ. Once the decks fill up and someone adds themselves to the queue, however, the bot will automatically step down (unless the bot is the one whose song is playing when that happens - in which case it will step down after it's song is over). Also, this can be disabled, so the bot never autodj's.
* Configurable rules module 

### Triggers

Triggers are special commands any mod can set that will make the bot say a certain phrase. Any user can activate a trigger (to make the bot say the phrase), either in chat or PM. See [trigger](#trigger--keystring-valstring-), [triggerban](#triggerban--usernamestring-) and [triggerlimit](#triggerban--usernamestring-).

## Installation and Setup

you will need node.js get the latest version from - http://nodejs.org/ and install it. then cd to your node.js directory 

at the moment npm installation is borked, i will fix this as soon as possible. in the meantime you will have to install all the dependencies one by one.

```
* 'npm install ttapi'
* 'npm install sprintf'
* 'npm install http-get'
* 'npm install crypto@0.0.3'
* 'npm install xm12js@0.1.13'
* 'npm install querystring@0.1.0'
* 'npm install ntwitter'
* 'npm install jquery'
* 'npm insatll simple-lastfm@1.0.3'
* 'npm install dateformat'
* 'npm install path'
* 'npm install jsdom'
* 'npm install mysql'
* 'npm install sqlite3'
```
then download the zip and extract it to a folder inside your node modules folder

Obviously the bot should be a mod of the room it will be in, to be useful.

To get the bot's auth, userid, and roomid, see [this link](http://alaingilbert.github.com/Turntable-API/bookmarklet.html). Use the bookmarklet after logging in to turntable as the user the bot will run as, then copy and paste the auth, roomid and userid values.

make a copy of 'exampleBOT.js' and rename it whatever you want .js - fill in required info, then open a terminal/console/cmd window, cd to the location of your script and type 'node example.js' (replace example.js with the name of your bots file)



The bot will create two json files (in the same directory as your script) to store state information, "settings.json" (stores the queue, shitlisted users, triggers, etc) and "djs.json" (id's of users who have dj'd, so a user will only get the introductory PM once).

## Dynamic Modules

You can load custom modules at runtime that contain custom commands and/or events, using the `/loadmodule` command. In order to use custom modules, however, make sure you defined the `modules_directory` setting in your bot's .js file. 

You can also have your bot autoload any modules it finds by setting the `autoload_modules` option to true.

Please note:If you have previously used the `addCommand` or `on` methods to add custom commands/events, please switch to using dynamic modules as those methods are deprecated and will be removed in a future version.

### Custom Commands

Your custom module can contain one or more custom commands that your bot will respond to. Simply create a .js file and place it in your modules directory (which you defined in the `modules_directory` option). look at some of the examples included in the modules directory for more

### Custom Events

You can program your own logic for when certain turntable events happen. For instance, simply add the code like below into a file in your modules directory called `alot.js`.
Events supported: speak, ready, roomChanged, update_votes, newsong, endsong, pmmed, add_dj, rem_dj, update_user, new_moderator, rem_moderator, registered, deregistered, booted_user, snagged, nosong, tcpConnect, tcpMessage, tcpEnd, and httpRequest.
See Alain Gilbert's TTAPI (which this bot uses) for more details on what each event is for at https://github.com/alaingilbert/Turntable-API.
Note: These events fire after the bot's own logic does.

```javascript
var customEvents = {
	on: 'speak',
	event: function(cmbot, data) {
		if(data.text.match(/\balot\b/i)) {
			cmbot.bot.speak("http://hyperboleandahalf.blogspot.com/2010/04/alot-is-better-than-you-at-everything.html");
		}
	}
};

exports.customEvents = customEvents;
```

After doing `/loadmodule alot` The above code will cause the bot to display that url if someone says 'alot' instead of 'a lot':)

Also note that the event receives an extra variable before any others that the ttapi does - this variable is your bot's object itself (cmbot, in the above example), which provides you with all the properties and methods of the bot, allowing you to make the bot speak, pm someone, or all kinds of other things.

You can hook the same event in multiple modules. When modules are autoloaded, they are fired in alphabetical order based on the name of the module's .js file. If not autoloaded, they are fired in the order that they are loaded.

As with custom commands, you can `/unloadmodule alot` to cancel the bot from reacting to the event.

Also, the `customCommands` and `customEvents` variables can be an array of objects, so you can add multiple commands and events in one file, if you wish.

## User Commands:

### addme

Add yourself to the queue. If you are already in the queue, it will tell you what position you are in.

### afk

Set yourself as AFK. When a spot on the decks opens, the bot alerts the first non-afk user in the queue that it's their turn. 

### back

Set yourself as back (ie, unafk).

### djafk

Show how many minutes each DJ has been idle.

### party

awesomes the current track and shouts PAAARTEYYYY! or something like that, you can change the text response on line 3339 of lib/index.js

### escortme

When a DJ issues this command, the bot will escort them off the decks after they finish playing their next song.

### fanme

The bot will fan the user.

### help ( [command:string] )

Get a list of commands a user has access to, as well as see more specific help for a command (ie, `/help queue`). If a user is not allowed to run a command, they will not see that command in the list the bot shows them (ie, regular users will not see any mod commands listed).

### queue

Show who is in the queue.

### playcount

Show how many songs each DJ has played.

### plays ( [artist:string] [- track:string] )

Show how many times a song has been played. Depending on configuration, can use either last.fm stats or internal stats that are stored in a mysql database.

### refresh

If a DJ needs to refresh their browser, they can use the /refresh command to not lose their spot on the decks. Otherwise, the bot will alert the next non-afk user in the queue that it is their turn. Note:this is not (yet) enforced.

### removeme

Remove yourself from the queue.

### shortenurl ( url:string )

Use google's URL Shortening service to get a short version of any url.

### shows ( [artist:string] )

Using songkick.com, list the next 7 shows for the currently playing artist (using `/shows`), or for a specific artist (using `/shows artist`).

### lastfmtags ( [artist:string] )

Get last.fm tags for the currently playing song (`/tags`) or a particular artist (`/tags artist`).
 
### uptime

Show how long the bot has been running for.


## Mod Commands:

Note: If a command is marked as **ACL Enforced**, initially the command is only available to the master user, although that user can use `/addacl` to give access to the command to anyone they wish.

### add ( username:string )

**PM Only**

Add a user to the queue. 

### addacl ( command:string username:string )

**PM Only**

Add access to a command to a user. 

### autodj ( [val:enum('on', 'off')] )

**PM Only**

Show or enable/disable autodj.

### avatar ( [val:enum('chinesegirl', 'greengirl', 'redheadgirl', 'gingergirl', 'whiteboy', 'tangirl', 'tanboy', 'gingerboy', 'blackboy', 'greenbear', 'greybear', 'alienbear', 'aquabear', 'maroonbear', 'orangebear', 'blackbear', 'bluebear', 'lightbluecat', 'greencat', 'redcat', 'blondesuperboy', 'redheadsuperboy', 'hornedsuperboy', 'gorilla', 'boymonkey', 'girlmonkey', 'spaceman1', 'spaceman2', 'spaceman3', 'spaceman4', 'spaceman5', 'spaceman6', 'spaceman7', 'daftpunk1', 'daftpunk2')] )

**PM Only** 

**ACL Enforced**

Set the bot's avatar.

### awesome

The bot will awesome the currently playing track.

### ban ( artist:string )

Ban an artist. If a DJ attempts to play a song by a banned artist, the bot will immediately escort them from the decks and warn them that the artist is banned.

### bansong ( [artist:string - song:string] )

Ban a song. If a DJ attempts to play a banned song, the bot will give them 15 seconds to skip or else be escorted off the decks. If no argument is supplied, the currently playing song is banned, and the 15 second warning is given. Artist and song arguments are case insensitive, but must match the spelling of the id3 tags exactly.
 
### bannedartists

Show the list of banned artists. If this list gets long enough, it will cut off when displayed in chat, but won't be in PM.

### dj

Makes the bot DJ. If there are no open spots, the bot add itself to the queue (unless it's not an FFA Day). If there are open spots, the bot will simply step up to the decks. See notes on how the bot adds songs to it's queue for more details.
 
### echo ( text:string )

**PM Only**

Make the bot say something in chat. To have the bot do an action, just use `/echo /me does something`, for example.

### enforcement ( [val:enum('on', 'off')] )

Show or enable/disable queue enforcement.

### getnext

**PM Only**

Get the next X number of songs in the bot's queue. The number X is either the number in set_limit (ie, how many songs each DJ can play for their turn), or if that is set to false, 5.

### kick ( username:string [reason:string] )

The bot will kick a user from the room. 

### lame

The bot will lame the currently playing song.

### loadmodule ( file:string )

Load a module to add a custom command or event. `file` is the name of a file, minus the `.js` extension, residing in the `modules_directory` as defined in the bot's options.

### modtrigger

**PM Only**

Set a trigger that that is only activated by mods. See [trigger](#trigger--keystring-valstring-).

### gettimezone

**PM Only**

Get your currently set timezone. If not set, modpm will display the time in the timezone the bot is configured as being in (default PST). 

### mobilewhitelist ( username:string )

**PM Only**

Adds a user to the mobile whitelist, allowing them to DJ from a mobile device (android or iphone). Users not on the whitelist will be automatically escorted, and kicked for repeated attempts (3 escorts in less than 10 seconds). Mods are exempt and may always DJ from a mobile device.

### modpm ( val:enum('on', 'off')] )

**PM Only**

**ACL Enforced**

Turn modpm on or off.

### move ( username:string position:integer )

**PM Only**

Move a user into a new position in the queue. A position of `1` is the first spot in the queue, etc.

### playlist

**PM Only**

Show how many songs the bot has in its playlist.

### profile

**PM Only**

**ACL Enforced**

Set the bot's profile info. Usage: '/profile <profile field> <some text>'. Available fields: name, twitter, facebook, website, about, topartists, and hangout.

### remacl ( command:string username:string )

**PM Only**

**ACL Enforced**

Remove access to a command for a certain user. 

### remove ( username:string )

**PM Only**

Remove a user from the queue.

### removesong ( position:integer )

**PM Only**

**ACL Enforced**

Remove a song from the bot's queue/playlist. Position is the index provided by /searchplaylist. If last.fm is enabled, this also 'unloves' the track.

### searchplaylist ( search_string:string )

**PM Only**

**ACL Enforced**

Search the bot's playlist for matching songs. `search_string` must be at least 4 characters long. If multiple words are specified, each has to be contained in either the artist or song name. ie, `/searchplaylist foo bar` would match a song whose artist contains the word 'foo' and song title contains the word 'bar', or vice versa. Results will be in the form of `<index>:<artist> - <track>`.

### setcount ( username:string count:integer ) 

**PM Only**

Set the playcount for a particular user.

### setdjtimeout ( val:integer )

** PM Only** 

Set how many minutes each DJ can be idle before given a 1 minute warning, after which time the bot will escort them down from the decks. Default 15 minutes. Set to 0 for no limit.

### setnext ( val:integer )

**PM Only**

**ACL Enforced**

Move a song to the top of the bot's queue. `val` is the index returned by /searchplaylist.

### settimezone ( val:enum('EST', 'CST', 'MST', 'PST') )

**PM Only**

Set your timezone. The bot will display the adjusted time in modpm, and it will adjust for daylight savings time automatically.

### skip

If the bot is DJ'ing, this command will make the bot skip its song. Otherwise, the bot will say "Please skip this track." in chat.

### shitlist ( val:string reason:string )

Add a user, by name or userid, to the bot's shitlist. If the user is in the room when the shitlist is set, the bot will kick the user. Every time the user joins the room the bot will automatically kick them. 

### showmobilewhitelist

Show any users from the mobile whitelist who are in the room. The mobile whitelist only contains user id's so only users present in the room are able to be shown.

### shutup

Makes the bot cease informational messages for one round. ie, if the message interval is 15 minutes, and there are 3 messages to show, the bot will not say them for 45 minutes.

### trigger ( key:string val:string )

**PM Only**

Set a trigger macro. `/trigger facebook http://www.facebook.com/groups/....` will cause the bot to say `http://www.facebook.com/groups/....` if anyone types `/facebook`, either in chat or in a PM to the bot. You can also have the bot automatically shorten any url, using google's URL Shortener, by prepending 'shorten:' to the url. For example: `/trigger foo shorten:http://facebook.com` will cause the bot to say `http://goo.gl/mS4A`. Supports multiple URLs, too.

### triggerban ( username:string )

**PM Only**

Ban a user from using any triggers for 24 hours. Useful if a user abuses triggers.

### triggerlimit ( trigger:string timelimit:integer )

**PM Only**

Set a time limit (in seconds) between triggers being executed, for a particular trigger. ie, `/trigger foo bar`, then `triggerlimit foo 5`, then a user types /foo, causing the bot to say 'bar', and if someone says '/foo' again the bot will not say 'bar' again if 5 seconds has not elapsed.
 
### tweet ( text:string )

**PM Only**

Causes the bot to tweet (if twitter credentials are provided).

### unban ( artist:string )

Unban an artist. Usage is the same as /ban.

### unbansong ( [artist:string - song:string] )

Unban a song. If this command is given with no arguments after /bansong is given (also with no arguments) within the 15 second warning window, the warning is cancelled and the DJ will not be escorted off the decks.

### unloadmodule ( file:string )

Unload a module, to prevent the bot from responding to custom commands or events. Usage is the same as `/loadmodule`

### unmodtrigger ( trigger:string )

**PM Only** 

Remove a mod trigger.

### unmobilewhitelist ( username:string )

**PM Only**

Remove a user from the mobile whitelist.

### unshitlist ( username:string )

Remove a user from the shitlist. 

### untrigger ( trigger:string )

**PM Only**

Remove a trigger.

### unwarn

**PM Only**

Cancels a warning.

### warn ( [val:enum('loading', 'genre')] )

**PM Only**

Warns a DJ that the song they are playing either is not loading, or that it is out of genre for the room. If the DJ does not skip the trick within 15 seconds, the bot will escort the DJ from the decks. Usage is '/warn' for a generic message, or '/warn genre' or '/warn loading' for a more specific one.

### votes

**PM Only**

Shows a list of which users have voted awesome and which have lamed. Turntable seems to have made it much harder to tell if a user has lamed, so only some lames show up for some reason.

### grabit

Make the bot add the currently playing song to it's queue, and if last.fm is set up (with valid credentials), the bot will 'love' the track on last.fm.









