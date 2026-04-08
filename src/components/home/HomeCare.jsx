import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const Modal = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
        style={{ backgroundColor: 'rgba(22, 40, 55, 0.6)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto relative"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white z-10 px-6 md:px-8 pt-6 pb-4 border-b border-gray-100 flex items-start justify-between">
            <h2 className="text-xl md:text-2xl font-semibold text-[#376082] pr-8 leading-snug">
              The Sewa Distinction: Intelligence Backed by Wisdom
            </h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-[#376082] hover:bg-[#F0F4F8] transition-colors text-xl leading-none"
              aria-label="Close modal"
            >
              &#x2715;
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6 md:px-8 py-6 space-y-8">

            {/* Elite Leadership */}
            <div>
              <p className="text-xs font-semibold text-[#376082] uppercase tracking-widest mb-4 opacity-60">
                Elite Leadership
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Elite Clinical Leadership',
                    desc: 'Our agency is anchored by a dedicated Director of Nursing and a Care Management team with over 30 years of experience. This depth of veteran wisdom ensures that every nuance of our clients\' health is managed with seasoned judgment and rigorous standards.'
                  },
                  {
                    title: 'The Intelligence-Powered Core',
                    desc: 'Drawing on our founder\'s decade of experience as a Medical IT Systems Analyst and her Master of Science in Information Technology, we utilize sophisticated healthcare systems to ensure the highest levels of precision.'
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#F0F4F8] rounded-xl p-5 border-l-4 border-[#376082]"
                    style={{ borderRadius: '0 12px 12px 0' }}
                  >
                    <h5 className="text-base font-semibold text-[#376082] mb-2">{item.title}</h5>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-[#376082]/10" />

            {/* For Families */}
            <div>
              <p className="text-xs font-semibold text-[#376082] uppercase tracking-widest mb-4 opacity-60">
                For Our Families, This Means
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: 'Real-Time Precision',
                    desc: 'Utilizing advanced platforms to ensure that care plans are followed with exacting detail and that any clinical changes are captured instantly.'
                  },
                  {
                    title: 'Seamless Communication',
                    desc: 'High-level systems that keep families and medical providers connected and informed through secure, streamlined digital integration.'
                  },
                  {
                    title: 'Safety Through Innovation',
                    desc: 'The adoption of the latest care-management breakthroughs to provide a proactive environment, allowing us to focus more on the human connection.'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start bg-[#F0F4F8] rounded-xl p-4">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-[#376082] flex-shrink-0" />
                    <div>
                      <h6 className="text-sm font-semibold text-[#376082] mb-1">{item.title}</h6>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-[#376082]/10" />

            {/* Lifestyle & Advocacy */}
            <div>
              <p className="text-xs font-semibold text-[#376082] uppercase tracking-widest mb-4 opacity-60">
                Lifestyle &amp; Advocacy
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Curated Lifestyle Preservation',
                    desc: 'We believe that high-end care should be seamless and discreet. Our team is trained to integrate into high-functioning, private households with the utmost professionalism, ensuring that the familiar warmth and aesthetic of your home remain undisturbed.'
                  },
                  {
                    title: 'Concierge Advocacy & Strategy',
                    desc: 'Navigating the complexities of modern medicine requires a sophisticated advocate. We act as your private consultants, designing a bespoke roadmap for your care that evolves with your needs.'
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#F0F4F8] rounded-xl p-5 border-l-4 border-[#376082]"
                    style={{ borderRadius: '0 12px 12px 0' }}
                  >
                    <h5 className="text-base font-semibold text-[#376082] mb-2">{item.title}</h5>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-[#376082]/10" />

            {/* Closing Statement */}
            <div className="text-center pb-2">
              <p className="text-base md:text-lg font-medium text-[#376082] mb-2">
                Intelligence Backed by Knowledge. Experience Refined by Decades.
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                At Sewa Home Care, we don't just provide assistance; we provide a superior, tech-forward,
                and clinician-led experience. We ensure you stay where life feels most meaningful —
                safely, gracefully, with the highest standards of modern clinical care.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const HomeCare = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.05 })
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div ref={ref} className="bg-[#F0F4F8] py-8 md:pt-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-3xl md:text-5xl font-medium text-[#376082] mb-4 md:mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              Compassionate Care, Right at Home.
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              Sewa Home care helps seniors and individuals with challenges maintain their independence,
              safety, and quality of life in the place they love most.
            </motion.p>
          </motion.div>

          {/* ROW 1: Content Left | Image Right */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-4">

            {/* Left Content */}
            <motion.div
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              <motion.h2
                className="text-4xl md:text-7xl font-extrabold text-[#376082] mb-4 md:mb-6"
                style={{ fontFamily: 'Chathura' }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              >
                Why Choose Sewa Home Care?
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-[#376082] mb-3">
                  The Global Standard in Intelligent, Clinical, and Bespoke Private Care
                </h3>
                <p className="text-md md:text-lg leading-relaxed text-gray-700">
                  Choosing Sewa Home Care is a commitment to excellence without compromise.
                  We provide a boutique lifestyle solution where sophisticated clinical oversight
                  meets the world's most advanced care technologies.
                </p>
              </motion.div>

              {/* Founder Box — shown always */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                className="pt-4"
              >
                <div className="bg-white/50 rounded-xl p-4 md:p-6">
                  <p className="text-md md:text-lg leading-relaxed text-gray-700">
                    <span className="font-semibold text-[#376082]">
                      Founded and led by Mala Lama, BSN, RN, CMC, CDP, MSIT.
                    </span>{' '}
                    A Registered Nurse and Medical IT expert with a Master of Science in Information Technology
                    and a degree in Hospital Management.
                  </p>
                  <p className="text-md md:text-lg leading-relaxed text-gray-700 mt-3">
                    Our core is powered by intelligence and steered by a veteran leadership team that
                    represents the pinnacle of the healthcare industry.
                  </p>

                  {/* Read More Button */}
                  <motion.button
                    onClick={() => setModalOpen(true)}
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#376082] text-[#376082] text-sm font-medium hover:bg-[#376082] hover:text-white transition-colors duration-200 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Read more
                    <svg
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <motion.div
                className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="/carousel/carousel4.webp"
                  alt="Healthcare professional assisting an elderly woman."
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Modal */}
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </>
  )
}

export default HomeCare