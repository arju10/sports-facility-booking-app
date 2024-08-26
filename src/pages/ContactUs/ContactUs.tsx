import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending the data to the backend.
    console.log(formData);
    alert('Thank you for your message. We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="bg-background py-12 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Form */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6 sm:text-4xl lg:text-5xl">
            Get in Touch
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  rows={4}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-accent hover:text-black transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </section>

        {/* Map Integration (Optional) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6 sm:text-4xl lg:text-5xl">
            Find Us Here
          </h2>
          <div className="max-w-lg mx-auto">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0860202127!2d144.95605431558353!3d-37.817209979751654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43b82ffb71%3A0xa8700d7d6f4c73e8!2s123%20Sports%20Lane%2C%20Cityville%20ST%2012345!5e0!3m2!1sen!2sus!4v1619949425239!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </section>

        {/* Contact Details */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6 sm:text-4xl lg:text-5xl">
            Contact Details
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg mx-auto">
            <p className="text-lg mb-2">Office Address:</p>
            <p className="text-gray-700 mb-4">
              123 Sports Lane, Cityville, ST 12345
            </p>
            <p className="text-lg mb-2">Phone Number:</p>
            <p className="text-gray-700 mb-4">(123) 456-7890</p>
            <p className="text-lg mb-2">Email:</p>
            <p className="text-gray-700">contact@sportsfacilitybooking.com</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
