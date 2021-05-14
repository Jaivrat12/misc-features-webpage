import {
    navbar, home, tooltips,
    popups, imgSlider,
    imgAPI, musicAPI, videoAPI
} from './scripts/domElems.js';

import {
    updateHeader, toggleNavbar
} from './scripts/header.js';

import {
    updateTooltipPos, firePopup
} from './scripts/tooltips-popups.js';

import {
    toggleNavbarOnFullImg, onNavArrowsClick,
    onNavDotsClick
} from './scripts/image-slider.js';

import {
    trackIDs, videoIDs,
    ImageAPI, SpotifyAPI, YoutubeAPI
} from './scripts/media-api.js';

$(() => {

    // HEADER
    // Update Header when scrolling
    $(document).on('scroll', updateHeader);
    // Navbar Expand Handler (for small screen sizes)
    navbar.navbarToggler.on('click', toggleNavbar);

    // Home
    // Change color of hero img and banner links constantly
    let hueRotateAngle = 0;
    setInterval(() => {

        hueRotateAngle = (hueRotateAngle + 1) % 360;
        home.heroImg.css('filter', `hue-rotate(${hueRotateAngle}deg) brightness(50%)`);
        $('.banner-links a:first-of-type, .banner-links a:hover')
            .css('filter', `hue-rotate(${hueRotateAngle}deg)`);
    }, 100);

    // Tooltips
    tooltips.mouseFollower.parent().on('mousemove', updateTooltipPos);

    // Popups
    // Timed Popup
    popups.timedPopupBtn.on('click', firePopup);
    // Notifying Popup
    popups.notifPopupBtn.on('click', () => popups.notifPopup.toast('show'));

    // Image Slider
    // Scroll to get a full screen view when clicked on it
    imgSlider.self.on('click drag', () => imgSlider.self[0].scrollIntoView());
    // Hide navbar when image slider occupies full-screen
    $(document).on('scroll', toggleNavbarOnFullImg);
    imgSlider.navArrows.on('click', onNavArrowsClick);
    imgSlider.navDots.on('click', onNavDotsClick);

    // APIs
    // Image API
    imgAPI.loadImgBtn.on('click', () => {

        imgAPI.loadAnim.css('display', 'block');
        ImageAPI.updateImage();
    });

    // Spotify API
    musicAPI.searchBtn.on('click', () => {

        SpotifyAPI.putLoader();
    
        const token = musicAPI.tokenInput.val();
        const searchItem = musicAPI.searchInput.val();
        
        SpotifyAPI.getTrackURL(searchItem, token)
                    .then(trackURL => {
    
                        musicAPI.player.attr('src', trackURL);
                        setTimeout(() => musicAPI.musicLoader.fadeOut(200), 800);
                    });
    });
    
    musicAPI.selectInput.on('change', () => {
    
        musicAPI.searchOption.toggle();
        musicAPI.getRandOption.toggle();
    });
    
    let trackIndex = 0;
    musicAPI.getRandOption.on('click', () => {
    
        SpotifyAPI.putLoader();
        
        musicAPI.player.attr('src', SpotifyAPI.spotifyEmbedURL + trackIDs[trackIndex]);
        trackIndex = (trackIndex + 1) % trackIDs.length;
    
        setTimeout(() => musicAPI.musicLoader.fadeOut(200), 1000);
    });

    // YouTube API
    videoAPI.searchBtn.on('click', () => {

        YoutubeAPI.putLoader();
    
        const key = videoAPI.keyInput.val();
        const searchItem = videoAPI.searchInput.val();
        
        YoutubeAPI.getVideoURL(searchItem, key)
                    .then(videoURL => {
                    
                        videoAPI.player.attr('src', videoURL);
                        setTimeout(() => videoAPI.videoLoader.fadeOut(200), 800);
                    });
    });
    
    videoAPI.selectInput.on('change', () => {
    
        videoAPI.searchOption.toggle();
        videoAPI.getRandOption.toggle();
    });
    
    let videoIndex = 0;
    videoAPI.getRandOption.on('click', () => {
    
        YoutubeAPI.putLoader();
    
        videoAPI.player.attr('src', YoutubeAPI.ytEmbedURL + videoIDs[videoIndex]);
        videoIndex = (videoIndex + 1) % videoIDs.length;
    
        setTimeout(() => videoAPI.videoLoader.fadeOut(200), 800);
    });
});