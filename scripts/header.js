import { sections, header, navbar, home } from './domElems.js';

// Update active Navbar links
const updateActiveLink = targetLink => {

    $('nav a.active').removeClass('active');
    $(targetLink).addClass('active');
};

// Check position of webpage w.r.t. sections & update nav links
const updateNavLinks = () => {

    const inRange = (x, min, max) => x >= min && x <= max;
    let bottom = 0;
    
    sections.each(function() {

        const id = this.id;
        const top = $(this).offset().top;
        bottom += $(this).height();
        if(inRange(pageYOffset, top, bottom)) {

            const targetLink = $(`nav a[href="#${id}"]`);
            updateActiveLink(targetLink);
        }
    });
};

// Make Navbar transparent when on top of page, and opaque otherwise
let navExpanded = false;
const updateNavBackColor = () => {

    if($(document).scrollTop() + header.self.height() - 5 > home.bannerTitle.offset().top) {

        header.self.addClass('solid');
        navbar.self.removeClass('navbar-dark')
                   .addClass('navbar-light');
    }
    else if(!navExpanded) {

        header.self.removeClass('solid');
        navbar.self.removeClass('navbar-light')
                   .addClass('navbar-dark');
    }
};

const updateNavbar = () => {

    updateNavBackColor();
    updateNavLinks();
};

const updateScrollProgress = () => {

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / height) * 100;
    header.scrollProgressBar.css('width', scrolled + '%');
};

const updateHeader = () => {

    updateNavbar();
    updateScrollProgress();
};

// Navbar Expand
const toggleNavbar = () => {

    const openIcon = 'navbar-toggler-icon';
    const closeIcon = 'btn-close px-3 py-2';

    navExpanded = !navExpanded;

    if(navExpanded) {

        $(`.${openIcon}`).removeClass(openIcon);
        navbar.navbarToggler.addClass(closeIcon);
        
        header.self.addClass('solid');
    }
    else {

        navbar.navbarToggler.removeClass(closeIcon)
              .children().addClass(openIcon);

        setTimeout(updateNavBackColor, 400);
    }
};

export {

    updateHeader, toggleNavbar
};