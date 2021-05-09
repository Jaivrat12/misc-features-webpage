$(() => {

    // Change color of banner constantly
    let hueRotateAngle = 0;
    setInterval(() => {

        hueRotateAngle = (hueRotateAngle + 1) % 360;
        $('#home img')
            .css('filter', `hue-rotate(${hueRotateAngle}deg) brightness(50%)`);
    }, 100);

    // make banner elements opaque onload
    /* const banner = $('.banner-caption');
    setTimeout(() => {

        banner.find('h2')
              .css('opacity', 1);
        banner.find('.about')
              .css('opacity', 1);
        banner.find('.more-features')
              .css('opacity', 1);
    }, 1250); */

    /*
    // This is a fix to one of the bugs in the commented feature below
    let navMode = false;
    $('nav a').on('click', () => {

        navMode = true;
        setTimeout(() => navMode = false, 1000);
    });
    */

    updateScrollProgress = () => {

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / height) * 100;
        $('.scroll-progress-bar').css('width', scrolled + '%');
    };


    // let currentHash = '';
    $(document).on('scroll', () => {

        updateScrollProgress();

        /*
        // Update URL in address bar while Scrolling
        // Note: This thingy causes some bugs,
        //       some of which were fixed but still some are left,
        //       and I don't feel like fixing them,
        //       so temporary bye bye this.feature;
        $('section').each(function() {

            const top = window.pageYOffset;
            const distance = top - $(this).offset().top;
            const hash = $(this).attr('id');

            if(!navMode && distance < 30 && distance > -30 && currentHash != hash) {

                window.location.hash = hash;
                currentHash = hash;
            }
        });
        */
    });

    // Update Scroll Progress Bar onload
    updateScrollProgress();
});