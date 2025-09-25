import React from "react";

const AddressSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-[#3A5674]">
      <h2 className="text-7xl font-semibold text-center mb-10 font-gotu"  style={{ fontFamily: 'Chathura'}}>
        Address
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
        {/* Massachusetts */}
        <div className="space-y-2 text-[20px] sm:text-[22px] md:pl-20 items-center "  style={{ fontFamily: 'outfit'}}>
          <h3 className=" font-semibold underline underline-offset-4 text-center sm:text-start">
            Massachusetts
          </h3>
          <p className="text-center sm:text-start">
            6 Lyberty Way, Ste 202, Westford,<br />
            Massachusetts 01886, United States
          </p>
          <p className="mt-6 text-center sm:text-start">(978) 677-7012</p>
          <p  className="text-center mt-6 sm:text-start">headoffice@sewahomecare.com</p>
        </div>
        <div className="w-full h-60 md:h-62 flex justify-center sm:justify-start">
          <iframe
            title="Massachusetts Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.109893387409!2d-71.4282348!3d42.5624922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e397d24634d109%3A0x3c80e97c36e4d696!2s6%20Lyberty%20Way%2C%20Westford%2C%20MA%2001886%2C%20USA!5e0!3m2!1sen!2snp!4v1690712345678"
            width="90%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md shadow-md"
          ></iframe>
        </div>

        {/* California */}
        <div className="space-y-2 text-[20px] sm:text-[22px] md:pl-20"  style={{ fontFamily: 'outfit'}}>
          <h3 className=" font-semibold underline underline-offset-4  text-center sm:text-start">
            California
          </h3>
          <p className="text-center sm:text-start">
            San Francisco, California 94102,<br />
            United States
          </p>
          <p className="mt-6 text-center sm:text-start">(978) 677-7012</p>
          <p className="mt-6 text-center sm:text-start">California@sewahomecare.com</p>

        </div>
        <div className="w-full h-60 md:h-72 flex justify-center sm:justify-start">
          <iframe
            title="California Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.769228284376!2d-122.4444203!3d37.7505615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580999d2acfb3%3A0x687352ddeebecb93!2sSan%20Francisco%2C%20CA%2094102%2C%20USA!5e0!3m2!1sen!2snp!4v1690712345679"
            width="90%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md shadow-md"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
