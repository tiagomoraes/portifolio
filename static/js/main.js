/* -------------------- NAVBAR -------------------- */
let isMenuShown = false;

$('#navbar-x-container').click(function(event) {
  if(!isMenuShown) {

    /* Slide down the navbar menu with a callback function to make 
    the div 'display: flex' and not 'display: block' */
    $('#navbar-buttons-list').slideDown(200, function() { 
      $(this).css('display', 'flex')}
    );
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
          scrollTop: (target.offset().top) // Scrolls to position
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
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


/* -------------------- CONTACT -------------------- */
$('#contact-form').submit((event) => {
  event.preventDefault();

  // Serializes an array with all the form fields as params
  let params = $('#contact-form').serializeArray().reduce((obj, item) => {
    obj[item.name] = item.value;
    return obj;
  }, {});

  // set default variables for servide id and template id
  let service_id = "default_service";
  let template_id = "portifolio_template";  

  $('#contact-form__submit').val('Sending...'); // changes the submit button text to 'Sending...'
  emailjs.send(service_id,template_id,params)
  .then(() => { 
    $('#contact-success').fadeIn(400); // Shows a span with the set success message
    $('#contact-form__submit').val('Send'); // Resets the submit button value

    // Timeout for removing the success span
    setTimeout(() => {
    $('#contact-success').fadeOut(400);
    }, 3000);

    // How to perform if sending returns an error
    }, (err) => {
      $('#contact-form__submit').val('Send');
      console.log(err);
    });
  return false;
})