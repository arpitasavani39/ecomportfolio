import AnnouncementBar from "./components/AnnouncementBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InstagramSection from "./components/InstagramSection";
import LifestyleSection from "./components/LifestyleSection";
import MottoSection from "./components/MottoSection";
import ProductGrid from "./components/ProductGrid";
import ShopCategories from "./components/ShopCategories";
import SpecialOffer from "./components/SpecialOffer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <MottoSection />
        <ProductGrid />
        <ShopCategories />
        <SpecialOffer />
        <LifestyleSection />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}
