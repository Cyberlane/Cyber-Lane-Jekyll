---
layout:      post
title:       Minor update
category:    blog
updated:     2013-01-29
location:    Brighton, England
tags:        [DAC, MP3]
description: I have 40 MP3 decoder chips along with 40 matching DACs and ready to go
---

So I have all 40 of my decoder chips, and the 40 matching DACs all ready to go. With the help of Jason Hotchkiss, I got one of each soldered to a breakout board so I can play with them on a breadboard. Friday I was busy with general chores and things that needed to be done, Saturday I was helping somebody move house followed by going to a concert in London. Sunday I was teaching polymorphisms and exception handling... So unfortunately I've just been a bit busy, but I have not been lazily avoiding the task at hand!
{{ more }}
For my own ease of mind, I am going to branch my current code so that I can keep my progress on sub folders, but divert and quickly get the MP3 support working, which will require ripping out all of the PWM code in the original source. Once I have the code playing a single MP3 on another breadboard, I will be happy and will return to the sub folder code and at the same time start to design the circuit in Fritzing.

On paper, it doesn't seem like there's much left to do, but in reality there is quite a lot of work still left. If there are no complications playing the MP3 files though, that's a major problem removed and I can put all my effort towards sub folder support. I'll allow myself a couple days to sort out the Arduino code and documentation for the workshop, which should be more than enough really. Arduino won't be doing much other than asking for a list of files, and stating which to play, along with displaying all this information on an LCD.