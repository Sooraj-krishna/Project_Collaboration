import Calendar from "@/components/Calendar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import StudentReviews from "@/components/StudentReviews";
import Whoweare from "@/components/Whoweare";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>    
      <Whoweare/>
      <Intro/>
      <Newsletter/>
      <Calendar/>
      <Gallery/>
      <StudentReviews/>
      <Contact/>
      <Footer/>
    </>
  );
}
