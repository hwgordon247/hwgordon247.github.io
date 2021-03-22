var toolbarOffset = 59;

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

$('#wrapper').on("mousewheel", function() {
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

function scrollToThing(thing) {
  var scrollPosition = $('#wrapper').scrollTop() + $(thing).offset().top - toolbarOffset;

  $('#wrapper').animate({
    scrollTop: scrollPosition
  }, 500);

  // $(thing).get(0).scrollIntoView({ behavior: 'smooth' });
}

$('#about-toolbar').on('click', function() {
  scrollToThing('#about');
});

$('#sculpture-toolbar').on('click', function() {
  scrollToThing('#sculpture');
});

$('#commissions-toolbar').on('click', function() {
  scrollToThing('#commissions');
});

$('#events-toolbar').on('click', function() {
  scrollToThing('#events');
});

$('#contact-toolbar').on('click', function() {
  scrollToThing('#contact');
});

function openModel() {
  $('#sculpture-modal').addClass("show-modal");
}

function closeModel() {
  $('#sculpture-modal').removeClass("show-modal");
}

$('#giraffe-sculpture').on('click', function() {
  openModel();
});

$('#sculpture-modal').on('click', function() {
  closeModel();
});
