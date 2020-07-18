import { MathHelper } from "./utils";
import { gsap, Power4 } from "gsap";
import { CustomEase } from "./assets/scripts/vendor/gsap/CustomEase"
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

gsap.registerPlugin(CustomEase);

const target = document.querySelectorAll(
  ".home__first-row__first-text-wrapper__splitting-1, .home__first-row__first-text-wrapper__splitting-2, .home__second-row__first-text-wrapper__splitting, .slide-1__container__content-wrapper__text-wrapper__splitting, .slide-2__container__content-wrapper__text-wrapper__splitting"
);
const results = Splitting({ target: target, by: "chars" });

let currentIndex = 0;
let dom = {
  content: {
    home: {
      section: document.querySelector(".home"),
      firstRow: {
        firstText: document.querySelectorAll(
          ".home__first-row__first-text-wrapper__splitting-1 .char"
        ),
        secondText: document.querySelectorAll(
          ".home__first-row__first-text-wrapper__splitting-2 .char"
        ),
      },
      secondRow: document.querySelectorAll(
        ".home__second-row__first-text-wrapper__splitting .char"
      ),
      img: document.querySelector(".home__background-image img"),
    },
    section1: {
      section: document.querySelector(".slide-1"),
      text: document.querySelectorAll(
        ".slide-1__container__content-wrapper__text-wrapper__splitting .char"
      ),
      bgImg: document.querySelector(".slide-1__container img"),
      img: document.querySelector(
        ".slide-1__container__content-wrapper__image img"
      ),
    },
    section2: {
      section: document.querySelector(".slide-2"),
       text: document.querySelectorAll(
        ".slide-2__container__content-wrapper__text-wrapper__splitting .char"
      ),
      bgImg: document.querySelector(".slide-2__container img"),
      img: document.querySelector(
        ".slide-2__container__content-wrapper__image img"
      ),
    },
  },
};

let homeTl = gsap.timeline();
let section1Tl = gsap.timeline({ paused: true });
let section1TlLeaving = gsap.timeline({ paused: true });
let section2Tl = gsap.timeline({ paused: true, delay: 1 });


const bgEase = CustomEase.create('bgEase', '0.78, 0.00, 0.14, 1.00');
const textEase = CustomEase.create('textEase', '0.33, 0.00, 0.00, 1.00')
const imgEase = CustomEase.create('imgEase', '0.63, 0.00, 0.27, 1.00')

let animations = {
  home: homeTl
    .from(dom.content.home.firstRow.firstText, {
      y: 200,
      stagger: 0.05,
      duration: 1,
    })
    .from(dom.content.home.firstRow.secondText, {
      y: 200,
      stagger: 0.05,
      duration: 1,
      delay: -0.7,
    })
    .from(dom.content.home.secondRow, {
      y: 200,
      stagger: 0.05,
      duration: 1,
      delay: -0.7,
    }),
  section1: section1Tl
    .from(dom.content.section1.bgImg, {
      y: '250vh',
      duration: 2,
      scale: 1.5,
      rotation: -80,
      x: 600,
      ease: bgEase
    })
    .from(dom.content.section1.text, {
      x: 100,
      y: 400,
      skewX: 50,
      skewY:50,
      stagger: 0.1,
      opacity: 0,
      duration: 3,
      ease: textEase
    }, 0.6)
    .from(
      dom.content.section1.img,
      {
        y: 1000,
        duration: 2,
        ease: imgEase
      },
      0.7
    ),
  section1Leaving: section1TlLeaving
      .to(dom.content.section1.text, {
      x: 100,
      y: -400,
      skewX: 50,
      skewY:50,
      stagger: -0.1,
      opacity: 0,
      duration: 3,
      ease: textEase
    })
  .to(dom.content.section1.bgImg, {
      scale: 1.5,
      rotation: -80,
      ease: bgEase,
      duration: 2
    }, 0.6)
    .to(
      dom.content.section1.img,
      {
        y: -1000,
        duration: 2,
        ease: imgEase
      },
      0.6
    ),
    section2: section2Tl
      .from(dom.content.section2.bgImg, {
      y: '250vh',
      duration: 2,
      scale: 1.5,
      rotation: -30,
      x: 600,
      ease: bgEase
    })
    .from(dom.content.section2.text, {
      x: 100,
      y: 400,
      skewX: 50,
      skewY:50,
      stagger: 0.1,
      opacity: 0,
      duration: 3,
      ease: textEase
    }, 0.6)
    .from(
      dom.content.section2.img,
      {
        y: 1000,
        duration: 2,
        ease: imgEase
      },
      0.7
    ),
};

const handleWheel = (e) => {
  switch (true) {
    case e.deltaY > 0:
      currentIndex++;
      currentIndex = MathHelper.clamp(currentIndex, 0, 2);
      break;
    case e.deltaY < 0:
      currentIndex--;
      currentIndex = MathHelper.clamp(currentIndex, 0, 2);

      break;
    default:
      console.log("error");
  }
  if (currentIndex == 0) {
    animations.home.play();
    animations.section1.reverse();
  }
  if (currentIndex == 1) {
    animations.section1.restart();
    animations.section2.reverse();
  }
  if (currentIndex == 2) {
    animations.section1Leaving.restart()
    animations.section2.play();
  }
  window.removeEventListener("mousewheel", handleWheel);
  setTimeout(() => {
    window.addEventListener("mousewheel", handleWheel);
  }, 1000);
};

window.addEventListener("mousewheel", handleWheel);
