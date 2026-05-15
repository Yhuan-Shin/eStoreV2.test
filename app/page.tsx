import Hero from "./sections/hero";
import Services from "./sections/services";
import Products from "./sections/products";
import Location from "./sections/location";
import AboutUs from "./sections/aboutus";
import { useDemoAuth } from "@/components/ui/demo-auth";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Products />
      <Location />
      <AboutUs />
    </>
  );
}
