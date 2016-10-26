---
layout:      post
title:       Nancy Metadata
category:    blog
updated:     2015-10-26
location:    Lund, Sweden
tags:        [NancyFX, Metadata, C-Sharp, Coding, Gist]
description: I wrote a little code with NancyFX for metadata
redirect_from:
  - /blog/2015/nancy-metadata
  - /blog/2015/10/26/nancy-metadata
---

Last week I was struggling to find out how to make good use of metadata within [NancyFx](http://www.nancyfx.org/). I was reading through their extensive [documentation](https://github.com/NancyFx/Nancy/wiki) along with searching Google for answers. {{ more }} The closest I could find was a [single blog post](http://liddellj.com/nancy-metadata-modules/) written by [Jim Liddell](https://twitter.com/liddellj) and unfortunately it did not cover the specifics of what I wanted to try and achieve.

I wanted to provide metadata for specific routes within specific modules, in a clean and structured manner. I did not want to add any extra layers of complexity, I just wanted something simple that just worked. I spent a few hours trying to get it working with how I believed it should be working, based off of the methods in the framework but unfortunately kept on hitting runtime errors. So in the end, I created a [gist](https://gist.github.com/Cyberlane/9dbcc37fff85777716f1) of what I was trying to do, and sent it to [Andreas Håkansson](http://www.thecodejunkie.com/) via email, asking what I was doing wrong.
A couple of days later, he came back to me with [the answer](https://gist.github.com/thecodejunkie/7c14b0541165442ef062) and of course at that moment I instantly realized how it all worked. This was still not what I wanted as an end result, but by knowing how the framework worked, I could make it work the way I wanted.

I wanted to be able to create a MetadataModule file for each Module that I wanted to provide Metadata for, and have it work with paths that were relative (the base path) to what was already found my existing Nancy Modules. So this is what I did...

I created an interface named IDataModule, that would allow me to have a structured way of retrieving my information from each of my MetadataModule files.

```csharp
public interface IDataModule<T>
{
    T Get(string path);
}
```

Along with a simple object structure that would serve as my Metadata itself.

```csharp
public class MetadataModel
{
    public int Index { get; set; }
}
```

I then created an instance of a MetadataModule file, but I decided to try and keep a bit of structure to this, just to make my life a little easier. So currently all my Nancy Modules live in a folder named **Modules** so I decided my Metadata files should live in a folder named **Metadata**. I also decided that since my Modules have the naming convention of **NameModule** that my Metadata should have a matching convention, so a matching file would be **NameMetadataModule**. So for **HomeModule** I would then have a matching **HomeMetadataModule** file.

```csharp
public class HomeMetadataModule : IDataModule<MetadataModel>
{
    private readonly Dictionary<string, MetadataModel> _paths = new Dictionary<string, MetadataModel>
    {
        {"/", new MetadataModel {Index = 1}}
    };

    public MetadataModel Get(string path)
    {
        return _paths.ContainsKey(path) ? _paths[path] : null;
    }
}
```

Now for this all to work, I needed an IRouteMetadataProvider instance, which supported all these rules I put into place. It is perhaps not the cleanest implementation, but it works perfectly for my needs.

```csharp
public class RouteMetadataProvider : IRouteMetadataProvider
{
    public Type GetMetadataType(INancyModule module, RouteDescription routeDescription)
    {
        return typeof (MetadataModel);
    }

    public object GetMetadata(INancyModule module, RouteDescription routeDescription)
    {
        var moduleType = module.GetType();
        var moduleName = moduleType.FullName;
        var parts = moduleName.Split('.').ToArray();
        if (parts[0] != GetType().FullName.Split('.')[0]) return null;
        if (parts[parts.Length - 2] != "Modules") return null;
        parts[parts.Length - 2] = "Metadata";
        parts[parts.Length - 1] = ReplaceModuleWithMetadataModule(parts[parts.Length - 1]);
        var metadataModuleName = string.Join(".", parts);
        var type = Type.GetType(metadataModuleName);
        var dataModuleType = type == null ? null : TinyIoCContainer.Current.Resolve(type) as IDataModule<MetadataModel>;
        if (dataModuleType == null) return null;
        var requestPath = routeDescription.Path.Substring(module.ModulePath.Length) + "/";
        return dataModuleType.Get(requestPath);
    }

    private string ReplaceModuleWithMetadataModule(string moduleName)
    {
        var i = moduleName.LastIndexOf("Module", StringComparison.Ordinal);
        return moduleName.Substring(0, i) + "MetadataModule";
    }
}
```

Now in my instance usage case, I wanted this to store an index position so that I could create an object for generating a navbar. I used a very simple object for storing my navbar.

```csharp
public class LinkModel
{
    public string Link { get; set; }
    public string Text { get; set; }
}
```

I then created a simple method for reading the data for me, including the Metadata, from the IRouteCache instance.

```csharp
public IEnumerable<LinkModel> GetMainLinks(IRouteCache routeCache)
{
    return routeCache
        .SelectMany(routes =>
    {
        return routes.Value
            .Where(route => route.Item1 == 0 &&
                            route.Item2.Method == "GET" &&
                            route.Item2.Name != string.Empty)
            .Select(route => new
            {
                route.Item2.Metadata.Retrieve<MetadataModel>().Index,
                route.Item2.Path,
                route.Item2.Name
            });
    })
        .OrderBy(route => route.Index)
        .Select(route => new LinkModel
        {
            Link = route.Path,
            Text = route.Name
        });
}
```

I will most likely create some improvements on this in the near future, but for now, it works perfectly for what I need and perhaps this will serve as useful for others.
