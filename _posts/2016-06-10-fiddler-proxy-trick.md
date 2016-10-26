---
layout:      post
title:       Fiddler proxy trick
category:    blog
updated:     2016-06-10
location:    Helsingborg, Sweden
tags:        [Fiddler, Proxy, Coding, Debugging, ElasticSearch, Nest]
description: A simple trick for debugging with Fiddler
redirect_from:
  - /blog/2016/fiddler-proxy-trick
  - /blog/2016/06/10/fiddler-proxy-trick
---

Recently I have been working a lot with ElasticSearch and when debugging on localhost, my requests do not show up in fiddler. {{ more }}

Normally the trick to solving this is changing from `http://localhost:9200` towards `http://ipv4.fiddler:9200` or `http://ipv6.fiddler:9200`, which is really not a good solution, because the moment I close Fiddler, my code stops working as the proxy address no longer resolves.

A co-worker at my current client had a previous job at an internet service provider and taught me a wonderful trick for this! Simple add a fullstop, like so `http://localhost.:9200`.
Simply by seeing the fullstop, your computer will automatically route the traffic through the DNS, which forces it to go via Fiddler (if Fiddler is running), and if Fiddler is not running, the DNS will resolve it as a regular localhost call. You get the best of both worlds!

Short blog post, but an extremely useful tip!