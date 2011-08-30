var images = [];
var pos = {};
var offsetX = 0;
var offsetY = 0;

function loadImages(sources, cb) {
    images = [];
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
	numImages++;
    }
    var counter = 0;
    for (var src in sources) {
	images[counter] = new Image();
	images[counter].onload = function(){
	    if (++loadedImages >= numImages) {
		cb();
	    }
	};
	images[counter++].src = sources[src];
    }
}

function initStage(rectangles) {
    // map images to rectangles array
    counter = 0;
    for (var img in images) {
	rectangles[counter++]["image"] = images[img];
    }
    
    kin = new Kinetic("my-canvas", "2d");
    var context = kin.getContext();
    context.globalAlpha = 0.5;

    // when using KineticJS, we need to draw the shapes with the highest z-index
    // first and the shapes with the lowest z-index last in order to 
    // correctly handle shape layering
    context.globalCompositeOperation = "destination-over";
    
    kin.setDrawStage(
	function(){
	    kin.clear();
	    var mousePos = kin.getMousePos();
	    
	    for (var n = 0; n < rectangles.length; n++) {
		var thisRect = rectangles[n];

		if (thisRect.dragging) {
		    thisRect.x = mousePos.x - offsetX;
		    thisRect.y = mousePos.y - offsetY;
		}
		
		kin.beginRegion();
		context.drawImage(thisRect.image, thisRect.x, thisRect.y, thisRect.width, thisRect.height);
		context.beginPath();
		context.rect(thisRect.x, thisRect.y, thisRect.width, thisRect.height);
		context.closePath();
		
		kin.addRegionEventListener(
		    "onmousedown",
		    function(){
			thisRect.dragging = true;
			var mousePos = kin.getMousePos();
			
			offsetX = mousePos.x - thisRect.x;
			offsetY = mousePos.y - thisRect.y;
			
			// place this rect at the beginning of the rectangles
			// array so that is is rendered on top
			rectangles.splice(n, 1);
			rectangles.splice(0, 0, thisRect);
//			poslog(rectangles);
		    });
		kin.addRegionEventListener(
		    "onmouseup",
		    function(){
			thisRect.dragging = false;
//			poslog(rectangles);
		    });
		kin.addRegionEventListener(
		    "onmouseover",
		    function(){
			document.body.style.cursor = "pointer";
		    });
		kin.addRegionEventListener(
		    "onmouseout",
		    function(){
			document.body.style.cursor = "default";
		    });
		
		kin.closeRegion();
	    }
	});
}

function poslog(rectangles) {
    for (var i = 0; i < rectangles.length; i++) {
	var rect = rectangles[i];
	console.log(rect.name + " x:" + rect.x + " y:" + rect.y);
    }
}