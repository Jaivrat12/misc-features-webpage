$(() => {
    
    // Update active Navbar links
    const updateNavLinks = targetLink => {
        
        $('nav a.active').removeClass('active');
        $(targetLink).addClass('active');
    }

    $('nav a').on('click', e => updateNavLinks(e.target));

    // Check position of webpage w.r.t. sections & update nav links
    const chkPagePos = () => {

        const inRange = (x, min, max) => x >= min && x <= max;
        let bottom = 0;
        $('#home, section .container').each(function() {

            const id = (bottom) ? ($(this).parent()[0].id) : (this.id);
            const top = $(this).parent().offset().top;
            bottom += $(this).height();
            if(inRange(pageYOffset, top, bottom)) {

                const targetLink = $(`nav a[href="#${id}"]`);
                updateNavLinks(targetLink);
            }
        });
    };

    const updateNavBackColor = () => {

        if($(this).scrollTop() > 80) {

            $('header').addClass('solid');
            $('.scroll-progress').css('opacity', 1);
        }
        else {

            $('header').removeClass('solid');
            $('.scroll-progress').css('opacity', 0);
        }
    };

    const updateNavbar = () => {

        updateNavBackColor();
        chkPagePos();
    };

    // Transparent to solid and vice versa Navbar while Scrolling
    $(this).on('scroll', updateNavbar);

    // Update Navbar onload
    updateNavbar();
});