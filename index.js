console.log('send it', $(window).height());

$(document).ready(function(){
    $(this).scrollTop(0);
});

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;

    return (elemTop - $(elem).height() <= docViewBottom);
}

$('#wrapper').on("mousewheel", function(){
  console.log('scroll')
  var scrollPos = $('#wrapper').scrollTop();
  var vh = $('#wrapper').height();

  if (scrollPos > vh) {
    $('#tool-bar').addClass("fixed");
    $('#about').addClass("about-margin");
  }

  if (scrollPos <= vh) {
    $('#tool-bar').removeClass("fixed");
    $('#about').removeClass("about-margin");
  }
});
