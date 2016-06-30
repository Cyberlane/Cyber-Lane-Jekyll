---
layout:      post
title:       NancyFx localhost only request modules
category:    blog
updated:     2016-06-30
location:    Malmö, Sweden
tags:        [CSharp, Coding, Nancy, NancyFX, Security]
description: Preventing non-localhost requests from reaching NancyFx modules
---

Today I was playing around with some code, and I was thinking that it would be really nice to hide some admin modules from public access without creating user access security. {{ more }}

So since I was using NancyFx, I decided to create a bit of code to achieve this, and here it is.

```csharp
        public static void EnsureLocalOnly(this NancyModule module)
        {
#if (!DEBUG)
            module.Before.AddItemToEndOfPipeline(c => !c.Request.IsLocal() ? new Response {StatusCode = HttpStatusCode.NotFound} : null);
#endif
        }
```

The wrapping if statement is simply to only perform this check on release builds of the code (Production builds), leaving me to experiment as much as I please on my development box.
This is completely optional, and you are of course welcome to change/modify it as much as you would like to.

Here is an example of how to use the code.

```csharp
public class AdminModule : NancyModule
{
    public AdminModule() : base("/admin")
    {
        this.EnsureLocalOnly();

        Get["/"] = _ => "Only localhost can see this";

        Post["/{name}"] = _ => $"Welcome to localhost, {_.name}"; 
    }
}
```

Another way the code could be used would be.

```csharp
public class SimpleModule : NancyModule
{
    public SimpleModule()
    {
        Get["/"] = _ => "Public can see this";

        Get["/local"] = _ => {
            this.EnsureLocalOnly();
            return "Only localhost can see this";
        };
    }
}
```

Enjoy!