// ==UserScript==
// @name           [My] ПДД - Убрать лишние блоки
// @include        *pdd24.com/pdd-onlain*
// ==/UserScript==
        if (document.getElementById("descriptionid")) {
			document.getElementById("descriptionid")
				.setAttribute("style", "display: none;");
		}
        if (document.getElementById("commentidpanel")) {
			document.getElementById("commentidpanel")
				.setAttribute("style", "display: none;");
		}
        if (document.getElementById("formSendComment")) {
			document.getElementById("formSendComment")
				.setAttribute("style", "display: none;");
		}
        if (document.getElementById("//i.imgur.com/71MyfoV.png")) {
			document.getElementById("//i.imgur.com/71MyfoV.png")
				.setAttribute("style", "display: none;");
		}