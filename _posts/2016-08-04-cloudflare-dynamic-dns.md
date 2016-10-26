---
layout:      post
title:       Cloudflare Dynamic DNS
category:    blog
updated:     2016-08-04
location:    Malmö, Sweden
tags:        [Node, NodeJS, Cloudflare, DNS, Dynamic DNS, GitHub]
description: A simple script that updates your Cloudflare DNS entry
image:
  feature: 'cloudflare.jpg'
redirect_from:
  - /blog/2016/cloudflare-dynamic-dns
  - /blog/2016/08/04/cloudflare-dynamic-dns
---

I use [Cloudflare](https://www.cloudflare.com) for the DNS on my domain, which lends me a number of useful features, incuding SSL.
I wanted one sub-domain to work as a Dynamic DNS for my computer at home, so {{ more }} I wrote a script to do exactly that.

[Cloudflare Dynamic DNS](https://github.com/Cyberlane/Cloudflare-Dynamic-DNS) is a NodeJS script which when started will keep on running and at 9am every day it will check your public IP and update your sub-domain on Cloudflare accordingly.

It's a really simple script, but since I use it and find it useful, perhaps somebody else will find it useful. I don't normally bother with licenses but am aware that some people are skeptical about using software which does not have a license, so I added the MIT license.

Enjoy!