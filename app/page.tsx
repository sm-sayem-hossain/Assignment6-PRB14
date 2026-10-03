import Hero from "./components/Hero";
import Library from "./components/Library";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero/>
      <Library/>
      <Footer/>
    </main>
  );
}