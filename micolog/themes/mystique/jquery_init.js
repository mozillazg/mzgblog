  var $lang=new Array();
  $lang[0]="Posting. Please wait...";
  $lang[1]="Your comment was added.";
  $lang[2]="Post another comment";

  // init
  jQuery(document).ready(function ($) {
  if (isIE6) {
    jQuery('#page').append("<div class='crap-browser-warning'>You're using a old and buggy browser. Switch to a <a href='http://www.mozilla.com/firefox/'>normal browser</a> or consider <a href='http://www.microsoft.com/windows/internet-explorer'>upgrading your Internet Explorer</a> to the latest version</div>");
  }
  jQuery('ul.navigation').superfish({ autoArrows: true });

  webshot("a.websnapr", "webshot");

    jQuery("a[rel='lightbox'], a[href$='.jpg'], a[href$='.jpeg'], a[href$='.gif'], a[href$='.png'], a[href$='.JPG'], a[href$='.JPEG'], a[href$='.GIF'], a[href$='.PNG']").fancyboxlite({
    'zoomSpeedIn': 333,
    'zoomSpeedOut': 333,
    'zoomSpeedChange': 133,
    'easingIn': 'easeOutQuart',
    'easingOut': 'easeInQuart',
    'overlayShow': true,
    'overlayOpacity': 0.75
  });
  

  // layout controls
  fontControl("#pageControls", "body", 10, 18);
  //pageWidthControl("#pageControls", ".page-content", '100%', '940px', '1200px');
  webshot("a.websnapr", "webshot");
  jQuery(".post-tabs").minitabs({
    content: '.sections',
    nav: '.tabs',
    effect: 'top',
    speed: 333,
    cookies: false
  });

  jQuery(".sidebar-tabs").minitabs({
    content: '.sections',
    nav: '.box-tabs',
    effect: 'slide',
    speed: 150
  });

  jQuery("ul.menuList .cat-item").bubble({
    timeout: 6000
  });
  jQuery(".shareThis, .bubble-trigger").bubble({
    offset: 16,
    timeout: 0
  });

  jQuery("#pageControls").bubble({
    offset: 30
  });
  jQuery('ul.menuList li a').nudge({
    property: 'padding',
    direction: 'left',
    amount: 6,
    duration: 166
  });
  jQuery('a.nav-extra').nudge({
    property: 'marginTop',
    direction: '',
    amount: -18,
    duration: 166
  });

  // fade effect
  if (!isIE) {
    jQuery('.fadeThis').append('<span class="hover"></span>').each(function () {
      var jQueryspan = jQuery('> span.hover', this).css('opacity', 0);
      jQuery(this).hover(function () {
        jQueryspan.stop().fadeTo(333, 1);
      },
      function () {
        jQueryspan.stop().fadeTo(333, 0);
      });
    });
  }
  jQuery("#footer-blocks.withSlider").loopedSlider();
  jQuery("#featured-content.withSlider").loopedSlider({
    autoStart: 10000,
    autoHeight: false
  }); // scroll to top
  jQuery("a#goTop").click(function () {
    jQuery('html').animate({
      scrollTop: 0
    },
    'slow');
  });
  jQuery('.clearField').clearField({
    blurClass: 'clearFieldBlurred',
    activeClass: 'clearFieldActive'
  });

  jQuery("a#show-author-info").livequery("click", function () {
    jQuery("#author-info").slideFade('toggle',333,'easeOutQuart');
  });

  setup_comment_controls();
  setup_comment_ajax();
  jQuery('a.print').click(function() {
      jQuery('.post.single').printElement({printMode:'popup'});

 return false;
});

  // set accessibility roles on some elements trough js (to not break the xhtml markup)
  jQuery("#navigation").attr("role", "navigation");
  jQuery("#primary-content").attr("role", "main");
  jQuery("#sidebar").attr("role", "complementary");
  jQuery("#searchform").attr("role", "search");



});




<html xmlns="http://www.w3.org/1999/xhtml"><body xmlns="http://www.w3.org/1999/xhtml"><div xmlns="http://www.w3.org/1999/xhtml"><img width='77' height='5' src='chrome://livemargins/skin/monitor-background-horizontal.png' style='position: absolute;left:-77px;top:-5px'/> <img src='chrome://livemargins/skin/monitor-background-vertical.png' style='position: absolute;left:0;top:-5px;'/> <img id='monitor-play-button' src='chrome://livemargins/skin/monitor-play-button.png' onmouseover='this.style.opacity=1' onmouseout='this.style.opacity=0.5' style='position: absolute;left:1px;top:0;opacity:0.5;cursor:pointer'/>