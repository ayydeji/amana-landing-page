import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Segments } from "@/components/sections/segments";
import { Guide } from "@/components/sections/guide";
import { Features } from "@/components/sections/features";
import { Guarantee } from "@/components/sections/guarantee";
import { Plan } from "@/components/sections/plan";
import { Comparison } from "@/components/sections/comparison";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Segments />
        <Guide />
        <Features />
        <Guarantee />
        <Plan />
        <Comparison />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
