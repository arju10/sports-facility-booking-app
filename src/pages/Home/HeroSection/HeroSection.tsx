import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-primary text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://www.businesses-south-africa.co.za/info/categories/517/top_pic.jpg"
          alt="Hero Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-70" />
      </div>
      <div className="relative z-10 text-center px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
          Discover Your Perfect Sports Facility
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Explore top-rated facilities, book your spot, and enjoy an amazing
          experience tailored just for you. Whether you're looking for a gym,
          court, or field, we have the perfect place for you.
        </p>
        <div>
          <a
            href="#book-now"
            className="inline-block rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-secondary-dark transition duration-300 ease-in-out"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
