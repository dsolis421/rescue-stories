var $pet_ss = [
  'aaron-barnaby-125239.jpg', //dog
  'jonas-vincent-2717.jpg', //cat
  'pete-bellis-324941.jpg', //dog
  'erik-jan-leusink-180382.jpg', //cat
  'alvin-balemesa-105751.jpg', //dog
  'mel-elias-246141.jpg' //cat
];

var $ss_counter = 1;
var $ss_sub_confirm = false;

function postStory() {
  $.ajax({
      url: "https://docs.google.com/forms/d/e/1FAIpQLSeGpF5ZbsHVkkuxod0dgR97Rg4CdB6_saFgK9HgvReQxlFsEQ/formResponse",
      data: $(this).serialize(),
      type: "POST",
      dataType: "xml",
      success: function(data) {
          console.log('Submission successful');
      },
      error: function(xhr, status, error) {
          console.log('Submission failed: ' + error);
      }
  });
  $('input, textarea').val("")
}

function picSlideShow() {
  setInterval(function(){
    $('header').css('background-image','url(\"/img/'+$pet_ss[$ss_counter]+'\")');
    if($ss_counter < $pet_ss.length - 1) {
      $ss_counter++
    } else {
      $ss_counter = 0;
    }
    //console.log($ss_counter);
  }, 10000);
}
$(document).ready(function(){
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 60
          }, 500);
          return false;
        }
      }
    });
  });

  if($(window).width() > 1100){
    picSlideShow();
  };

  $("#share-my-story").click(function(){
    $('#rescue-story-form').fadeIn("slow");
    $('html, body').animate({
      scrollTop: $('#rescue-story-form').offset().top - 20
    }, 500);
  });

  $('#rescue-story-form').submit(function(event) {
    event.preventDefault();
    if($ss_sub_confirm){
      postStory();
      $('#rescue-story-form input[type="submit"]').attr('value','Submit');
      $('#rescue-form-message').html('<h2>Thank you for sharing!</h2><p>We\'ll be sure to\
        let you know when the site is up and running, with your story.</p>');
      $('#rescue-story-form input[type="submit"]').css('display','none');  
    } else {
      $('#rescue-form-message').html('<h2>You\'re about to send us your amazing story.</h2>\
       <p>Is it written exactly they way you like?</p>')
      $('#rescue-story-form input[type="submit"]').attr('value','Yes I\'m Sure');
      $ss_sub_confirm = true;
    }
  });
})
