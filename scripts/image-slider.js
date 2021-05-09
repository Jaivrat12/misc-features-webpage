$(() => {

    // IMAGE SLIDER
    const imgSlider = $('#img-slider');

    // Scroll to get a full screen view when clicked on it
    imgSlider.on('click drag', () => imgSlider[0].scrollIntoView());

    const toggleNavbar = () => {

        if(imgSlider.offset().top == pageYOffset)
            $('header').css('transform', 'translateY(-100%)');
        else
            $('header').css('transform', 'translateY(0%)');
    };

    // Hide navbar when image slider occupies full-screen
    $(this).on('scroll', toggleNavbar);
    
    const slides = $('.slide');
    const navArrows = $('#nav-arrows span');
    const navDots = $('.nav-dot');

    let imgIndex = 0;
    let autoSlide = undefined;

    setAutoSlideInterval = () => {

        clearInterval(autoSlide);
        autoSlide = setInterval(() => {

            const oldIndex = imgIndex;
            imgIndex = (imgIndex + 1) % slides.length;
            updateSlide(oldIndex);
        }, 5000);
    }

    animateCaption = () => {

        const slideCaption = $(slides[imgIndex]).find('.slide-caption');
        slideCaption.addClass('caption-anim');
        setTimeout(() => {

            $('.slide-caption').css('opacity', 0);
            slideCaption.removeClass('caption-anim');
            slideCaption.css('opacity', 1);
        }, 1200);
    };

    updateSlide = oldIndex => {

        $(navDots[oldIndex]).removeClass('active-dot');
        $(navDots[imgIndex]).addClass('active-dot');

        $('#slides').css('transform', `translateX(-${imgIndex * 100}vw)`);
        setTimeout(animateCaption, 400);
    };

    navArrows.on('click', e => {

        const oldIndex = imgIndex;
        if(e.target.dataset.navType == "prev")
            imgIndex = (imgIndex) ? imgIndex - 1 : slides.length - 1;
        else
            imgIndex = (imgIndex + 1) % slides.length;
        
        updateSlide(oldIndex);
        setAutoSlideInterval();             // Reset Auto Slide Timer
    });

    navDots.on('click', e => {

        const oldIndex = imgIndex;
        imgIndex = e.target.dataset.navIndex - 1;
        updateSlide(oldIndex);
        setAutoSlideInterval();             // Reset Auto Slide Timer
    });

    // Start Automatic Image Sliding onload
    setAutoSlideInterval();

    // Animate first image's caption onload
    animateCaption();

    // Hide navbar if image slider is in full-screen onload
    toggleNavbar();
});