import { Service, Testimonial, WhyChooseUsCard, AwardMedallion, ContentBlock } from "../types";

export const SERVICES: Service[] = [
  {
    id: "finance",
    number: "01",
    title: "Finance",
    subtitle: "Meet Your Meridian Team",
    description: "Whether you're buying your first home, growing an investment portfolio, or securing commercial funding, our Finance specialists structure the right lending solution for your goals. We negotiate directly with 40+ leading lenders so you get sharper rates with less paperwork.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "property",
    number: "02",
    title: "Property",
    subtitle: "Your Elite Property Partner",
    description: "Our Buyer’s Advocates understand Melbourne's competitive property landscape. From sourcing off-market residential and commercial gems to representing you at auctions, we provide independent research and tough negotiation to secure the right asset at the right price.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "asset",
    number: "03",
    title: "Asset",
    subtitle: "Finance for Business and Vehicles",
    description: "Equip your business or upgrade your personal fleet without disrupting cashflow. We secure tailored asset finance, equipment leases, and vehicle funding options that align with your tax strategies and business growth plans.",
    image: "https://images.unsplash.com/photo-1580894732444-8fecef2601da?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "legal",
    number: "04",
    title: "Legal",
    subtitle: "Meridian Legal & Conveyancing",
    description: "Meridian Legal is a trusted provider of conveyancing and property legal services. Our expertise allows us to seamlessly manage matters for clients Australia-wide. As specialist conveyancers, we have successfully guided thousands of clients through every stage, from meticulous contract review to smooth property purchase and final settlement.",
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=800"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Claire Whitfield",
    category: "Finance",
    achievement: "Investment Portfolio Growth",
    quote: "Growing my investment portfolio felt effortless with Meridian. Their team secured premium rates and handled every detail while I focused on my career.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "t2",
    name: "Marcus & Liam Petridis",
    category: "Finance",
    achievement: "First Home Buyers",
    quote: "Buying our first homes together, side by side, Meridian kept us aligned every step. We got expert deposit strategy and fast-tracked approvals.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "t3",
    name: "Antonio Rossi",
    category: "Finance",
    achievement: "Business Growth & Home Upgrade",
    quote: "From my first home to renovating our family house and financing new business equipment, Meridian has been my trusted advisor for over eight years.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "t4",
    name: "Dr. Sarah & James Nguyen",
    category: "Property & Legal",
    achievement: "Medical Practice & Home Purchase",
    quote: "We refinanced our clinic and purchased our dream home in Toorak at the same time. Meridian managed the legal conveyancing and dual finance structuring flawlessly.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

export const WHY_CHOOSE_US: WhyChooseUsCard[] = [
  {
    id: "w1",
    title: "We Listen",
    iconName: "Compass",
    description: "Your home loan isn't just a transaction — it's your next chapter. We take the time to understand where you're heading, then bring the expertise to get you there."
  },
  {
    id: "w2",
    title: "Save Time",
    iconName: "Briefcase",
    description: "Our specialists work as one connected team around your goals — a single briefing, a seamless process, zero repeated conversations."
  },
  {
    id: "w3",
    title: "Long-Term Support",
    iconName: "Diamond",
    description: "We stay with you well beyond settlement day, offering ongoing loan reviews and market updates so your finance keeps working for you."
  },
  {
    id: "w4",
    title: "Informed Decisions",
    iconName: "Sprout",
    description: "Make every decision with confidence, backed by independent finance and property advice. With 65+ industry awards, our results speak for themselves."
  }
];

export const AWARDS: AwardMedallion[] = [
  { id: "a1", title: "National Finalist", year: "2026", organization: "MFAA Awards", color: "bg-[#B8860B]" },
  { id: "a2", title: "Better Business", year: "2024", organization: "Victorian Winner", color: "bg-[#CD7F32]" },
  { id: "a3", title: "Residential Finance", year: "2025", organization: "Excellence Awards", color: "bg-[#1E3F66]" },
  { id: "a4", title: "Loan Administrator", year: "2023", organization: "MFAA State Winner", color: "bg-[#2E5B88]" },
  { id: "a5", title: "Top Brokerage", year: "2024", organization: "MPA Top 100", color: "bg-[#D4AF37]" },
  { id: "a6", title: "Fast Brokerage", year: "2023", organization: "The Adviser", color: "bg-[#C0C0C0]" },
  { id: "a7", title: "Best Workplaces", year: "2024", organization: "Australia Rank #6", color: "bg-[#A67C00]" },
  { id: "a8", title: "Certified", year: "2025", organization: "Great Place to Work", color: "bg-[#0F52BA]" }
];

export const CONTENT_BLOCKS: ContentBlock[] = [
  {
    id: "melbourne-based",
    eyebrow: "Home Loan Brokers in Melbourne",
    title: "Melbourne Based. Nationally Focused. Globally Connected.",
    description: [
      "While our home base is in Richmond, Meridian supports clients right across Australia and around the world. With offices in Melbourne, Sydney, Brisbane, Geelong, and the Mornington Peninsula, we deliver expert property and finance guidance no matter where you're located.",
      "Whether you're a local buyer, an interstate investor, or an expat securing a piece of Australian real estate, you can meet our specialists in person or connect remotely from anywhere in the world."
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    alignLeft: true
  },
  {
    id: "buyers-advocate",
    eyebrow: "Buyer's Advocates in Melbourne",
    title: "Your Dedicated Team for the Property Market",
    description: [
      "Distance is never a barrier to the right property. Meridian helps local and international clients secure premium Australian real estate, managing everything from defining the brief to identifying off-market opportunities, building inspections, and tough negotiations.",
      "Whether you're an expat investing, a first home buyer, or a family relocating home, we provide the on-the-ground expertise you need, wherever you're based, for complete peace of mind."
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    alignLeft: false
  },
  {
    id: "beyond-home-loans",
    eyebrow: "Beyond Home Loans",
    title: "Brokers for All Your Lending",
    description: [
      "Meridian goes beyond standard mortgage broking. Our finance specialists cover commercial property, development funding, business cashflow solutions, and equipment lease financing with equal ease.",
      "From private banking and agri-finance to complex development funding, having Meridian on your side gives you a genuine strategic edge. For a complete property solution, our Buyer's Advocates also deliver independent advisory services to maximise your residential or commercial portfolio."
    ],
    image: "https://images.unsplash.com/photo-1580894732444-8fecef2601da?auto=format&fit=crop&q=80&w=800",
    buttonText: "About Us",
    alignLeft: true
  }
];
