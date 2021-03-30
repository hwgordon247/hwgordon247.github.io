var toolbarOffset = 59;

console.log('send it', jQuery(window).height());

jQuery(document).ready(function(){
    jQuery(this).scrollTop(0);
});

function isScrolledIntoView(elem) {
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();

    var elemTop = jQuery(elem).offset().top;

    return (elemTop - jQuery(elem).height() <= docViewBottom);
}

jQuery('#scroll-wrapper').on("mousewheel", function() {
  var scrollPos = jQuery('#scroll-wrapper').scrollTop();
  var vh = jQuery('#scroll-wrapper').height();

  if (scrollPos > vh) {
    jQuery('#tool-bar').addClass("fixed");
    jQuery('#about').addClass("about-margin");
  }

  if (scrollPos <= vh) {
    jQuery('#tool-bar').removeClass("fixed");
    jQuery('#about').removeClass("about-margin");
  }
});

function scrollToThing(thing) {
  var scrollPosition = jQuery('#scroll-wrapper').scrollTop() + jQuery(thing).offset().top - toolbarOffset;

  jQuery('#scroll-wrapper').animate({
    scrollTop: scrollPosition
  }, 500);

  // jQuery(thing).get(0).scrollIntoView({ behavior: 'smooth' });
}

jQuery('.about-button').on('click', function() {
  scrollToThing('#about');
});

jQuery('.sculpture-button').on('click', function() {
  scrollToThing('#sculpture');
});

jQuery('.commissions-button').on('click', function() {
  scrollToThing('#commissions');
});

jQuery('.events-button').on('click', function() {
  scrollToThing('#events');
});

jQuery('.contact-button').on('click', function() {
  scrollToThing('#contact');
});

function openModel() {
  jQuery('#sculpture-modal').addClass("show-modal");
}

function closeModel() {
  jQuery('#sculpture-modal').removeClass("show-modal");
}

jQuery('#giraffe-sculpture').on('click', function() {
  openModel();
});

jQuery('#sculpture-modal').on('click', function() {
  closeModel();
});
