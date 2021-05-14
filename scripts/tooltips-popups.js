import { tooltips, popups } from "./domElems.js";

// Mouse Following Tooltip
const updateTooltipPos = e => {

    let posLeft = e.pageX;
    if($(window).width() - e.pageX < tooltips.mouseFollower.width() / 2 + 8)
        posLeft = $(window).width() - tooltips.mouseFollower.width() / 2 - 10;    
    tooltips.mouseFollower[0].style.left = posLeft + 'px';
    tooltips.mouseFollower[0].style.top = e.pageY - 8 + 'px';
};

// Timed Popup
const firePopup = () => {
    
    const spanTime = popups.spanTime;
    let rem = spanTime.text();
    let savedTime = rem;
    let dur = rem * 1000;
    setTimeout(() => popups.timedPopup.modal('show'), dur);
    let updateTime = setInterval(() => {
        
        rem--;
        spanTime.text(rem);
        if(rem == -1) {

            clearInterval(updateTime);
            spanTime.text(savedTime);
        }
    }, 1000);
};

export {

    updateTooltipPos, firePopup
};