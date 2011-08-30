function setText(text, size, font, r, g, b) {
    var canvas = document.getElementById("text-area");
    var context = canvas.getContext("2d");
    context.fillStyle = "rgb(255,255,255)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = size + "pt '" + font + "'";
    context.fillStyle = "#"+r+g+b;
    context.textAlign = "center";
    context.textBaseline = "bottom";
    context.fillText(text, canvas.width/2, canvas.height/2);
}

function saveText() {
    var canvas = document.getElementById("text-area");
    if (canvas.getContext) {
	var context = canvas.getContext("2d");
	var params = {
	    url: canvas.toDataURL().replace('data:image/png;base64,', '')
	};
	$.post('save_text.php', params,
	       function(data) {
		   $("#src2").empty();
		   $("#src2").append(data.img);
	       }, "json");
    }
}

$(function(){
      $("#sign").change(
	  function() {
	      var text = $(this).val();
	      var size = $("select#font-size option:selected").text();
	      var font = $("select#font option:selected").text();
	      setText(text, parseInt(size), font, 0, 0, 0);
	  });
      $("#save-text").click(function() { saveText(); });
});
