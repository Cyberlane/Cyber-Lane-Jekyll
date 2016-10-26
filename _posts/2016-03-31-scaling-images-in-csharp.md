---
layout:      post
title:       Scaling images in CSharp
category:    blog
updated:     2016-03-31
location:    Malmö, Sweden
tags:        [CSharp, Coding, GDI]
description: Configuring MongoDb for remote access
redirect_from:
  - /blog/2016/scaling-images-in-csharp
  - /blog/2016/03/31/scaling-images-in-csharp
---

In my spare time I work on a number of different projects to help me keep up to date on my skills, along with helping out friends and family with their problems. One of my current projects involves a photo gallery so I needed to write some code to manipulate images. {{ more }}

I know there are a good number of libraries and NuGet packages out there which solve this problem, but I only needed to crop and scale images, no other fancy features and felt it would be a good exercise to write the code myself. It ensures I understand what is happening under the hood (allowing me to be in control of possible file locks), and removes dependency on a large library which would have way more features than I would ever make use of.

First I created a simple image cropping function, which has no validation to confirm the cropping ranges given are within the bounds of the image. I have logic for this elsewhere in my application, so I did not feel the need to duplicate the logic.

```csharp
public void CropImage(string inputPath, string outputPath, int x, int y, int width, int height)
{
    using (var sourceStream = new FileStream(inputPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
    using (var sourceImage = new Bitmap(sourceStream))
    using (var result = sourceImage.Clone(new Rectangle(x, y, width, height), sourceImage.PixelFormat))
    using (var destinationStream = new FileStream(outputPath, FileMode.Create, FileAccess.Write, FileShare.ReadWrite))
    {
        result.Save(destinationStream, ImageFormat.Jpeg);
    }
}
```

Next I needed a function to scale an image, stating what the maximum dimension should be. To understand what I am talking about, here are some examples.

## Example 1
Given an image with a `width of 300` and a `height of 100`, if I ask for a `maximum dimension of 150` this will result in an image with a `width of 150` and a `height of 50`.

## Example 2
Given an image with a `width of 100` and a `height of 300`, if I ask for a `maximum dimension of 150` this will result in an image with a `width of 50` and a `height of 150`.

## Explanation

The code will look at both the width and the height of the original image, determine which is the bigger dimension. It will then calculate the scale difference between that, and the requested maximum dimension, and it will then scale both the width and height to this given scale. In the examples above, the scale is always 50%, so both the width and height are halved.

One other thing I do with the code is that I do not assume that the input and output paths are different, and that people may in fact want to replace an image with a scaled down variant of itself, which is why I have the code structured the way you will see below.

```csharp
public void ScaleImage(string inputPath, string outputPath, decimal maxDimension)
{
    using (var sourceStream = new FileStream(inputPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
    using (var sourceImage = new Bitmap(sourceStream))
    {
        var maxImageDimensions = Math.Max(sourceImage.Width, sourceImage.Height);
        var scale = Math.Min(maxDimension, maxImageDimensions)/maxImageDimensions;
        var width = (int) (sourceImage.Width*scale);
        var height = (int) (sourceImage.Height*scale);

        using (var newImage = new Bitmap(width, height))
        using (var graphics = Graphics.FromImage(newImage))
        using (var destinationStream = new FileStream(outputPath, FileMode.Create, FileAccess.Write, FileShare.ReadWrite))
        {
            graphics.SmoothingMode = SmoothingMode.HighQuality;
            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
            graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
            graphics.DrawImage(sourceImage, new Rectangle(0, 0, width, height));

            newImage.Save(destinationStream, ImageFormat.Jpeg);
        }
    }
}
```