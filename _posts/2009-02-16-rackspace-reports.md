---
layout:      post
title:       RackSpace Reports
category:    blog
updated:     2009-07-10
location:    Brighton, England
tags:        [C-Sharp, Reports, Audit]
description: Reports, Audits and RackSpace Domains
redirect_from:
  - /blog/2009/rackspace-reports
  - /blog/2009/02/16/rackspace-reports
---
For those of you who make use of RackSpace for your web hosting, you may notice there is no option to get full reports on every Domain you have with them, {{ more }} let alone the Sub-Domains, nor where they are all pointing. If you want that type of information, you have to manually view each page, one by one.

I was put in charge of creating a Web Audit, as the company I work for own over 260 domains, numerous servers with RackSpace, and going through all of that one by one could prove daunting, and could take anything up to a couple days to complete.

Being the type of the person that I am, I wrote a small command line application in C#, which logs into our RackSpace account, navigates to the relevant web pages, and then strips the HTML for all the information we needed to do our audit. I plan on releasing the source code for this (after a bit of cleaning up, as it was very quickly thrown together), so that others may make use of it, or even alter it to gather additional information from other sections of their RackSpace administration panel.
