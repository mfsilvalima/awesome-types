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

function downloadCanvas(link, canvasId, filename) {
    link.href = document.querySelector('#wordCanvas').toDataURL();
    link.download = filename;
}

document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'wordCanvas', 'test.png');
}, false);

function drawCanvas(imgs) {
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

function loadJsonLetters() {
  $.getJSON( "../../letters.json", function(data) {
    drawCanvas(data);
  })
}

$(document).on('ready', function () {
    $(window).on('scroll', function(){
      animacoes();
    });

    $("input#word").on({
      keydown: function(e) {
        if (e.which === 32)
          return false;
      },
      keyup: function(e) {
        if (e.which >= 65 && <= 90 || >= 48 && <= 57){
          loadJsonLetters();

          setTimeout(function(){
            $('#image').attr("src", document.querySelector('#wordCanvas').toDataURL());
          }, 50);

          return false;
        }
      },
      change: function() {
        this.value = this.value.replace(/\s/g, "");
      }
    });
});
