
var s = Snap("svg")

// var arc = s.path(`M${oldX + " " + oldY} Q${oldX + " " + y + " " + x + " " + y}`)
var arc = s.path('M20 20 Q50 50 70 70').attr({'stroke-width': 2})

var pathLength = Snap.path.getTotalLength(arc);
arc.attr({'stroke-dasharray': pathLength*2, 'stroke-dashoffset': pathLength*2})
arc.animate({'stroke-dashoffset': pathLength}, 1000, mina.easeinout)

