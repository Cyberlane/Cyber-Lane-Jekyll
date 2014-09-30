---
layout:      post
title:       Contour Logic - First Update
category:    blog
updated:     2007-06-07
location:    Brighton, England
tags:        [CAD, DXF, Diagram]
description: A small progress update about my contour logic application
---
Last night I added the following features:

- Enter in x/y/z Co-ordinates
- Draw lines between each x/y located on the same z
{{ more }}

I also added 2 additional bits:

- Enter in Tag/x/y/z/Code (change)
- Draw Label with text `Code`

I will also look into adding the ability to drag the Labels around, thus allowing the user to have control over them.

To do:

- Specify how smooth line edges are to be drawn
- Save to local editable format
- Export to AutoCAD (*.dxf) format
- Drag Labels to new position

I also need to add some math for the line draw function, as at the moment it just draws all lines on the same Z by going through the list in order, rather than determining which is the nearest co-ordinate.
