$(document).ready(function () {

  $('.elements:first-child').removeClass('elem1');
  $('.elements:nth-child(2)').removeClass('elem2');
  $('.elements:nth-child(3)').removeClass('elem3');
  $('.elements:nth-child(4)').removeClass('elem4');
  $('.elements:nth-child(5)').removeClass('elem5');

  $(window).scroll(function() {
    let scrollCost = $('#cost').offset().top;

    if($(this).scrollTop() + $(window).height() >= scrollCost) {
      $('.elements_cost:first-child').removeClass('elem_cost1');
      $('.elements_cost:nth-child(2)').removeClass('elem_cost2');
      $('.elements_cost:nth-child(3)').removeClass('elem_cost3');
      $('.elements_cost:nth-child(4)').removeClass('elem_cost4');
      $('.elements_cost:nth-child(5)').removeClass('elem_cost5');
    }
  });

  $('a[href*="#"]').on("click", function(e){
    var anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top
    }, 700);
    e.preventDefault();
    return false;
  });

  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: 'true',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      // when window width is >= 320px
      769: {
        slidesPerView: 2,
        spaceBetween: 34
      },
      // when window width is >= 480px
      1200: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }

})

  let nav = $('.nav'),
      burgerItemFirst = $('.burger_item:first-child'),
      burgerItemMidl = $('.burger_item:nth-child(2)'),
      burgerItemLast = $('.burger_item:last-child');

  $('.burger').on('click', function() {

    $(nav).slideToggle(300, function() {
      if($(this).css('display') === 'none') {
        $(this).removeAttr('style');
      }

      $(burgerItemFirst).toggleClass('burger_item--first');
      $(burgerItemMidl).toggleClass('burger_item--midl');
      $(burgerItemLast).toggleClass('burger_item--last');
    });

  })

  $('.nav_link').on('click', function() {
    $(nav).removeAttr('style');

    $('.burger_item:first-child').toggleClass('burger_item--first');
    $('.burger_item:nth-child(2)').toggleClass('burger_item--midl');
    $('.burger_item:last-child').toggleClass('burger_item--last');
  })

});