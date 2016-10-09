# Chatbot

This experiment uses [rivescript](https://www.rivescript.com/) to create a chatbot. To get started clone the repo and run

```
npm install
```

Then when you are ready

```
npm start
```

The bot's intelligence comes from natural language scripting which is very simple and easy to pick up. For example here is a snippet from one of the files

```
! version = 2.0

+ hi
- Hello there. Want to find out about TABLEFLIP?

+ (yes|ok|yep|alright|please|yes please)
% hello there want to find out about tableflip
- great
```

![example](https://cloud.githubusercontent.com/assets/4499581/19223587/3342bc64-8e6b-11e6-8e61-216b2a8af644.jpg)
