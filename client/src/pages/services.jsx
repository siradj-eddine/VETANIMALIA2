import React from "react";

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Surgery",
      description: "Professional surgical procedures for your pets performed by our experienced veterinary team.",
      buttonText: "Read More",
      color: "bg-indigo-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Healthcare",
      description: "Comprehensive health checkups and preventive care to keep your pet in optimal condition.",
      buttonText: "Read More",
      color: "bg-indigo-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Grooming",
      description: "Professional grooming services to keep your pet looking and feeling their best.",
      buttonText: "Read More",
      color: "bg-indigo-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Daycare",
      description: "Safe and fun daycare services for when you need someone to look after your pet.",
      buttonText: "Read More",
      color: "bg-indigo-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Make an Appointment",
      description: "Schedule a visit with our veterinary professionals at your convenience.",
      buttonText: "Book Now",
      color: "bg-orange-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="py-12 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Our Veterinary Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive care for your beloved pets
          </p>
        </div>
      </header>

      {/* Services Section */}
      <main className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article 
              key={service.id}
              className={`${service.color} rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              itemScope
              itemType="https://schema.org/Service"
            >
              <div className="p-8 text-center text-white">
                <div className="mx-auto h-16 w-16 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold mb-4" itemProp="name">
                  {service.title}
                </h2>
                <p className="mb-6 opacity-90" itemProp="description">
                  {service.description}
                </p>
                <button 
                  className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                  aria-label={`Learn more about ${service.title}`}
                >
                  {service.buttonText}
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ServicesPage;