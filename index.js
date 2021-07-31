var currentInfo;

const tapirModalInfo = {
  name: "Malayan Tapir",
  description: "Bronze, signed and numbered limited edition of 12",
  dimensions: "23cm high x 42 x 20",
  date: "June 2020",
  price: "£5,000",
  images: ["img/rhino-compress.jpg"],
  spin: "tapir/tapir-spin"
}

const giraffeModalInfo = {
  name: "Giraffe Bust",
  description: "Bronze, signed and numbered limited edition of 12",
  dimensions: "78cm high x 35 x 35",
  date: "November 2019",
  price: "£9,500",
  images: ["img/giraffe/giraffe-compress.jpg", "img/rhino-compress.jpg"],
  spin: "giraffe/giraffe-spin"
}

// openModel(giraffeModalInfo);
// flipToFullSize();

preloadImage(["img/lodge-compress.jpg"]);

var toolbarOffset = 59;

console.log('send it', jQuery(window).height());

function populateModal(modalInfo) {
  jQuery('#modal-name').text(modalInfo.name);
  jQuery('#modal-description').text(modalInfo.description);
  jQuery('#modal-dimensions').text(modalInfo.dimensions);
  jQuery('#modal-date').text(modalInfo.date);
  jQuery('#modal-price').text(modalInfo.price);
  jQuery('#magnify-image').attr("src", modalInfo.images[0]);

  threeSixty.init(modalInfo.spin);
}

function openModel(info) {
  currentInfo = info;
  currentInfo.imageIndex = 0;

  populateModal(info);

  jQuery('#sculpture-modal').addClass("show-modal");
}

function imageLeft() {
  if (currentInfo.imageIndex === 0) {
    currentInfo.imageIndex = (currentInfo.images.length - 1);
  } else {
    currentInfo.imageIndex --;
  }

  jQuery('#magnify-image').attr("src", currentInfo.images[currentInfo.imageIndex]);
}

function imageRight() {
  if (currentInfo.imageIndex === (currentInfo.images.length - 1)) {
    currentInfo.imageIndex = 0;
  } else {
    currentInfo.imageIndex ++;
  }

  jQuery('#magnify-image').attr("src", currentInfo.images[currentInfo.imageIndex]);
}

function closeModel() {
  jQuery('#sculpture-modal').removeClass("show-modal");
  goToRotate();
  threeSixty.clear();
  jQuery("#viewer").empty();
}

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

function closeSideBar() {
  jQuery('#side-bar').animate({width: 'toggle'});
}

function flipToFullSize() {
  jQuery("#wrapper").hide();
  jQuery("#full-size-zoom").hide();
  jQuery('#rotate-button').show();
  jQuery("#full-size-image").show();

  if (currentInfo.images.length > 1) {
    jQuery('#direction-buttons').show();
  }
}

function goToRotate() {
  jQuery("#wrapper").show();
  jQuery("#full-size-zoom").show();
  jQuery('#rotate-button').hide();
  jQuery("#full-size-image").hide();
  jQuery('#direction-buttons').hide();
}

function magnify(imgID, zoom) {
  var img, glass, w, h, bw, parent;
  img = document.getElementById(imgID);

  ratioSize = getImgSizeInfo(img);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  parent = img.parentElement
  parent.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";

  ratioHeight = ratioSize.height;
  ratioWidth = ratioSize.width;

  glass.style.backgroundSize = (ratioWidth * zoom) + "px " + (ratioHeight * zoom) + "px";

  bw = 3;
  // from css
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  // parent.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  // parent.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > ratioWidth - (w / zoom)) {
      x = ratioWidth - (w / zoom);
    }

    if (x < w / zoom) {
      x = w / zoom;
    }

    if (y > ratioHeight - (h / zoom)) {
      y = ratioHeight - (h / zoom);
    }

    if (y < h / zoom) {
      y = h / zoom;
    }

    /* Set the position of the magnifier glass:- compared to box */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + 0 + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw - 0) + "px";
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

function getRenderedSize(contains, cWidth, cHeight, width, height, pos){
  var oRatio = width / height,
      cRatio = cWidth / cHeight;
  return function() {
    if (contains ? (oRatio > cRatio) : (oRatio < cRatio)) {
      this.width = cWidth;
      this.height = cWidth / oRatio;
    } else {
      this.width = cHeight * oRatio;
      this.height = cHeight;
    }
    this.left = (cWidth - this.width)*(pos/100);
    this.right = this.width + this.left;
    this.top = (cHeight - this.height)*(pos/100);
    this.bottom = this.height + this.top;
    return this;
  }.call({});
}

function getImgSizeInfo(img) {
  var pos = window.getComputedStyle(img).getPropertyValue('object-position').split(' ');
  return getRenderedSize(
    false,
    img.width,
    img.height,
    img.naturalWidth,
    img.naturalHeight,
    parseInt(pos[0])
  );
}

function preloadImage(arrayOfImages) {
  jQuery(arrayOfImages).each(function () {
    jQuery('<img />').attr('src',this).appendTo('body').hide();
  });
}

jQuery(document).ready(function(){
  jQuery(this).scrollTop(0);
  jQuery('#expander').toggle('collapsed');
});

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

jQuery('#tapir-sculpture').on('click', function() {
  openModel(tapirModalInfo);
});

jQuery('#giraffe-sculpture').on('click', function() {
  openModel(giraffeModalInfo);
});

jQuery('#barn-swallow-sculpture').on('click', function() {
  // threeSixty.init("barn-swallow/barn-swallow-spin");
  openModel(tapirModalInfo);
});

jQuery('#guinea-fowl-sculpture').on('click', function() {
  // threeSixty.init("guinea-fowl/guinea-fowl-spin");
  openModel(tapirModalInfo);
});

jQuery('#fox-pair-sculpture').on('click', function() {
  // threeSixty.init("fox-pair/fox-pair-spin");
  openModeltapirModalInfo
});

jQuery('#kudu-herd-sculpture').on('click', function() {
  // threeSixty.init("kudu-herd/kudu-herd-spin");
  openModel(tapirModalInfo);
});

jQuery('#sea-lion-sculpture').on('click', function() {
  // threeSixty.init("sea-lion/sea-lion-spin");
  openModel(tapirModalInfo);
});

jQuery('#toad-sculpture').on('click', function() {
  // threeSixty.init("toad/toad-spin");
  openModel(tapirModalInfo);
});

jQuery('#walking-horse-sculpture').on('click', function() {
  // threeSixty.init("walking-horse/walking-horse-spin");
  openModel(tapirModalInfo);
});

jQuery('#sculpture-modal').on('click', function(e) {
  if (e.target !== e.currentTarget) return;

  closeModel();
});

jQuery('#modal-cross').on('click', function() {
  closeModel();
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

jQuery('#full-size-zoom').on('click', function() {
  flipToFullSize();
});

jQuery('#rotate-button').on('click', function() {
  goToRotate();
});

jQuery('#full-size-image').mouseenter(function() {
  magnify("magnify-image", 2);
});

jQuery('#full-size-image').mouseleave(function() {
  jQuery(".img-magnifier-glass").remove();
});

jQuery('#image-left').on('click', function() {
  imageLeft();
});

jQuery('#image-right').on('click', function() {
  imageRight();
});
