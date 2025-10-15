
import { create } from "zustand";

// ✅ Define your store type (state + actions)
interface GlobalDataState {
  data?: GlobalDataState;
  comparison_table: ComparisonTable;
  course_hero: CourseHero;
  faqs: FAQSSection;
  features: FeaturesSection;
  hero: Hero;
  how_it_works: HowItWorksSection;
  logoCarousel: logoCarouselSection;
  reviews: ReviewsSection;

  // ✅ Add actions (methods)
  setData: (data: GlobalDataState) => void;

}

// ✅ Zustand store
export const useGlobalDataStore = create<GlobalDataState>((set) => ({
  comparison_table: {} as ComparisonTable,
  course_hero: {} as CourseHero,
  faqs: {} as FAQSSection,
  features: {} as FeaturesSection,
  hero: {} as Hero,
  how_it_works: {} as HowItWorksSection,
  logoCarousel: {} as logoCarouselSection,
  reviews: {} as ReviewsSection,

  setData: (data: GlobalDataState) => {
    if (!data) return; // or handle reset

    set({
      comparison_table: data.comparison_table,
      course_hero: data.course_hero,
      faqs: data.faqs,
      features: data.features,
      hero: data.hero,
      how_it_works: data.how_it_works,
      logoCarousel: data.logoCarousel,
      reviews: data.reviews,
    });
  },

}));
