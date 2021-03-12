// Slick Slider
// $(document).ready(function(){
// 	$('.carousel__inner').slick({
// 		// dots: true, крапочки знизу
// 		speed: 1200,
// 		adaptiveHeight: true,
// 		prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow/left.png"></button>',
// 		nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow/right.png"></button>',
// 		responsive: [
// 			{
// 				breakpoint: 992, /*на якому проміжку встановлюєм правила*/
// 				settings: {
// 					dots: true,
// 					arrow: false
// 				}
// 			}
// 		]
// 	});
// });

//----------------------------------------------------------------------------

// Tiny Slider 2
const slider = tns({
	container: '.carousel__inner',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: false,
	nav: false,
	autoHeight: true,
	startIndex: 1
});

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});

// -------------------------------------------------------------------------------------

// Каталог
$(document).ready(function() {
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
	$(this)
		.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	// $('.catalog-item__link').each(function(i) {
	// 	$(this).on('click', function(e) {
	// 		e.preventDefault();
	// 		$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
	// 		$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
	// 	})
	// });

	// $('.catalog-item__back').each(function(i) {
	// 	$(this).on('click', function(e) {
	// 		e.preventDefault();
	// 		$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
	// 		$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
	// 	})
	// });

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');


	// Виклик модальних вікон
	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	}); /*fadeOut - позволяє красиво з анімацією скрити деякі елементи*/
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	function valideForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},

			messages: {
				name: {
					required: "Будь ласка введіть своє ім'я",
					minlength: jQuery.validator.format("Введіть {0} символи!")
				},
				phone: "Будь ласка введіть свій телефон",
				email: {
	    			required: "Будь ласка введіть сою пошту",
	    			email: "Неправильно введний адрес пошти"
				}
			}
		});
	};

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');


	// Маска воду номера на сайті
	$('input[name=phone]').mask(" +38(099) 999-99-99");

	// Відправлення форми/заказу на пошту.
	$('form').submit(function(e) {
		e.preventDefault(); /*відміняєм стандартне поводженя браузера*/
		$.ajax({
			type: "POST", /*відправляю дані на сервер/пошту*/
			url: "mailer/smart.php", /*який скріпт/програма буде обрабляти дані*/
			data: $(this).serialize() /*дані які хочу відправити на сервер*/
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow')
			$('form').trigger('reset');
		}); 
		return false;
	});

	// Кнопка яка перекидає на верх сайту / плавна прокрутка
	$(window).scroll(function() {
		if($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href=#up]").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});