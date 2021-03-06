---
layout:      post
title:       jQuery - Copy XML from one object to another
category:    blog
updated:     2009-07-11
location:    Brighton, England
tags:        [jQuery, XML, Tutorial]
description: A tutorial on copying data from XML objects
redirect_from:
  - /blog/2009/jquery-copy-xml-from-one-object-to-another
  - /blog/2009/07/11/jquery-copy-xml-from-one-object-to-another
---
Today I am going to go through, how to copy some XML structure and data from one XML object to another XML object. Now from what I have noticed when making use of jQuery, I have seen that it does not actually support XML as such, while it does support XHTML formatted in an XML structure. So in essence, we will be converting our XML object into an XHTML object, do all of our changes, and then convert it back. This may sound a bit long winded, but it's actually not as bad as it sounds.
{{ more }}
First off, we need to add a function created by John Resig (http://ejohn.org/blog/javascript-array-remove/), which will allow us to remove items from an array.

```javascript
Array.prototype.remove = function(fr, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from &lt; 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
```

And now we need to extend our XML to string function, as in good XML you tend to get the first line starting with double quotes.

```javascript
jQuery.XMLtoString = function(xmlData) {
  var xData;
  var xSplit;
  if (window.ActiveXObject) {
    xData = xmlData.xml;
  } else {
    xData = (new XMLSerializer()).serializeToString(xmlData);
  }
  xSplit = xData.split('\r\n');
  if (xSplit[0].substr(0, 5) == '')
    xSplit.remove(0);
  return xSplit.join('\r\n');
}
```

Now I have only just thrown this together, it works, however I will be making some changes to it at a later date by making use of some Regex, as well as giving you the ability to re-add the line you are removing. Anyway, let's give an example XML structure:

```xml
<labels>
  <label added="2003-06-10" id="ep">
    <name>Ezra Pound</name>
    <address id="1">
      <street>45 Usura Place</street>
      <city>Hailey</city>
      <province>ID</province>
    </address>
  </label>
  <label added="2003-06-20" id="tse">
    <name>Thomas Eliot</name>
    <address id="2">
      <street>3 Prufrock Lane</street>
      <city>Stamford</city>
      <province>CT</province>
    </address>
  </label>
  <label added="2004-11-01" id="lh">
    <name>Langston Hughes</name>
    <address id="3">
      <street>10 Bridge Tunnel</street>
      <city>Harlem</city>
      <province>NY</province>
    </address>
  </label>
</labels>
```

Scenario:

You want to copy all of the address tags, including all attributes and child nodes, onto a new location on a different XML object. Resulting in something like this:

```xml
<locations>
  <address id="1">
    <street>45 Usura Place</street>
    <city>Hailey</city>
    <province>ID</province>
  </address>
  <address id="2">
    <street>3 Prufrock Lane</street>
    <city>Stamford</city>
    <province>CT</province>
  </address>
  <address id="3">
    <street>10 Bridge Tunnel</street>
    <city>Harlem</city>
    <province>NY</province>
  </address>
</locations>
```

This is a fairly easy task, however the way you go about doing it, is not very obvious. Let's say you have done your AJAX request, received your XML, and have now passed the xml to your function. Here's what you should have inside your function.

Firstly, we need to convert our XML into a string (with the modified function), find our "address" tags, and convert the string into an object. You can do that all in a single line:

```javascript
var xData = $($.XMLtoString(xml)).find("address");
```

If you are not already aware of this, encapsulating a string with $(), converts it to an object (with jQuery).

Now we have all the data we want from the XML document, but we need to create our new XML document to contain the data within. Now for some reason (which I am yet to investigate), the first element in a newly created object is removed upon creation, so we need to keep this in mind when creating it. We want a root of "", so we need to add a dummy node above that so that our one is not removed. Our code will look like this:

```javascript
var xDoc = $("");
```

Next we need to specify where inside this new document, to inject our original data, which is done with a simple find() like so:

```javascript
xDoc.find("locations").append(xData);
```

That's it, our data has been added to the new object. You can print it out to a textarea to view the results by calling the .html() function on the new document, so something like this:

```javascript
$("#output").text(xDoc.html());
```

Here is what the resulting function would look like:

```javascript
function parseXml(xml) {
  var xData = $($.XMLtoString(xml)).find("address");
  var xDoc = $("");
  xDoc.find("locations").append(xData);
  $("#output").text(xDoc.html());
}
```

As I said earlier, it's not very obvious, but when you know what to do, it's actually quite an easy task.
