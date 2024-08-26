import React from 'react';

const steps = [
  {
    number: '1',
    title: 'Explore Facilities',
    description:
      'Browse through our list of available sports facilities and choose the one that suits your needs.',
    icon: 'https://www.inventicons.com/uploads/iconset/362/wm/512/explore-70.png', // Example icon URL
  },
  {
    number: '2',
    title: 'Select Date and Time',
    description:
      'Choose your preferred date and time for booking. Ensure that the facility is available during your desired slot.',
    icon: 'https://img.icons8.com/ios/50/000000/calendar.png', // Example icon URL
  },
  {
    number: '3',
    title: 'Complete the Booking',
    description:
      'Fill in your details, review the booking summary, and confirm your reservation. Make sure to complete any required payment.',
    icon: 'https://cdn-icons-png.flaticon.com/512/972/972601.png', // Example icon URL
  },
  {
    number: '4',
    title: 'Enjoy Your Time!',
    description:
      'Show up at the facility on your booked date and time. Enjoy your sports activity and have a great time!',
    icon: 'https://cdn-icons-png.flaticon.com/512/167/167156.png', // Example icon URL
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 sm:text-4xl lg:text-5xl">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center"
            >
              <div className="mb-4 flex items-center justify-center">
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full text-2xl font-bold">
                  {step.number}
                </div>
              </div>
              <img
                src={step.icon}
                alt={step.title}
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
