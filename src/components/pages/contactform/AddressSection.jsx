import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Loader } from "lucide-react";

const API = "https://api.sewacareservices.com/locations/get_locations.php";
//const API = "http://localhost/SewaHome/Backend/locations/get_locations.php";

const AddressSection = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res  = await fetch(API);
        const data = await res.json();
        if (data.success) setLocations(data.locations);
        else throw new Error(data.message);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // ── Loading ──
  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-[#3A5674]">
      <h2
        className="text-7xl font-semibold text-center mb-10"
        style={{ fontFamily: "Chathura" }}
      >
        Location
      </h2>
      <div className="flex justify-center items-center h-40">
        <Loader className="animate-spin h-10 w-10 text-[#3A5674]" />
      </div>
    </div>
  );

  // ── Error ──
  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-[#3A5674]">
      <h2
        className="text-7xl font-semibold text-center mb-10"
        style={{ fontFamily: "Chathura" }}
      >
        Locations
      </h2>
      <p className="text-center text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-[#3A5674]">
      <h2
        className="text-7xl font-semibold text-center mb-10"
        style={{ fontFamily: "Chathura" }}
      >
        Locations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="flex flex-col items-center sm:items-start space-y-4 w-full max-w-sm p-6 rounded-2xl border border-[#3A5674]/20 shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{ fontFamily: "outfit" }}
          >
            {/* State name */}
            <h3
              className="text-[22px] font-semibold underline underline-offset-4 text-center sm:text-start w-full"
            >
              {loc.state_name}
            </h3>

            {/* Address — clicks to open maps */}
            <button
              onClick={() => loc.maps_url && window.open(loc.maps_url, "_blank")}
              className="flex items-start gap-3 text-left group w-full"
            >
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0 group-hover:text-blue-500 transition-colors" />
              <p className="text-[18px] group-hover:text-blue-500 transition-colors leading-relaxed">
                {loc.address_line1}
                {loc.address_line2 && <><br />{loc.address_line2}</>}
                {loc.address_line3 && <><br />{loc.address_line3}</>}
              </p>
            </button>

            {/* Phone - Fixed with proper <a> tag */}
            <a
              href={`tel:${loc.phone}`}
              className="flex items-center gap-3 text-[18px] hover:text-blue-500 transition-colors w-full"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span>
                {loc.phone} 
              </span>
            </a>

            {/* Email - Fixed with proper <a> tag */}
            <a
              href={`mailto:${loc.email}`}
              className="flex items-center gap-3 text-[18px] hover:text-blue-500 transition-colors w-full break-all"
            >
              <Mail className="w-5 h-5 flex-shrink-0" />
              <span>{loc.email}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSection;