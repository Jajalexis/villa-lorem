import { useState, useCallback } from "react";
import { useLenis } from "./hooks/useLenis";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import ParallaxGallery from "./components/ParallaxGallery";
import Manifeste from "./components/Manifeste";
import Expositions from "./components/Expositions";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  const onLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={onLoadComplete} />}
      <Navbar />
      <main>
        <Hero />
        <Collection />
        <ParallaxGallery />
        <Manifeste />
        <Expositions />
        <Footer />
      </main>
    </>
  );
}
