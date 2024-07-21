import { useTitle } from "../../hooks/useTitle"
import { Faq } from "./components/Faq"
import { FeaturedProducts } from "./components/FeaturedProducts"
import { Hero } from "./components/Hero"
import { Testimonials } from "./components/Testimonials"

import { ReportList } from "../Reports/ReportList"

export const HomePage = () => {
  useTitle("Home");
  return (
    <main>
      <ReportList />

      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <Faq />
    </main>
  )
}
