/*
    author :
        @author : matthis houles
        @for : portfolio
        @started-on : 20/11/19
        @finished-on : 

    file :
        @title : main.js
        @path : /assets/js
*/


/*
    declarations & Listeners
*/
// mettre getelement dans le .onload
let header = document.getElementById('header');
header.addEventListener("mousemove", function() {
    moveBackground(event);
});


/*
    ClientScreen
        0 => screen width
        1 => screen height
*/
let ClientScreen = [ window.screen.width , 
                     window.screen.height
                    ];


// headerImg
let headerImg = document.getElementById('overflowImgContainer');



/*
    @function : moveBackground
    @params : event
    @return : none

    @brief : move the background image of the header
*/
function moveBackground(event) {

    // get client cursor position
    /*
        clientPosition
            0 => clientX
            1 => clientY
    */  
    let clientPosition = getClientPosition(event);


    // calc deg of rotation X & Y
    /*
        degXY
            0 => deg for rotateX
            1 => deg for rotateY
    */
    let degXY = [
                    50 + 10 * clientPosition[0] / (ClientScreen[0] / 2),
                    50 + 10 * clientPosition[1] / (ClientScreen[1] / 2)
                ];


    // apply transform the background
    headerImg.style.backgroundPositionX = degXY[0]+"%";

} // moveHeaderCard(event)



/*
    @function : getClientPosition
    @params : event
    @return : [positionX, positionY]

    @brief : get client's cursor positions (X & Y) by center of the screen
*/
function getClientPosition(event) {
    return [
                event.clientX - ClientScreen[0]/2, 
                event.clientY - ClientScreen[1]/2
            ];
} // getClientPosition(event)



// titles ("Matthis Houlès")
let mainTitles = document.querySelectorAll('.titleContainer')
window.addEventListener("scroll", scrollTranslateX)


/*
    @function : scrollTranslateX
    @params : void
    @return : void

    @brief : translateX the mainTitle when scrolling
*/
function scrollTranslateX() {
    if (window.pageYOffset > window.screen.width) return;

    mainTitles.forEach((Element) => {
        Element.style.transform = "translateX("+ window.pageYOffset / 10 + "%)"
    })
} //scrolTranslateX()


// navbar trigger Button
let navTriggerButton = document.getElementById("navbarTrigger");


// navbar container
let navStatment = document.getElementById("navbarContainer");


// navbar trigger icon
let navbarTIcon = document.getElementById('navbarTIcon');

/*
    navbarTrigger listeners
*/
navTriggerButton.addEventListener("click", navChangeMod);
navTriggerButton.addEventListener("blur", function() {
    navBlurMod(event);
});


/*
    @function : navChangeMod
    @params : void
    @return : void

    @brief : change status of the navbar

*/
function navChangeMod() {
    switch (navStatment.className) {
        case "NC-noDisplay":
            navStatment.className = "NC-Display";
            navbarTIcon.className = "NT-close fas fa-times"
            break;
    
        case "NC-Display":
            navStatment.className = "NC-noDisplay";
            navbarTIcon.className = "NT-open fas fa-bars"
            break;
        default : 
            navStatment.className = "NC-Display";
            navbarTIcon.className = "NT-close fas fa-times"
            break;
    }
} // navChangeMod()


/*
    @function : navBlurMod
    @params : void
    @return : void

    @brief : change status of the navbar (blur)
*/
function navBlurMod(event) {
    if (event.relatedTarget != undefined && event.relatedTarget.className == "navLink") {
        window.location.href = event.relatedTarget.href;
    }
    
    if(navStatment.className === "NC-Display") {
        navStatment.className = "NC-noDisplay";
        navbarTIcon.className = "NT-open fas fa-bars"
    }
    return;
} // navBlurMod()




/*
    THEMES
*/

initTheme();

/*
    display theme container
*/
document.getElementById('themeOpenTrigger').addEventListener('click', displayThemeContainer);

function displayThemeContainer() {
    if (document.getElementById('themeTriggerContainer').className == 'show') {
        document.getElementById('themeTriggerContainer').className = '';
        document.getElementById('themeContainer').className = '';
        document.getElementById('themeIcon').className = 'fas fa-cog'
    } else {
        document.getElementById('themeTriggerContainer').className = 'show';
        document.getElementById('themeContainer').className = 'show';
        document.getElementById('themeIcon').className = 'fas fa-times';
    }
}

let themeBtns = Array.from(document.querySelectorAll('.ThemeTrigger'));

themeBtns.forEach(function(themeBtn) {
    // let dataBtn = themeBtn.dataset.theme;
    themeBtn.addEventListener('click', changeThemeByBtn)
}); 


/*
    @function : initTheme
    @params : void
    @return : void

    @brief : change theme when page is loading 
*/
function initTheme() {
    let themeStorageValue = window.localStorage.getItem('Theme');
    const themeArray = ['jungleWood', 'purpleSunset', 'snowyLands', 'badLands'];

    if (themeStorageValue == 'aleatory' || !themeArray.includes(themeStorageValue)) {
        themeStorageValue = themeArray[Math.floor(Math.random() * Math.floor(themeArray.length))];
        document.getElementById('aleatory').className = 'ThemeTrigger activate';
    }

    document.getElementById('cssTheme').setAttribute('href', 'assets/css/themes/'+themeStorageValue+'.css');
    document.getElementById(themeStorageValue).className = 'ThemeTrigger activate';

} // initTheme()

/*
    @function : changeTheme
    @params : void
    @return : void

    @brief : change Theme
*/
function changeThemeByBtn() {   
    // remove activate class
    themeBtns.forEach(function(themeBtn){
        themeBtn.classList.remove('activate')
    });

    const themeArray = ['jungleWood', 'purpleSunset', 'snowyLands', 'badLands'];

    if (this.dataset.theme == 'aleatory' || !themeArray.includes(this.dataset.theme)) {
        themeStorageValue = themeArray[Math.floor(Math.random() * Math.floor(themeArray.length))];
        document.getElementById('aleatory').className = 'ThemeTrigger activate';
        document.getElementById(themeStorageValue).className = 'ThemeTrigger activate';
        document.getElementById('cssTheme').setAttribute('href', 'assets/css/themes/'+themeStorageValue+'.css');
    } else {
        document.getElementById('cssTheme').setAttribute('href', 'assets/css/themes/'+this.dataset.theme+'.css');
        document.getElementById(this.dataset.theme).className = 'ThemeTrigger activate';
    }
    
    window.localStorage.setItem('Theme', this.dataset.theme); 

    displayThemeContainer();
} // changeTheme()


