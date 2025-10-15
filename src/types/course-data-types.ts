// 1️⃣ Define a reusable type for items with `id` and `text`
type Item = {
  id: string;
  [key: string]: string | null;
};
type FAQs = {
  question: string | null;
  answer: string | null;
  category: string | null;
};
type Feactures = {
  description: string | null;
  heading: string | null;
  id: string;
  image: string | null;
};

type Hero = {
  backgroundImage: string | null;
  ctaLink: string | null;
  ctaText: string | null;
  enabled: boolean;
  highlight: Item[];
  eyebrow: string | null;
  heading: string | null;
  subheading: string | null;
};

type HowitWorks = {
  btn_text: string | null;
  description: string | null;
  heading: string | null;
  id: string;
  image: string | null;
  subheading: string | null;
};

type logos = {
  heading: string | null;
  id: string;
  logo: string | null;
  subheading: string | null;
};
type LogoItem = {
  heading: string | null;
  subheading: string | null;
  logo: string | { url: string; alt: string } | null;
};

type Reviews = {
  field: string | null;
  gender: string | null;
  id: string;
  name: string | null;
  profile: string | null;
  rating: number | null;
  review: string;
};

// 2️⃣ Define the main structure type
interface ComparisonTable {
  enabled: boolean;
  eyebrow: string;
  heading: string;
  subheading: string;
  highlight: Item[];
  comparison: Item[];
  clear_cutoff: Item[];
  coaching_center: Item[];
}

interface CourseHero {
  course_hero_ctaLink: string;
  course_hero_ctaText: string;
  course_hero_eyebrow: string;
  course_hero_heading: string;
  course_hero_subheading: string;
}

interface FAQSSection {
  enabled: boolean;
  eyebrow: string;
  heading: string;
  subheading: string;
  highlight: Item[];
  categories: Item[];
  faqs: FAQs[];
}

interface FeaturesSection {
  enabled: boolean;
  eyebrow: string;
  heading: string;
  subheading: string;
  highlight: Item[];
  features: Feactures[]; // Use your defined Feactures type
}

interface HowItWorksSection {
  enabled: boolean;
  eyebrow: string;
  heading: string;
  subheading: string;
  highlight: Item[];
  how_it_works: HowitWorks[];
}

interface logoCarouselSection {
  enabled: boolean;
  logos: logos[];
}

interface ReviewsSection {
  enabled: boolean;
  eyebrow: string;
  heading: string;
  subheading: string;
  highlight: Item[];
  reviews: Item[];
}

interface GlobalDataState {
  comparison_table: ComparisonTable;
  course_hero: CourseHero;
  faqs: FAQSSection;
  features: FeaturesSection;
  hero: Hero;
  how_it_works: HowItWorksSection;
  logoCarousel: logoCarouselSection;
  reviews: ReviewsSection;
}
