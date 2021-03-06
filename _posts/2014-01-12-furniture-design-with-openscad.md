---
layout:      post
title:       Furniture design with OpenSCAD
category:    blog
updated:     2014-01-12
location:    Brighton, England
tags:        [OpenSCAD, Home-Improvement]
description: Furniture I designed with OpenSCAD
redirect_from:
  - /blog/2014/furniture-design-with-openscad
  - /blog/2014/01/12/furniture-design-with-openscad
---
In my last blog post I started to show off something I threw together in OpenSCAD in a few minutes, and I have been playing around with the application a bit more since then. So I had a rough idea in my head of some furniture I wanted to build to improve my bedroom, and since I haven't touched a CAD application in quite a while, doing it in code just makes sense to me.
{{ more }}
Below you can see my updated code where I have basically made use of variables, modules, and color. Personally, I found it very easy and straight forward to follow, however if anybody reading this is struggling to understand it and is genuinely interested, I would be more than happy to create another blog post in the near future explaining how it all works (essentially a tutorial).

```OpenSCAD
// Bed Variables
BedWidth = 156.7;
FooterHeight = 30;
BedBoardThickness = 5;
ThickerBedBoard = BedBoardThickness + 0.2;
InnerSideBeamHeight = 12.5;
InnerSideBeamThickness = 4.5;
UpperSideBeamWidth = 7.5;
SideBeamLength = 201.2;
HeadBoardHeight = 78;
// Shelf Variables
CabinetDepth = 35;
ThinBoard = 3;
ThickBoard = 5;
ShelfSpacing = 20;
TvAreaHeight = 60;
ShelfTotalHeight = 80;
ShelfWidth = (BedWidth-(ThinBoard*2)-ThickBoard)/2;
SupportHeight = FooterHeight-BedBoardThickness-InnerSideBeamHeight;

module bed_frame() {
        union() {
                translate([0,0,0]) {
                        cube([BedWidth,ThickerBedBoard,FooterHeight]);
                }
                translate([BedWidth-UpperSideBeamWidth,ThickerBedBoard,FooterHeight-BedBoardThickness]) {
                        cube([UpperSideBeamWidth,SideBeamLength,BedBoardThickness]);
                }
                translate([0,ThickerBedBoard,FooterHeight-BedBoardThickness]) {
                        cube([UpperSideBeamWidth,SideBeamLength,BedBoardThickness]);
                }
                translate([UpperSideBeamWidth-InnerSideBeamThickness,ThickerBedBoard,(FooterHeight-BedBoardThickness)/2]) {
                        cube([InnerSideBeamThickness,SideBeamLength,InnerSideBeamHeight]);
                }
                translate([BedWidth-UpperSideBeamWidth,ThickerBedBoard,(FooterHeight-BedBoardThickness)/2]) {
                        cube([InnerSideBeamThickness,SideBeamLength,InnerSideBeamHeight]);
                }
                translate([0,SideBeamLength+BedBoardThickness,0]) {
                        cube([BedWidth,BedBoardThickness,HeadBoardHeight]);
                }
        }
}

module tv_stand_shelf() {
        cube([ShelfWidth,CabinetDepth-(ThinBoard*2),ThinBoard]);
}

module tv_stand_mid_shelf() {
        cube([BedWidth-(ThickBoard*2),CabinetDepth,ThickBoard]);
}

module tv_stand_long_shelf() {
        cube([BedWidth,CabinetDepth,ThickBoard]);
}

module tv_side_panel() {
        cube([ThickBoard,CabinetDepth,ShelfTotalHeight+TvAreaHeight+1]);
}

module tv_stand() {
        union() {
                // Top Board
                translate([0,0,TvAreaHeight+ShelfTotalHeight+(ThinBoard*2)]) {
                        tv_stand_long_shelf();
                }
                // TV Base Board
                translate([ThickBoard,0,ShelfTotalHeight+ThinBoard]) {
                        tv_stand_mid_shelf();
                }
                // Bottom Board
                translate([0,0,0]) {
                        tv_stand_long_shelf();
                }
                // TV Backing
                translate([0,0,ShelfTotalHeight+(ThinBoard*2)]) {
                        cube([BedWidth,ThinBoard,TvAreaHeight]);
                }
                // Foot Board
                translate([0,CabinetDepth-ThinBoard,ThinBoard]) {
                        cube([BedWidth,ThinBoard,ShelfTotalHeight]);
                }
                // Left Panel
                translate([0,0,ThickBoard]) {
                        tv_side_panel();
                }
                // Right Panel
                translate([BedWidth-ThickBoard,0,ThickBoard]) {
                        tv_side_panel();
                }
                // Mid Divider
                translate([(BedWidth-ThickBoard)/2,0,ThickBoard]) {
                        cube([ThickBoard,CabinetDepth-ThinBoard,ShelfTotalHeight]);
                }
                // Left Shelves
                translate([ThinBoard,ThinBoard,ShelfSpacing]) {
                        tv_stand_shelf();
                }
                translate([ThinBoard,ThinBoard,(ShelfSpacing*2)+(ThinBoard)]) {
                        tv_stand_shelf();
                }
                translate([ThinBoard,ThinBoard,(ShelfSpacing*3)+(ThinBoard*2)]) {
                        tv_stand_shelf();
                }
                // Right Shelves
                translate([ShelfWidth+ThickBoard+ThinBoard,ThinBoard,ShelfSpacing]) {
                        tv_stand_shelf();
                }
                translate([ShelfWidth+ThickBoard+ThinBoard,ThinBoard,(ShelfSpacing*2)+(ThinBoard)]) {
                        tv_stand_shelf();
                }
                translate([ShelfWidth+ThickBoard+ThinBoard,ThinBoard,(ShelfSpacing*3)+(ThinBoard*2)]) {
                        tv_stand_shelf();
                }
        }
}

module tv_stand_support() {
        union() {
                translate([ThickBoard,CabinetDepth+ThickerBedBoard,0]) {
                        cube([BedWidth,ThickBoard,SupportHeight]);
                }
                translate([0,0,0]) {
                        cube([ThickBoard,CabinetDepth+ThickerBedBoard+ThickBoard,ThickBoard]);
                }
                translate([BedWidth+ThickBoard,0,0]) {
                        cube([ThickBoard,CabinetDepth+ThickerBedBoard+ThickBoard,ThickBoard]);
                }
        }
}

translate([5,35,0]) {
        color("Brown", 0.6) {
                bed_frame();
        }
}
translate([5,0,0]) {
        color("Green", 0.4) {
                tv_stand();
        }
}
translate([0,0,0]) {
        color("Blue", 0.4) {
                tv_stand_support();
        }
}
```

Once again, here is what the code has generated for me.

![001]

[001]: /Content/blog_images/tv_cabinet.png
