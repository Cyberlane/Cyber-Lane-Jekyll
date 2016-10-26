---
layout:      post
title:       Parallels shared Mac OS drive over the network
category:    blog
updated:     2016-06-07
location:    Helsingborg, Sweden
tags:        [Parallels, MacOS, Windows, Network Drive, CasPol]
description: Correctly accessing MacOS files from a Windows VM over Parallels
redirect_from:
  - /blog/2016/parallels-shared-mac-drive
  - /blog/2016/06/07/parallels-shared-mac-drive
---

I have a Macbook and make use of Parallels to run my client projects in VMs, which are often Windows. Since I have never been a fan of Git on Windows, I store my project files in my Mac drive and share it with Windows over a network share, but this can cause problems.{{ more }}

You can run into some very strange errors with this setup, including Visual Studio constantly asking you if you trust the projects you open, and recently I received errors when trying to make use of [Cake](http://cakebuild.net/). Ultimately, it came down to a simple script (run as Administrator) to fix it all for me!

```powershell
net use y: \\Mac\Home
C:\Windows\Microsoft.NET\Framework\v4.0.30319\CasPol.exe -pp off -machine -addgroup 1.2 -url file:///Y:/Documents/Projects/* FullTrust
```

This script mapped my Mac's Home directory to y: for the Administrator, and then told .NET applications to trust everything inside of my Projects folder. Now since the only things that make use of my Projects folders are .NET, this worked perfectly!