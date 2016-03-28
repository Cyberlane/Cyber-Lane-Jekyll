---
layout:      post
title:       Accessing MongoDb Remotely with Mac OSX host
category:    blog
updated:     2016-03-28
location:    Malmö, Sweden
tags:        [OSX, Mac, MongoDb, Database]
description: Configuring MongoDb for remote access
---

Today I was struggling to access my MongoDb instance from another machine in the same network. At first I had assumed it would be firewall settings, but later on I found out it to be a MongoDb setting. {{ more }}

I work on a Macbook running Mac OSX, however I do have Parallels installed for me to do some work from Windows when I need to. On the Mac OSX portion, I have MongoDb installed and since I already have it there along with all the tools I use for it, I did not see a point to installing yet another instance within my Windows VM when developing a prototype.

My thoughts were that I could just open up some firewall settings, allow the Windows machine access to my Mac's instance of MongoDb and get to work. After an hour of banging my head on the table, wondering why I could not access it remotely I discovered a setting which explained it all!

I typed the following command (I installed MongoDb with Homebrew, so your path may vary).

```bash
vim /usr/local/etc/mongod.conf
``` 

Inside I found the following

```conf
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /usr/local/var/mongodb
net:
  bindIp: 127.0.0.1
```

Notice anything that might cause a problem? Take a look at the very last line. That line is telling MongoDb to only access requests from the local machine, which is a great default when deploying to a new server, but when developing prototypes on a local dev environment, it is a pain in the rear! I opened it up completely by changing it to the following:

```conf
net:
  bindIp: 0.0.0.0
```

Now if you are a bit more sensible than myself, you will not want to open it up completely and will still want it restricted, but to perhaps 2 or 3 different machines. Well, you are in luck as that configuration is in fact able to take a comma seperated list as follows:

```conf
net:
  bindIp: 127.0.0.1,192.168.0.100,192.168.0.150
```

The above will restrict it to allow connections only from `localhost`, `192.168.0.100` and `192.168.0.150`.

Now after you change the config, you need to restart MongoDb to make it reload the new settings, with a Homebrew install that is simply running this command.

```bash
brew services restart mongodb
```