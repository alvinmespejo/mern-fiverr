import React from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.scss"

const Slide = ({ children, speed, slidesToShow, slidesToScroll }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed,
		slidesToShow,
		slidesToScroll,
	};

	return (
		<div className="slide">
			<div className="container">
				<Slider {...settings}>
					{children}
				</Slider>
			</div>
		</div>
	)
}

export default Slide;