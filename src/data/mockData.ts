import { Business, CategoryType, Enquiry, ChoiceLoopRecord } from '../types';

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'biz-1',
    name: 'Shree Balaji Textiles',
    slug: 'shree-balaji-textiles-sonipat',
    logo: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Leading Woven Cotton & Poly-Cotton Fabric Mills',
    description: 'Specializing in high-tensile 100% combed cotton and blended grey & dyed fabric for shirting, suiting, and industrial uniforms. Over 28 years of spinning and weaving excellence in the Sonipat textile hub.',
    category: 'Clothing & Textiles',
    businessType: 'Manufacturer',
    location: {
      city: 'Sonipat',
      state: 'Haryana',
      district: 'Sonipat Industrial Area Phase-2',
      pincode: '131001',
      address: 'Plot 48-52, Sector 38, Phase-2 Industrial Area, Sonipat'
    },
    contact: {
      phone: '+91 98120 44812',
      email: 'sales@balajitexsonipat.in',
      whatsapp: '+91 98120 44812',
      gstin: '06AAACB4918C1ZF',
      udyamNo: 'UDYAM-HR-18-0041289'
    },
    establishedYear: 1996,
    employeeCount: '85-120 employees',
    verificationStatus: 'verified',
    verificationDocs: [
      { type: 'GSTIN Registration Certificate', docNumber: '06AAACB4918C1ZF', submittedAt: '2024-03-15' },
      { type: 'Udyam MSME Certificate', docNumber: 'UDYAM-HR-18-0041289', submittedAt: '2024-03-16' },
      { type: 'Factory Inspector License', docNumber: 'FAC-HR-SNP-2022-89', submittedAt: '2024-03-18' }
    ],
    rating: 4.8,
    reviewCount: 42,
    startingPrice: 145,
    startingPriceUnit: 'per meter',
    minMoq: 200,
    averageDeliveryDays: 8,
    customisationAvailable: true,
    productionCapacity: '1,50,000 meters / month',
    capabilities: [
      'Reactive & VAT Piece Dyeing',
      'Custom Pantone Colour Matching',
      'Flame-retardant & Anti-microbial Finishes',
      'Lab-dip testing within 48 hours'
    ],
    certifications: ['OEKO-TEX Standard 100', 'ISO 9001:2015', 'BCI Cotton Certified'],
    products: [
      {
        id: 'prod-101',
        businessId: 'biz-1',
        name: 'Superfine 60s Combed Cotton Cambric',
        category: 'Clothing & Textiles',
        description: 'Lightweight, ultra-breathable pure cotton fabric ideal for premium kurtas, shirts, and summer dresses.',
        price: 145,
        priceUnit: 'per meter',
        moq: 200,
        deliveryDays: 7,
        inStock: true,
        customisationAvailable: true,
        warranty: 'Fabric shrinkage < 2% guaranteed',
        specifications: {
          'Fabric Composition': '100% Combed Cotton',
          'Yarn Count': '60s x 60s Warp/Weft',
          'GSM': '85-90 GSM',
          'Width': '58 inches (147 cm)',
          'Weave': 'Plain Cambric Weave',
          'Color Fastness': 'Grade 4+ Reactive Dye'
        },
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
        tags: ['Cotton', 'Cambric', 'Shirting', 'Kurta']
      },
      {
        id: 'prod-102',
        businessId: 'biz-1',
        name: 'Heavy-Duty 240 GSM Drill Fabric',
        category: 'Clothing & Textiles',
        description: 'High tear-resistant poly-cotton drill woven specifically for corporate workwear, boiler suits, and aprons.',
        price: 185,
        priceUnit: 'per meter',
        moq: 300,
        deliveryDays: 10,
        inStock: true,
        customisationAvailable: true,
        warranty: '50 Industrial Wash Cycles',
        specifications: {
          'Fabric Composition': '65% Cotton, 35% Polyester',
          'Yarn Count': '2/20s x 16s',
          'GSM': '240 GSM',
          'Width': '60 inches',
          'Weave': '3/1 Left Hand Twill',
          'Color Fastness': 'Indanthrene VAT dyed Grade 5'
        },
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
        tags: ['Drill', 'Workwear', 'Uniform', 'Twill']
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Rajiv Mehra',
        company: 'Vogue Apparels, Ludhiana',
        rating: 5,
        comment: 'Consistent GSM and shade matching across 12,000 meters. Shree Balaji is our go-to mill for North India distribution.',
        date: '2024-09-12',
        verifiedBuyer: true
      },
      {
        id: 'rev-2',
        author: 'Sumantha Sen',
        company: 'Kolkata Uniform Mart',
        rating: 4.5,
        comment: 'Very accommodating with our custom corporate blue dye batch. Delivered 2 days ahead of target schedule.',
        date: '2024-10-04',
        verifiedBuyer: true
      }
    ],
    choiceLoopStats: {
      totalResponses: 38,
      reasonsBreakdown: {
        'Better quality': 18,
        'Faster delivery': 10,
        'Better price': 6,
        'Lower MOQ': 3,
        'Better ratings or trust': 1,
        'Other': 0
      }
    },
    isFeatured: true
  },
  {
    id: 'biz-2',
    name: 'UrbanWood Furniture & Modulars',
    slug: 'urbanwood-furniture-delhi',
    logo: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Custom Office Workstations, Desks & Commercial Interiors',
    description: 'Kirti Nagar’s leading modular workstation fabricator and solid hardwood supplier. Delivering turnkey office furniture, modular partitions, executive desks, and conference suites for Indian enterprises.',
    category: 'Furniture',
    businessType: 'Manufacturer',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      district: 'Kirti Nagar Furniture Block',
      pincode: '110015',
      address: 'WHS Timber Market, Block-B, Kirti Nagar, New Delhi'
    },
    contact: {
      phone: '+91 98112 77310',
      email: 'projects@urbanwoodcommercial.com',
      whatsapp: '+91 98112 77310',
      gstin: '07ABDFU8810P1Z4',
      udyamNo: 'UDYAM-DL-03-0019284'
    },
    establishedYear: 2008,
    employeeCount: '45-60 technicians',
    verificationStatus: 'verified',
    verificationDocs: [
      { type: 'GSTIN Registration', docNumber: '07ABDFU8810P1Z4', submittedAt: '2024-01-20' },
      { type: 'BIFMA Quality Test Certificate', docNumber: 'BIFMA-X5.5-2023', submittedAt: '2024-01-22' }
    ],
    rating: 4.7,
    reviewCount: 36,
    startingPrice: 3800,
    startingPriceUnit: 'per linear desk',
    minMoq: 4,
    averageDeliveryDays: 12,
    customisationAvailable: true,
    productionCapacity: '650 modular units / month',
    capabilities: [
      'CNC Edge-banding & Pre-laminated Particle Board routing',
      'Cold-rolled MS powder-coated heavy steel understructures',
      'Integrated raceways for wire management & power sockets',
      'Acoustic felt desk divider integration'
    ],
    certifications: ['ISO 14001:2015', 'FSC Certified Wood', 'BIFMA Compliant'],
    products: [
      {
        id: 'prod-201',
        businessId: 'biz-2',
        name: 'Linear 4-Seater Modular Cluster Workstation',
        category: 'Furniture',
        description: 'Heavy duty 25mm pre-laminated Action TESA particle board with 2mm PVC edge band and 50x50mm triangular steel loop legs.',
        price: 16500,
        priceUnit: 'per 4-seater set',
        moq: 2,
        deliveryDays: 10,
        inStock: true,
        customisationAvailable: true,
        warranty: '5-Year Structural Warranty',
        specifications: {
          'Top Material': '25mm Pre-lam Action TESA Grade E1',
          'Frame Understructure': '50mm x 50mm MS Powder Coated 1.6mm gauge',
          'Dimensions per Seat': '1200mm (L) x 600mm (W) x 750mm (H)',
          'Divider Screen': 'Frosted Acrylic / Sound-absorbent Fabric Pinup',
          'Cable Management': 'Concealed Dual Raceway with flip-up aluminium box',
          'Assembly': 'Knockdown modular (Tool-free bracket system)'
        },
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
        tags: ['Workstation', 'Modular Desk', 'Office Cluster', 'Kirti Nagar']
      },
      {
        id: 'prod-202',
        businessId: 'biz-2',
        name: 'Executive 6ft Solid Sheesham Conference Table',
        category: 'Furniture',
        description: 'Handcrafted seasoned Indian Rosewood (Sheesham) with natural polyurethane matte clear coat finish.',
        price: 24800,
        priceUnit: 'per table',
        moq: 1,
        deliveryDays: 14,
        inStock: false,
        customisationAvailable: true,
        warranty: '10-Year Termite & Wood Crack Warranty',
        specifications: {
          'Top Material': '100% Solid Seasoned Sheesham Wood (40mm thickness)',
          'Dimensions': '1800mm (L) x 900mm (W) x 760mm (H)',
          'Finish': 'Italian Polyurethane Matte Walnut finish',
          'Moisture Content': '< 10% Kiln-dried seasoning',
          'Seating Capacity': '6 to 8 people',
          'Assembly': 'Flatpack with reinforced dowel & hex bolts'
        },
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
        tags: ['Sheesham', 'Conference Table', 'Executive', 'Wood']
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Arun Chopra',
        company: 'ScaleUp Co-working, Gurugram',
        rating: 5,
        comment: 'Furnished 180 seats across two floors. Precise dimensions, flawless powder coating, zero wobbles.',
        date: '2024-08-19',
        verifiedBuyer: true
      }
    ],
    choiceLoopStats: {
      totalResponses: 29,
      reasonsBreakdown: {
        'Better quality': 14,
        'Better price': 7,
        'Faster delivery': 4,
        'Lower MOQ': 3,
        'Better ratings or trust': 1,
        'Other': 0
      }
    },
    isFeatured: true
  },
  {
    id: 'biz-3',
    name: 'Nova Electrical Traders & Switchgears',
    slug: 'nova-electrical-panipat',
    logo: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Authorized Industrial Switchgears, Copper Cables & Panels',
    description: 'Wholesale distributor for leading industrial electrical brands (L&T, Schneider, Polycab) and manufacturer of custom LT distribution panels, changeovers, and capacitor banks in Panipat.',
    category: 'Electrical Supplies',
    businessType: 'Wholesaler',
    location: {
      city: 'Panipat',
      state: 'Haryana',
      district: 'GT Road Electrical Market',
      pincode: '132103',
      address: 'Shop 14-16, Guru Nanak Electrical Complex, Near Old Bus Stand, Panipat'
    },
    contact: {
      phone: '+91 94160 38290',
      email: 'orders@novaelectricals.co.in',
      whatsapp: '+91 94160 38290',
      gstin: '06BZXPN3319L1ZM',
      udyamNo: 'UDYAM-HR-19-0008821'
    },
    establishedYear: 2004,
    employeeCount: '20-30 staff',
    verificationStatus: 'verified',
    verificationDocs: [
      { type: 'GSTIN Certificate', docNumber: '06BZXPN3319L1ZM', submittedAt: '2024-02-11' },
      { type: 'Authorized Distributorship License', docNumber: 'AUTH-LNT-2023-99', submittedAt: '2024-02-12' }
    ],
    rating: 4.6,
    reviewCount: 29,
    startingPrice: 480,
    startingPriceUnit: 'per unit',
    minMoq: 10,
    averageDeliveryDays: 3,
    customisationAvailable: true,
    productionCapacity: '50 LT Panels / month',
    capabilities: [
      'Immediate ex-stock dispatch from 15,000 sq.ft warehouse',
      'Fabrication of CPRI tested Motor Control Center (MCC) panels',
      'Harmonic analysis and Power Factor Correction advice',
      'Test certificates provided with every drum of copper cable'
    ],
    certifications: ['CPRI Type Tested Panels', 'ISO 9001:2015', 'Authorized L&T Solution Partner'],
    products: [
      {
        id: 'prod-301',
        businessId: 'biz-3',
        name: '4-Pole 63A 10kA Industrial MCB / Isolator',
        category: 'Electrical Supplies',
        description: 'IS/IEC 60898-1 certified miniature circuit breaker with bi-connect terminals, suitable for commercial AC and heavy machinery.',
        price: 680,
        priceUnit: 'per unit',
        moq: 10,
        deliveryDays: 2,
        inStock: true,
        customisationAvailable: false,
        warranty: '2-Year Manufacturer Replacement Warranty',
        specifications: {
          'Rated Current': '63 Ampere',
          'Poles': '4 Pole (3 Phase + Neutral)',
          'Breaking Capacity': '10 kA at 415V AC',
          'Standard': 'IS/IEC 60898-1 & IEC 60947-2',
          'Terminal Capacity': '35 sq.mm Cable',
          'Tripping Curve': 'C-Curve (Inductive load / Motors)'
        },
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop&q=80',
        tags: ['MCB', 'Switchgear', 'Panipat', '4 Pole', 'Industrial']
      },
      {
        id: 'prod-302',
        businessId: 'biz-3',
        name: 'FR-LSH Multistrand Pure Copper Cable (4 sq.mm x 100m Drum)',
        category: 'Electrical Supplies',
        description: 'Flame Retardant Low Smoke & Halogen 1100V grade pure electrolytic bright annealed copper wire.',
        price: 3450,
        priceUnit: 'per 100m box',
        moq: 5,
        deliveryDays: 2,
        inStock: true,
        customisationAvailable: false,
        warranty: '100% Genuine ISI Marked with batch test report',
        specifications: {
          'Core Size': '4.0 sq.mm',
          'Conductor': 'Class 5 Flexible Electrolytic Copper (> 99.97% purity)',
          'Insulation': 'Type A FR-LSH PVC compound',
          'Voltage Rating': '1100 Volts AC',
          'Oxygen Index': '> 29%',
          'Coil Length': '100 meters standard blister carton'
        },
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
        tags: ['Copper Wire', 'FRLSH', 'Electrical Cable', 'Panipat']
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Dinesh Singla',
        company: 'Singla Yarn Spinners, Panipat',
        rating: 5,
        comment: 'Nova always holds heavy stock. Whenever a boiler breaker trips or pump burns, they deliver genuine L&T parts within 4 hours.',
        date: '2024-09-28',
        verifiedBuyer: true
      }
    ],
    choiceLoopStats: {
      totalResponses: 25,
      reasonsBreakdown: {
        'Faster delivery': 12,
        'Better price': 8,
        'Better ratings or trust': 3,
        'Lower MOQ': 2,
        'Better quality': 0,
        'Other': 0
      }
    },
    isFeatured: true
  },
  {
    id: 'biz-4',
    name: 'Bharat Packaging Works',
    slug: 'bharat-packaging-gurugram',
    logo: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Custom Corrugated Cartons, Die-Cut Boxes & E-commerce Mailers',
    description: 'High-speed automated 5-ply and 3-ply corrugated box manufacturing plant in Gurugram. Serving e-commerce giants, auto component suppliers, and FMCG brands with zero-defect box packaging.',
    category: 'Packaging',
    businessType: 'Manufacturer',
    location: {
      city: 'Gurugram',
      state: 'Haryana',
      district: 'Udyog Vihar Phase-5',
      pincode: '122016',
      address: 'Plot 312, Phase-V, Udyog Vihar, Gurugram'
    },
    contact: {
      phone: '+91 98188 92015',
      email: 'quotes@bharatpackagingworks.com',
      whatsapp: '+91 98188 92015',
      gstin: '06AACFB5582Q1ZG',
      udyamNo: 'UDYAM-HR-05-0038102'
    },
    establishedYear: 2011,
    employeeCount: '70-90 factory staff',
    verificationStatus: 'verified',
    verificationDocs: [
      { type: 'GSTIN Certificate', docNumber: '06AACFB5582Q1ZG', submittedAt: '2024-01-10' },
      { type: 'Pollution Control Board Consent to Operate', docNumber: 'HSPCB-GGN-2023-45', submittedAt: '2024-01-15' }
    ],
    rating: 4.8,
    reviewCount: 51,
    startingPrice: 22,
    startingPriceUnit: 'per box',
    minMoq: 500,
    averageDeliveryDays: 5,
    customisationAvailable: true,
    productionCapacity: '12,00,000 corrugated boxes / month',
    capabilities: [
      'Automatic 5-Ply Corrugation Line with B and C flute profiles',
      '4-Color Flexographic High-Resolution In-line Box Printing',
      'Custom Flatbed & Rotary Die Cutting for Self-Locking Mailers',
      'Moisture-resistant kraft coating for cold storage consignments'
    ],
    certifications: ['ISO 9001:2015', 'FSC Recycled Kraft Paper', 'ROHS Compliant Inks'],
    products: [
      {
        id: 'prod-401',
        businessId: 'biz-4',
        name: 'Heavy Duty 5-Ply Master Shipping Carton (18x12x12 inch)',
        category: 'Packaging',
        description: 'Virgin kraft paper fluting with high bursting factor (BF 22), engineered to withstand multi-tier pallet stacking and long haul transport.',
        price: 36,
        priceUnit: 'per box',
        moq: 500,
        deliveryDays: 5,
        inStock: true,
        customisationAvailable: true,
        warranty: 'Bursting Strength > 14 kg/cm² certified',
        specifications: {
          'Ply Count': '5-Ply (Double Wall)',
          'Flute Type': 'B + C Flute Combination',
          'Paper Specs': 'Outer 180 GSM Virgin Kraft, Fluting 140 GSM Semi-chemical',
          'Bursting Strength': '14.5 kg/cm² (Burst Factor 22)',
          'Dimensions (LxBxH)': '18" x 12" x 12" (457 x 305 x 305 mm)',
          'Printing': 'Up to 2-color Flexo included at MOQ'
        },
        image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
        tags: ['Corrugated Box', '5 Ply', 'Gurugram', 'Shipping Carton']
      },
      {
        id: 'prod-402',
        businessId: 'biz-4',
        name: 'Die-Cut Self-Locking E-commerce Mailer Box (10x8x4 inch)',
        category: 'Packaging',
        description: 'Premium white-coated outer kraft box with clean folding tabs and tear-strip option for apparel and cosmetics dispatch.',
        price: 24,
        priceUnit: 'per box',
        moq: 1000,
        deliveryDays: 6,
        inStock: true,
        customisationAvailable: true,
        warranty: 'Precision die-cut tolerance ±1mm',
        specifications: {
          'Ply Count': '3-Ply (E-Flute Microcorrugated)',
          'Outer Liner': '200 GSM White Bleached Kraft',
          'Inner Liner': '150 GSM Natural Kraft',
          'Closure Style': 'Front Tuck-in / Self Locking Mailer (FEFCO 0427)',
          'Dimensions': '10" x 8" x 4" (254 x 203 x 101 mm)',
          'Custom Print': 'Full CMYK Inside/Outside printing available'
        },
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
        tags: ['Mailer Box', 'E-commerce', 'Die Cut', 'Packaging']
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Kavita Sundaram',
        company: 'EarthGlow Organics, Delhi',
        rating: 5,
        comment: 'Zero transit damage across 50,000 shipments. The flexo print is crisp and the box edges do not fray.',
        date: '2024-10-18',
        verifiedBuyer: true
      }
    ],
    choiceLoopStats: {
      totalResponses: 44,
      reasonsBreakdown: {
        'Better quality': 20,
        'Better price': 12,
        'Faster delivery': 8,
        'Lower MOQ': 3,
        'Better ratings or trust': 1,
        'Other': 0
      }
    },
    isFeatured: true
  },
  {
    id: 'biz-5',
    name: 'Sunrise Garments & Corporate Uniforms',
    slug: 'sunrise-garments-rohtak',
    logo: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Bulk Corporate Polos, Industrial Aprons & School Uniforms',
    description: 'Direct manufacturer of customized apparel for institutions, manufacturing plants, hotel chains, and retail networks. In-house computerised embroidery and heat-transfer screen printing facilities in Rohtak.',
    category: 'Clothing & Textiles',
    businessType: 'Manufacturer',
    location: {
      city: 'Rohtak',
      state: 'Haryana',
      district: 'IMT Rohtak Industrial Model Township',
      pincode: '124001',
      address: 'Plot 77, Sector 31-B, IMT Rohtak'
    },
    contact: {
      phone: '+91 98960 11943',
      email: 'uniforms@sunrisegarments.in',
      whatsapp: '+91 98960 11943',
      gstin: '06AMNPR7718J1Z9',
      udyamNo: 'UDYAM-HR-14-0012948'
    },
    establishedYear: 2014,
    employeeCount: '55 stitchers and cutters',
    verificationStatus: 'verified',
    verificationDocs: [
      { type: 'GSTIN Registration', docNumber: '06AMNPR7718J1Z9', submittedAt: '2024-02-05' },
      { type: 'MSME Udhyam Registration', docNumber: 'UDYAM-HR-14-0012948', submittedAt: '2024-02-06' }
    ],
    rating: 4.5,
    reviewCount: 28,
    startingPrice: 280,
    startingPriceUnit: 'per piece',
    minMoq: 50,
    averageDeliveryDays: 9,
    customisationAvailable: true,
    productionCapacity: '35,000 garments / month',
    capabilities: [
      '12-Head Tajima Computerized Embroidery Machinery',
      'Silicone Soft-Wash treatment for anti-pilling and hand-feel',
      'Bar-tacked stress points on factory jackets and safety vests',
      'Free customized digital mockup within 4 hours'
    ],
    certifications: ['SEDEX Smeta Audited', 'ISO 9001:2015'],
    products: [
      {
        id: 'prod-501',
        businessId: 'biz-5',
        name: 'Corporate 220 GSM Combed Cotton Pique Polo T-Shirt',
        category: 'Clothing & Textiles',
        description: 'Pre-shrunk, bio-washed honeycomb pique knit with ribbed collar and double needle hemmed sleeves. Includes chest logo embroidery.',
        price: 320,
        priceUnit: 'per piece',
        moq: 50,
        deliveryDays: 8,
        inStock: true,
        customisationAvailable: true,
        warranty: 'Zero color bleeding up to 40 washes',
        specifications: {
          'Fabric Composition': '100% Combed Cotton Pique (Matty)',
          'GSM': '220 GSM Bio-washed',
          'Collar & Cuff': 'Jacquard knitted ribbed spandex collar',
          'Buttons': '2-Button placket with horn/chalk buttons',
          'Embroidery': 'Up to 8,000 stitches chest logo included',
          'Sizes Available': 'XS to 5XL with custom size charting'
        },
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
        tags: ['Polo T-shirt', 'Uniform', 'Corporate', 'Rohtak', 'Embroidery']
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Vikas Hooda',
        company: 'Haryana Logistics Fleet',
        rating: 5,
        comment: 'Sunrise delivered 600 driver uniforms with reflective strips right on time before Diwali dispatch rush.',
        date: '2024-10-22',
        verifiedBuyer: true
      }
    ],
    choiceLoopStats: {
      totalResponses: 21,
      reasonsBreakdown: {
        'Lower MOQ': 9,
        'Better price': 6,
        'Faster delivery': 4,
        'Better quality': 2,
        'Better ratings or trust': 0,
        'Other': 0
      }
    },
    isFeatured: false
  },
  {
    id: 'biz-6',
    name: 'Apex Precast & Construction Materials',
    slug: 'apex-precast-manesar',
    logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Hydraulic Interlocking Pavers, Kerb Stones & Fly Ash Bricks',
    description: 'Heavy duty German vibrating table technology manufacturing M-30 to M-50 grade pavers, precast boundary walls, and stormwater drain covers for NCR infrastructure builders and private colonies.',
    category: 'Construction Materials',
    businessType: 'Manufacturer',
    location: {
      city: 'Gurugram',
      state: 'Haryana',
      district: 'Manesar Industrial Area',
      pincode: '122051',
      address: 'Khasra 28/4, Sector 8, IMT Manesar, Gurugram'
    },
    contact: {
      phone: '+91 99991 40228',
      email: 'sales@apexprecast.in',
      whatsapp: '+91 99991 40228',
      gstin: '06BAVPA9920K1ZW',
      udyamNo: 'UDYAM-HR-05-0091823'
    },
    establishedYear: 2016,
    employeeCount: '40 workers',
    verificationStatus: 'verified',
    verificationDocs: [
      { type: 'GSTIN Registration', docNumber: '06BAVPA9920K1ZW', submittedAt: '2024-03-01' },
      { type: 'BIS Paver Compressive Strength Certificate', docNumber: 'BIS-IS-15658-2023', submittedAt: '2024-03-02' }
    ],
    rating: 4.7,
    reviewCount: 31,
    startingPrice: 38,
    startingPriceUnit: 'per sq.ft',
    minMoq: 1000,
    averageDeliveryDays: 4,
    customisationAvailable: true,
    productionCapacity: '25,000 sq.ft pavers / day',
    capabilities: [
      'M-40 grade computerized batching plant',
      'Dual layer vibro-compaction with UV-resistant Bayer iron oxide pigments',
      'Fleet of 8 hydraulic tippers for site delivery across Delhi NCR',
      'NABL lab tested compressive and flexural strength reports'
    ],
    certifications: ['IS 15658:2006 (Paver Blocks)', 'IS 2185 (Hollow Blocks)'],
    products: [
      {
        id: 'prod-601',
        businessId: 'biz-6',
        name: 'M-40 Grade Zig-Zag Heavy Duty Interlocking Paver (80mm)',
        category: 'Construction Materials',
        description: 'Engineered specifically for heavy truck parking, petrol stations, and warehouse aprons with high skid resistance.',
        price: 46,
        priceUnit: 'per sq.ft',
        moq: 1000,
        deliveryDays: 3,
        inStock: true,
        customisationAvailable: true,
        warranty: '10-Year Anti-crumbling Guarantee',
        specifications: {
          'Concrete Grade': 'M-40 (Characteristic strength 40 N/mm²)',
          'Thickness': '80 mm (±2mm)',
          'Design Shape': 'Uni-shape Zig Zag / Interlocking',
          'Pigmentation': 'Imported Bayer German inorganic synthetic iron oxide',
          'Water Absorption': '< 4.5% by mass',
          'Abrasion Resistance': '< 2.0 mm mean wear depth'
        },
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?w=800&auto=format&fit=crop&q=80',
        tags: ['Paver Block', 'M40', 'Interlocking', 'Manesar', 'Construction']
      }
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Sanjeev Rao',
        company: 'Rao Infracon, Rewari',
        rating: 5,
        comment: 'Supplied 1,20,000 sq.ft pavers for our logistics park in Bilaspur. Batch test passed NABL audit with flying colors.',
        date: '2024-10-15',
        verifiedBuyer: true
      }
    ],
    choiceLoopStats: {
      totalResponses: 27,
      reasonsBreakdown: {
        'Better quality': 13,
        'Faster delivery': 8,
        'Better price': 4,
        'Lower MOQ': 1,
        'Better ratings or trust': 1,
        'Other': 0
      }
    },
    isFeatured: true
  },
  {
    id: 'biz-7',
    name: 'PureHarvest Organics & Wholesale Spices',
    slug: 'pureharvest-spices-delhi',
    logo: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=1200&auto=format&fit=crop&q=80',
    tagline: 'FSSAI Certified Khari Baoli Whole Spices & Blends',
    description: 'Third-generation bulk spice merchant operating in Asia’s largest spice market, Khari Baoli. Direct farm-gate sourcing of Salem Turmeric, Guntur Chilli, and Tellicherry Black Pepper.',
    category: 'Food & Grocery',
    businessType: 'Wholesaler',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      district: 'Khari Baoli, Old Delhi',
      pincode: '110006',
      address: 'Shop 24, Gadodia Market, Khari Baoli, Chandni Chowk, Delhi'
    },
    contact: {
      phone: '+91 98104 22719',
      email: 'bulk@pureharvestspices.in',
      whatsapp: '+91 98104 22719',
      gstin: '07AAPCP4491D1ZO',
      udyamNo: 'UDYAM-DL-01-0028192'
    },
    establishedYear: 1984,
    employeeCount: '25 spice sorters',
    verificationStatus: 'verified',
    verificationDocs: [
      { type: 'GSTIN Certificate', docNumber: '07AAPCP4491D1ZO', submittedAt: '2024-01-14' },
      { type: 'FSSAI Central License', docNumber: '10020011004928', submittedAt: '2024-01-15' }
    ],
    rating: 4.9,
    reviewCount: 64,
    startingPrice: 195,
    startingPriceUnit: 'per kg',
    minMoq: 25,
    averageDeliveryDays: 3,
    customisationAvailable: true,
    productionCapacity: '80 metric tonnes / month',
    capabilities: [
      'Sortex clean machine grading with zero foreign matter',
      'Custom mesh size grinding (fine powder to coarse rub)',
      'Vacuum-packed multiwall kraft bags for moisture lock',
      'Gas Chromatography laboratory testing for curcumin and capsaicin levels'
    ],
    certifications: ['FSSAI Central Certified', 'Spices Board of India Registered', 'APEDA Export Recognized'],
    products: [
      {
        id: 'prod-701',
        businessId: 'biz-7',
        name: 'Salem Grade A Whole Turmeric Fingers (Curcumin > 3.8%)',
        category: 'Food & Grocery',
        description: 'Polished, unadulterated whole turmeric fingers with high volatile oil and natural bright yellow core.',
        price: 210,
        priceUnit: 'per kg',
        moq: 50,
        deliveryDays: 3,
        inStock: true,
        customisationAvailable: true,
        warranty: '100% Lead Chromate & Artificial Color Free',
        specifications: {
          'Origin': 'Salem, Tamil Nadu direct farm harvest',
          'Curcumin Content': 'Minimum 3.8% tested by HPLC',
          'Moisture Level': '< 9.5%',
          'Foreign Matter': '< 0.5% (Sortex machine cleared)',
          'Packaging': '25kg HDPE woven bag with inner food-grade liner',
          'Shelf Life': '18 Months in cool dry storage'
        },
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
        tags: ['Turmeric', 'Spices', 'Khari Baoli', 'Curcumin', 'Wholesale']
      }
    ],
    reviews: [
      {
        id: 'rev-8',
        author: 'Mohit Bansal',
        company: 'Bansal Namkeen & Snacks, Bikaner',
        rating: 5,
        comment: 'Cleanest turmeric fingers in Khari Baoli. The curcumin level tested 4.1% in our factory QA lab.',
        date: '2024-11-01',
        verifiedBuyer: true
      }
    ],
    choiceLoopStats: {
      totalResponses: 52,
      reasonsBreakdown: {
        'Better quality': 28,
        'Better ratings or trust': 12,
        'Better price': 8,
        'Faster delivery': 3,
        'Lower MOQ': 1,
        'Other': 0
      }
    },
    isFeatured: true
  },
  {
    id: 'biz-8',
    name: 'SmartFix Commercial & HVAC Services',
    slug: 'smartfix-hvac-noida-delhi',
    logo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=160&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Enterprise VRF, Chiller Maintenance & Ducting Solutions',
    description: 'Providing comprehensive turnkey HVAC installation, annual maintenance contracts (AMC), and emergency repair for commercial towers, shopping complexes, and server rooms across Delhi NCR.',
    category: 'Home Services',
    businessType: 'Service Provider',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      district: 'Noida Sector 63 & Delhi NCR',
      pincode: '201301',
      address: 'B-12, Sector 63, Noida & Connaught Place Central Hub'
    },
    contact: {
      phone: '+91 98711 00392',
      email: 'contracts@smartfixhvac.in',
      whatsapp: '+91 98711 00392',
      gstin: '09AAICS8912E1ZN',
      udyamNo: 'UDYAM-UP-28-0041920'
    },
    establishedYear: 2017,
    employeeCount: '35 certified HVAC technicians',
    verificationStatus: 'documents_submitted',
    verificationDocs: [
      { type: 'GSTIN Registration', docNumber: '09AAICS8912E1ZN', submittedAt: '2024-03-20' },
      { type: 'Daikin & Voltas Approved Service Provider', docNumber: 'SVC-D-2023-11', submittedAt: '2024-03-21' }
    ],
    rating: 4.4,
    reviewCount: 22,
    startingPrice: 2499,
    startingPriceUnit: 'per service inspection',
    minMoq: 1,
    averageDeliveryDays: 1,
    customisationAvailable: true,
    productionCapacity: '150 corporate AMC locations',
    capabilities: [
      '2-Hour Emergency Response SLA for IT Server Room cooling',
      'Nitrogen pressure leak detection and ultrasonic testing',
      'Eco-friendly R-32 and R-410A refrigerant recovery systems',
      'Quarterly preventative maintenance with air velocity audit'
    ],
    certifications: ['ISHRAE Certified Engineers', 'ISO 9001:2015'],
    products: [
      {
        id: 'prod-801',
        businessId: 'biz-8',
        name: 'Comprehensive Annual Maintenance Contract (AMC) for VRF Systems',
        category: 'Home Services',
        description: 'Complete year-round coverage including 4 wet preventative servicings, unlimited breakdown calls, coil chemical jet wash, and gas top-up.',
        price: 8500,
        priceUnit: 'per outdoor unit / year',
        moq: 2,
        deliveryDays: 1,
        inStock: true,
        customisationAvailable: true,
        warranty: '2-Hour Emergency Response SLA guarantee',
        specifications: {
          'Coverage': 'Outdoor condensing unit + up to 4 indoor cassettes',
          'Visits': '4 Scheduled Preventative + Unlimited Breakdown Visits',
          'Cleaning Method': 'Foam coil jet cleaning (pH neutral chemicals)',
          'Gas Top-up': 'Up to 500g refrigerant top-up included per unit/year',
          'SLA Response': '4 hours across Delhi, Noida, Gurugram, Faridabad',
          'Reporting': 'Digital service logs with before/after thermal imaging'
        },
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
        tags: ['HVAC', 'AMC', 'VRF', 'Noida', 'Air Conditioning']
      }
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Pooja Anand',
        company: 'Fintech Square, Cyber City Gurugram',
        rating: 5,
        comment: 'Saved our server room during the June 47°C heatwave. Their technician arrived in 40 minutes with a spare compressor capacitor.',
        date: '2024-07-02',
        verifiedBuyer: true
      }
    ],
    choiceLoopStats: {
      totalResponses: 19,
      reasonsBreakdown: {
        'Faster delivery': 10,
        'Better quality': 5,
        'Better price': 3,
        'Better ratings or trust': 1,
        'Lower MOQ': 0,
        'Other': 0
      }
    },
    isFeatured: false
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    customerName: 'Anil Varma',
    customerPhone: '+91 98101 55291',
    customerEmail: 'anil@delhiapparels.com',
    businessIds: ['biz-1'],
    businessNames: ['Shree Balaji Textiles'],
    productOrService: 'Superfine 60s Combed Cotton Cambric',
    quantity: '2,500 meters',
    budgetRange: '₹3,00,000 - ₹3,75,000',
    deliveryLocation: 'Okhla Industrial Area Phase-1, New Delhi',
    requiredDeliveryDate: '2026-11-28',
    specifications: 'Need mill shade card #42 (Sky Blue) and #18 (Off-White). Shrinkage must remain under 2%. Lab dip required prior to bulk weaving.',
    status: 'Quotation received',
    createdAt: '2026-11-08T14:30:00Z',
    quotations: [
      {
        businessId: 'biz-1',
        businessName: 'Shree Balaji Textiles',
        quotedPrice: '₹142 per meter (Total ₹3,55,000 + 5% GST)',
        deliveryTimeline: '12 days from shade approval',
        moq: '500 meters per shade',
        productDetails: '60s Combed Cambric 88 GSM. We can dispatch 500m immediate sample rolls and balance in 10 working days.',
        additionalTerms: '30% advance with PO, balance against dispatch bill of lading. Free delivery to Okhla.',
        status: 'Sent',
        respondedAt: '2026-11-09T10:15:00Z'
      }
    ]
  },
  {
    id: 'enq-102',
    customerName: 'Priya Narayanan',
    customerPhone: '+91 98200 44991',
    customerEmail: 'priya@techhubcowork.in',
    businessIds: ['biz-2'],
    businessNames: ['UrbanWood Furniture & Modulars'],
    productOrService: 'Linear 4-Seater Modular Cluster Workstation',
    quantity: '12 clusters (48 seats total)',
    budgetRange: '₹1,80,000 - ₹2,20,000',
    deliveryLocation: 'Golf Course Road, Gurugram',
    requiredDeliveryDate: '2026-12-05',
    specifications: 'Oak wood finish top with dark charcoal powder coated frame. Require raceways fitted with Legrand modular cutouts and charcoal pinup boards.',
    status: 'Viewed',
    createdAt: '2026-11-09T16:45:00Z',
    quotations: []
  },
  {
    id: 'enq-103',
    customerName: 'Rohit Khandelwal',
    customerPhone: '+91 97112 00119',
    customerEmail: 'rohit@quickdeliv.in',
    businessIds: ['biz-4'],
    businessNames: ['Bharat Packaging Works'],
    productOrService: 'Die-Cut Self-Locking E-commerce Mailer Box',
    quantity: '5,000 boxes',
    budgetRange: '₹1,00,000 - ₹1,30,000',
    deliveryLocation: 'IMT Manesar Logistics Hub, Haryana',
    requiredDeliveryDate: '2026-11-20',
    specifications: '3-Ply E-flute with high gloss black print on outside lid. Clean die-cuts required for automated conveyor packing.',
    status: 'Submitted',
    createdAt: '2026-11-10T08:15:00Z',
    quotations: []
  }
];

export const INITIAL_CHOICELOOP_FEEDBACK: ChoiceLoopRecord[] = [
  {
    id: 'cl-1',
    businessId: 'biz-1',
    businessName: 'Shree Balaji Textiles',
    category: 'Clothing & Textiles',
    customerName: 'Rajiv Mehra',
    reason: 'Better quality',
    feedbackNote: 'Fabric weave density and GSM consistency was noticeably superior to Gujarat mills we tested.',
    timestamp: '2024-10-12T11:20:00Z'
  },
  {
    id: 'cl-2',
    businessId: 'biz-1',
    businessName: 'Shree Balaji Textiles',
    category: 'Clothing & Textiles',
    customerName: 'Aarti Textiles',
    reason: 'Faster delivery',
    feedbackNote: 'Sonipat proximity to Delhi allowed next-day truck loading.',
    timestamp: '2024-10-24T15:10:00Z'
  },
  {
    id: 'cl-3',
    businessId: 'biz-4',
    businessName: 'Bharat Packaging Works',
    category: 'Packaging',
    customerName: 'Kavita Sundaram',
    reason: 'Better quality',
    feedbackNote: 'Box bursting strength tested 14.8 kg/cm² in our lab, far above local standard.',
    timestamp: '2024-10-29T09:40:00Z'
  },
  {
    id: 'cl-4',
    businessId: 'biz-3',
    businessName: 'Nova Electrical Traders & Switchgears',
    category: 'Electrical Supplies',
    customerName: 'Dinesh Singla',
    reason: 'Faster delivery',
    feedbackNote: 'Delivered industrial breakers to factory floor within 4 hours of breakdown.',
    timestamp: '2024-11-02T16:00:00Z'
  },
  {
    id: 'cl-5',
    businessId: 'biz-5',
    businessName: 'Sunrise Garments & Corporate Uniforms',
    category: 'Clothing & Textiles',
    customerName: 'Vikas Hooda',
    reason: 'Lower MOQ',
    feedbackNote: 'Agreed to custom embroidered sample batch of 50 pieces without extra setup fees.',
    timestamp: '2024-11-05T12:30:00Z'
  }
];

export const CATEGORIES_LIST: { name: CategoryType; icon: string; count: number; description: string; popularSpecs: string[] }[] = [
  {
    name: 'Clothing & Textiles',
    icon: 'Shirt',
    count: 240,
    description: 'Cotton fabric, knitwear, suiting, industrial uniforms & yarn',
    popularSpecs: ['Fabric GSM', 'Yarn Count', 'Weave Type', 'Dyeing Technique', 'Shrinkage']
  },
  {
    name: 'Furniture',
    icon: 'Armchair',
    count: 185,
    description: 'Modular workstations, solid hardwood, executive office & cafeteria suites',
    popularSpecs: ['Wood / Board Grade', 'Finish & Polish', 'Dimensions', 'Warranty', 'Hardware Brand']
  },
  {
    name: 'Electronics',
    icon: 'Cpu',
    count: 140,
    description: 'PCBs, embedded components, smart IoT sensors & electronic assemblies',
    popularSpecs: ['Form Factor', 'Voltage / Power', 'Component Brand', 'RoHS Compliance']
  },
  {
    name: 'Electrical Supplies',
    icon: 'Zap',
    count: 210,
    description: 'Industrial switchgears, copper wiring, LT/HT panels & transformers',
    popularSpecs: ['Rated Current & Voltage', 'Conductor Material', 'Poles / Breaking kA', 'ISI / CE Mark']
  },
  {
    name: 'Construction Materials',
    icon: 'Building2',
    count: 175,
    description: 'Interlocking pavers, AAC blocks, cement, TMT rebars & precast boundary',
    popularSpecs: ['Compressive Strength Grade', 'Thickness / Dimension', 'Water Absorption', 'Curing Specs']
  },
  {
    name: 'Packaging',
    icon: 'Package',
    count: 195,
    description: 'Corrugated cartons, bubble mailers, plastic crates & industrial drums',
    popularSpecs: ['Ply & Flute Type', 'Paper GSM & BF', 'Box Dimensions', 'Bursting Strength', 'Print Finish']
  },
  {
    name: 'Food & Grocery',
    icon: 'Apple',
    count: 160,
    description: 'Whole spices, grains, edible oils, pulses & institutional food supplies',
    popularSpecs: ['FSSAI Grade', 'Moisture %', 'Origin / Cultivar', 'Sortex Cleanliness', 'Active Compounds']
  },
  {
    name: 'Industrial Supplies',
    icon: 'Wrench',
    count: 130,
    description: 'Fasteners, valves, precision bearings, cutting tools & safety PPE',
    popularSpecs: ['Tensile Grade', 'Alloy Metallurgy', 'Thread Standard', 'Tolerance Rating']
  },
  {
    name: 'Professional Services',
    icon: 'Briefcase',
    count: 110,
    description: 'GST compliance, industrial patent attorneys, ISO auditors & architects',
    popularSpecs: ['Bar / ICAI Registration', 'SLA Response Time', 'Cluster Experience', 'Pricing Model']
  },
  {
    name: 'Home Services',
    icon: 'Home',
    count: 95,
    description: 'Commercial HVAC AMC, chiller repair, deep industrial sanitation & electrical',
    popularSpecs: ['Service Scope', 'Emergency SLA', 'Refrigerant / Equipment Used', 'Warranty on Spares']
  }
];

export const POPULAR_LOCATIONS = [
  'All India',
  'Delhi NCR',
  'Sonipat (Haryana)',
  'Gurugram (Haryana)',
  'Panipat (Haryana)',
  'Rohtak (Haryana)',
  'Manesar (Haryana)',
  'Faridabad (Haryana)',
  'Noida (UP)',
  'Ahmedabad (Gujarat)',
  'Surat (Gujarat)',
  'Ludhiana (Punjab)'
];
