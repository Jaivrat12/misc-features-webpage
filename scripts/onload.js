import { preloader, home, tooltips, popups } from "./domElems.js";
import { updateHeader } from './header.js';
import { imgSliderOnload } from './image-slider.js';

document.addEventListener('readystatechange', () => {

    if(document.readyState == 'complete') {

        preloader.fadeOut(200);

        setTimeout(() => {
    
            home.bannerTitle.addClass('banner-h1-anim');
            home.bannerAbout.addClass('about-anim');
            home.bannerLinks.addClass('banner-links-anim');
        }, 100);

        setTimeout(() => {

            home.bannerTitle.css('opacity', 1);
            home.bannerAbout.css('opacity', 1);
            home.bannerLinks.css('opacity', 1);
        }, 1250);
        
        const animateElems = (elem, elemChilds, delay) => {
        
            const inRange = (x, min, max) => x >= min && x <= max;

            const top = elem.offset().top;
            const bottom = top + elem.height();
            const windowBottom = pageYOffset + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
            
            if(inRange(top, pageYOffset, windowBottom) || inRange(bottom, pageYOffset, windowBottom)) {
        
                let t = 0;
                elemChilds.each(function() {
        
                    setTimeout(() =>

                        $(this).addClass('rise-anim')
                               .css('opacity', 1), t
                    );
                    t += delay;
                });
            }
        };
        
        const animOnScroll = () => {
        
            animateElems(tooltips.cardsWrapper, tooltips.cards, 150);
            animateElems(popups.popupBtnsWrapper, popups.popupBtns, 100);
        }
        
        $(document).on('scroll', animOnScroll);

        
        // Call these functions ONLOAD!!!
        animOnScroll();
        // Update Header onload
        updateHeader();
        // Fire some functions for image slider onload
        imgSliderOnload();
    }
});