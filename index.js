console.log('send it', $(window).height());

var kuduTop;
var rhinoTop;

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

function parallax() {

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
  }

  if (isScrolledIntoView('#commissions')) {
    var docViewTop = $(window).scrollTop();

    if (rhinoTop == null) {
      rhinoTop = docViewTop;
    }

    var layerOffset = scrollPos - rhinoTop - $('.rhino-layer').height()

    moveThatLayer('.rhino-layer', layerOffset)
  }
});
