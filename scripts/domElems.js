const preloader = $('.preloader');
const sections = $('section');

const header = {
    
    self: $('header'),
    scrollProgressBar: $('.scroll-progress-bar'),
};

const navbar = {

    self: $('.navbar'),
    navbarToggler: $('.navbar-toggler'),
    navAnchors: $('nav a'),
};

const home = {

    heroImg: $('#home .hero-img'),
    bannerCap: $('.banner-caption'),
    bannerTitle: $('.banner-caption h1'),
    bannerAbout: $('.banner-caption .about'),
    bannerLinks: $('.banner-caption .banner-links'),
}

const tooltips = {

    cardsWrapper: $('#tooltips .container > .row'),
    cards: $('#tooltips .card'),
    mouseFollower: $('#tt-mouse-follower'),
};

const popups = {

    popupBtnsWrapper: $('#popups .container > .row'),
    popupBtns: $('#popups button'),
    timedPopupBtn: $('#timedPopupBtn'),
    timedPopup: $('#timedModal'),
    spanTime: $('.popup-time'),
    notifPopupBtn: $('#popup-notif-btn'),
    notifPopup: $('#popup-notif'),
};

const imgSlider = {

    self: $('#img-slider'),
    slidesWrapper: $('#slides'),
    slides: $('.z-slide'),
    navArrows: $('#nav-arrows span'),
    navDots: $('.nav-dot'),
    slideCaps: $('.slide-caption'),
};

const imgAPI = {

    self: $('#img-api'),
    img: $('#img-api .media > img'),
    imgLoader: $('.img-loader'),
    loadImgBtn: $('#img-api button'),
    loadAnim: $('#img-api .load-anim'),
};

const musicAPI = {

    searchBtn: $('#search-track'),
    icon: $('#music-api .icon'),
    loaderWrapper: $('#music-api .load'),
    musicLoader: $('.music-loader'),
    tokenInput: $('#music-api #token-input'),
    searchInput: $('#search-track-input'),
    player: $('#music-api iframe'),
    selectInput: $('#music-api select'),
    searchOption: $('#search-track-opt'),
    getRandOption: $('#get-rand-track'),
};

const videoAPI = {

    searchBtn: $('#search-video'),
    videoLoader: $('.video-loader'),
    vidLoadAnim: $('.video-loader .load-anim'),
    keyInput: $('#key-input'),
    searchInput: $('#search-video-input'),
    player: $('#video-api iframe'),
    selectInput: $('#video-api select'),
    searchOption: $('#search-video-opt'),
    getRandOption: $('#get-rand-video'),
};

export {
    
    preloader, sections, header, navbar,
    home, tooltips, popups, imgSlider,
    imgAPI, musicAPI, videoAPI
};