export default () => {
	return {
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
					thirdText: document.querySelectorAll(
						".home__first-row__second-text-wrapper__splitting .char"
					)
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
				bgImgContainer: document.querySelector(".slide-1__container"),
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
				bgImgContainer: document.querySelector(".slide-2__container"),
				bgImg: document.querySelector(".slide-2__container img"),
				img: document.querySelector(
					".slide-2__container__content-wrapper__image img"
				),
			},
		}
	}
}