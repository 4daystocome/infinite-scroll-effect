const menu = document.querySelector('.menu');
const items = document.querySelectorAll('.menu-item');

let clones = [];
let disableScroll = false;
let scrollHeight = 0;
let scrollpos = 0;
let clonesHeight = 0;


function getScrollPos() {
    return menu.scrollTop; //amount window scrolled
}

function setScrollPos(pos) {
    menu.scrollTop = pos;
}

function getClonesHeight() {
    clonesHeight = 0;

    clones.forEach(clone => {
        clonesHeight += clone.offsetHeight; //returns height of element
    })

    return clonesHeight;
}

//recalculate dimensions when screen is resized
function reCalc() {
    scrollpos = getScrollPos();
    //height of an elements content, including content not visible on the screen
    scrollHeight = menu.scrollHeight;
    clonesHeight = getClonesHeight();

    if(scrollpos <= 0) {
        //intitial set at 1px to enable upwards scrolling
        setScrollPos(1);
    }
}

function scrollUpdate() {
    if(!disableScroll) {
        scrollpos = getScrollPos();
        if(clonesHeight + scrollpos >= scrollHeight) {
            //scroll back to top when we reach bottom
            setScrollPos(1);
            disableScroll = true;
        } else if (scrollpos <= 0) {
            //scroll to bottom when we reach the top
            setScrollPos(scrollHeight - clonesHeight);
            disableScroll = true;
        }
    }

    if(disableScroll) {
        //disable scroll-jumoing for a short period to avoid flickering
        window.setTimeout(() => {
            disableScroll = false;
        }, 40);
    }
}

function onLoad() {
    items.forEach(item => {
        const clone = item.cloneNode(true);
        menu.appendChild(clone);
        clone.classList.add('js-clone');
    });

    clones = menu.querySelectorAll('.js-clone');

    reCalc();

    menu.addEventListener('scroll', () => {
        window.requestAnimationFrame(scrollUpdate);
    }, false);

    window.addEventListener('resize', () => {
        window.requestAnimationFrame(reCalc);
    }, false)
}

window.onload = onLoad();