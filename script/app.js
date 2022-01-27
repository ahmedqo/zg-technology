var sliderIndex = 0,
    testimonialIndex = 0,
    cardStart = true,
    timer, _timer,
    CLIENTX, TIMER, SLIDE = 0;

function animate(_target, _items) {
    const target = document.querySelector(_target);
    if (!target) return;
    const observer = new IntersectionObserver(handleIntersection, { marginTop: "160px" });

    function handleIntersection(entries, observer) {
        entries.map((entry) => {
            if (entry.isIntersecting || pageYOffset > target.offsetTop) {
                observer.unobserve(target);
                document.querySelectorAll(_items).forEach((ser, i) => {
                    setTimeout(() => {
                        ser.removeAttribute("style")
                    }, 300 * i)
                });
            }
        });
    }
    observer.observe(target);
}

function windowScrollHandler() {
    window.onscroll = () => {
        if (pageYOffset >= 100) {
            document.querySelector("#logo").classList.replace("w:64", "w:32");
            document.querySelector(".overlay").style.height = "calc(100vh - 61px)";
            document.querySelector(".overlay").style.top = "61px";
            document.querySelectorAll(".items").forEach(itm => {
                itm.style.height = "calc(100vh - 61px)";
                itm.style.top = "61px";
            });
        } else {
            document.querySelector("#logo").classList.replace("w:32", "w:64")
            document.querySelector(".overlay").style.height = "calc(100vh - 98px)";
            document.querySelector(".overlay").style.top = "98px";
            document.querySelectorAll(".items").forEach(itm => {
                itm.style.height = "calc(100vh - 98px)";
                itm.style.top = "98px";
            });
        }


        var current = "";

        document.querySelectorAll("[data-section]").forEach((section) => {
            const sectionTop = section.offsetTop - 200;
            if (pageYOffset >= sectionTop) current = "#" + section.getAttribute("id");
            if (pageYOffset === 0) current = "#home";
        });

        document.querySelectorAll(".items a").forEach((link) => {
            link.removeAttribute("active");
            if (link.getAttribute("href") === current) {
                link.setAttribute("active", "");
            }
        });
    };
}

function triggerClickHandler() {
    var expand = JSON.parse(document.querySelector(".items").getAttribute("expand"));
    document.querySelector(".trigger").setAttribute("expand", String(!expand));
    document.querySelector(".overlay").setAttribute("expand", String(!expand));
    document.querySelector(".items").setAttribute("expand", String(!expand));
}

function filterClickHandler(e) {
    document.querySelectorAll(".filter").forEach(f => f.removeAttribute("active"));
    e.target.setAttribute("active", "");
    var filter = e.target.dataset.filter;
    document.querySelectorAll("[data-product]").forEach(e => {
        e.style.display = "block";
        e.removeAttribute("hide");
        if (filter !== "all" && e.dataset.type !== filter) {
            e.setAttribute("hide", "");
            setTimeout(() => {
                e.style.display = "none";
            }, 200);
        }
    });
}

function accordionClickHandler(e) {
    var h = e.target.nextElementSibling.scrollHeight + "px";
    document.querySelectorAll("[data-faq]>div").forEach(f => {
        f.removeAttribute("style");
        f.removeAttribute("expand");
    });
    e.target.nextElementSibling.style.height = h;
    e.target.nextElementSibling.setAttribute("expand", "");
}

function linkClickHandler(e) {
    triggerClickHandler();
}

function sliderClickHandler(e, i) {
    e.preventDefault();
    sliderIndex = i;
    __sliderInit(this);
}

function sliderArrowHandler(e, s) {
    e.preventDefault();
    if (s) __sliderNext(this);
    else __sliderPrev(this);
}

function __sliderInit() {
    document.querySelectorAll(".sliderDot").forEach(e => e.removeAttribute("active"));
    document.querySelectorAll(".sliderItem").forEach(e => e.removeAttribute("active"));
    document.querySelector(".sliderContent").style.transform = `translateX(calc(100% * ${sliderIndex} * -1))`;
    document.querySelectorAll(".sliderDot")[sliderIndex].setAttribute("active", "");
    document.querySelectorAll(".sliderItem")[sliderIndex].setAttribute("active", "");
    __run();
}

function __sliderNext() {
    if (!document.querySelectorAll(".sliderDot").length) return;
    if (sliderIndex < document.querySelectorAll(".sliderDot").length - 1) {
        sliderIndex++;
        __sliderInit();
    } else {
        sliderIndex = 0;
        __sliderInit();
    }
}

function __sliderPrev() {
    if (sliderIndex > 0) {
        sliderIndex--;
        __sliderInit();
    } else {
        sliderIndex = document.querySelectorAll(".sliderDot").length - 1;
        __sliderInit();
    }
}

function formSubmitHandler(e) {
    e.preventDefault();
    var fname = document.querySelector("#fname").value,
        lname = document.querySelector("#lname").value,
        phone = document.querySelector("#phone").value,
        email = document.querySelector("#email").value,
        message = document.querySelector("#message").value;
    if (fname && lname && phone && email && message)
        Email.send({
            Host: 'smtp.mailtrap.io',
            Username: '218aa014baf95d',
            Password: '2312096ed620b5',
            To: 'ahmedqo1995@gmail.com',
            Subject: 'message from website',
            From: email,
            Body: message,
        }).then(message => {
            alert(message);
            e.target.clear();
        });
}

function testClickHandler(e, i) {
    e.preventDefault();
    testimonialIndex = i;
    __testInit();
}

function testArrowHandler(e, s) {
    e.preventDefault();
    if (s) __testNext();
    else __testPrev();
}

function __testInit() {
    document.querySelectorAll(".testimonialDot").forEach(e => e.removeAttribute("active"));
    document.querySelectorAll(".testimonialItem").forEach(e => e.removeAttribute("active"));
    document.querySelector(".testimonialContent").style.transform = `translateX(calc(100% * ${testimonialIndex} * -1))`;
    document.querySelectorAll(".testimonialDot")[testimonialIndex].setAttribute("active", "");
    document.querySelectorAll(".testimonialItem")[testimonialIndex].setAttribute("active", "");
    ___run();
}

function __testNext() {
    if (!document.querySelectorAll(".testimonialDot").length) return;
    if (testimonialIndex < document.querySelectorAll(".testimonialDot").length - 1) {
        testimonialIndex++;
        __testInit();
    } else {
        testimonialIndex = 0;
        __testInit();
    }
}

function __testPrev() {
    if (testimonialIndex > 0) {
        testimonialIndex--;
        __testInit();
    } else {
        testimonialIndex = document.querySelectorAll(".testimonialDot").length - 1;
        __testInit();
    }
}

function __run() {
    clearTimeout(timer)
    timer = setTimeout(() => {
        __sliderNext();
    }, 5000);
}

function ___run() {
    clearTimeout(_timer)
    _timer = setTimeout(() => {
        __testNext();
    }, 5000);
}

window.addEventListener("DOMContentLoaded", function() {
    __run();
    ___run();
    windowScrollHandler();
    animate("#aventage", "[data-advantage]");
    animate("#service", "[data-service]");
    animate("#project", "[data-project]");
    animate("#product", "[data-product]");
})