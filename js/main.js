var rectangles = [];

function canvasInit() {
    var sources = [];
    $("#src1 > img").each(
	function() {
	    var id = $(this).attr("src");
	    $(this).attr("id", id);
	    rectangles[0] = {
		name: id,
		image: null,
		x: 0,
		y: 0,
		width: this.naturalWidth,
		height: this.naturalHeight,
		dragging: false
	    };
	    sources[0] = id;
	});
    $("#src2 > img").each(
	function() {
	    var id = $(this).attr("src");
	    $(this).attr("id", id);
	    rectangles[1] = {
		name: id,
		image: null,
		x: 0,
		y: 0,
		width: this.naturalWidth,
		height: this.naturalHeight,
		dragging: false
	    };
	    sources[1] = id;
	});
console.log(rectangles);
    loadImages(sources, function() { initStage(rectangles); });
}

function createHybridImage() {
    if (rectangles.length <= 1) {
	return false;
    }
console.log(rectangles);
    var src1 = rectangles[0];
    var src2 = rectangles[1];
    var src1_path = src1.image.src;
    var src2_path = src2.image.src;
    var params = {
	src1: src1_path,
	src2: src2_path,
	left: src2.x - src1.x,
	top:  src2.y - src1.y,
	sigma: 5
    };
console.log(params);
    $.post('create.php', params, function(data) { $("#result").empty().append(data.img); }, "json");
    return true;
}

$(function() {
      var c = $("#my-canvas");
      c.attr("width", "590");
      c.attr("height", "400");
      $('.droparea').droparea({
            'post' : 'upload.php',
            'init' : function(r){
//                console.log('my init',r);
            },
            'start' : function(r){
//                console.log('my start',r);
            },
            'error' : function(r){
//                console.log('my error',r);
            },
            'complete' : function(r){
//                console.log('my complete',r);
            }
        });
      $('#load').click(function() { canvasInit(); });
      $("#create").click(function() { createHybridImage(); });
  });
