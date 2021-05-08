document.addEventListener('readystatechange', () => {

    if(document.readyState == 'complete') {

        $('.preloader').fadeOut(200);
        
        const banner = $('.banner-caption');
        const bannerTitle = banner.find('h1');
        const bannerAbout = banner.find('.about');
        const bannerLinks = banner.find('.banner-links');

        setTimeout(() => {
    
            bannerTitle.addClass('banner-h1-anim');
            bannerAbout.addClass('about-anim');
            bannerLinks.addClass('banner-links-anim');
        }, 100);

        setTimeout(() => {
    
            bannerTitle.css('opacity', 1);
            bannerAbout.css('opacity', 1);
            bannerLinks.css('opacity', 1);
        }, 1250);
        
        const animateElems = (elem, elemChilds, delay) => {
        
            const inRange = (x, min, max) => x >= min && x <= max;
            const top = elem.offset().top;
            const bottom = top + $(elem).height();
            const windowBottom = pageYOffset + (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
            
            if(inRange(top, pageYOffset, windowBottom) || inRange(bottom, pageYOffset, windowBottom)) {
        
                let t = 0;
                elemChilds.each(function() {
        
                    setTimeout(() => $(this).addClass('rise-anim').css('opacity', 1), t);
                    t += delay;
                });
            }
        
        }
        
        const animOnScroll = () => {
        
            animateElems($('#tooltips .container > .row'), $('#tooltips .card'), 150);
            animateElems($('#popups .container > .row'), $('#popups button'), 100);
        }
        
        $(document).on('scroll', animOnScroll);
        animOnScroll();
    }
});