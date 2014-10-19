---
layout:      post
title:       jQuery - Create an XML Document/Object
category:    blog
updated:     2009-07-10
location:    Brighton, England
tags:        [jQuery, XML, Tutorial]
description: A tutorial on creating an XML object
---
Starting with the basics, we are going to create an XML Document/Object with JavaScript. Now as most developers should know, Internet Explorer behaves quite differently to all other web browsers, and for this, it will be no exception.
{{ more }}
In short, Internet Explorer makes use of ActiveX to create XML, while other browsers have something called DOMParser. Now as it's not the same on every browser, we are best to create a function to create our object, and handle all the browser issues.

<script src="https://gist.github.com/Cyberlane/bd16df8b474aebefd772.js"></script>

Usage:

<script src="https://gist.github.com/Cyberlane/f93b79cb3df6f05ab108.js"></script>

Due to the nature of how you create the object, you can as you may have noticed also convert a regular string into an XML document (given that it is correctly structured obviously). You now have an XML Document/Object, now you can fill it up with a structure and some data.