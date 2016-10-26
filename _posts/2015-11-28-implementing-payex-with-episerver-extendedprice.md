---
layout:      post
title:       EPiServer and PayEx integration
category:    blog
updated:     2015-11-18
location:    Lund, Sweden
tags:        [EpiServer, PayEx, C-Sharp, Coding, Gist, GitHub, OpenSource]
description: Implementing PayEx with EPiServer (ExtendedPrice)
redirect_from:
  - /blog/2015/implementing-payex-with-episerver-extendedprice
  - /blog/2015/11/28/implementing-payex-with-episerver-extendedprice
---

The past year I have been working a lot with EPiServer in a number of different ways, ranging from creating integration packages, to simply adding additional features for some specific customer requirements. However, out of everything the most troubling was when I was trying to add PayEx integration. {{ more }}

About a month ago my client asked for me to add `PayEx` integration to an existing project they had, and they were all very skeptical of doing this as it took some people months to do, whilst others managed it in a number of weeks. The biggest concern is that there was no standard amount of time to add this feature, and unfortunately all the people who had done this previously were contractors who had since moved on to new clients and were not available to explain everything they had done. So the challenge was set upon me to add this feature, but lucky for me, [Karoline Klever](http://twitter.com/karolikl) had written and published [an OpenSource PayEx library for EPiServer](github.com/PayEx/PayEx.EPi.Commerce.Payment)!

Unfortunately the documentation for the library relied on you using the standard workflows in EPiServer to get everything done, but my client's project was doing their own bespoke methods for almost everything. In a later blog post I will cover a step by step guide to help others in the future with this, but in this post we will be covering a certain difficulty I had faced with `ExtendedPrice` on the `LineItem` object.

On the `LineItem` object you are free to add whatever you want into the `ExtendedPrice` field, there is no standard of what is the correct thing to put in there, but the most common thing that people put in there is the total price for that specific line item, taking into account all discounts for quantity, and any other promotions that may be going on. The one thing that most people **do NOT** keep consistant however is if this should _include_ or _exclude_  VAT. Now I had no idea about this when I had originally started working on the project, I had assumed that everything would be calculated at the point of time that it was needed. None the less, after I got `PayEx` up and running, taking payment from the checkout process was extremely simple, but after you are redirected back to the checkout, you need to call a `WebService` at `PayEx` and find out if the payment was successful, and if so, complete the order process for that shopping cart. Each time I queried, I was given the error `AmountNotEqualOrderLinesTotal`. I checked the amount, I added up the totals, and everything seemed correct to me, I had no idea what was going on. After a little digging around, I eventually found that the English on the payment process of `PayEx` was what was causing the problem. They are a Norwegian company, and they do speak great English up there, but unfortunately they made a big mistake here.

![PayEx_Including_Tax]

Where it says `Including VAT`, it should be saying `Of which is VAT`. Basically, the amount in the `Price` column should be the product total **including VAT** whilst the column to the right should be how much VAT is included in that. The total of the `Price` column needs to match the `Amount` at the top left. If this does not match, the transaction will fail with the `AmountNotEqualOrderLinesTotal` error! After knowing this, I then discovered that my client was storing the total value **excluding VAT** inside of the `ExtendedPrice` field. I had to make a quick hack [NuGet Package](https://www.nuget.org/packages/PayEx.EPi.Commerce.Payment/1.0.0-banana) to solve this, which I plan on marking as `invalid` once I send a pull request to `PayEx` with a better fix to allow for both `Including` and `Excluding` VAT options to their library.

[PayEx_Including_Tax]: /Content/blog_images/PayEx_Including_VAT.png