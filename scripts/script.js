$(() => {

    // Header & Navbar
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
        
        $('section').each(function() {

            const id = this.id;
            const top = $(this).offset().top;
            bottom += $(this).height();
            if(inRange(pageYOffset, top, bottom)) {

                const targetLink = $(`nav a[href="#${id}"]`);
                updateNavLinks(targetLink);
            }
        });
    };

    let navExpanded = false;
    const updateNavBackColor = () => {

        if($(this).scrollTop() > 80) {

            $('header').addClass('solid');
            $('.navbar').removeClass('navbar-dark').addClass('navbar-light');
        }
        else if(!navExpanded) {

            $('header').removeClass('solid');
            $('.navbar').removeClass('navbar-light').addClass('navbar-dark');
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

    // Navbar Expand
    $('.navbar-toggler').on('click', () => {

        const btn = $('.navbar-toggler');
        const openIcon = 'navbar-toggler-icon';
        const closeIcon = 'btn-close px-3 py-2';

        navExpanded = !navExpanded;

        if(navExpanded) {

            $(`.${openIcon}`).removeClass(openIcon);
            btn.addClass(closeIcon);
            
            $('header').addClass('solid');
        }
        else {

            btn.removeClass(closeIcon).children().addClass(openIcon);

            if($(this).scrollTop() < 80) {

                $('header').removeClass('solid');
                $('.navbar').removeClass('navbar-light').addClass('navbar-dark');
            }
        }
    });

    updateScrollProgress = () => {

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / height) * 100;
        $('.scroll-progress-bar').css('width', scrolled + '%');
    };

    $(document).on('scroll', updateScrollProgress);

    // Update Scroll Progress Bar onload
    updateScrollProgress();


    // Home
    // Change color of hero img constantly
    let hueRotateAngle = 0;
    setInterval(() => {

        hueRotateAngle = (hueRotateAngle + 1) % 360;
        $('#home .hero-img')
            .css('filter', `hue-rotate(${hueRotateAngle}deg) brightness(50%)`);
    }, 100);
    // Same as above for text in buttons (anchors) in banner
    setInterval(() => {

        hueRotateAngle = (hueRotateAngle + 1) % 360;
        $('.banner-caption a:first-of-type, .banner-caption a:hover')
            .css('filter', `hue-rotate(${hueRotateAngle}deg)`);
    }, 100);


    // Tooltip
    // Mouse Following Tooltip
    const tt_mouse_follower = $('#tt-mouse-follower');
    tt_mouse_follower.parent().on('mousemove', e => {
        
        let posLeft = e.pageX;
        if($(window).width() - e.pageX < tt_mouse_follower.width() / 2 + 8)
            posLeft = $(window).width() - tt_mouse_follower.width() / 2 - 10;    
        tt_mouse_follower[0].style.left = posLeft + 'px';
        tt_mouse_follower[0].style.top = e.pageY - 8 + 'px';
    });


    // Popups
    const timedPopupBtn = $('#timedPopupBtn');
    // Timed Popup
    timedPopupBtn.on('click', () => {
        
        const spanTime = timedPopupBtn.find('.popup-time');
        let rem = spanTime.text();
        let savedTime = rem;
        let dur = rem * 1000;
        const timedPopup = $('#timedModal');
        setTimeout(() => timedPopup.modal('show'), dur);
        let updateTime = setInterval(() => {
            
            rem--;
            spanTime.text(rem);
            if(rem == -1) {

                clearInterval(updateTime);
                spanTime.text(savedTime);
            }
        }, 1000);
    });
    // Notifying Popup
    $('#popup-notif-btn').on('click', () => $('#popup-notif').toast('show'));


    // IMAGE SLIDER
    const imgSlider = $('#img-slider');

    // Scroll to get a full screen view when clicked on it
    imgSlider.on('click drag', () => imgSlider[0].scrollIntoView());
    
    const toggleNavbar = () => {
        
        if(Math.floor(imgSlider.offset().top) == pageYOffset)
            $('header').css('transform', 'translateY(-100%)');
        else
            $('header').css('transform', 'translateY(0%)');
    };

    // Hide navbar when image slider occupies full-screen
    $(this).on('scroll', toggleNavbar);
    
    const slides = $('.z-slide');
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


    // APIs
    // IMAGE API, generates new images
    const ImageAPI = (function() {

        const imgAPI = $('#img-api');
        const img = $(imgAPI.find('.media > img'));
        const imgLoader = imgAPI.find('.img-loader');
        
        const _updateImage = async () => {
            
            const reqURL = 'https://picsum.photos/400/';
            const response = await fetch(reqURL);

            img.attr('src', response.url);
        };

        return {

            updateImage() {
             
                imgLoader.fadeIn(200);
                _updateImage().then(() => imgLoader.fadeOut(200));
            }
        }
    })();

    $('#img-api button').on('click', () => {
    
        $('#img-api .load-anim').css('display', 'block');
        ImageAPI.updateImage();
    });


    // MUSIC [SPOTIFY] API, search for tracks on SPOTIFY
    // using WEB API provided by SPOTIFY
    const SpotifyAPI = (function() {

        const APISearchURL = 'https://api.spotify.com/v1/search?';
        let type = 'track';
        let market = 'IN';
    
        const spotifyEmbedURL = 'https://open.spotify.com/embed/track/';
    
        const getTrackID = async (searchItem, token) => {
    
            const reqURL = `${APISearchURL}q=${searchItem}&type=${type}&market=${market}&limit=1&offset=0`;
            const response = await fetch(reqURL, {
    
                method: "GET",
                headers: {
        
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
    
            if(response.status !== 200)
                throw new Error(`${response.status}. Cannot Fetch the Data`);
            
            const data = await response.json();
            return data.tracks.items[0].id;
        };

        return {

            async getTrackURL(searchItem, token) {

                const trackID = await getTrackID(searchItem, token)
                                        .catch(error => console.log(error));

                return spotifyEmbedURL + trackID;
            }
        }
    })();

    $('#search-track').on('click', () => {

        $('#music-api .icon').hide();
        $('#music-api .load').css('display', 'block');

        const musicLoader = $('.music-loader');
        musicLoader.fadeIn(200);

        const token = $('#music-api #token-input').val();
        const searchItem = $('#search-track-input')[0].value;
        const iframe = $('#music-api iframe');
        SpotifyAPI.getTrackURL(searchItem, token)
                    .then(trackURL => {

                        $(iframe).attr('src', trackURL);
                        setTimeout(() => musicLoader.fadeOut(200), 800);
                    });
    });

    $('#music-api select').on('change', () => {

        $('#search-track-opt').toggle();
        $('#get-rand-track').toggle();
    });

    const trackIDs = [

        '6zAiRKvAMlXHxEtyO4yxIO', '6KMgPewrVRxzeFzRwkFa0M', '0Lu9pdU9sOqI2jFwxfztCb',
        '4VgGx1cQlHB7Ls1Ukt0H7H', '5C0ivQMxes2lWuOANhvVAm', '2Y9v6F9vFK9Z8KAoFwAj9Z',
        '28tufPkTcXmdNqTvi9hsoG', '1ffXf7HjLCHvNZngkQpGTR', '3dPtXHP0oXQ4HCWHsOA9js',
        '1vtGx2fyS5yHOdSwkjpiVi'
    ];
    let trackIndex = 0;
    $('#get-rand-track').on('click', () => {

        const spotifyEmbedURL = 'https://open.spotify.com/embed/track/';

        $('#music-api .icon').hide();
        $('#music-api .load').css('display', 'block');

        const musicLoader = $('.music-loader');
        musicLoader.fadeIn(200);

        $('#music-api iframe').attr('src', spotifyEmbedURL + trackIDs[trackIndex]);
        trackIndex = (trackIndex + 1) % trackIDs.length;

        setTimeout(() => musicLoader.fadeOut(200), 1000);
    });


    // VIDEO [YOUTUBE] API, search for youtube on YOUTUBE
    // using WEB API provided by Google Developers
    const YoutubeAPI = (function() {

        const APISearchURL = 'https://www.googleapis.com/youtube/v3/search?';
        const ytEmbedURL = 'https://www.youtube.com/embed/';
        
        const getVideoID = async (searchItem, key) => {

            const reqURL = `${APISearchURL}q=${searchItem}&key=${key}`;
            const response = await fetch(reqURL);

            if(response.status !== 200)
                throw new Error(`${response.status}. Cannot Fetch the Data`);
            
            const data = await response.json();

            for(item of data.items) {

                if(item.id.kind == 'youtube#video')
                    return item.id.videoId;
            }
        };

        return {

            async getVideoURL(searchItem, key) {

                const videoID = await getVideoID(searchItem, key)
                                        .catch(error => console.log(error));

                return ytEmbedURL + videoID;
            }
        }
    })();

    $('#search-video').on('click', () => {

        const videoLoader = $('.video-loader');
        const vidLoadAnim = videoLoader.find('.load-anim');
        if(!vidLoadAnim.hasClass('d-flex'))
            vidLoadAnim.addClass('d-flex');
        videoLoader.fadeIn(200);

        const key = $('#key-input')[0].value;
        const searchItem = $('#search-video-input')[0].value;
        const iframe = $('#video-api iframe');
        YoutubeAPI.getVideoURL(searchItem, key)
                    .then(videoURL => {
                    
                        $(iframe).attr('src', videoURL);
                        setTimeout(() => videoLoader.fadeOut(200), 800);
                    });
    });

    $('#video-api select').on('change', () => {

        $('#search-video-opt').toggle();
        $('#get-rand-video').toggle();
    });

    const videoIDs = [

        '_lFlmFoGhjc', 'S3C9vwyTkhA', 'fzQ6gRAEoy0', '3Fi1f-PJdco', 'Wwz21EwtzeA',
        'v8bZVdTgXoY', 'U03y7rjEEKw', '0Vwwr3VGsYg', 'jhYg5NrN-r8', '9pjkgmmalkE'
    ];
    let videoIndex = 0;
    $('#get-rand-video').on('click', () => {

        const ytEmbedURL = 'https://www.youtube.com/embed/';

        const videoLoader = $('.video-loader');
        const vidLoadAnim = videoLoader.find('.load-anim');
        if(!vidLoadAnim.hasClass('d-flex'))
            vidLoadAnim.addClass('d-flex');
        videoLoader.fadeIn(200);

        $('#video-api iframe').attr('src', ytEmbedURL + videoIDs[videoIndex]);
        videoIndex = (videoIndex + 1) % videoIDs.length;

        setTimeout(() => videoLoader.fadeOut(200), 800);
    });
});
