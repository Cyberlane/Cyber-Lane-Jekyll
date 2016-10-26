---
layout:      post
title:       Finding MSBuild with Windows Batch files
category:    blog
updated:     2016-07-28
location:    Malmö, Sweden
tags:        [CSharp, Coding, MSBuild, Batch file, Build script, CAKE]
description: How to find MSBuild within a batch file
image:
  feature: 'matrix.jpg'
---

Lately I have been doing less and less C-Sharp code, and the times I do have to dive in, I try to use CAKE or another some similar system for my build scripts. However my current client has a personal preference of using Windows batch files, which is fine until it looks for a version of MSBuild that I do not have installed! {{ more }}

An example of how existing script files may look would been

```batch
@echo off "C:\Program Files (x86)\MSBuild\12.0\Bin\MSBuild.exe" SampleProject.msbuild
``` 

Now if I had MSBuild `12.0` installed, that would not be a problem, however I have version `14.0`, so I have started changing the scripts to look a bit like this

```batch
set msbuild.exe=
for /D %%D in (%SYSTEMROOT%\Microsoft.NET\Framework\v4*) do set msbuild.exe=%%D\MSBuild.exe

if not defined msbuild.exe each error: can't find MSBuild.exe & goto :eof
if not exist "%msbuild.exe%" echo error: %msbuild.exe%: not found &goto :eof

@echo %msbuild.exe% SampleProject.msbuild
pause

:eof
```

I came across the code for this on [StackOverflow](http://stackoverflow.com/a/13752506/221456).