import { CarModel, CarCategory, BodyType, FuelType, TransmissionType, FeatureCategory } from '../types';

export const carModels: CarModel[] = [
  // Toyota Models
  {
    id: 'toyota-camry-2024',
    brandId: 'toyota',
    name: 'Camry',
    nameAr: 'كامري',
    category: CarCategory.SEDAN,
    bodyType: BodyType.SEDAN,
    yearRange: { start: 2024, end: 2025 },
    variants: [
      {
        id: 'camry-le-2024',
        name: 'LE',
        nameAr: 'LE',
        year: 2024,
        engineSize: 2.5,
        engineType: '4-Cylinder',
        horsepower: 203,
        torque: 247,
        transmission: TransmissionType.AUTOMATIC,
        fuelType: FuelType.GASOLINE,
        drivetrain: 'FWD',
        seatingCapacity: 5,
        doors: 4,
        price: {
          basePrice: 25000,
          currency: 'USD',
          priceRange: { min: 24000, max: 26000 },
          marketPrice: 25500,
          dealerPrice: 25200,
          lastUpdated: '2025-01-01'
        },
        availability: 'available'
      },
      {
        id: 'camry-xle-2024',
        name: 'XLE',
        nameAr: 'XLE',
        year: 2024,
        engineSize: 2.5,
        engineType: '4-Cylinder',
        horsepower: 203,
        torque: 247,
        transmission: TransmissionType.AUTOMATIC,
        fuelType: FuelType.GASOLINE,
        drivetrain: 'FWD',
        seatingCapacity: 5,
        doors: 4,
        price: {
          basePrice: 29000,
          currency: 'USD',
          priceRange: { min: 28000, max: 30000 },
          marketPrice: 29500,
          dealerPrice: 29200,
          lastUpdated: '2025-01-01'
        },
        availability: 'available'
      }
    ],
    images: [
      {
        id: 'camry-ext-1',
        url: '/assets/cars/toyota/camry/exterior-1.jpg',
        type: 'exterior',
        angle: 'front',
        isPrimary: true
      },
      {
        id: 'camry-ext-2',
        url: '/assets/cars/toyota/camry/exterior-2.jpg',
        type: 'exterior',
        angle: 'side',
        isPrimary: false
      },
      {
        id: 'camry-int-1',
        url: '/assets/cars/toyota/camry/interior-1.jpg',
        type: 'interior',
        angle: 'dashboard',
        isPrimary: false
      }
    ],
    specifications: {
      dimensions: {
        length: 4885,
        width: 1840,
        height: 1445,
        wheelbase: 2825,
        groundClearance: 160,
        curbWeight: 1590,
        grossWeight: 2040
      },
      engine: {
        type: 'Inline-4',
        displacement: 2487,
        cylinders: 4,
        configuration: 'DOHC',
        fuelSystem: 'Direct Injection',
        compression: 13.0,
        maxPower: 203,
        maxTorque: 247,
        redline: 6500
      },
      performance: {
        topSpeed: 210,
        acceleration0to100: 8.4,
        brakingDistance: 36.5
      },
      fuelTank: {
        capacity: 60,
        reserve: 8
      },
      suspension: {
        front: 'MacPherson Strut',
        rear: 'Multi-Link'
      },
      brakes: {
        front: 'Ventilated Disc',
        rear: 'Solid Disc',
        abs: true,
        ebd: true,
        brakeAssist: true
      },
      steering: {
        type: 'Electric Power',
        powerAssisted: true,
        turningRadius: 5.7
      },
      tires: {
        front: '215/60R16',
        rear: '215/60R16',
        spareType: 'Temporary'
      }
    },
    prices: {
      basePrice: 25000,
      currency: 'USD',
      priceRange: { min: 24000, max: 30000 },
      marketPrice: 27500,
      dealerPrice: 27000,
      usedCarPrice: {
        excellent: 23000,
        good: 21000,
        fair: 19000,
        poor: 17000
      },
      lastUpdated: '2025-01-01'
    },
    customsCosts: {
      importDuty: 6750, // 27% of $25,000
      importDutyPercentage: 27,
      salesTax: 4320, // 16% of ($25,000 + $6,750)
      salesTaxPercentage: 16,
      specialTax: 2500, // 10% على السيارات فوق 2.0L
      specialTaxPercentage: 10,
      environmentalFee: 300,
      clearanceFees: 500,
      inspectionFees: 200,
      totalCustomsCost: 14570,
      lastUpdated: '2025-01-01'
    },
    insuranceCosts: {
      compulsoryInsurance: 280,
      comprehensiveInsurance: {
        min: 800,
        max: 1500,
        average: 1150
      },
      thirdPartyInsurance: 350,
      factors: {
        age: 1.0,
        experience: 1.0,
        location: 1.0,
        carValue: 1.2
      }
    },
    features: [
      {
        id: 'toyota-safety-sense',
        name: 'Toyota Safety Sense 2.0',
        nameAr: 'نظام تويوتا للأمان 2.0',
        category: FeatureCategory.SAFETY,
        description: 'Advanced safety features including collision avoidance',
        descriptionAr: 'ميزات أمان متقدمة تشمل تجنب الاصطدام',
        isStandard: true,
        isOptional: false
      },
      {
        id: 'adaptive-cruise',
        name: 'Adaptive Cruise Control',
        nameAr: 'نظام التحكم التكيفي في السرعة',
        category: FeatureCategory.TECHNOLOGY,
        description: 'Maintains safe distance from vehicles ahead',
        descriptionAr: 'يحافظ على مسافة آمنة من المركبات الأمامية',
        isStandard: true,
        isOptional: false
      }
    ],
    safetyRating: 5,
    fuelEconomy: {
      city: 8.1,
      highway: 5.9,
      combined: 6.7,
      unit: 'L/100km',
      co2Emissions: 156,
      fuelCostPer100km: 8.5
    },
    maintenance: {
      warrantyPeriod: 3,
      warrantyKilometers: 100000,
      serviceInterval: 10000,
      estimatedAnnualCost: 800,
      majorServices: [
        {
          kilometers: 10000,
          months: 6,
          description: 'Basic Service',
          descriptionAr: 'خدمة أساسية',
          estimatedCost: 150,
          items: ['Oil Change', 'Filter Replacement', 'Basic Inspection']
        },
        {
          kilometers: 40000,
          months: 24,
          description: 'Major Service',
          descriptionAr: 'خدمة كبرى',
          estimatedCost: 400,
          items: ['Oil Change', 'All Filters', 'Brake Inspection', 'Transmission Service']
        }
      ],
      commonIssues: [
        {
          id: 'oil-consumption',
          description: 'Excessive oil consumption in some units',
          descriptionAr: 'استهلاك زائد للزيت في بعض الوحدات',
          severity: 'medium',
          frequency: 0.05,
          estimatedRepairCost: 800,
          affectedYears: [2018, 2019, 2020]
        }
      ],
      partsAvailability: 'excellent',
      serviceNetworkSize: 15
    },
    reviews: [
      {
        id: 'review-1',
        userId: 'user-1',
        userName: 'أحمد محمد',
        rating: 4.5,
        title: 'Excellent reliability',
        titleAr: 'موثوقية ممتازة',
        content: 'Great car with excellent fuel economy and reliability',
        contentAr: 'سيارة رائعة مع اقتصاد ممتاز في الوقود وموثوقية عالية',
        pros: ['Fuel efficient', 'Reliable', 'Comfortable'],
        prosAr: ['موفرة للوقود', 'موثوقة', 'مريحة'],
        cons: ['Road noise', 'Interior materials'],
        consAr: ['ضوضاء الطريق', 'مواد التشطيب الداخلي'],
        verified: true,
        ownershipDuration: 24,
        mileage: 45000,
        date: '2024-12-01',
        helpful: 23
      }
    ]
  },

  // Honda Civic
  {
    id: 'honda-civic-2024',
    brandId: 'honda',
    name: 'Civic',
    nameAr: 'سيفيك',
    category: CarCategory.SEDAN,
    bodyType: BodyType.SEDAN,
    yearRange: { start: 2024, end: 2025 },
    variants: [
      {
        id: 'civic-lx-2024',
        name: 'LX',
        nameAr: 'LX',
        year: 2024,
        engineSize: 2.0,
        engineType: '4-Cylinder',
        horsepower: 158,
        torque: 187,
        transmission: TransmissionType.CVT,
        fuelType: FuelType.GASOLINE,
        drivetrain: 'FWD',
        seatingCapacity: 5,
        doors: 4,
        price: {
          basePrice: 23000,
          currency: 'USD',
          priceRange: { min: 22500, max: 24000 },
          marketPrice: 23500,
          dealerPrice: 23200,
          lastUpdated: '2025-01-01'
        },
        availability: 'available'
      }
    ],
    images: [
      {
        id: 'civic-ext-1',
        url: '/assets/cars/honda/civic/exterior-1.jpg',
        type: 'exterior',
        angle: 'front',
        isPrimary: true
      }
    ],
    specifications: {
      dimensions: {
        length: 4674,
        width: 1802,
        height: 1415,
        wheelbase: 2735,
        groundClearance: 134,
        curbWeight: 1350,
        grossWeight: 1750
      },
      engine: {
        type: 'Inline-4',
        displacement: 1993,
        cylinders: 4,
        configuration: 'SOHC',
        fuelSystem: 'Port Injection',
        compression: 10.6,
        maxPower: 158,
        maxTorque: 187,
        redline: 6500
      },
      performance: {
        topSpeed: 200,
        acceleration0to100: 8.2,
        brakingDistance: 35.8
      },
      fuelTank: {
        capacity: 47,
        reserve: 6
      },
      suspension: {
        front: 'MacPherson Strut',
        rear: 'Multi-Link'
      },
      brakes: {
        front: 'Ventilated Disc',
        rear: 'Solid Disc',
        abs: true,
        ebd: true,
        brakeAssist: true
      },
      steering: {
        type: 'Electric Power',
        powerAssisted: true,
        turningRadius: 5.4
      },
      tires: {
        front: '215/55R16',
        rear: '215/55R16',
        spareType: 'Temporary'
      }
    },
    prices: {
      basePrice: 23000,
      currency: 'USD',
      priceRange: { min: 22500, max: 24000 },
      marketPrice: 23500,
      dealerPrice: 23200,
      usedCarPrice: {
        excellent: 21000,
        good: 19000,
        fair: 17000,
        poor: 15000
      },
      lastUpdated: '2025-01-01'
    },
    customsCosts: {
      importDuty: 6210, // 27% of $23,000
      importDutyPercentage: 27,
      salesTax: 4674, // 16% of ($23,000 + $6,210)
      salesTaxPercentage: 16,
      specialTax: 0, // No special tax for 2.0L and below
      specialTaxPercentage: 0,
      environmentalFee: 200,
      clearanceFees: 500,
      inspectionFees: 200,
      totalCustomsCost: 11784,
      lastUpdated: '2025-01-01'
    },
    insuranceCosts: {
      compulsoryInsurance: 250,
      comprehensiveInsurance: {
        min: 700,
        max: 1300,
        average: 1000
      },
      thirdPartyInsurance: 300,
      factors: {
        age: 1.0,
        experience: 1.0,
        location: 1.0,
        carValue: 1.1
      }
    },
    features: [
      {
        id: 'honda-sensing',
        name: 'Honda Sensing',
        nameAr: 'هوندا سنسنغ',
        category: FeatureCategory.SAFETY,
        description: 'Suite of safety and driver-assistive technologies',
        descriptionAr: 'مجموعة من تقنيات الأمان ومساعدة السائق',
        isStandard: true,
        isOptional: false
      }
    ],
    safetyRating: 5,
    fuelEconomy: {
      city: 7.8,
      highway: 5.6,
      combined: 6.4,
      unit: 'L/100km',
      co2Emissions: 149,
      fuelCostPer100km: 8.1
    },
    maintenance: {
      warrantyPeriod: 3,
      warrantyKilometers: 100000,
      serviceInterval: 10000,
      estimatedAnnualCost: 750,
      majorServices: [
        {
          kilometers: 10000,
          months: 6,
          description: 'Basic Service',
          descriptionAr: 'خدمة أساسية',
          estimatedCost: 140,
          items: ['Oil Change', 'Filter Replacement']
        }
      ],
      commonIssues: [],
      partsAvailability: 'excellent',
      serviceNetworkSize: 12
    },
    reviews: []
  },

  // BYD Atto 3 (Electric)
  {
    id: 'byd-atto3-2024',
    brandId: 'byd',
    name: 'Atto 3',
    nameAr: 'أتو 3',
    category: CarCategory.ELECTRIC,
    bodyType: BodyType.SUV,
    yearRange: { start: 2024, end: 2025 },
    variants: [
      {
        id: 'atto3-standard-2024',
        name: 'Standard Range',
        nameAr: 'المدى القياسي',
        year: 2024,
        engineSize: 0, // Electric
        engineType: 'Electric Motor',
        horsepower: 204,
        torque: 310,
        transmission: TransmissionType.AUTOMATIC,
        fuelType: FuelType.ELECTRIC,
        drivetrain: 'FWD',
        seatingCapacity: 5,
        doors: 5,
        price: {
          basePrice: 35000,
          currency: 'USD',
          priceRange: { min: 34000, max: 36000 },
          marketPrice: 35500,
          dealerPrice: 35200,
          lastUpdated: '2025-01-01'
        },
        availability: 'available'
      }
    ],
    images: [
      {
        id: 'atto3-ext-1',
        url: '/assets/cars/byd/atto3/exterior-1.jpg',
        type: 'exterior',
        angle: 'front',
        isPrimary: true
      }
    ],
    specifications: {
      dimensions: {
        length: 4455,
        width: 1875,
        height: 1615,
        wheelbase: 2720,
        groundClearance: 175,
        curbWeight: 1750,
        grossWeight: 2200
      },
      engine: {
        type: 'Electric Motor',
        displacement: 0,
        cylinders: 0,
        configuration: 'Permanent Magnet Synchronous',
        fuelSystem: 'Electric',
        compression: 0,
        maxPower: 204,
        maxTorque: 310,
        redline: 0
      },
      performance: {
        topSpeed: 160,
        acceleration0to100: 7.3,
        brakingDistance: 37.2
      },
      fuelTank: {
        capacity: 0, // Battery: 60.48 kWh
        reserve: 0
      },
      suspension: {
        front: 'MacPherson Strut',
        rear: 'Multi-Link'
      },
      brakes: {
        front: 'Ventilated Disc',
        rear: 'Solid Disc',
        abs: true,
        ebd: true,
        brakeAssist: true
      },
      steering: {
        type: 'Electric Power',
        powerAssisted: true,
        turningRadius: 5.6
      },
      tires: {
        front: '215/55R18',
        rear: '215/55R18',
        spareType: 'Repair Kit'
      }
    },
    prices: {
      basePrice: 35000,
      currency: 'USD',
      priceRange: { min: 34000, max: 36000 },
      marketPrice: 35500,
      dealerPrice: 35200,
      usedCarPrice: {
        excellent: 32000,
        good: 29000,
        fair: 26000,
        poor: 23000
      },
      lastUpdated: '2025-01-01'
    },
    customsCosts: {
      importDuty: 9450, // 27% of $35,000
      importDutyPercentage: 27,
      salesTax: 7112, // 16% of ($35,000 + $9,450)
      salesTaxPercentage: 16,
      specialTax: 0, // Electric vehicles exempt from special tax
      specialTaxPercentage: 0,
      environmentalFee: 0, // Electric vehicles exempt
      clearanceFees: 500,
      inspectionFees: 200,
      totalCustomsCost: 17262,
      lastUpdated: '2025-01-01'
    },
    insuranceCosts: {
      compulsoryInsurance: 320,
      comprehensiveInsurance: {
        min: 1000,
        max: 1800,
        average: 1400
      },
      thirdPartyInsurance: 400,
      factors: {
        age: 1.0,
        experience: 1.0,
        location: 1.0,
        carValue: 1.3
      }
    },
    features: [
      {
        id: 'byd-dilink',
        name: 'DiLink Intelligent System',
        nameAr: 'نظام DiLink الذكي',
        category: FeatureCategory.TECHNOLOGY,
        description: 'Advanced infotainment and connectivity system',
        descriptionAr: 'نظام متقدم للترفيه والاتصال',
        isStandard: true,
        isOptional: false
      },
      {
        id: 'heat-pump',
        name: 'Heat Pump System',
        nameAr: 'نظام المضخة الحرارية',
        category: FeatureCategory.COMFORT,
        description: 'Efficient heating and cooling system',
        descriptionAr: 'نظام تدفئة وتبريد فعال',
        isStandard: true,
        isOptional: false
      }
    ],
    safetyRating: 5,
    fuelEconomy: {
      city: 0, // Electric: 16.5 kWh/100km
      highway: 0,
      combined: 0,
      unit: 'kWh/100km',
      co2Emissions: 0,
      fuelCostPer100km: 2.5 // Based on electricity costs
    },
    maintenance: {
      warrantyPeriod: 6,
      warrantyKilometers: 150000,
      serviceInterval: 15000,
      estimatedAnnualCost: 400,
      majorServices: [
        {
          kilometers: 15000,
          months: 12,
          description: 'Basic Electric Vehicle Service',
          descriptionAr: 'خدمة أساسية للسيارة الكهربائية',
          estimatedCost: 200,
          items: ['Battery Check', 'Software Update', 'Brake Inspection']
        }
      ],
      commonIssues: [],
      partsAvailability: 'good',
      serviceNetworkSize: 8
    },
    reviews: [
      {
        id: 'byd-review-1',
        userId: 'user-2',
        userName: 'سارة أحمد',
        rating: 4.2,
        title: 'Great electric SUV',
        titleAr: 'سيارة كهربائية رائعة',
        content: 'Impressive range and features for the price',
        contentAr: 'مدى مثير للإعجاب وميزات ممتازة للسعر',
        pros: ['Long range', 'Fast charging', 'Spacious interior'],
        prosAr: ['مدى طويل', 'شحن سريع', 'مقصورة واسعة'],
        cons: ['Build quality', 'Road noise'],
        consAr: ['جودة التصنيع', 'ضوضاء الطريق'],
        verified: true,
        ownershipDuration: 12,
        mileage: 15000,
        date: '2024-11-15',
        helpful: 18
      }
    ]
  },

  // Ford Explorer
  {
    id: 'ford-explorer-2024',
    brandId: 'ford',
    name: 'Explorer',
    nameAr: 'إكسبلورر',
    category: CarCategory.SUV,
    bodyType: BodyType.SUV,
    yearRange: { start: 2024, end: 2025 },
    variants: [
      {
        id: 'explorer-base-2024',
        name: 'Base',
        nameAr: 'أساسي',
        year: 2024,
        engineSize: 2.3,
        engineType: '4-Cylinder Turbo',
        horsepower: 300,
        torque: 420,
        transmission: TransmissionType.AUTOMATIC,
        fuelType: FuelType.GASOLINE,
        drivetrain: 'AWD',
        seatingCapacity: 7,
        doors: 5,
        price: {
          basePrice: 38000,
          currency: 'USD',
          priceRange: { min: 37000, max: 40000 },
          marketPrice: 39000,
          dealerPrice: 38500,
          lastUpdated: '2025-01-01'
        },
        availability: 'available'
      }
    ],
    images: [
      {
        id: 'explorer-ext-1',
        url: '/assets/cars/ford/explorer/exterior-1.jpg',
        type: 'exterior',
        angle: 'front',
        isPrimary: true
      }
    ],
    specifications: {
      dimensions: {
        length: 5050,
        width: 2004,
        height: 1778,
        wheelbase: 3025,
        groundClearance: 211,
        curbWeight: 2050,
        grossWeight: 2720
      },
      engine: {
        type: 'Inline-4 Turbo',
        displacement: 2261,
        cylinders: 4,
        configuration: 'DOHC Turbo',
        fuelSystem: 'Direct Injection',
        compression: 9.5,
        maxPower: 300,
        maxTorque: 420,
        redline: 6000
      },
      performance: {
        topSpeed: 200,
        acceleration0to100: 7.6,
        brakingDistance: 40.2
      },
      fuelTank: {
        capacity: 68,
        reserve: 10
      },
      suspension: {
        front: 'Independent MacPherson',
        rear: 'Independent Multi-Link'
      },
      brakes: {
        front: 'Ventilated Disc',
        rear: 'Ventilated Disc',
        abs: true,
        ebd: true,
        brakeAssist: true
      },
      steering: {
        type: 'Electric Power',
        powerAssisted: true,
        turningRadius: 6.2
      },
      tires: {
        front: '255/65R18',
        rear: '255/65R18',
        spareType: 'Full Size'
      }
    },
    prices: {
      basePrice: 38000,
      currency: 'USD',
      priceRange: { min: 37000, max: 40000 },
      marketPrice: 39000,
      dealerPrice: 38500,
      usedCarPrice: {
        excellent: 35000,
        good: 32000,
        fair: 29000,
        poor: 26000
      },
      lastUpdated: '2025-01-01'
    },
    customsCosts: {
      importDuty: 10260, // 27% of $38,000
      importDutyPercentage: 27,
      salesTax: 7722, // 16% of ($38,000 + $10,260)
      salesTaxPercentage: 16,
      specialTax: 3800, // 10% على السيارات فوق 2.0L
      specialTaxPercentage: 10,
      environmentalFee: 500,
      clearanceFees: 600,
      inspectionFees: 300,
      totalCustomsCost: 23182,
      lastUpdated: '2025-01-01'
    },
    insuranceCosts: {
      compulsoryInsurance: 380,
      comprehensiveInsurance: {
        min: 1200,
        max: 2200,
        average: 1700
      },
      thirdPartyInsurance: 450,
      factors: {
        age: 1.0,
        experience: 1.0,
        location: 1.0,
        carValue: 1.4
      }
    },
    features: [
      {
        id: 'ford-copilot360',
        name: 'Ford Co-Pilot360',
        nameAr: 'فورد كو-بايلوت 360',
        category: FeatureCategory.SAFETY,
        description: 'Comprehensive suite of driver-assist technologies',
        descriptionAr: 'مجموعة شاملة من تقنيات مساعدة السائق',
        isStandard: true,
        isOptional: false
      },
      {
        id: 'intelligent-awd',
        name: 'Intelligent AWD',
        nameAr: 'نظام الدفع الرباعي الذكي',
        category: FeatureCategory.PERFORMANCE,
        description: 'Advanced all-wheel drive system',
        descriptionAr: 'نظام دفع رباعي متقدم',
        isStandard: true,
        isOptional: false
      }
    ],
    safetyRating: 4,
    fuelEconomy: {
      city: 11.2,
      highway: 8.1,
      combined: 9.4,
      unit: 'L/100km',
      co2Emissions: 219,
      fuelCostPer100km: 11.9
    },
    maintenance: {
      warrantyPeriod: 3,
      warrantyKilometers: 100000,
      serviceInterval: 12000,
      estimatedAnnualCost: 1200,
      majorServices: [
        {
          kilometers: 12000,
          months: 12,
          description: 'Basic Service',
          descriptionAr: 'خدمة أساسية',
          estimatedCost: 250,
          items: ['Oil Change', 'Filter Replacement', 'Inspection']
        }
      ],
      commonIssues: [],
      partsAvailability: 'good',
      serviceNetworkSize: 10
    },
    reviews: []
  }
];

// Helper function to calculate total car cost including customs
export const calculateTotalCost = (carModel: CarModel, variantId?: string) => {
  const variant = variantId ? 
    carModel.variants.find(v => v.id === variantId) : 
    carModel.variants[0];
  
  if (!variant) return 0;
  
  const basePrice = variant.price.basePrice;
  const customsCost = carModel.customsCosts.totalCustomsCost;
  const totalCost = basePrice + customsCost;
  
  return {
    basePrice,
    customsCost,
    totalCost,
    totalCostJOD: Math.round(totalCost * 0.71) // Approximate USD to JOD conversion
  };
};