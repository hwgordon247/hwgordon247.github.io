const tapirModalInfo = {
  name: "Malayan Tapir",
  description: "Bronze, signed and numbered limited edition of 12",
  dimensions: "23cm high x 42 x 20",
  date: "June 2020",
  price: "£5,000"
}

const giraffeModalInfo = {
  name: "Giraffe Bust",
  description: "Bronze, signed and numbered limited edition of 12",
  dimensions: "78cm high x 35 x 35",
  date: "November 2019",
  price: "£9,500"
}


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

function fixToolbar() {
  jQuery('#tool-bar').addClass("fixed");
  jQuery('#about').addClass("about-margin");
}

function detachToolbar() {
  jQuery('#tool-bar').removeClass("fixed");
  jQuery('#about').removeClass("about-margin");
}

jQuery('#scroll-wrapper').on("mousewheel", function() {
  var scrollPos = jQuery('#scroll-wrapper').scrollTop();
  var vh = jQuery('#scroll-wrapper').height();

  if (scrollPos > vh) {
    fixToolbar();
  }

  if (scrollPos <= vh) {
    detachToolbar();
  }
});

function scrollToThing(thing) {
  var scrollPosition = jQuery('#scroll-wrapper').scrollTop() + jQuery(thing).offset().top - toolbarOffset;

  jQuery('#scroll-wrapper').animate({
    scrollTop: scrollPosition
  }, 500);


  if (thing == '#landing') {
    detachToolbar();
  } else {
    fixToolbar();
  }

  // jQuery(thing).get(0).scrollIntoView({ behavior: 'smooth' });
}

function populateModal(modalInfo) {
  jQuery('#modal-name').text(modalInfo.name);
  jQuery('#modal-description').text(modalInfo.description);
  jQuery('#modal-dimensions').text(modalInfo.dimensions);
  jQuery('#modal-date').text(modalInfo.date);
  jQuery('#modal-price').text(modalInfo.price);
}

jQuery('.home-button').on('click', function() {
  scrollToThing('#landing');
});


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

jQuery('#tapir-sculpture').on('click', function() {
  populateModal(tapirModalInfo);
  threeSixty.init("tapir/tapir-spin");
  openModel();
});

jQuery('#giraffe-sculpture').on('click', function() {
  populateModal(giraffeModalInfo);
  threeSixty.init("giraffe/giraffe-spin");
  openModel();
});

jQuery('#barn-swallow-sculpture').on('click', function() {
  populateModal(tapirModalInfo);
  threeSixty.init("barn-swallow/barn-swallow-spin");
  openModel();
});

jQuery('#guinea-fowl-sculpture').on('click', function() {
  populateModal(tapirModalInfo);
  threeSixty.init("guinea-fowl/guinea-fowl-spin");
  openModel();
});

jQuery('#sculpture-modal').on('click', function() {
  closeModel();
  threeSixty.clear();
  jQuery("#viewer").empty();
});
