import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeView } from "@/components/HomeView";
import { getProperties } from "@/lib/properties";

export default function Home() {
  const properties = getProperties();

  return (
    <>
      <Header />
      <HomeView properties={properties} />
      <Footer />
    </>
  );
}
