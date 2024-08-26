const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Founder & CEO',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'John is the visionary behind the platform, dedicated to revolutionizing sports facility booking with innovative technology.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Jane leads the technology team, ensuring the platform remains cutting-edge and user-friendly.',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    role: 'Head of Operations',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: 'Alex manages daily operations and ensures smooth execution of our services.',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Marketing Manager',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    bio: 'Emily drives our marketing strategy, helping us reach and engage with sports enthusiasts everywhere.',
  },
];

const milestones = [
  { year: 2020, event: 'Platform Launch' },
  { year: 2021, event: 'Expanded to Multiple Cities' },
  { year: 2022, event: 'Reached 1 Million Users' },
  { year: 2023, event: 'Introduced New Features & Partnerships' },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <section
          className="relative mb-12 bg-cover bg-center bg-no-repeat h-96 rounded-lg shadow-lg overflow-hidden"
          style={{
            backgroundImage:
              'url(https://t3.ftcdn.net/jpg/02/78/42/76/360_F_278427683_zeS9ihPAO61QhHqdU1fOaPk2UClfgPcW.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h2 className="text-4xl font-bold mb-4 sm:text-5xl lg:text-6xl">
                Our Mission
              </h2>
              <p className="text-lg lg:text-xl max-w-2xl mx-auto">
                Our mission is to simplify the process of booking sports
                facilities by providing an intuitive, user-friendly platform
                that connects facility owners with sports enthusiasts. We strive
                to enhance the sports experience through innovation,
                reliability, and excellent customer service.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-6 sm:text-4xl lg:text-5xl">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <p className="text-gray-700">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History & Milestones */}
        <section
          className="relative mb-12 bg-cover bg-center bg-no-repeat h-96 rounded-lg shadow-lg overflow-hidden opacity-"
          style={{
            backgroundImage:
              'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLftzxLFXPfs6MbMJGjX3wS9JyVe4fUZdKxQ&s)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-background bg-opacity-70 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-center mb-6 sm:text-4xl lg:text-5xl">
                History & Milestones
              </h2>
              <ul className="list-disc list-inside space-y-4 text-lg">
                {milestones.map((milestone, index) => (
                  <li key={index} className="text-gray-700">
                    <strong>{milestone.year}</strong>: {milestone.event}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6 sm:text-4xl lg:text-5xl">
            Find Us
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
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

export default AboutUs;
