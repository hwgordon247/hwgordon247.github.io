let currentInfo;
let magnifyVisible = false;
let isSculptureExpanded = true;

// openModel(malayanTapirSculptureInfo);
// flipToFullSize();

// openSideBar();

preloadImage(["img/parallax/lodge-compress.jpg"]);

var toolbarOffset = 59;

console.log('send it', jQuery(window).height());

function populateModal(modalInfo) {
  jQuery('#modal-name').text(modalInfo.name);
  jQuery('#modal-description').text(modalInfo.description);
  jQuery('#modal-dimensions').text(modalInfo.dimensions);
  jQuery('#modal-date').text(modalInfo.date);
  jQuery('#modal-price').text(modalInfo.price);
  jQuery('#magnify-image').attr("src", modalInfo.images[0]);
  jQuery('#enquire-button').attr("href", constructEmailLink(modalInfo.name));

  threeSixty.init(modalInfo.spin, function () {
    console.log('bongo')
    // jQuery('#spin-me').css('display', 'flex');
  });
}

function constructEmailLink(sculptureName) {
  return "mailto:fcgordon93@gmail.com?subject=" +
      sculptureName +
      "&body=Hey, I am interested in the " +
      sculptureName +
      "..."
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

  moveBlob(currentInfo.imageIndex);

  jQuery('#magnify-image').attr("src", currentInfo.images[currentInfo.imageIndex]);
}

function imageRight() {
  if (currentInfo.imageIndex === (currentInfo.images.length - 1)) {
    currentInfo.imageIndex = 0;
  } else {
    currentInfo.imageIndex ++;
  }

  moveBlob(currentInfo.imageIndex);

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

  jQuery('#scroll-wrapper').animate(
      {
        scrollTop: scrollPosition
      },
      {
        duration: 500,
        complete: function () {
          moveToolBarHighlight();
        }
      }
  );


  if (thing === '#landing') {
    detachToolbar();
  } else {
    fixToolbar();
  }
}

function isScrolledIntoView(elem) {
  var top_of_element = jQuery(elem).offset().top;
  var bottom_of_element = jQuery(elem).offset().top + jQuery(elem).outerHeight();
  var bottom_of_screen = jQuery(window).scrollTop() + jQuery(window).innerHeight();
  var top_of_screen = jQuery(window).scrollTop();

  var scrollGap = 50;

  return (bottom_of_screen > top_of_element + scrollGap) &&
      (top_of_screen < bottom_of_element - scrollGap);
}

function fixToolbar() {
  jQuery('#tool-bar').addClass("fixed");
  jQuery('#about').addClass("about-margin");
}

function detachToolbar() {
  jQuery('#tool-bar').removeClass("fixed");
  jQuery('#about').removeClass("about-margin");
}

function moveToolBarHighlight() {
  if (isScrolledIntoView('#about')) {
    jQuery('#about-button-tool').addClass('highlight');
  } else {
    jQuery('#about-button-tool').removeClass('highlight');
  }

  if (isScrolledIntoView('#sculpture')) {
    jQuery('#sculpture-button-tool').addClass('highlight');
  } else {
    jQuery('#sculpture-button-tool').removeClass('highlight');
  }

  if (isScrolledIntoView('#commissions')) {
    jQuery('#commissions-button-tool').addClass('highlight');
  } else {
    jQuery('#commissions-button-tool').removeClass('highlight');
  }

  if (isScrolledIntoView('#events')) {
    jQuery('#events-button-tool').addClass('highlight');
  } else {
    jQuery('#events-button-tool').removeClass('highlight');
  }

  if (isScrolledIntoView('#contact')) {
    jQuery('#contact-button-tool').addClass('highlight');
  } else {
    jQuery('#contact-button-tool').removeClass('highlight');
  }
}

function closeSideBar() {
  jQuery('#side-bar').animate({width: 'toggle'});
}

function openSideBar() {
  jQuery('#side-bar').animate({width: 'toggle'});
}

function toggleSculptures() {
  jQuery('#expander').slideToggle(500, function() {

    if (isSculptureExpanded) {
      jQuery('#expander-arrow').attr("src", "img/icon/arrow-down.png");
      isSculptureExpanded = false;
    } else {
      jQuery('#expander-arrow').attr("src", "img/icon/arrow-up.png");
      isSculptureExpanded = true;
    }
  });
}

function flipToFullSize() {
  jQuery("#wrapper").hide();
  jQuery("#full-size-zoom").hide();
  jQuery('#rotate-button').css('display', 'flex');
  jQuery("#full-size-image").show();

  if (currentInfo.images.length > 1) {
    jQuery('#leave-box').css('display', 'flex');
    jQuery('#direction-buttons').css('display', 'flex');

    for (i = 0; i < currentInfo.images.length; i ++) {
      jQuery('#blob-container').prepend('<div id="image-blobs"></div>');
    }

    moveBlob(currentInfo.imageIndex)
  }
}

function moveBlob(index) {
  for (i = 0; i < currentInfo.images.length; i ++) {
    jQuery(jQuery('#blob-container').children()[i]).removeClass('highlight');
  }

  jQuery(jQuery('#blob-container').children()[index]).addClass('highlight');
}

function goToRotate() {
  jQuery("#wrapper").show();
  jQuery("#full-size-zoom").css('display', 'flex');
  jQuery('#rotate-button').hide();
  jQuery("#full-size-image").hide();
  jQuery('#leave-box').hide();
  jQuery('#direction-buttons').hide();

  clearBlobs();
}

function clearBlobs() {
  for (i = 0; i <= jQuery('#blob-container').children().length + 2; i ++) {
    jQuery(jQuery('#blob-container').children().first()).remove();
  }
}

function removeMagnify() {
  magnifyVisible = false;
  jQuery(".img-magnifier-glass").remove();
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
  toggleSculptures();
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

  moveToolBarHighlight();
});

jQuery('#logo-button').on('click', function() {
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

allSculptures.forEach(sculpture => {
  jQuery(sculpture.id).on('click', function() {
    openModel(sculpture);
  });
})


jQuery('#sculpture-modal').on('click', function(e) {
  if (e.target !== e.currentTarget) return;

  closeModel();
});

jQuery('#modal-cross').on('click', function() {
  closeModel();
});

jQuery('#sculpture-expand').on('click', function() {
  toggleSculptures();
});

jQuery('#hamburger').on('click', function() {
  openSideBar();
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

jQuery('#leave-box').mouseenter(function() {
  removeMagnify();
});

jQuery('#leave-box').mouseleave(function(e) {
  magnify("magnify-image", 2);
});

jQuery('#full-size-image').mouseleave(function() {
  removeMagnify();
});

jQuery('#full-size-image').mouseenter(function(e) {

  if ("magnify-image" !== jQuery(e.target).attr('id')) return;

  magnify("magnify-image", 2);
});

jQuery('#image-left').on('click', function() {
  imageLeft();
});

jQuery('#image-right').on('click', function() {
  imageRight();
});
