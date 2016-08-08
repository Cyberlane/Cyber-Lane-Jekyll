---
layout:      post
title:       Why Cloudflare gives error 522 to my NodeJS app
category:    blog
updated:     2016-08-08
location:    Malmö, Sweden
tags:        [Node, NodeJS, Cloudflare, DNS, Dynamic DNS, Self Hosted, nginx]
description: Explaining something I discovered about Cloudflare
---

Last week I started to make use of [Cloudflare](https://www.cloudflare.com) for my DNS on a few of my domains, including my [Dynamic DNS](https://www.cyber-lane.com/blog/2016/08/04/cloudflare-dynamic-dns.html).
When I wanted to start using HTTPS on the NodeJS app I hosted at home though, I ran into error 522. {{ more }}

To diagnose the actual error code (as Cloudflare just showed you their standard error page), I used the following command:

```
curl -svo /dev/null my.domain.com
```

Which identified the error to be 522, to me.
Originally, I was confused about this error, as when I turned off HTTPS on Cloudflare, I could access my app via port 443.

After digging further into the issue, I was getting nowhere and decided to try something out of pure curiosity. I decided to make my NodeJS application accept requests from both ports 80 and 443. I did not want to support non-SSL, but I decided to try this anyway.
I made the change, I waited 10 minutes to make sure it went through, I tried again, and like magic it was working! I spoke to one of their technical support staff who later revealed to me (not mentioned in their documentation), that their service will send `SYN` commands to your domain and await a `SYN-ACK` in response. This all happens on port 80, and upon receiving those, it will open up the SSL traffic, and redirect all traffic via port 443!

If I was actually using nginx or some web server, rather than self hosted, it would have handled this all for me, but since my app was a simple Slack bot, I did not want to install the world on my box at home. The problem is now solved, and I learned something new.

My hope is that anybody else doing self hosted NodeJS (or anything else) at home will benefit from this post, and not waste an entire day looking into the issue as I did!