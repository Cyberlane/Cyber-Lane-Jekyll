---
layout:      post
title:       Wiring up the STA013, DAC and PIC (part 1)
category:    blog
updated:     2013-01-30
location:    Brighton, England
tags:        [DAC, MP3, STA013, PIC16F1825, PIC]
description: Wiring up the STA013, DAC and PIC (part 1)
---

I had my German tutor over this evening, so I did not get a chance to touch this circuit until an hour ago. So far I have hooked up my PIC16F1825 to programming pin headers and the colored blocks seen in the image below. Unfortunately I do not have a 14.7456MHz crystal so I am using a 16MHz for now - hopefully it either makes no major difference, but just to be safe I've placed an order for the other crystals which should arrive on Friday.
{{ more }}
![Circuit]

I'll try to finish off the circuit (wiring at least) tomorrow, and then I can start looking into the writing the code on the PIC16F to do the rest. Technically, since the SD card code is already done, the actual code for this circuit should be dead simple. Upon further reading, I've found [somebody else has modified the circuit](https://instruct1.cit.cornell.edu/courses/ee476/FinalProjects/s2007/cd247_maw72/cd247_maw72/index.html) I am basing mine off of as well which makes me even more certain that this is just going to work without any problems. It's good to have some reassurance about a circuit working when you have a tight deadline!


[Circuit]: /Content/blog_images/Circuit_so_far.png