import React from "react";
import WhyJoinUs from "./WhyJoinUs";
import TeamSection from "./TeamSection";
import Navbar from "../../layouts/Navbar";
import FooterButtons from "../../home/FooterButtons";


const MainJoinsection = () => {
  return (
    <>
    <Navbar />
    <div id="join-our-team " className="md:mt-16 mt-8" >
      <WhyJoinUs />
      <TeamSection />
    </div>
    <FooterButtons />
    </>
  );
};

export default MainJoinsection;
