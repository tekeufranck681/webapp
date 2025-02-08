import React from "react";
import Slider from "react-slick";
import user1 from "../Homepage/img/user1.jpeg"
import user2 from "../Homepage/img/user2.jpeg"
import user3 from "../Homepage/img/user3.jpeg"
import user4 from "../Homepage/img/user4.jpeg"
import user5 from "../Homepage/img/user5.png"

const Usercarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides per view
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // Tablet view
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const testimonials = [
    {
      name: "John Doe",
      image: user1,
      rating: "★★★★★",
      comment:
        "Travel-Calc made my vacation planning so easy! I stayed within budget and even had some money left for souvenirs.",
    },
    {
      name: "Jane Smith",
      image: user2,
      rating: "★★★★☆",
      comment:
        "I love the currency conversion feature. It’s super handy when traveling abroad.",
    },
    {
      name: "Alex Brown",
      image: user3,
      rating: "★★★★★",
      comment:
        "The expense categorization tool is a game-changer. Highly recommended!",
    },
    {
      name: "Emily Davis",
      image: user4,
      rating: "★★★★★",
      comment:
        "Travel-Calc's shareable plans helped me coordinate my trip with friends seamlessly.",
    },
    {
      name: "Michael Johnson",
      image: user5,
      rating: "★★★★☆",
      comment:
        "Budget summaries are incredibly clear and easy to follow. My family trip was a success, thanks to Travel-Calc!",
    },
  ];

  return (
    <div
      className="testimonials-section"
      style={{
        padding: "50px 20px",
        textAlign: "center",
        backgroundColor: "#f0f4f8",
      }}
    >
      <h2>What Our Users Say</h2>
      <p>
        Don’t just take our word for it. Hear what our satisfied users have to
        say about Travel-Calc!
      </p>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <img
              src={testimonial.image}
              alt={`${testimonial.name}'s Avatar`}
              className="testimonial-avatar"
            />
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <div className="testimonial-stars">{testimonial.rating}</div>
            <p className="testimonial-comment">{testimonial.comment}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Usercarousel;
