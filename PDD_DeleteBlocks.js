// ==UserScript==
// @name           [My] ПДД - Убрать лишние блоки 2
// @include        *pdd24.com/pdd-onlain*
// ==/UserScript==
        document.getElementById("descriptionid").style.display='none';
        document.getElementById("commentidpanel").style.display='none';
        document.getElementById("formSendComment").style.display='none';
        document.getElementByClassName("navbar-collapse collapse").style.display='none';