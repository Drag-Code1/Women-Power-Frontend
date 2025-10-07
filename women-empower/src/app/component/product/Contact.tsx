

import React from 'react';
import { MapPin, Mail, Clock } from 'lucide-react';

import ContactForm from '../ui/forms/contactForm';

const Contact = () => {

  return (
    <section className="py-12 px-4 md:px-10 bg-[#f7f7f7] text-[#5C452B]">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto rounded-xl shadow-md overflow-hidden bg-white border border-gray-200 items-stretch">
        
        {/* Left: Contact Info */}
        <div className="p-8 bg-[#f7f7f7] space-y-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Contact Info</h2>

          <div>
            <h3 className="flex items-center font-semibold mb-1">
              <MapPin className="mr-2 text-black w-4 h-4" /> Address
            </h3>
            <p className="text-sm leading-relaxed">
              Jalaram Trading Company <br />
              Opp Hanuman Mandir, Main Mondha Golai Market <br />
              Parli Vaijnath 431515, Dist. Beed, Maharashtra
            </p>
          </div>

          <div>
            <h3 className="flex items-center font-semibold mb-1">
              <Mail className="mr-2 text-black w-4 h-4" /> Email
            </h3>
            <a
              href="mailto:womanempoweringjourney@gmail.com"
              className="text-sm text-blue-600 hover:underline"
            >
              womanempoweringjourney@gmail.com
            </a>
          </div>

          <div>
            <h3 className="flex items-center font-semibold mb-1">
              <Clock className="mr-2 text-black w-4 h-4" /> Hours
            </h3>
            <p className="text-sm">Mon - Sat: 9 AM – 7 PM</p>
            <p className="text-sm">Sunday: Closed</p>
          </div>
        </div>

        {/* Right: Form */}
        <ContactForm />
       
      </div>
    </section>
  );
};

export default Contact;

