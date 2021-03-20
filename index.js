console.log('send it', $(window).height());

var kuduTop;
var rhinoTop;
var giraffeTop;
var squirrelsTop;

$(document).ready(function(){
    $(this).scrollTop(0);
});

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    // var elemBottom = elemTop + $(elem).height();

    // var elemHeight = elemBottom - elemTop

    // console.log(elemTop, elemBottom)

    return (elemTop - $(elem).height() <= docViewBottom);
}

function moveThatLayer(element, scrollPos) {
  $(element).each(function () {

     var layer = $(this);

     var dataSpeed = layer.data('parallax-speed');

     var offsetY = (scrollPos * dataSpeed);

     var translate = 'translate(0, ' + offsetY + 'px)';

     layer.css('-webkit-transform', translate);

     layer.css('-moz-transform', translate);

     layer.css('-ms-transform', translate);

     layer.css('-o-transform', translate);

     layer.css('transform', translate);
   });
}

$(window).scroll(function(){
  var scrollPos = $(window).scrollTop();
  var vh = $(window).height();

  if (scrollPos > vh) {
    $('#tool-bar').addClass("fixed");
    $('#about').addClass("about-margin");
  }

  if (scrollPos <= vh) {
    $('#tool-bar').removeClass("fixed");
    $('#about').removeClass("about-margin");
  }

  moveThatLayer('.layer', scrollPos);

  if (isScrolledIntoView('#sculpture')) {
    var docViewTop = $(window).scrollTop();

    if (kuduTop == null) {
      kuduTop = docViewTop;
    }

    var layerOffset = scrollPos - kuduTop - $('.kudu-layer').height()

    moveThatLayer('.kudu-layer', layerOffset)
    console.log('kudu')
  }

  if (isScrolledIntoView('#commissions')) {
    var docViewTop = $(window).scrollTop();

    if (rhinoTop == null) {
      rhinoTop = docViewTop;
    }

    var layerOffset = scrollPos - rhinoTop - $('.rhino-layer').height()

    moveThatLayer('.rhino-layer', layerOffset)
    console.log('rhino')
  }

  if (isScrolledIntoView('#events')) {
    var docViewTop = $(window).scrollTop();

    if (giraffeTop == null) {
      giraffeTop = docViewTop;
    }

    var layerOffset = scrollPos - giraffeTop - $('.giraffe-layer').height()

    moveThatLayer('.giraffe-layer', layerOffset)
    console.log('giraffe')
  }

  if (isScrolledIntoView('#contact')) {
    var docViewTop = $(window).scrollTop();

    if (squirrelsTop == null) {
      squirrelsTop = docViewTop;
    }

    var layerOffset = scrollPos - squirrelsTop - $('.squirrels-layer').height()

    moveThatLayer('.squirrels-layer', layerOffset)
    console.log('squirrels')
  }
});
