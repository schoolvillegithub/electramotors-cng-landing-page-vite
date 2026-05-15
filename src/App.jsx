import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './Layouts/Nav'
import Footer from './Layouts/Footer'
import Homepage from './Pages/Homepage'
import AboutUs from './Pages/AboutUs'
import CNG from './Pages/CNG'
import Services from './Pages/Services'
import Training from './Pages/Training'
import ContactUs from './Pages/ContactUs'
import ScrollToTop from './Layouts/ScrollToTop'
import Loader from './Components/Loader' 
import Careers from './Pages/Careers'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import BookNow from './Pages/BookNow'
import ServiceDetails from './Components/ServiceDetails'
import TermsPolicy from './Pages/TermsPolicy'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import Inquiries from './Pages/Inquiries'
import BuyCngKits from './Pages/BuyCngKits'
import CNGStation from './Pages/CNGStation'
import BodyRepairs from './Pages/BodyRepairs'
import GeneralMaintenance from './Pages/GeneralMaintenance'
import SpareParts from './Pages/SpareParts'
import EngineRefurbishing from './Pages/EngineRefurbishing'
import VehicleDiagnostics from './Pages/VehicleDiagnostics'
import QuickRepairs from './Pages/QuickRepairs'
import InquiryServiceReqForm from './Pages/InquiryServiceReqForm'
import NewEvents from './Pages/NewEvents'


function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
       
      <Loader>
          <Nav />
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/electra' element={<AboutUs />}/>
            <Route path='/cng' element={<CNG />}/>
            <Route path='/services' element={<Services />}>
              {/* <Route index element={<Services />} /> */}
              <Route path="cng-conversion" element={<CNG />}/>
              <Route path="cng-training" element={<Training />} />
              <Route path="buy-cng-kits" element={<BuyCngKits />} />
              <Route path="refuelling-station" element={<CNGStation />} />
              <Route path="body-repairs" element={<BodyRepairs />} />
              <Route path="general-maintenance" element={<GeneralMaintenance />} />
              <Route path="spare-parts" element={<SpareParts />} />
              <Route path="engine-refurbishing" element={<EngineRefurbishing />} />
              <Route path="vehicle-diagnostic" element={<VehicleDiagnostics />} />
              <Route path="quick-repair" element={<QuickRepairs />} />
            </Route>
            {/* <Route path='/services/:id' element={<ServiceDetails />}/> */}
            <Route path='/training' element={<Training />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/careers' element={<Careers />} />
            <Route path='/book-now' element={<BookNow />} />
            <Route path='/terms-policy' element={<TermsPolicy />}/>
            <Route path='/privacy-policy' element={<PrivacyPolicy />}/>
            <Route path='/inquiries' element={<Inquiries />}/>
            <Route path='/service-request-form' element={<InquiryServiceReqForm />} />
            <Route path='/news-and-events' element={<NewEvents />} />
          </Routes>
          <Footer />
      </Loader>
      
    </>
  )
}

export default App
