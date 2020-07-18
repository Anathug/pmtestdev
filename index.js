import { MathHelper } from "./assets/scripts/utils";
import { gsap } from "gsap";
import { CustomEase } from "./assets/scripts/vendor/gsap/CustomEase"
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import  getDom  from "./assets/scripts/dom";

gsap.registerPlugin(CustomEase);


const target = document.querySelectorAll('[data-split]')
Splitting({ target: target, by: "chars" });

let currentIndex = 0;

const dom = getDom()

const gsapTimeline = [gsap.timeline(), gsap.timeline({ paused: true }), gsap.timeline({ paused: true }),gsap.timeline({ paused: true}) ]
const easings = {
    bg: CustomEase.create('bgEase', '0.78, 0.00, 0.14, 1.00'),
    text: CustomEase.create('textEase', '0.33, 0.00, 0.00, 1.00'),
    img:  CustomEase.create('imgEase', '0.63, 0.00, 0.27, 1.00'),
    textLeaving: CustomEase.create('textLeavingEase', '0.50, 0.00, 0.19, 1.00')
}

const animations = {
  home: gsapTimeline[0]
    .from(dom.content.home.img, {
      y: '90vh',
      duration: 3,
      ease: easings.bg
    },)
    .from(dom.content.home.firstRow.firstText, {
      y: 200,
      stagger: 0.05,
      duration: 1.5,
      ease: easings.text
    }, 0)
    .from(dom.content.home.firstRow.secondText, {
      y: 200,
      stagger: 0.05,
      duration: 1.5,
      ease: easings.text
    }, 0.3)
    .from(dom.content.home.secondRow, {
      y: 200,
      stagger: 0.05,
      duration: 1,
    }, 1)
    .from(dom.content.home.firstRow.thirdText, {
      y: 200,
      stagger: 0.05,
      duration: 1.5,
      ease: easings.text
    },1),
  section1: gsapTimeline[1]
    .from(dom.content.section1.bgImgContainer, {
      y: '100vh',
      duration: 2.5,
      scale: 1.5,
      rotation: -30,
      x: '20vw',
      ease: easings.bg
    })
    .from(dom.content.section1.bgImg, {
      duration: 2.5,
      scale: 1.5,
      rotation: -30,
      ease: easings.bg
    }, 0.2)
    .from(dom.content.section1.text, {
      x: 100,
      y: 400,
      skewX: 50,
      skewY:50,
      stagger: 0.1,
      opacity: 0,
      duration: 3,
      ease: easings.text
    }, 0.6)
    .from(
      dom.content.section1.img,
      {
        y: 1000,
        duration: 2,
        ease: easings.img
      },
      0.7
    ),
  section1Leaving: gsapTimeline[2]
      .to(dom.content.section1.text, {
      x: 100,
      y: -400,
      skewX: 50,
      skewY:50,
      stagger: -0.1,
      opacity: 0,
      duration: 4,
      ease: easings.text
    })
  .to(dom.content.section1.bgImg, {
      scale: 2,
      rotation: -80,
      ease: easings.bg,
      duration: 3
    }, 0.5)
    .to(
      dom.content.section1.img,
      {
        y: -1000,
        duration: 2,
        ease: easings.img
      },
      0.1
    ),
    section2: gsapTimeline[3]
    .from(dom.content.section2.bgImgContainer, {
      y: '120vh',
      duration: 2,
      rotation: -40,
      ease: easings.bg,
      delay: 1
    })
    .from(dom.content.section2.bgImg, {
      duration: 3,
      rotation: 40,
      ease: easings.bg
    }, 0.8)
    .from(dom.content.section2.text, {
      x: 100,
      y: 400,
      skewX: 50,
      skewY:50,
      stagger: 0.1,
      opacity: 0,
      duration: 3,
      ease: easings.text
    }, 0.6)
    .from(
      dom.content.section2.img,
      {
        y: 1000,
        duration: 2,
        ease: easings.img
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
    animations.section1.reverse();
  }
  if (currentIndex == 1) {
    animations.section1.restart();
    animations.section2.reverse();
  }
  if (currentIndex == 2) {
      if(animations.section1Leaving.progress() === 0) {
        animations.section1Leaving.restart()
      }
    animations.section2.play()
  }
  window.removeEventListener("mousewheel", handleWheel);
  setTimeout(() => {
    window.addEventListener("mousewheel", handleWheel);
  }, 2000);
};

window.addEventListener("mousewheel", handleWheel);
