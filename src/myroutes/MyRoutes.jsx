import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../components/home/Homepage'
import TeamProfile from '../components/pages/Meet the team/TeamProfile'
import MainJoinsection from '../components/pages/Careers/MainJoinsection'
import MainHomePage from '../components/home/MainHomePage'
import MeetTheTeam from '../components/pages/Meet the team/MeetTheTeam'
import About from '../components/pages/about/AboutUs'
import ServiceDetail from '../components/pages/services/ServiceDetail'
import Blogs from '../components/pages/Blogs/Blogs'
import BlogDetail from '../components/pages/Blogs/BlogDetail'
import ContactForm from '../components/pages/contactform/ContactForm'
import Opportunities from '../components/pages/Careers/Opportunities'
import Homecare_massachusetts from '../components/pages/massachusetts/Homecare_massachusetts'
import NonDiscrimination from '../components/pages/Policies/NonDiscrimination'
import Consultation from '../components/pages/consultation/Consultation'
const MyRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/home" element={<Homepage/>} />
        <Route path="/" element={<MainHomePage/>} />
        <Route path="/about" element={<About />} />
          {/* <Route path="/contact" element={<ContactForm />} /> */}
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        
        {/* this is about section and sub section that contains team member details */}
            <Route path="/team" element={<MeetTheTeam />} />
        <Route path="/team/:id" element={<TeamProfile />} />

         <Route path='/blogs' element={<Blogs/>}/>
         <Route path='/blogs/:id' element={<BlogDetail />}/>
         <Route path='/contact-us' element={<ContactForm />}/>
         <Route path='/homecare-massachusetts' element={<Homecare_massachusetts />}/>
         <Route path='/non-discrimination-policy' element={<NonDiscrimination />}/>

          <Route path='/consultation' element={<Consultation />}/>
         {/* Careers */}
         <Route path='/join-our-team' element={<MainJoinsection />}/>
          <Route path='/opportunities' element={<Opportunities />}/>
         <Route path='*' element={<Homepage/>}/>
        {/* <Route path='/care' element={<CareSection/>}/> */}



    </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes
