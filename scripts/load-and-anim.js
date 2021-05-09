$(() => {

    // $('.preloader').hide();

    // $('body').on('click', () => {

    //     $('body').fadeOut(100).fadeIn(100);
    // });

    $('.preloader .go').on('click', () => {
        
        $('.preloader').hide();

        const banner = $('.banner-caption');

        banner.find('h2').addClass('h2-anim');
        banner.find('.about').addClass('about-anim');
        banner.find('.more-features').addClass('more-anim');

        setTimeout(() => {

            banner.find('h2')
                .css('opacity', 1);
            banner.find('.about')
                .css('opacity', 1);
            banner.find('.more-features')
                .css('opacity', 1);
        }, 1250);
    });

    let spotifyAnimPlayed = false;
    const playSpotifyAnim = () => {

        const height = document.documentElement.clientHeight;
        if(!spotifyAnimPlayed && pageYOffset + height >= $('#music-api .ctrl-box').offset().top) {

            spotifyAnimPlayed = true;
            const icon = $('#music-api .icon');
            const overlay = $('#music-api .overlay');
            icon.fadeOut(500, () => {

                icon.attr('src', 'assets/anim-gifs/spotify-anim.gif')
                    .css('width', '100%');
            }).fadeIn(500);
            overlay.fadeIn();
            setTimeout(() => overlay.fadeOut(), 600);
            setTimeout(() => {

                icon.fadeOut(500, () => {

                    icon.attr('src', 'assets/icons/spotify banner.png')
                        .css('width', '70%');
                    icon.fadeIn(500);
                })
            }, 4800);
        }
    };

    $(this).on('scroll', playSpotifyAnim);

    // Play spotify animation if it's in view onload
    setTimeout(playSpotifyAnim, 2000);
});