export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  category: string;
  achievement: string;
  quote: string;
  image: string;
  videoUrl: string;
}

export interface WhyChooseUsCard {
  id: string;
  title: string;
  iconName: string;
  description: string;
}

export interface AwardMedallion {
  id: string;
  title: string;
  year: string;
  organization: string;
  color: string;
}

export interface ContentBlock {
  id: string;
  eyebrow: string;
  title: string;
  description: string[];
  image: string;
  buttonText?: string;
  alignLeft: boolean;
}
