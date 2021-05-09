$(() => {

    // MOUSE FOLLOWING TOOLTIP
    // This one is badly coded, i know, it wasn't that bad before,
    // but changes in html document and maybe some positionings caused
    // it to behave abnormally, so it was fixed this way.
    const tooltip = $('#tt-follower');
    tooltip.parent().on("mousemove", e => {

        const tt_parent = tooltip.parent();
        const parentPos = $(tt_parent).position();
        const maxH = tt_parent.height(), maxW = tt_parent.width();
        
        let top = e.pageY - parentPos.top;
        let left = e.pageX - parentPos.left;

        const topChk = top - maxH - 7;
        const leftChk = left - 90;

        if(topChk < 0 || topChk > maxH || leftChk < 0 || leftChk > maxW)
            return;

        tooltip.css({

            top: top + 'px',
            left: left + 'px',
        });
    });


    // MODALS [POP-UPS]
    const buttons = $('.popup-btn');
    buttons.on('click', e => {

        const popupType = e.target.dataset.popupType;
        const popup = $(`#${popupType}`);
        let popupBox = popup.find('.popup-box');

        let dur = 0;
        showPopup = (anim = 'popup-anim') => {

            popupBox.addClass(anim);
            popup.css('visibility', 'visible');
            setTimeout(() => popupBox.removeClass(anim), dur + 600);
        }

        if(popupType == 'notify') {

            popupBox = popup;
            popup.css('opacity', 1);
            showPopup('notify-anim');
            setTimeout(() => {
                popup.fadeTo(600, 0, () => popup.css('visibility', 'hidden'));
            }, 3000);

            return;
        }

        if(popupType == 'timed') {

            const spanTime = buttons.find('.popup-time');
            let rem = spanTime.text();
            dur = rem * 1000;
            setTimeout(showPopup, dur);
            updateTime = setInterval(() => {
                
                rem--;
                spanTime.text(rem);
                if(rem == -1) {

                    clearInterval(updateTime);
                    spanTime.text('3')
                }
            }, 1000);
        } else showPopup();

        const closeBtn = popup.find($('.close'))[0];
        popup.on('click', e => {

            if(e.target == popup[0] || e.target == closeBtn)
                popup.css('visibility', 'hidden');
        });
    });
});