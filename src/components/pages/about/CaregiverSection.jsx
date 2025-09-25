const CaregiverSections = () => {
  const data = [
    {
      text: (
        <>
          <p>
            <strong>Our caregivers</strong> are extremely flexible and provide care whenever and
            wherever it's needed, so our clients receive the assistance they need to continue to
            enjoy their regular daily activities.
          </p>
          <br />
          <p>
            We are committed to being a premier service provider by enabling our caregivers with the
            right knowledge and skill sets required to deliver the quality care that everyone longs
            for and truly deserves.
          </p>
        </>
      ),
      image: "/images/caregiver1.jpg", // Replace with actual path
      reverse: false,
    },
    {
      text: (
        <>
          <p>
            <strong>Our caregivers</strong> is an exceptional team of home care professionals with
            real-world experience, education, skills, and multiple specializations.
          </p>
          <br />
          <p>
            We assist you and your family with the care and you deserve. Whether you or your loved
            one needs our service for a few hours a day or 24 hours a day, we are here to make your
            life easier at home.
          </p>
        </>
      ),
      image: "/images/caregiver2.jpg", // Replace with actual path
      reverse: true,
    },
  ];

  return (
    <div className="py-12 max-w-6xl px-6 md:px-16 mt-10 bg-white flex flex-col gap-12 container mx-auto">
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            item.reverse ? "md:flex-row-reverse" : ""
          } items-center gap-6 shadow-lg border border-[#376082] rounded-xl p-6`}
        >
          {/* Text */}
          <div className="flex-1 text-[#376082] text-sm leading-relaxed">{item.text}</div>

          {/* Image */}
          <div className="w-32 h-32 md:w-40 md:h-40 border border-black rounded-full">
            <img
              src={item.image}
              alt="Caregiver"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaregiverSections;
