$(document).ready(function(){
    
  /* -------------------- NAVBAR -------------------- */
  let isMenuShown = false;

  $('.navbar-buttons__link').click(function() {
    if(isMenuShown) {
      $('#navbar-buttons-list').slideUp(200); // Proper function that closes the navbar menu
      isMenuShown=false;

      $('#navbar-x-container').toggleClass("change"); // Makes the X animation adding a css 'change' class
    }
  });

  $('#navbar-x-container').click(function(event) {
    if(!isMenuShown) {

      /* Slide down the navbar menu with a callback function to make 
      the div 'display: flex' and not 'display: block' */
      $('#navbar-buttons-list').slideDown(200);
      $('#navbar-buttons-list').css('display', 'flex');
      isMenuShown = true;
  
      $('#navbar-x-container').toggleClass("change"); // Makes the X animation adding a css 'change' class

    } else {

      $('#navbar-buttons-list').slideUp(200); // Closes with slide up animation the navbar menu
      isMenuShown=false;

      $('#navbar-x-container').toggleClass("change"); // Makes the X animation adding a css 'change' class
    }
  });

  /* Function to close the navbar slide down when clicked outside
  for making the UX better */
  $(document).click(function(event) { 
    if (!$(event.target).closest('.navbar').length) {
      if (isMenuShown) {
        $('#navbar-buttons-list').slideUp(200); // Proper function that closes the navbar menu
        isMenuShown=false;

        $('#navbar-x-container').toggleClass("change"); // Makes the X animation adding a css 'change' class
      }
    }
  });
    

  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: (target.offset().top - 64) // Scrolls to position with mobile navbar offset
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
          });
        }
      }
    });
  
  let scrollTop = 0;
  $(window).scroll(() => {
    scrollTop = Math.round($(window).scrollTop());
    
    if (scrollTop >= 100) {
      $('.navbar').addClass('navbar-scrolled');
      $('.navbar-logo__image').addClass('navbar-logo-scrolled');
    } else {
      $('.navbar').removeClass('navbar-scrolled');
      $('.navbar-logo__image').removeClass('navbar-logo-scrolled');
    } 
    
  }); 

  /* -------------------- HOME -------------------- */
  particlesJS.load('particles-js', 'public/static/particles/particles.json', () => {
    console.log('callback - particles.js config loaded');
  });
  

  /* -------------------- ABOUT -------------------- */
  var options = {
    backSpeed: 20, // speed of deleting (less == fast)
    backDelay: 1600, // interval between cycles
    stringsElement: '#typed-html', // id of element conteining paragraphs (SEO friendly)
    contentType: 'html',
    typeSpeed: 36, // speed of typing (less == fast)
    loop: true,
    showCursor: true,
  }

  var typed = new Typed("#typed", options);

  /* -------------------- PROJECTS -------------------- */
  const slickPrev = $('#projects-slick__left');
  const slickNext = $('#projects-slick__right');

  $('.projects-slick').slick({ // Slick initializer
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: slickPrev,
    nextArrow: slickNext,
    dots: true,
    dotsClass: 'slick-dots projetos-slick__dots',
    responsive: [
      {
        breakpoint: 1032,
        settings: {
          slidesToShow: 1,
          prevArrow: null,
          nextArrow: null,
        }
      },
    ]
  });

  /* -------------------- CONTACT -------------------- */
  $('#contact-form').submit(() => {
    $('.contact-form__submit').text('Sending...')
  });
});
