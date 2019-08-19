$(document).ready(() => {
  let icon = $('#navbar-hamburger');
  let isMobileOpened = 0;
  icon.click(() => {
    if(!isMobileOpened) { // check if mobile navbar menu is opened
      openMobile();
    } else {
      closeMobile();
    }
  })

  // handles all opening of mobile navbar
  const openMobile = () => {
    isMobileOpened = 1;
    icon.addClass('navbar-hamburger-active');
    $('#navbar-mobile').fadeIn(200);
  }
  
  // handles all closing of mobile navbar
  const closeMobile = () => {
    isMobileOpened = 0;
    icon.removeClass('navbar-hamburger-active');
    $('#navbar-mobile').fadeOut(200);
  }
})