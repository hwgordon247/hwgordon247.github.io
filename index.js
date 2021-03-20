console.log('send it', $(window).height());

$(document).ready(function(){
    $(this).scrollTop(0);
});

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return (elemTop <= docViewBottom);
}

$(window).scroll(function(){
  var scrollPos = $(window).scrollTop();
  var vh = $(window).height();
  console.log(scrollPos, vh);

  if (scrollPos > vh) {
    $('#tool-bar').addClass("fixed");
    $('#about').addClass("about-margin");
  }

  if (scrollPos <= vh) {
    $('#tool-bar').removeClass("fixed");
    $('#about').removeClass("about-margin");
  }

  $('.layer').each(function () {

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

   // console.log(isScrolledIntoView('#image-box'));
});
