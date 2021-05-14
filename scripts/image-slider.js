import { header, imgSlider } from "./domElems.js";

// IMAGE SLIDER
const toggleNavbarOnFullImg = () => {
    
    if(Math.floor(imgSlider.self.offset().top) == pageYOffset)
        header.self.css('transform', 'translateY(-100%)');
    else
        header.self.css('transform', 'translateY(0%)');
};

// const navDots = $('.nav-dot');

let imgIndex = 0;
let autoSlide = undefined;

const setAutoSlideInterval = () => {

    clearInterval(autoSlide);
    autoSlide = setInterval(() => {

        const oldIndex = imgIndex;
        imgIndex = (imgIndex + 1) % imgSlider.slides.length;
        updateSlide(oldIndex);
    }, 5000);
}

const animateCaption = () => {

    const slideCaption = $(imgSlider.slides[imgIndex]).find('.slide-caption');
    slideCaption.addClass('caption-anim');
    setTimeout(() => {

        imgSlider.slideCaps.css('opacity', 0);
        slideCaption.removeClass('caption-anim');
        slideCaption.css('opacity', 1);
    }, 1200);
};

const updateSlide = oldIndex => {

    $(imgSlider.navDots[oldIndex]).removeClass('active-dot');
    $(imgSlider.navDots[imgIndex]).addClass('active-dot');

    imgSlider.slidesWrapper.css('transform', `translateX(-${imgIndex * 100}vw)`);
    setTimeout(animateCaption, 400);
};

const onNavArrowsClick = e => {

    const oldIndex = imgIndex;
    if(e.target.dataset.navType == "prev")
        imgIndex = (imgIndex) ? imgIndex - 1 : imgSlider.slides.length - 1;
    else
        imgIndex = (imgIndex + 1) % imgSlider.slides.length;
    
    updateSlide(oldIndex);
    setAutoSlideInterval();             // Reset Auto Slide Timer
};

const onNavDotsClick = e => {

    const oldIndex = imgIndex;
    imgIndex = e.target.dataset.navIndex - 1;
    updateSlide(oldIndex);
    setAutoSlideInterval();             // Reset Auto Slide Timer
};

const imgSliderOnload = () => {

    // Start Automatic Image Sliding onload
    setAutoSlideInterval();

    // Animate first image's caption onload
    animateCaption();

    // Hide navbar if image slider is in full-screen onload
    toggleNavbarOnFullImg();
};

export {

    toggleNavbarOnFullImg, onNavArrowsClick,
    onNavDotsClick, imgSliderOnload
};