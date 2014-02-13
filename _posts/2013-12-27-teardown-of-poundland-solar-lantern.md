---
layout:      post
title:       Teardown of Poundland Solar Lantern
category:    blog
updated:     2013-12-27
location:    Brighton, England
tags:        [Solar, Batteries, Home-Improvement, Teardown]
description: Teardown of a Poundland Solar Lantern
---
Today I was in Poundland just generally looking around for some toys for my mother's dog, as after visiting for Christmas I noticed he had destroyed all of his toys and needed some new ones. While I was in the store, I noticed they were selling a Solar powered garden lantern, which states that that it automatically turns on at dusk. For &pound;1, I couldn't resist taking one home to break apart and have a look inside. {{ more }}

So here it is in all it's cheap glory.

![001]

On the top you can clearly see a nice 5cm x 5cm solar panel.

![002]

You can very easily screw off the top, as that reveals switch to turn it on and off and you can also clearly see the LED.

![003]
![004]

With very little persuasion at all, the big round thing in the middle (seen above) just comes right off which exposes everything inside.

![005]

The next part was a bit trickier as I needed to a pair of plier to carefully remove the circuit from the plastic that was clipped around it.

![006]

A closer look at the back of the solar panel, and we can see that it's a TRONY SC3030S-4NA, which after a quick search online, tells us that it's a 10mA at 2.5v all glass circuit.

![007]

Looking at the circuit board we have the following:

 - 220&#8486; resistor
 - Diode
 - Slider switch
 - LED
 - Black Blob (unknown iC)
 - 2.5v/10mA Solar Cell
 - 1.2v/40mAh Ni-MH Battery

![008]
![009]
![010]

The cirucit is simple to work out, but unfortunately because it's a cheap device the iC is just a black blob which we can never determine what it actually is. Putting that aside, we have a solar cell which charges a battery, and a diode to prevent battery power going back to the solar cell when it's not charging. The LED turns on when the battery isn't charging, with the power that comes back from the battery. With that all in mind, we have a very small circuit that can be used for a number of other projects. We can remove the LED and place something else in it's stead which takes 1.2v, or even chain multiple LEDs up to it, but keeping in mind that the more that draws from it, the shorter life we will get from the battery. You can potentially replace the battery for a bigger Ni-MH cell to give it a longer battery life, but also need to keep in mind that the charge rate will still be quite slow due to the restrictions of the solar cell, and I am not sure if the black blob applies any further restrictions. You can also potentially remove the switch, and just bridge the connection so that it's always on, or hook it up to something else you prefer.


[001]: /Content/teardown/solar-lantern/IMG_20131227_184032.jpg
[002]: /Content/teardown/solar-lantern/IMG_20131227_184043.jpg
[003]: /Content/teardown/solar-lantern/IMG_20131227_184102.jpg
[004]: /Content/teardown/solar-lantern/IMG_20131227_184119.jpg
[005]: /Content/teardown/solar-lantern/IMG_20131227_184200.jpg
[006]: /Content/teardown/solar-lantern/IMG_20131227_184326.jpg
[007]: /Content/teardown/solar-lantern/IMG_20131227_184359.jpg
[008]: /Content/teardown/solar-lantern/IMG_20131227_184418.jpg
[009]: /Content/teardown/solar-lantern/IMG_20131227_184439.jpg
[010]: /Content/teardown/solar-lantern/IMG_20131227_190316.jpg