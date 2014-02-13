---
layout:      post
title:       SD Card Reader with PIC16F1825
category:    blog
updated:     2013-01-21
location:    Brighton, England
tags:        [PIC, PIC16F1825, SD_Card]
description: An introduction of an SD Card Reader I am working on with a PIC16F1825
---

This post is more of an introduction of what I am working on more than anything else really. Chris Holden created an amazing RAW audio playing device which has essentially only 5 components, as listed here:
{{ more }}
- PIC16F1825
- 100uF capacitor
- NPN Transistor
- SD Card
- Mini speaker

Obviously there is a power source to take into account, which depending on where you are presenting to the circuit may need a voltage regulator. None the less, it's an amazing little device.

It works on the FAT16 file system, and makes use of SPI to communite to the SD card, along with Pulse Wave Modulation to play the actual audio. Now the FAT16 file system unfortunately has a 4GB disk size limit, but for a lot of simple electronics projects this is more than enough. There is also a a limit of 512 files per folder, which really isn't much of a problem either, however Chris' implementation does not support sub folders. This is where I come in.

I am looking to make a number of changes to this project, and my improvements will be as follows:


1. Add sub folder support
2. Get this working with an STA013 to decode MP3 files
3. Add support for other file systems (perhaps FAT32 or EXT)

Currently on my SD card I am working with the following file structure:

![Files1]

Now I have made a couple small tweaks so far, but nothing major yet. Originally Chris' code did not care if a file was deleted or not, which annoyed me a bit, so was the first tweak I had to make. Now when I query the root directory with UART I see the following:

![UART]

The first strange thing I found was the "AMyFol" right next to "MYFOLDER". I decided to take a look at the raw hex for the SD card, and I found MyFolder without a problem, however nothing about AMyFol, so something isn't quite right in the code. An extra thing to add to my list of things to check I suppose. For those interested, my hex looked as follows:

![hex1]

So anyway, a number of blog posts are sure to follow whilst I work on this. I am hoping to get the Sub Folder support added very quickly, as I need it for another project I have in mind.

[Files1]: /Content/blog_images/Files1.png
[UART]: /Content/blog_images/UART1.png
[hex1]: /Content/blog_images/hex1.png