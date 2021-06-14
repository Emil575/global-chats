Readme 


Dies ist der Source Code für einen Global Bot 

Um anzufangen installiere als erstes Nodejs auf deinem Pc oder Server 
https://nodejs.org

Wenn du das gemacht hast gebe `npm init ` ein um eine Package.json zu erstellen
Danach mache `npm i discord.js` und `npm i fs` nun sollten die Node_Modules installiert werden
Als nächstes musst du eine globals.json erstellen in diese kommt `{}`
Nun fehlt noch eine ranks.json. Dort kommen ebenfalls diese `{}` klammern rein



Nun ist der Bot fertig eingerichtet. Es fehlt nur noch der Token vom Developer Portal https://discord.com/developers

Je nach dem auf was für einem Gerät dein Bot fehlt kannst du auch ein Package benutzen, dieses nennt sich pm2 und hostet deinen bot 24/7.Installieren kannst du das mit `npm i -g pm2`
Den Bot startest du nun mit `pm2 start main.js`. Allternativ kannst du auch `node .` benutzen, allerdings bleibt da der Bot nur solange online bis der Pc aus ist


Hoffe es gefällt dir  


Bitte verlinke mich im Global Chat.
Danke
