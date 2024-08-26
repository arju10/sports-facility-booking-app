import React from 'react';
import Slider from 'react-slick';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    feedback: 'Great facilities and an easy booking process. Highly recommend!',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    feedback:
      'Had an amazing experience. The facility was clean and well-maintained.',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    feedback:
      'Booking was smooth and the staff were very helpful. Will definitely return.',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 4,
    name: 'Emily Davis',
    feedback:
      'Fantastic experience! Everything was as described and the process was hassle-free.',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 sm:text-4xl lg:text-5xl">
          Customer Testimonials
        </h2>
        <div className="relative">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <p className="text-lg font-semibold mb-2">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.feedback}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
