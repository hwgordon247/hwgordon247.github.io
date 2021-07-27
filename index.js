// populateModal(tapirModalInfo);
// threeSixty.init("tapir/tapir-spin");
// openModel();
// flipToFullSize();

const tapirModalInfo = {
  name: "Malayan Tapir",
  description: "Bronze, signed and numbered limited edition of 12",
  dimensions: "23cm high x 42 x 20",
  date: "June 2020",
  price: "£5,000",
  images: ["img/rhino-compress.jpg"]
}

const giraffeModalInfo = {
  name: "Giraffe Bust",
  description: "Bronze, signed and numbered limited edition of 12",
  dimensions: "78cm high x 35 x 35",
  date: "November 2019",
  price: "£9,500",
  images: ["img/giraffe/giraffe-compress.jpg"]
}

preloadImage("img/lodge-compress.jpg");

var toolbarOffset = 59;

console.log('send it', jQuery(window).height());

jQuery(document).ready(function(){
  jQuery(this).scrollTop(0);
  jQuery('#expander').toggle('collapsed');
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
  jQuery('#magnify-image').attr("src", modalInfo.images[0]);
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

jQuery('.home-side-button').on('click', function() {
  scrollToThing('#landing');
  closeSideBar();
});

jQuery('.about-side-button').on('click', function() {
  scrollToThing('#about');
  closeSideBar();
});

jQuery('.sculpture-side-button').on('click', function() {
  scrollToThing('#sculpture');
  closeSideBar();
});

jQuery('.commissions-side-button').on('click', function() {
  scrollToThing('#commissions');
  closeSideBar();
});

jQuery('.events-side-button').on('click', function() {
  scrollToThing('#events');
  closeSideBar();
});

jQuery('.contact-side-button').on('click', function() {
  scrollToThing('#contact');
  closeSideBar();
});

function openModel() {
  jQuery('#sculpture-modal').addClass("show-modal");
}

function closeModel() {
  console.log('close')
  jQuery('#sculpture-modal').removeClass("show-modal");
  goToRotate();
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

jQuery('#fox-pair-sculpture').on('click', function() {
  populateModal(tapirModalInfo);
  threeSixty.init("fox-pair/fox-pair-spin");
  openModel();
});

jQuery('#kudu-herd-sculpture').on('click', function() {
  populateModal(tapirModalInfo);
  threeSixty.init("kudu-herd/kudu-herd-spin");
  openModel();
});

jQuery('#sea-lion-sculpture').on('click', function() {
  populateModal(tapirModalInfo);
  threeSixty.init("sea-lion/sea-lion-spin");
  openModel();
});

jQuery('#toad-sculpture').on('click', function() {
  populateModal(tapirModalInfo);
  threeSixty.init("toad/toad-spin");
  openModel();
});

jQuery('#walking-horse-sculpture').on('click', function() {
  populateModal(tapirModalInfo);
  threeSixty.init("walking-horse/walking-horse-spin");
  openModel();
});

jQuery('#sculpture-modal').on('click', function(e) {
  if (e.target !== e.currentTarget) return;

  closeModel();
  threeSixty.clear();
  jQuery("#viewer").empty();
});

jQuery('#sculpture-expand').on('click', function() {
  jQuery('#expander').slideToggle(500);
});

jQuery('#hamburger').on('click', function() {
  jQuery('#side-bar').animate({width: 'toggle'});
});

jQuery('#side-bar-close').on('click', function() {
  closeSideBar();
});

function closeSideBar() {
  jQuery('#side-bar').animate({width: 'toggle'});
}

jQuery('#full-size-zoom').on('click', function() {
  flipToFullSize();
});

function flipToFullSize() {
  jQuery("#wrapper").hide();
  jQuery("#full-size-zoom").hide();
  jQuery('#rotate-button').show();
  jQuery("#full-size-image").show();
}

jQuery('#rotate-button').on('click', function() {
  goToRotate();
});

function goToRotate() {
  jQuery("#wrapper").show();
  jQuery("#full-size-zoom").show();
  jQuery('#rotate-button').hide();
  jQuery("#full-size-image").hide();
}

jQuery('#full-size-image').mouseenter(function() {
  console.log('leave');
  magnify("magnify-image", 2);
});

jQuery('#full-size-image').mouseleave(function() {
  console.log('leave');
  jQuery(".img-magnifier-glass").remove();
});

function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";

  // vary this for magnify coverage
  scaleWidth = 1;

  glass.style.backgroundSize = (img.width * zoom * scaleWidth) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

function preloadImage(url) {
  console.log('preload');
  var img=new Image();
  img.src=url;
}
