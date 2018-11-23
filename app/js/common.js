/**
* Оновная функция, которая начинает работать
* сразу после загрузки скрипта
*/

$(function() {

	/**
	* Создание слайдера согласно документации OwlCarousel
	*/
	$('.owl-carousel').owlCarousel({
		items: 4,
		smartSpeed: 700, 
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		dots: false,
		responsiveClass: true
	});

	/**
	* Добавление динамики на страницу, если пользватель скроллит страницу
	*/
	$(window).scroll(function() {

		/**
		* Изменение высоты шапки относительно скролла
		*/
		if ($(window).scrollTop() > 50) {
			$('.top-line').addClass('onscroll');
		} else {
			$('.top-line').removeClass('onscroll');
		}

		var listHash = ['#products', '#biorythm', '#info-specialists', '#faq', '#news', '#buy', '#contacts'];

		for (var i = 0; i < listHash.length; ++i) {
			if ($(window).scrollTop() >= $(listHash[i]).offset().top - $(".top-line").height() - 10) {

				$('.main-menu li').removeClass('active');
				$('.main-menu li:nth-child('+ Number(i+1) +')').addClass('active');

			}
		}

		var rowPos = $('.row-background-wrapper').offset().top;
		var rowPosBio = $('.row-background-wrapper-bio').offset().top;
		var rowHeight = $('.row-background-wrapper').height();
		var rowHeightBio = $('.row-background-wrapper-bio').height();
		var windowPos = $(window).scrollTop();
		var windowHeight = $(window).height();
		var completion = (windowPos - rowPos + windowHeight/2)/rowHeight*100;
		var completionBio = (windowPos - rowPosBio + windowHeight/2)/rowHeightBio*100;
		
		if (rowPos < windowPos + windowHeight/2) {
			$('.row-background').addClass('active');
		} else {
			$('.row-background').removeClass('active');
		}

		if (rowPosBio < windowPos + windowHeight/2) {
			$('.row-background-bio').addClass('active');
		} else {
			$('.row-background-bio').removeClass('active');
		}

	});

	/**
	* Создание динамической секции вопросов и ответов
	*/
	$(".open").click( function () {
		var container = $(this).parents(".topic");
		var answer = container.find(".answer");
		var trigger = container.find(".faq-t");
		
		answer.slideToggle(200);
		
		if (trigger.hasClass("faq-o")) {
			trigger.removeClass("faq-o");
		} else {
			trigger.addClass("faq-o");
		}
		
		if (container.hasClass("expanded")) {
			container.removeClass("expanded");
		} else {
			container.addClass("expanded");
		}
	});

	/**
	* Создание плавного скролла по якорям
	*/
	$(".main-menu").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href');
		if (id === '/') {
			window.location.assign('http://localhost:3000');
		} else {
			//узнаем высоту от начала страницы до блока на который ссылается якорь
			var top = $(id).offset().top - $(".top-line").height();
			//анимируем переход на расстояние
			$('body,html').animate({scrollTop: top}, 'slow', 'swing');
			window.location.hash = id;
		}

	});

	/**
	* Изменение перехода по ссылкам при загрузки страницы
	*/
	if (window.location.hash) {
		var str = window.location.hash.toString();
		var top = $(str).offset().top;
		$('body,html').animate({scrollTop: top}, 'slow', 'swing');
	}


});
