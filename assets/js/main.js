(function ($) {
  ("use strict");
  /*
|--------------------------------------------------------------------------
| Template Name: Constr
| Author: Thememarch
| Version: 1.0.0
|--------------------------------------------------------------------------
|--------------------------------------------------------------------------
| TABLE OF CONTENTS:
|--------------------------------------------------------------------------
| 01. Scripts Initialization
| 02. Preloader
| 03. Mobile Menu
| 04. Sticky Header
| 05. Dynamic Background
| 06. Swiper Slider
| 07. Modal Video
| 08. Accordian
| 09. Scroll Up
| 10. Register GSAP
| 11. Config GSAP
| 12. Funfact Counter
| 13. Reveal Image Animation
| 14. Text Animation
| 15. Text Animation Secondary
| 16. Image Scrolling Parallax
| 17. Card Hover Animation
| 18. Sticky Section
| 19. Coming
| 20. Light Gallery
| 21. Masonary
| 22. Skill Bar
/*--------------------------------------------------------------
  01 Scripts 1nitialization
--------------------------------------------------------------*/
$.exists = function (selector) {
  return $(selector).length > 0;
};

$(function () {
  $(window).trigger("resize");
  preloader();
  mainNav();
  stickyHeader();
  dynamicBackground();
  swiperInit();
  modalVideo();
  scrollUp();
  smoothParallax();
  headingTitleAnim();
  skillBar();
});

$(window).on("scroll", function () {
  updateParallax();
  showScrollUp();
  Sticky_sec();
});

window.addEventListener("load", function () {
  const preloader = document.querySelector("#constr-preloader");
  if (preloader) {
    preloader.style.display = "none";
  }

  if (typeof AOS !== "undefined") {
    AOS.init({
      offset: -350,
      delay: 0,
      easing: "ease",
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
    AOS.refresh();
  }
});


  /*-------------------------------------------------
  02. Preloader  
 --------------------------------------------------------------*/
  function preloader() {
    $(window).on("load", function () {
      const preloader = $("#constr-preloader");
      const content = $(".your-content-selector");

      content.css({ opacity: 0, display: "none" });

      const tl = gsap.timeline({
        onComplete: function () {
          preloader.delay(800).css({ visibility: "hidden", display: "none" });

          content.css({ display: "block" });
        },
      });

      tl.to(".constr-rect", {
        y: -10,
        opacity: 1,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power1.inOut",
      });

      tl.addLabel("fadeOut", ">")
        .to(preloader, { opacity: 0, duration: 0.8 }, "fadeOut")
        .to(preloader, { visibility: "hidden", duration: 0 }, "fadeOut")

        .to(
          content,
          { opacity: 1, y: 0, duration: 1, ease: "expo.inOut" },
          "fadeOut"
        );

      setTimeout(() => {
        tl.play();
      }, 500);
    });
  }

  /*-------------------------------------------------
    03. Mobile Menu
 --------------------------------------------------------------*/
  function mainNav() {
    $(".cs_nav").append('<span class="cs_munu_toggle"><span></span></span>');

    $(".menu-item-has-children").each(function () {
      if ($(this).find(".cs_munu_dropdown_toggle").length === 0) {
        $(this).append('<span class="cs_munu_dropdown_toggle"></span>');
      }
    });

    $(document).on("click", ".cs_munu_toggle", function () {
      $(this)
        .toggleClass("cs_toggle_active")
        .siblings(".cs_nav_list")
        .slideToggle();
    });

    // Side Nav
    $(document).on("click", ".cs_icon_btn", function () {
      $(".cs_side_header").addClass("active");
    });

    $(document).on("click", ".cs_close, .cs_side_header_overlay", function () {
      $(".cs_side_header").removeClass("active");
    });
  }

  document
    .querySelectorAll(".menu-item-has-children")
    .forEach(function (menuItem) {
      menuItem.addEventListener("click", function () {
        document
          .querySelectorAll(".menu-item-has-children")
          .forEach(function (item) {
            if (item !== menuItem) {
              item.classList.remove("active");
            }
          });
        this.classList.toggle("active");
      });
    });
  /*--------------------------------------------------------------
  04. Sticky Header
--------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $(".cs_sticky_header");
    var headerHeight = $header.outerHeight() + 30;

    $window.on("scroll", function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass("cs_gescout_sticky");
      } else {
        $header.removeClass("cs_gescout_sticky cs_gescout_show");
      }

      if ($header.hasClass("cs_gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          $header.addClass("cs_gescout_show");
        } else {
          $header.removeClass("cs_gescout_show");
        }
      }

      lastScrollTop = windowTop;
    });
  }
  /*--------------------------------------------------------------
  05. Dynamic Background
-------------------------------------------------------------*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }
  /*--------------------------------------------------------------    
  06. Swiper Slider
 --------------------------------------------------------------*/
  function swiperInit() {
    if ($(".hero-slider").length) {
      const heroSliderSwiper = new Swiper(".hero-slider", {
        speed: 1000,
        loop: true,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".hero-swiper-button-next",
          prevEl: ".hero-swiper-button-prev",
        },
        on: {
          init: function () {
            animateSlide(document.querySelector(".swiper-slide-active"));
          },
          slideChangeTransitionStart: function () {
            gsap.set(".swiper-slide .constr-splite", { clearProps: "all" });
            gsap.set(".swiper-slide .hero-subtitle", { clearProps: "all" });
            gsap.set(".swiper-slide .hero-backdrop-text", { clearProps: "all" });
    
            animateSlide(document.querySelector(".swiper-slide-active"));
          },
        },
      });
    
      function animateSlide(activeSlide) {
        if (!activeSlide) return;
    
        const activeSlideContent = activeSlide.querySelector(".constr-splite");
        const activeSlideContentBack = activeSlide.querySelector(".hero-backdrop-text");
        const activeSlideContentSecond = activeSlide.querySelector(".hero-second-splite");
        const activeSlideSubtitle = activeSlide.querySelector(".hero-subtitle");
        const activeButtons = activeSlide.querySelectorAll(".cs-couple-btn");
    
        if (activeSlideContent) {
          const childSplit = new SplitText(activeSlideContent, { type: "lines, words", wordsClass: "split-child" });
          const parentSplit = new SplitText(activeSlideContent, { linesClass: "split-parent" });
    
          gsap.from(childSplit.words, {
            duration: 0.8,
            yPercent: 50,
            rotation: 10,
            opacity: 0,
            ease: "power4.out",
            stagger: 0.05,
          });
        }
    
        if (activeSlideContentBack) {
          const childSplitBack = new SplitText(activeSlideContentBack, { type: "lines, words", wordsClass: "split-child" });
          const parentSplitBack = new SplitText(activeSlideContentBack, { linesClass: "split-parent" });
    
          gsap.from(childSplitBack.words, {
            duration: 1.1,
            opacity: 0,
            y: 100,
            ease: "power3.out",
          });
        }
    
        if (activeSlideContentSecond) {
          const childSplitSecond = new SplitText(activeSlideContentSecond, { type: "lines, words", wordsClass: "split-child" });
          const parentSplitSecond = new SplitText(activeSlideContentSecond, { linesClass: "split-parent" });
    
          gsap.from(childSplitSecond.words, {
            duration: 1.5,
            opacity: 0,
            y: 100,
            ease: "power3.out",
          });
        }
    
        if (activeSlideSubtitle) {
          gsap.from(activeSlideSubtitle, {
            duration: 1,
            opacity: 0,
            y: 100,
            scale: 1.2,
            ease: "power3.out",
          });
        }
    
        if (activeButtons.length) {
          gsap.from(activeButtons, {
            duration: 0.8,
            x: 300,
            opacity: 0,
            scale: 1.5,
            ease: "power4.out",
            stagger: 0.2,
          });
        }
      }
    }
    
    // Common Slider
    if ($(".common-slider").length) {
      var projectSliderSwiper = new Swiper(".common-slider", {
        effect: "fade",
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
        },
        navigation: {
          nextEl: ".cs-ps-swiper-btn-next",
          prevEl: ".cs-ps-swiper-btn-prev",
        },
      });
    }

    // TimeLine Slider
    if ($(".timeline-slider").length) {
      var projectSliderSwiper = new Swiper(".timeline-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        pagination: {
          el: ".timeline-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            const dates = [
              "1996",
              "2000",
              "2004",
              "2008",
              "2012",
              "2016",
              "2020",
              "2024",
            ];
            return `<span class="${className}"><span>${dates[index]}</span></span>`;
          },
        },
        on: {
          slideChange: function () {
            const progress =
              ((this.activeIndex + 1) / this.slides.length) * 100;
            document.querySelector(
              ".timeline-progress-bar"
            ).style.width = `${progress}%`;
          },
        },
      });
    }

    // Timeline estática — página Sobre (qc-about)
    var $qcTimeline = $("[data-qc-timeline]");
    if ($qcTimeline.length) {
      var $qcNodes = $qcTimeline.find(".qc-about-timeline__node");
      var $qcBar = $qcTimeline.find("[data-qc-progress]");
      var total = $qcNodes.length;
      $qcNodes.on("click", function () {
        var idx = $qcNodes.index(this);
        $qcNodes.removeClass("is-active").attr("aria-pressed", "false");
        $(this).addClass("is-active").attr("aria-pressed", "true");
        if ($qcBar.length && total > 0) {
          $qcBar.css("width", ((idx + 1) / total) * 100 + "%");
        }
      });
    }

    if ($(".home1-testi-slider1").length) {
      const testiSliderSwiper = new Swiper(".home1-testi-slider1", {
        speed: 1000,
        parallax: true,
        loop: true,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: ".testi-pagination",
          clickable: true,
        },
        on: {
          slideChangeTransitionStart: function () {

            gsap.set(".swiper-slide .testi-content", { clearProps: "all" });
            gsap.set(".swiper-slide .testi-user", {
              clearProps: "all",
            });
            gsap.set(".swiper-slide .testi-user img", {
              clearProps: "all",
            });

            const activeSlideContentBack = document.querySelector(
              ".swiper-slide-active .testi-user"
            );
            const activeSlideContentSecond = document.querySelector(
              ".swiper-slide-active .testi-user img"
            );
            const activeSlideMainText = document.querySelector(
              ".swiper-slide-active .testi-content"
            );
            const activeButtons = document.querySelectorAll(
              ".swiper-slide-active .testi-user img"
            );

            if (activeSlideContentBack) {
              const childSplitBack = new SplitText(activeSlideContentBack, {
                type: "lines, words",
                wordsClass: "split-child",
              });
              const parentSplitBack = new SplitText(activeSlideContentBack, {
                linesClass: "split-parent",
              });

              gsap.from(childSplitBack.words, {
                duration: 1.1,
                opacity: 0,
                y: 100,
                ease: "power3.out",
              });
            }
            if (activeSlideContentSecond) {
              const childSplitSecond = new SplitText(activeSlideContentSecond, {
                type: "lines, words",
                wordsClass: "split-child",
              });
              const parentSplitSecond = new SplitText(
                activeSlideContentSecond,
                {
                  linesClass: "split-parent",
                }
              );

              gsap.from(childSplitSecond.words, {
                duration: 1.5,
                opacity: 0,
                y: 100,
                ease: "power3.out",
              });
            }

            if (activeSlideMainText) {
              gsap.from(activeSlideMainText, {
                duration: 1,
                opacity: 0,
                y: 100,
                scale: 1.2,
                ease: "power3.out",
              });
            }

            if (activeButtons.length) {
              gsap.from(activeButtons, {
                duration: 0.8,
                x: 300,
                opacity: 0,
                scale: 1.5,
                ease: "power4.out",
                stagger: 0.2,
              });
            }
          },
        },
      });
    }

    // Services Slider
    if ($(".service-slider").length) {
      var servicesslider = new Swiper(".service-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".srv-swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          576: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
      });
    }

    // Client Slider
    if ($(".clients-slider").length) {
      var clientslider = new Swiper(".clients-slider", {
        slidesPerView: 5,
        spaceBetween: 30,
        breakpoints: {
          1200: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
      });
    }
  }

  /*--------------------------------------------------------------
   07. Modal Video
--------------------------------------------------------------*/
  function modalVideo() {
    $(document).on("click", ".cs_video_open", function (e) {
      e.preventDefault();
      var video = $(this).attr("href");
      video = video.split("?v=")[1].trim();
      $(".cs_video_popup_container iframe").attr(
        "src",
        `https://www.youtube.com/embed/${video}`
      );
      $(".cs_video_popup").addClass("active");
    });
    $(document).on(
      "click",
      ".cs_video_popup_close, .cs_video_popup_layer",
      function (e) {
        $(".cs_video_popup").removeClass("active");
        $("html").removeClass("overflow-hidden");
        $(".cs_video_popup_container iframe").attr("src", "about:blank");
        e.preventDefault();
      }
    );
  }
  /*--------------------------------------------------------------
  08. Accordian    
--------------------------------------------------------------*/
  $(document).on("DOMContentLoaded", function () {
    $(".cs_accordian .cs_accordian_body").hide();
    $(document).on("click", ".cs_accordian .cs_accordian_header", function () {
      var $accordianItem = $(this).parent();

      $accordianItem.siblings().find(".cs_accordian_body").slideUp();
      $accordianItem
        .siblings()
        .find(".cs_accordian_header")
        .removeClass("active cs_icon");

      $(this).toggleClass("active cs_icon");
      $(this).next(".cs_accordian_body").slideToggle();
    });
  });
  /*--------------------------------------------------------------
  09. Scroll Up
--------------------------------------------------------------*/
  function scrollUp() {
    $(document).on("click", ".cs_scrollup", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 0);
    });
  }
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $(".cs_scrollup").addClass("cs_scrollup_show");
    } else {
      $(".cs_scrollup").removeClass("cs_scrollup_show");
    }
  }

  /*--------------------------------------------------------------
  10. Register GSAP
--------------------------------------------------------------*/

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /*--------------------------------------------------------------
 11. Config GSAP
 --------------------------------------------------------------*/
  gsap.config({
    nullTargetWarn: false,
  });

  /*--------------------------------------------------------------
  12. Funfact Counting Animation
 --------------------------------------------------------------*/
  const count_number = gsap.utils.toArray(".cs_funfact");
  const count_id = gsap.utils.toArray(".amin_auto_count");

  if (count_number) {
    count_id.forEach((num) => {
      gsap.from(num, {
        scrollTrigger: {
          trigger: num,
          start: "top center+=200",
          markers: false,
        },
        delay: 0,
        innerText: 0,
        duration: 3,
        snap: {
          innerText: 1,
        },
        onUpdate: function () {
          num.innerText = Math.floor(num.innerText);
        },
      });
    });

    gsap.from(count_number, {
      scrollTrigger: {
        trigger: count_number,
        start: "top center+=200",
        markers: false,
      },
      duration: 0.5,
      scale: 0.1,
      opacity: 0,
      delay: 0,
      stagger: 0.1,
      ease: "elastic",
      force3D: true,
    });
  }

  /*--------------------------------------------------------------
    13. Reveal Image Animation
  --------------------------------------------------------------*/
  $(".animate-img-wrap").each(function () {
    const revealWrap = $(this);
    const reveal = revealWrap.find(".reveal");
    const animatedImage = revealWrap.find(".the-animated-image");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: revealWrap[0],

        toggleActions: "play none none none",
      },
    });
  
    tl.to(reveal, {
      x: "100%",
      duration: 0.5,
      ease: "expoScale(0.5,7,none)",

    }).from(animatedImage, {
      scale: 1.2,
      duration: 0.5,
      ease: "expoScale(0.5,7,none)",
    }, "-=0.7");
  });
  
  /*--------------------------------------------------------------
    14. Text Animation Style One
  --------------------------------------------------------------*/
  function headingTitleAnim() {
    if ($.exists(".cs-heading-with-animation")) {
      const titles = document.querySelectorAll(".cs-heading-with-animation");
  
      titles.forEach((title) => {
        let delay_value = +title.getAttribute("data-delay") || 0;
        let duration_value = +title.getAttribute("data-duration") || 0.4;
        const words = title.querySelectorAll(".cs-heading");
  
        const anim = gsap.timeline({
          delay: delay_value,
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
            toggleActions: "play none none none",
            markers: false
          }
        });
  
        words.forEach((word, wordIndex) => {
          const split = new SplitText(word, { type: "chars, words" });
  
          const wordDelay = wordIndex * 0.15;
  
          split.chars.forEach((char, charIndex) => {
            anim.fromTo(char, 
              { opacity: 0, translateY: "100%" }, 
              { opacity: 1, translateY: "0%", duration: duration_value, ease: "power2.out" }, 
              charIndex * 0.009 + wordDelay
            );
          });
        });
      });
    }
  }
  /*--------------------------------------------------------------
   15. Text Animation Secondary
 --------------------------------------------------------------*/
  gsap.fromTo(
    ".ae-title h2",
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".ae-title",
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none none",
      },
      onComplete: () => {
        gsap.to(".ae-title h2", {
          duration: 0.2,
          repeat: -1,
          repeatDelay: 0.5,
          yoyo: true,
        });
      },
    }
  );
  
  /*--------------------------------------------------------------
  16. Image Scrolling Parallax
--------------------------------------------------------------*/
function updateParallax() {
    var $parallax = $('.background-parallax');
    var $image = $('.parallax-image img');
    var windowWidth = $(window).width();

    if (windowWidth <= 1024) return; // Disable parallax for smaller screens
    if ($parallax.length === 0 || $image.length === 0) return;

    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    $parallax.each(function () {
        var $this = $(this);
        var offset = $this.offset().top;
        var height = $this.outerHeight();

        if (scroll + windowHeight > offset && scroll < offset + height) {
            var translate = (scroll - offset) * 0.3;
            $this.find('.parallax-image').css('transform', 'translateY(' + translate + 'px)');
        }
    });

    var imgWidth = $image.width();
    var imgHeight = $image.height();
    
    if ((windowWidth / windowHeight) > (imgWidth / imgHeight)) {
        $image.addClass('too-wide').removeClass('too-tall');
    } else {
        $image.addClass('too-tall').removeClass('too-wide');
    }
  }

  function smoothParallax() {
    requestAnimationFrame(updateParallax);
  }

  $(window).on('scroll resize', smoothParallax);
  /*--------------------------------------------------------------
  17. Card Hover Animation
  --------------------------------------------------------------*/
  (function () {
    document.querySelectorAll('.cs-hover-card-anim').forEach((hoverCard) => {
      let magic = hoverCard.querySelector('.magic');
      if (!magic) return;
  
      hoverCard.addEventListener('mousemove', function (e) {
        let rect = hoverCard.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
  
        magic.style.left = `${x - magic.offsetWidth / 2}px`;
        magic.style.top = `${y - magic.offsetHeight / 2}px`;
      });
  
      hoverCard.addEventListener('mouseout', function () {
        magic.style.left = '0%';
        magic.style.top = '0%';
      });
    });
  })();
  
  /*--------------------------------------------------------------
  18. Sticky Section
  --------------------------------------------------------------*/
  $(document).on("ready", function () {
    $(window).on("scroll.Sticky_sec resize.Sticky_sec", Sticky_sec);
    Sticky_sec();
});

function Sticky_sec() {
    const mq = window.matchMedia ? window.matchMedia("(min-width: 1400px)") : null;
    const rightChild = $(".sticky-box-child");
    const stickyWrap = $(".stickysec-wrap");
    const scrollingContent = $(".scolling-content");

    if (!rightChild.length || !stickyWrap.length || !scrollingContent.length) {
        return;
    }

    rightChild.removeClass("sticky-section absolute-position fixed-position");

    if (mq && mq.matches) {
        rightChild.addClass("sticky-section");

        const scroll = $(window).scrollTop();
        const topContent = stickyWrap.offset().top - 25;
        const sectionHeight = scrollingContent.outerHeight();
        const rightHeight = rightChild.outerHeight();
        const bottomContent = topContent + sectionHeight - rightHeight - 45;

        if (scroll > topContent && scroll < bottomContent) {
            rightChild
                .removeClass("absolute-position")
                .addClass("fixed-position")
                .css({ top: "25px", bottom: "auto" });
        } else if (scroll >= bottomContent) {
            rightChild
                .removeClass("fixed-position")
                .addClass("absolute-position")
                .css({ top: "auto", bottom: "45px" });
        } else {
            rightChild.removeClass("fixed-position absolute-position").css({ top: "auto", bottom: "auto" });
        }
    } else {
        rightChild.removeClass("sticky-section absolute-position fixed-position").css({ top: "auto", bottom: "auto" });
    }
}

/*--------------------------------------------------------------
     19. Comming Soon Counter
--------------------------------------------------------------*/
    if ($.exists("#comming-section")) {
      commingSoon();

      function commingSoon() {
        const targetDate = new Date("2025-08-31T00:00:00").getTime();

        function updateCountdown() {
          const currentDate = new Date().getTime();
          const timeRemaining = targetDate - currentDate;

          if (timeRemaining <= 0) {
            document.getElementById("countdown").textContent =
              "The event is here!";
            clearInterval(interval);
            return 0;
          } else {
            const months = Math.floor(
              timeRemaining / (1000 * 60 * 60 * 24 * 30.44)
            );
            const days = Math.floor(
              (timeRemaining % (1000 * 60 * 60 * 24 * 30.44)) /
                (1000 * 60 * 60 * 24)
            );
            const hours = Math.floor(
              (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            document.getElementById("months").textContent = `${months}`;
            document.getElementById("days").textContent = `${days}`;
            document.getElementById("hours").textContent = `${hours}`;
            document.getElementById("minutes").textContent = `${minutes}`;
            document.getElementById("secound").textContent = `${seconds}`;
          }
        }

        const interval = setInterval(updateCountdown, 1000);

        // Initial call to set the countdown value
        updateCountdown();
      }
    }
    /*--------------------------------------------------------------
     20. Light Gallery
--------------------------------------------------------------*/
  if ($.exists("#static-thumbnails")) {
    const galleryDiv = document.getElementById("static-thumbnails");
    lightGallery(galleryDiv, {
      selector: ".item a",
      addClass: "lg-custom-thumbnails",
      animateThumb: true,
      zoomFromOrigin: true,
      allowMediaOverlap: true,
      toggleThumb: true,
    });
  }

/*--------------------------------------------------------------
  21. Masonary
--------------------------------------------------------------*/
$(document).on("DOMContentLoaded", function () {
  if ($.fn.masonry && $(".blog-grid").length) {
      $(".blog-grid").masonry({
          itemSelector: ".masonry-item",
          columnWidth: ".grid-sizer",
          percentPosition: true,
          gutter: 30
      });
  }
});


/*--------------------------------------------------------------
  22. Skill Bar
--------------------------------------------------------------*/
function skillBar() {
  if (document.querySelectorAll(".cs-skill-fill").length > 0) {
    const skillBars = document.querySelectorAll(".cs-skill-fill");

    skillBars.forEach((skillBar) => {
      const percentage = skillBar.dataset.percentage;

      gsap.to(skillBar, {
        width: `${percentage}%`,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: skillBar,
          start: "top 80%",
        },
      });
    });
  }
}

  

})(jQuery);
