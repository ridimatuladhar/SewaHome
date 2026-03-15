import React from "react";
import WhyJoinUs from "./WhyJoinUs";
import TeamSection from "./TeamSection";
import Navbar from "../../layouts/Navbar";
import FooterButtons from "../footer/FooterButtons";


const MainJoinsection = () => {
  return (
    <>
    <Navbar />
    <div id="join-our-team " className="mt-16" >
      <WhyJoinUs />
      <TeamSection />
    </div>
    <FooterButtons />
    </>
  );
};

export default MainJoinsection;
