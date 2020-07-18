import { gsap } from "gsap";
import { CustomEase } from "./vendor/gsap/CustomEase"
gsap.registerPlugin(CustomEase);

export default {
    bg: CustomEase.create('bgEase', '0.78, 0.00, 0.14, 1.00'),
    text: CustomEase.create('textEase', '0.33, 0.00, 0.00, 1.00'),
    img:  CustomEase.create('imgEase', '0.63, 0.00, 0.27, 1.00'),
    textLeaving: CustomEase.create('textLeavingEase', '0.50, 0.00, 0.19, 1.00')
}