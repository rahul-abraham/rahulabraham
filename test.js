// Define the outerHTML content once
var updatedOuterHTML = `
    <div class="sc-banner-slider">
        saasdasdasd sdasdasd
    </div>
`;

// Your existing code

var offerExpirationTime = localStorage.getItem("offerExpirationTime");
var display = false;
let timeNow = new Date();

if (offerExpirationTime) {
    if (Number(offerExpirationTime) > timeNow.getTime()) {
        localStorage.setItem("offerExpirationTime", new Date().setDate(new Date().getDate() + 7));
        display = true;
        console.log("if", new Date(Number(localStorage.getItem("offerExpirationTime"))));
    } else {
        localStorage.removeItem("offerExpirationTime");
        console.log("reset done");
    }
} else {
    localStorage.setItem("offerExpirationTime", new Date().setDate(new Date().getDate() + 7));
    display = true;
    console.log("(offerExpirationTime)", new Date(Number(localStorage.getItem("offerExpirationTime"))));
}

if (display) {

    Flickerlessly = window.Flickerlessly || {};
    !function (A) {
        "use strict";
        var init = function (id, sel, callback, persist) {
            var animationName = 'atNodeInserted' + id;
            var cssStr = '@keyframes ' + animationName + ' {from {opacity:0.99} to {opacity:1} }\n';
            cssStr += sel + '{animation-duration:0.001s;animation-name:' + animationName + ';visibility:hidden}';
            var head = document.getElementsByTagName("head")[0];
            if (head) {
                var style = document.createElement("style");
                style.setAttribute("type", "text/css");
                if (style.styleSheet)
                    style.styleSheet.cssText = cssStr;
                else
                    style.appendChild(document.createTextNode(cssStr));
                head.insertBefore(style, head.firstChild);
            };
            var _insertListener = function (event) {
                if (event.animationName === animationName && typeof event.target === 'object') {
                    var isExecute = ((persist === true) || (persist === false && event.target.getAttribute('data-flk-success') === null)) ? true : false;
                    if (console && console.info) console.info("Node " + sel + " ready! Execute: " + isExecute, event.target);
                    if (typeof callback === 'function' && isExecute) {
                        callback(event.target);
                        event.target.setAttribute('data-flk-success', animationName);
                    }
                    event.target.style.visibility = 'visible';
                }
            };
            ['animationstart', 'MSAnimationStart', 'webkitAnimationStart'].forEach(function (item, index) {
                document.addEventListener(item, _insertListener, false);
            });
        };
        A.onReady = function () {
            for (var i = 0; i < arguments.length; i++) {
                var obj = arguments[i];
                var selector = obj.selector;
                var success = obj.success || null;
                var persist = obj.persist || false;
                var rand = Math.floor((Math.random() * 100) + 1);
                init(rand, selector, success, persist);
            };
        };
    }(Flickerlessly);

    Flickerlessly.onReady(
        {
            selector: "#sc-lb-module-masthead-slider",
            persist: true,
            success: function (el) {
                el.style.opacity = "0 !important";
                el.style.height = "0px";
                if (!el.classList.contains("updatedCode")) {
                    try {
                        el.outerHTML = updatedOuterHTML;
                        document.querySelector(".sc-banner-slider .sc-inline-buttons a").addEventListener("click", function (event) { 
                            event.preventDefault(); 
                            event.stopPropagation(); 
                            window.open(applyNowURL); 
                            adobe.target.trackEvent({ 
                                "mbox": "mboxClickTrack", 
                                "params": { 
                                    "clicked": "applyNow" 
                                } 
                            }); 
                        });

                    } catch (e) { }
                    el.classList.add("updatedCode");
                }
            }
        }
    );
}

// New code specifically for the URL: https://www.sc.com/sg/borrow/loans/cashone/
if (window.location.href === "https://www.sc.com/sg/borrow/loans/cashone/") {
    var element = document.querySelector("#sc-lb-module-masthead-slider");
    if (element) {
        try {
            element.outerHTML = updatedOuterHTML;
            // Add event listener or any other code specific to this URL
            document.querySelector(".sc-banner-slider .sc-inline-buttons a").addEventListener("click", function (event) { 
                event.preventDefault(); 
                event.stopPropagation(); 
                window.open(applyNowURL); 
                adobe.target.trackEvent({ 
                    "mbox": "mboxClickTrack", 
                    "params": { 
                        "clicked": "applyNow" 
                    } 
                }); 
            });
        } catch (e) {
            console.error("Error updating HTML for CashOne page:", e);
        }
    } else {
        console.log("Element with ID #sc-lb-module-masthead-slider not found on the CashOne page.");
    }
}
