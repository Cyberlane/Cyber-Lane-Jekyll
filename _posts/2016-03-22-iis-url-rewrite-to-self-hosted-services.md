---
layout:      post
title:       IIS URL Rewrite to Self Hosted Services
category:    blog
updated:     2016-03-22
location:    Malmö, Sweden
tags:        [IIS, URL Rewrite, Nancy, NancyFX, C-Sharp, Coding, OpenSource]
description: Configuring IIS to rewrite URLs to a self hosted service
---

At work I was writing a number of simple self hosted services with [NancyFX](http://www.nancyfx.org/), however normally at home I would host these on my Linus server and make use of nginx which makes this extremely simple. At the office however we were using IIS, which required some extra tweaks and configurations to get working, so I thought I would share how it is done for anybody else that may want to do this. {{ more }}

You need to install two additional modules (official from Microsoft) onto your IIS installation, and unfortunately I have not looked to see if this works on older versions of IIS, but I know it works on version 7.5 and above. The modules you need to install are as follows...

 * [URL Rewrite](http://www.iis.net/download/URLRewrite)
 * [Reverse proxy](http://www.iis.net/download/ApplicationRequestRouting)

Once you have these installed, open up IIS, go to `site settings` and you should see a `URL Rewrite` icon. This is the indicator that it has installed correctly, now personally I am not a fan of the UI for making my changes mostly because I want simple changes and I find the interface way too complicated to do simple changes. Instead of working with the UI, I am going to tell you how to do these changes with the `web.config`.

Visit your default website's folder, and if there is not already a `web.config` in there, add one, and open it up in your favourite text editor. Within the `system.webServer` tag, I added the following snippet of code.

```xml
<rewrite>
    <rules>
        <rule name="MyUniqueRuleName" stopProcessing="true">
            <match url="^API/(.*)" />
            <action type="Rewrite" url="http://localhost:45000/{R:1}" logRewrittenRule=true" />
        </rule>
    </rules>
</rewrite>
```

Now that for me is way easier to understand and maintain than fiddling with some UI tools, but for those of you who need a little help understanding the structure of this config, read on as I will explain it.

So the `rewrite` tag is simply how the IIS module can find it's code, and then the `rules` tag will be the wrapper around every rule we add. I have not looked into the upper limits, but potentially you can add as many rules as you want within the `rules` tag.

The `rule` tag is the first important tag as it is your actual redirect rule, which has two attributes. The `name` which has to be completely unique from every other rule, but in general does not matter what you call it, it is more an indicator for you to identify what the rule should do. The `stopProcessing` tag simply tells IIS `after I receive a request that matches this rule, you can stop processing this request and where ever I send this request, it will take over for you`. In my instance, I am sending everything off to a self hosted NancyFX service.

Inside of the the rule tag you are able to set a `match` and an `action`. The `match` is a regular expression to try match the incoming request URL, and the `action` is telling IIS what you want to do with that request. For each match group in the `match`, you are able to use that in your `action` url with `{R:#}` which the `#` is the number (counting up from 1), for the match group. The `logRewrittenRule` attribute is a simple boolean telling IIS if it should bother logging the incoming request to it's own logs or not, and in general I like to keep this set to true, as I feel you can never have too many logs.

Now let's try to better understand this code with some examples.

Given the following request URL : http://www.cyber-lane.com/API/blog/2016/03/22/index.html
The server will call the internal URL : http://localhost:45000/API/blog/2016/03/22/index.html

My regular expression `(.*)` is catching everything after `API/`, which in this instance is `blog/2016/03/22/index.html`. This can of course be completely manipulated however we want, but again, this was exactly what I wanted and served my needs. I hope this code helps some other people out, and feel free to ask me questions if you need further clarification or examples.