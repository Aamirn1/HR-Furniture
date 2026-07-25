// Centralized site content for HR Furniture

export const siteConfig = {
  name: 'HR Furniture',
  tagline: 'Crafted For Beautiful Living',
  phone: '+1 (415) 555-0192',
  whatsapp: '+14155550192',
  email: 'hello@hrfurniture.com',
  address: '880 Walnut Avenue, Design District, San Francisco, CA 94102',
  hours: 'Mon – Sat: 10:00 AM – 7:00 PM · Sun: By Appointment',
  social: {
    instagram: 'https://instagram.com',
    pinterest: 'https://pinterest.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },
} as const

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Collections', href: '#collections' },
  { label: 'About', href: '#about' },
  { label: 'Custom Orders', href: '#sofa-builder' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
] as const

export type Category = {
  id: string
  name: string
  blurb: string
  count: number
  gradient: string
  tag: string
  image: string
}

export const categories: Category[] = [
  {
    id: 'luxury-sofas',
    name: 'Luxury Sofas',
    blurb: 'Hand-tufted, kiln-dried hardwood frames wrapped in premium fabrics.',
    count: 48,
    gradient: 'from-[#7a5230] to-[#c88a5a]',
    tag: 'Signature',
    image: '/scenes/cat-luxury.jpg',
  },
  {
    id: 'l-shape',
    name: 'L-Shape Sofas',
    blurb: 'Modular configurations that anchor contemporary living rooms.',
    count: 24,
    gradient: 'from-[#3e2a20] to-[#7a5230]',
    tag: 'Modular',
    image: '/scenes/cat-lshape.jpg',
  },
  {
    id: 'sectionals',
    name: 'Sectionals',
    blurb: 'Generous proportions, deep seats, and an invite to gather.',
    count: 36,
    gradient: 'from-[#c88a5a] to-[#d8b36a]',
    tag: 'Family',
    image: '/scenes/cat-sectional.jpg',
  },
  {
    id: 'recliners',
    name: 'Recliners',
    blurb: 'Power-assisted recline engineered for whisper-quiet comfort.',
    count: 18,
    gradient: 'from-[#7a5230] to-[#3e2a20]',
    tag: 'Comfort',
    image: '/scenes/cat-recliner.jpg',
  },
  {
    id: 'bedroom',
    name: 'Bedroom Furniture',
    blurb: 'Upholstered beds and nightstands in solid walnut and oak.',
    count: 32,
    gradient: 'from-[#3e2a20] to-[#c88a5a]',
    tag: 'Restful',
    image: '/scenes/cat-bedroom.jpg',
  },
  {
    id: 'dining',
    name: 'Dining Furniture',
    blurb: 'Sculptural tables and chairs that elevate every meal.',
    count: 27,
    gradient: 'from-[#c88a5a] to-[#7a5230]',
    tag: 'Gather',
    image: '/scenes/cat-dining.jpg',
  },
  {
    id: 'tv-consoles',
    name: 'TV Consoles',
    blurb: 'Hand-finished media cabinets in matte walnut and brass.',
    count: 14,
    gradient: 'from-[#7a5230] to-[#d8b36a]',
    tag: 'Storage',
    image: '/scenes/cat-tv-console.jpg',
  },
]

export type Product = {
  id: string
  name: string
  collection: string
  price: number
  originalPrice?: number
  fabric: string
  seating: string
  tone: string
  badge?: string
  accent: string
  blurb: string
  image: string
}

export const products: Product[] = [
  {
    id: 'aspen-lounge',
    name: 'Aspen Lounge Sofa',
    collection: 'Signature',
    price: 3890,
    originalPrice: 4420,
    fabric: 'Boucle Ivory',
    seating: '3-Seater',
    tone: 'light',
    badge: 'Bestseller',
    accent: '#d8b36a',
    blurb: 'A sculptural three-seater wrapped in hand-woven ivory boucle, with deep feather-down cushions.',
    image: '/products/aspen-lounge.jpg',
  },
  {
    id: 'monaco-sectional',
    name: 'Monaco Sectional',
    collection: 'Modular',
    price: 6240,
    fabric: 'Linen Sand',
    seating: 'L-Shape · 5 Seat',
    tone: 'light',
    badge: 'New',
    accent: '#c88a5a',
    blurb: 'A modular L-shape sectional with chaise extension and down-blend seat cushions.',
    image: '/products/monaco-sectional.jpg',
  },
  {
    id: 'hudson-velvet',
    name: 'Hudson Velvet Sofa',
    collection: 'Heritage',
    price: 4720,
    fabric: 'Velvet Walnut',
    seating: '3-Seater',
    tone: 'dark',
    accent: '#7a5230',
    blurb: 'Plush emerald-cut velvet over a kiln-dried beech frame with brass sabre legs.',
    image: '/products/hudson-velvet.jpg',
  },
  {
    id: 'kyoto-low',
    name: 'Kyoto Low Sofa',
    collection: 'Quiet',
    price: 4180,
    fabric: 'Wool Oat',
    seating: '3-Seater',
    tone: 'light',
    accent: '#c88a5a',
    blurb: 'Low-profile silhouette inspired by Japanese minimalism with hand-stitched seams.',
    image: '/products/kyoto-low.jpg',
  },
  {
    id: 'savona-recliner',
    name: 'Savona Power Recliner',
    collection: 'Comfort',
    price: 2380,
    fabric: 'Leather Cognac',
    seating: '1-Seater',
    tone: 'dark',
    badge: 'Engineered',
    accent: '#7a5230',
    blurb: 'Power headrest and footrest in full-grain cognac leather with USB-C integration.',
    image: '/products/savona-recliner.jpg',
  },
  {
    id: 'riviera-corner',
    name: 'Riviera Corner Sofa',
    collection: 'Modular',
    price: 6890,
    fabric: 'Linen Cream',
    seating: 'Corner · 6 Seat',
    tone: 'light',
    accent: '#d8b36a',
    blurb: 'A sweeping corner sofa with removable covers and a deep 92cm seat depth.',
    image: '/products/riviera-corner.jpg',
  },
]

export type WhyItem = {
  id: string
  title: string
  description: string
  icon: 'sparkles' | 'hammer' | 'palette' | 'gem' | 'truck' | 'shield'
}

export const whyItems: WhyItem[] = [
  {
    id: 'materials',
    title: 'Premium Materials',
    description:
      'We source kiln-dried hardwoods, full-grain leathers, and milled fabrics from European tanneries and Belgian mills.',
    icon: 'sparkles',
  },
  {
    id: 'craftsmanship',
    title: 'Expert Craftsmanship',
    description:
      'Each frame is hand-assembled by master upholsterers with 20+ years of workshop experience in fine furniture making.',
    icon: 'hammer',
  },
  {
    id: 'custom',
    title: 'Custom Designs',
    description:
      'Configure any sofa to your room — choose the depth, fabric, leg style, and finish through our bespoke service.',
    icon: 'palette',
  },
  {
    id: 'affordable',
    title: 'Affordable Luxury',
    description:
      'Direct-from-workshop pricing means you invest in materials and craft, not retail markup or import overheads.',
    icon: 'gem',
  },
  {
    id: 'delivery',
    title: 'Fast Delivery',
    description:
      'White-glove delivery in 2–4 weeks for stocked pieces and full assembly, placement, and packaging removal.',
    icon: 'truck',
  },
  {
    id: 'warranty',
    title: 'Long-lasting Quality',
    description:
      'Every sofa is backed by a 10-year frame warranty and a lifetime reupholstery program for your changing tastes.',
    icon: 'shield',
  },
]

export const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 5000, suffix: '+', label: 'Happy Customers' },
  { value: 1000, suffix: '+', label: 'Custom Projects' },
  { value: 99, suffix: '%', label: 'Customer Satisfaction' },
]

export type Testimonial = {
  id: string
  name: string
  role: string
  location: string
  quote: string
  rating: number
  initials: string
  accent: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Amara Whitfield',
    role: 'Interior Designer',
    location: 'New York, NY',
    quote:
      'The Aspen Lounge Sofa completely transformed our client’s penthouse. The boucle fabric is impossibly soft and the craftsmanship is the best I’ve sourced in 12 years.',
    rating: 5,
    initials: 'AW',
    accent: '#7a5230',
  },
  {
    id: 't2',
    name: 'Daniel Okafor',
    role: 'Architect',
    location: 'Los Angeles, CA',
    quote:
      'HR Furniture built a custom 4.6m sectional for our living room. The configurator let me specify every dimension and the result fits like it was grown into the space.',
    rating: 5,
    initials: 'DO',
    accent: '#c88a5a',
  },
  {
    id: 't3',
    name: 'Priya Venkatraman',
    role: 'Homeowner',
    location: 'Austin, TX',
    quote:
      'White-glove delivery was flawless. They assembled the Monaco Sectional in 20 minutes, placed it perfectly, and removed every piece of packaging. Worth every penny.',
    rating: 5,
    initials: 'PV',
    accent: '#d8b36a',
  },
  {
    id: 't4',
    name: 'Marcus Bellini',
    role: 'Restaurant Owner',
    location: 'San Francisco, CA',
    quote:
      'We ordered 14 Savona recliners for our private screening room. Whisper-quiet, impossibly comfortable, and the cognac leather has aged beautifully over 18 months.',
    rating: 5,
    initials: 'MB',
    accent: '#3e2a20',
  },
  {
    id: 't5',
    name: 'Eleanor Cheswick',
    role: 'Stylist',
    location: 'Chicago, IL',
    quote:
      'The Hudson Velvet Sofa photographs like a dream. The walnut velvet is rich without being heavy and the brass sabre legs are a genuinely elegant detail.',
    rating: 5,
    initials: 'EC',
    accent: '#7a5230',
  },
]

export type GalleryItem = {
  id: string
  title: string
  category: string
  location: string
  collection: string
  size: 'tall' | 'wide' | 'square' | 'big'
  accent: string
  image: string
}

export const galleryItems: GalleryItem[] = [
  { id: 'g1', title: 'Walnut Living Room', category: 'Living', location: 'Palo Alto, CA', collection: 'Aspen', size: 'big', accent: '#7a5230', image: '/scenes/gallery-1.jpg' },
  { id: 'g2', title: 'Cream Penthouse', category: 'Interior', location: 'Manhattan, NY', collection: 'Monaco', size: 'tall', accent: '#c88a5a', image: '/scenes/gallery-2.jpg' },
  { id: 'g3', title: 'Library Corner', category: 'Reading Nook', location: 'Boston, MA', collection: 'Hudson', size: 'square', accent: '#3e2a20', image: '/scenes/gallery-3.jpg' },
  { id: 'g4', title: 'Sunlit Conservatory', category: 'Sunroom', location: 'Santa Barbara, CA', collection: 'Riviera', size: 'wide', accent: '#d8b36a', image: '/scenes/gallery-4.jpg' },
  { id: 'g5', title: 'Coastal Retreat', category: 'Vacation Home', location: 'Big Sur, CA', collection: 'Kyoto', size: 'tall', accent: '#c88a5a', image: '/scenes/gallery-5.jpg' },
  { id: 'g6', title: 'Screening Room', category: 'Media Room', location: 'Aspen, CO', collection: 'Savona', size: 'square', accent: '#7a5230', image: '/scenes/cat-recliner.jpg' },
  { id: 'g7', title: 'Modern Loft', category: 'Loft', location: 'Brooklyn, NY', collection: 'Aspen', size: 'wide', accent: '#3e2a20', image: '/scenes/gallery-1.jpg' },
  { id: 'g8', title: 'Garden Room', category: 'Sunroom', location: 'Seattle, WA', collection: 'Monaco', size: 'big', accent: '#d8b36a', image: '/scenes/gallery-6.jpg' },
]

export type ProcessStep = {
  id: string
  step: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'p1',
    step: '01',
    title: 'Consultation',
    description: 'We visit your space (or review floor plans remotely) and discuss aesthetic, function, and budget.',
  },
  {
    id: 'p2',
    step: '02',
    title: 'Design',
    description: 'Our designers translate the brief into fabric, finish, and dimension selections, often with 3D previews.',
  },
  {
    id: 'p3',
    step: '03',
    title: 'Manufacturing',
    description: 'Master upholsterers hand-build your piece in our workshop, from frame to final stitch.',
  },
  {
    id: 'p4',
    step: '04',
    title: 'Quality Check',
    description: 'Every sofa passes a 14-point inspection covering frame integrity, seam tension, and finish.',
  },
  {
    id: 'p5',
    step: '05',
    title: 'Delivery',
    description: 'White-glove delivery with full assembly, placement, and packaging removal — typically 2–4 weeks.',
  },
]

export const faqs = [
  {
    q: 'How long does a custom sofa take to make?',
    a: 'Custom sofas typically take 3–5 weeks from design sign-off to delivery, depending on fabric availability and complexity. Stocked pieces ship within 2–4 weeks. We will provide a precise lead time at the design stage and keep you updated at every milestone.',
  },
  {
    q: 'Can I choose my own fabric or send you a sample?',
    a: 'Absolutely. We work with a curated library of 600+ fabrics from Belgian, Italian, and Scandinavian mills, but we also accept customer-supplied fabrics (COM — customer’s own material) subject to a durability check. Send us a swatch and we will evaluate it within 48 hours.',
  },
  {
    q: 'Do you offer white-glove delivery and assembly?',
    a: 'Yes — every order includes complimentary white-glove delivery within 250km of our workshop. Our team will schedule a 2-hour window, assemble your sofa in-room, place it exactly where you’d like, and remove all packaging. Stairway carries above the 3rd floor may incur a small surcharge.',
  },
  {
    q: 'What is your warranty policy?',
    a: 'Every HR Furniture sofa carries a 10-year warranty on the hardwood frame and a 5-year warranty on suspension, cushions, and mechanisms. Fabrics are covered for 2 years against manufacturing defects. We also offer a lifetime reupholstery program so your sofa can evolve with your space.',
  },
  {
    q: 'Can I see the sofas in person before ordering?',
    a: 'Yes. Our San Francisco showroom is open Tuesday–Saturday, 10am–7pm. We also offer private appointments, virtual walkthroughs, and free fabric swatch packets mailed to your home anywhere in the continental US.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'We currently ship within the United States and Canada. For international inquiries, please contact our concierge team — we can often arrange custom crating and freight forwarding for select destinations at an additional cost.',
  },
]

export type Material = {
  id: string
  name: string
  description: string
  swatch: string
  type: 'fabric' | 'leather' | 'wood'
}

export const materials: Material[] = [
  { id: 'boucle', name: 'Boucle Ivory', description: 'Hand-woven textured loop yarn, 78% wool 22% viscose.', swatch: 'linear-gradient(135deg, #f4ede0 0%, #e8dcc4 100%)', type: 'fabric' },
  { id: 'linen', name: 'Belgian Linen', description: 'Stone-washed heavy linen, 380gsm, OEKO-TEX certified.', swatch: 'linear-gradient(135deg, #e8e2d4 0%, #d8cfb8 100%)', type: 'fabric' },
  { id: 'velvet', name: 'Walnut Velvet', description: 'Italian milled cotton blend velvet, deep pile.', swatch: 'linear-gradient(135deg, #6e4530 0%, #4a2e1f 100%)', type: 'fabric' },
  { id: 'wool', name: 'Oat Wool', description: 'Felted pure new wool from Yorkshire mills.', swatch: 'linear-gradient(135deg, #ddd2bc 0%, #c5b89b 100%)', type: 'fabric' },
  { id: 'leather-cognac', name: 'Cognac Leather', description: 'Full-grain aniline leather, vegetable tanned.', swatch: 'linear-gradient(135deg, #b8763f 0%, #8a5328 100%)', type: 'leather' },
  { id: 'leather-cocoa', name: 'Cocoa Leather', description: 'Semi-aniline leather with a soft matte hand.', swatch: 'linear-gradient(135deg, #5a3a28 0%, #3e2818 100%)', type: 'leather' },
  { id: 'walnut', name: 'Walnut Hardwood', description: 'FSC-certified American black walnut, oiled finish.', swatch: 'linear-gradient(135deg, #7a4f30 0%, #4a2e1c 100%)', type: 'wood' },
  { id: 'oak', name: 'White Oak', description: 'Quarter-sawn white oak with a hand-rubbed matte oil.', swatch: 'linear-gradient(135deg, #c8a878 0%, #a07e54 100%)', type: 'wood' },
]

export const sofaBuilderOptions = {
  shapes: [
    { id: '3seat', name: '3-Seater', dims: '220 × 95 × 78 cm' },
    { id: '4seat', name: '4-Seater', dims: '280 × 95 × 78 cm' },
    { id: 'lshape', name: 'L-Shape', dims: '280 × 180 × 78 cm' },
    { id: 'loveseat', name: 'Loveseat', dims: '160 × 95 × 78 cm' },
  ],
  fabrics: [
    { id: 'boucle', name: 'Boucle', color: '#f0e6d2' },
    { id: 'linen', name: 'Linen', color: '#e3dac4' },
    { id: 'velvet', name: 'Velvet', color: '#5a3a28' },
    { id: 'wool', name: 'Wool', color: '#cdbf9d' },
    { id: 'leather', name: 'Leather', color: '#8a5328' },
  ],
  woodFinishes: [
    { id: 'walnut', name: 'Walnut', color: '#5a3a28' },
    { id: 'oak', name: 'Oak', color: '#c8a878' },
    { id: 'matte-black', name: 'Matte Black', color: '#1d1d1d' },
    { id: 'brass', name: 'Brass', color: '#c8a065' },
  ],
  legStyles: [
    { id: 'sabre', name: 'Sabre' },
    { id: 'tapered', name: 'Tapered' },
    { id: 'block', name: 'Block' },
    { id: 'metal-stiletto', name: 'Stiletto' },
  ],
  sizes: [
    { id: 'compact', name: 'Compact', note: 'Depth 88cm' },
    { id: 'standard', name: 'Standard', note: 'Depth 95cm' },
    { id: 'lounge', name: 'Lounge', note: 'Depth 110cm' },
  ],
}

export const featuredLogos = [
  'Architectural Digest',
  'Dwell',
  'Wallpaper*',
  'Elle Decor',
  'House & Garden',
  'Dezeen',
]
