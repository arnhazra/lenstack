import Header from "@/app/(marketing)/(components)/header"
import SolutionsSection from "./(components)/solutions-section"
import ProductsSection from "./(components)/products-section"
import PricingSection from "./(components)/pricing-section"
import FooterSection from "./(components)/footer-section"
import HeroSection from "./(components)/hero-section"
import OpenSourceSection from "./(components)/opensource-section"

export default function Page() {
  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-white">
        <HeroSection />
        <SolutionsSection />
        <OpenSourceSection />
        <ProductsSection />
        <PricingSection />
      </div>
      <FooterSection />
    </>
  )
}
