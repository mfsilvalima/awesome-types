function animacoes(){
  "use strict";
  $('.animated').each(function(){
    var posItem = $(this).offset().top + 100;

    if(posItem > $(window).scrollTop() && posItem < $(window).scrollTop() + $(window).height()){

      $(this).addClass('visible');
      $(this).addClass($(this).data("animation"));
    }
  });
}

function wordFunction() {
		var imgs = {
      a : ["https://uploaddeimagens.com.br/images/000/595/986/original/a1.jpg", "https://uploaddeimagens.com.br/images/000/595/993/original/a2.jpg"],
      b : ["https://uploaddeimagens.com.br/images/000/595/996/original/b1.jpg", "https://uploaddeimagens.com.br/images/000/595/998/original/b2.jpg"]
    };
    var word = document.querySelector("#word").value.toLowerCase();
    var wordLength = word.length;
    var canvas = document.querySelector('#wordCanvas');
    var context = canvas.getContext('2d');

    canvas.width = wordLength * 250;
    canvas.height = 250;

    var i;
    for (i = 0; i < word.length; i++) {
    	var letter = word[i];
      var letterArray = imgs[letter];
      var letterImage = letterArray[Math.floor( Math.random() * letterArray.length )];
      var imageObj = new Image();
      imageObj.src = letterImage;
     	imageObj.position = i * 250;
        imageObj.onload = function() {
         context.drawImage(this, 0, 0, 960, 960, this.position, 0, 250, 250);
       };
    }
}


$(document).on('ready', function () {
    $(window).on('scroll', function(){
      animacoes();
    });
    $("#form").submit('handler', function() {
      wordFunction();
      return false;
    });
});
