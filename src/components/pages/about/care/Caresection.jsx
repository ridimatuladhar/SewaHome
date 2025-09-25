import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CareSection = () => {
  // Separate state for each section
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-8 max-w-7xl mx-auto items-start">
      {/* Section 1 */}
      <div className="flex flex-col items-center gap-8 pr-8">
        {/* Image */}
        <motion.div className="w-full max-w-sm">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face"
            alt="Experienced caregiver with elderly client"
            className="w-full h-80 object-cover shadow-2xl rounded-lg"
          />
        </motion.div>
        
        {/* Content */}
        <div className="flex-1 space-y-4 text-center w-full">
          <motion.h2
            className="text-md lg:text-xl text-gray-800 tracking-widest min-h-[3rem] flex items-center justify-center"
            style={{ fontFamily: "century" }}
          >
            EXPERIENCED AND SUPPORTIVE
          </motion.h2>

          <div className="min-h-[1px] flex flex-col justify-between">
            <div className="overflow-hidden flex justify-center">
              <AnimatePresence>
                {expanded1 && (
                  <motion.p
                    className="text-gray-600 leading-relaxed text-base max-w-md text-justify mb-4"
                    initial={{ opacity: 0, y: 30, scale: 0.95, height: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                    exit={{ opacity: 0, y: 30, scale: 0.95, height: 0 }}
                    transition={{ duration: 0.6, delay: expanded1 ? 0.2 : 0, ease: "easeInOut" }}
                  >
                    We understand that not one care plan fits all. Daily services can include anything from meal preparation, hygiene, cleaning, and supervision. We will take the time to get to know you and develop an individualized care plan that fits your specific needs.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-center">
              <motion.button
                onClick={() => setExpanded1(!expanded1)}
                className="border border-black px-12 py-3 text-sm tracking-wide hover:bg-black hover:rounded-tr-[15px] hover:rounded-bl-[15px] hover:text-white transition-all duration-300 font-medium"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={expanded1 ? "close" : "explore"}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded1 ? "CLOSE" : "EXPLORE"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col items-center gap-8">
        <motion.div className="w-full max-w-sm">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face"
            alt="Experienced caregiver with elderly client"
            className="w-full h-80 object-cover shadow-2xl rounded-lg"
          />
        </motion.div>

        <div className="flex-1 space-y-4 text-center w-full">
          <motion.h2
            className="text-md lg:text-xl text-gray-800 tracking-widest min-h-[3rem] flex items-center justify-center"
            style={{ fontFamily: "century" }}
          >
            EXPERIENCED HOME HEALTH AIDS
          </motion.h2>

          <div className="min-h-[1px] flex flex-col justify-between">
            <div className="overflow-hidden flex justify-center">
              <AnimatePresence>
                {expanded2 && (
                  <motion.p
                    className="text-gray-600 leading-relaxed text-base max-w-md text-justify mb-4"
                    initial={{ opacity: 0, y: 30, scale: 0.95, height: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                    exit={{ opacity: 0, y: 30, scale: 0.95, height: 0 }}
                    transition={{ duration: 0.6, delay: expanded2 ? 0.2 : 0, ease: "easeInOut" }}
                  >
                    Companionship is key to a trusted relationship with our caregivers. We not only strive to help you with everyday tasks but want to develop a caring relationship with you. We provide one-on-one attention and care that cannot compare in other settings.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-center">
              <motion.button
                onClick={() => setExpanded2(!expanded2)}
                className="border border-black px-12 py-3 text-sm tracking-wide hover:bg-black hover:rounded-tr-[15px] hover:rounded-bl-[15px] hover:text-white transition-all duration-300 font-medium"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={expanded2 ? "close" : "explore"}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded2 ? "CLOSE" : "EXPLORE"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col items-center gap-8 pr-8">
        <motion.div className="w-full max-w-sm">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face"
            alt="Experienced caregiver with elderly client"
            className="w-full h-80 object-cover shadow-2xl rounded-lg"
          />
        </motion.div>

        <div className="flex-1 space-y-4 text-center w-full">
          <motion.h2
            className="text-md lg:text-xl text-gray-800 tracking-widest min-h-[3rem] flex items-center justify-center"
            style={{ fontFamily: "century" }}
          >
            CAREGIVERS YOU CAN TRUST
          </motion.h2>

          <div className="min-h-[1px] flex flex-col justify-between">
            <div className="overflow-hidden flex justify-center">
              <AnimatePresence>
                {expanded3 && (
                  <motion.p
                    className="text-gray-600 leading-relaxed text-base max-w-md text-justify mb-4"
                    initial={{ opacity: 0, y: 30, scale: 0.95, height: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                    exit={{ opacity: 0, y: 30, scale: 0.95, height: 0 }}
                    transition={{ duration: 0.6, delay: expanded3 ? 0.2 : 0, ease: "easeInOut" }}
                  >
                    Feel better in the comfort of your own home. We specialize in care and daily living assistance to an array of individuals. Whether you need daily or weekly assistance due to aging, illness, recovery, or rehabilitation, our care givers will provide an individualized service that you can trust.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-center">
              <motion.button
                onClick={() => setExpanded3(!expanded3)}
                className="border border-black px-12 py-3 text-sm tracking-wide hover:bg-black hover:rounded-tr-[15px] hover:rounded-bl-[15px] hover:text-white transition-all duration-300 font-medium"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={expanded3 ? "close" : "explore"}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanded3 ? "CLOSE" : "EXPLORE"}
                  </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </div>

    {/* Section 4 */}
    <div className="flex flex-col items-center gap-8">
      <motion.div className="w-full max-w-sm">
        <img
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face"
          alt="Experienced caregiver with elderly client"
          className="w-full h-80 object-cover shadow-2xl rounded-lg"
        />
      </motion.div>

      <div className="flex-1 space-y-4 text-center w-full">
        <motion.h2
          className="text-md lg:text-xl text-gray-800 tracking-widest min-h-[3rem] flex items-center justify-center"
          style={{ fontFamily: "century" }}
        >
          OUR CAREGIVERS
        </motion.h2>

        <div className="min-h-[55px] flex flex-col justify-between">
          <div className="overflow-hidden flex justify-center">
            <AnimatePresence>
              {expanded4 && (
                <motion.p
                  className="text-gray-600 leading-relaxed text-base max-w-md text-justify mb-4"
                  initial={{ opacity: 0, y: 30, scale: 0.95, height: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, y: 30, scale: 0.95, height: 0 }}
                  transition={{ duration: 0.6, delay: expanded4 ? 0.2 : 0, ease: "easeInOut" }}
                >
                  An exceptional team of home care professionals with real-world experience, education, skills, and multiple specializations. We assist you and your family with the care and you deserve. Whether you or your loved one needs our service for a few hours a day or 24 hours a day, we are here to make your life easier at home.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center">
            <motion.button
              onClick={() => setExpanded4(!expanded4)}
              className="border border-black px-12 py-3 text-sm tracking-wide hover:bg-black hover:rounded-tr-[15px] hover:rounded-bl-[15px] hover:text-white transition-all duration-300 font-medium"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={expanded4 ? "close" : "explore"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {expanded4 ? "CLOSE" : "EXPLORE"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default CareSection;