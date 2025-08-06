// Car Brand Types
export interface CarBrand {
  id: string;
  name: string;
  nameAr: string;
  country: string;
  logo: string;
  established: number;
  website: string;
  dealersInJordan: DealerInfo[];
}

// Dealer Information
export interface DealerInfo {
  id: string;
  name: string;
  nameAr: string;
  address: string;
  addressAr: string;
  phone: string;
  email: string;
  website?: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Car Model Types
export interface CarModel {
  id: string;
  brandId: string;
  name: string;
  nameAr: string;
  category: CarCategory;
  bodyType: BodyType;
  yearRange: {
    start: number;
    end: number;
  };
  variants: CarVariant[];
  images: CarImage[];
  specifications: CarSpecifications;
  prices: PriceInfo;
  customsCosts: CustomsCosts;
  insuranceCosts: InsuranceCosts;
  features: CarFeature[];
  safetyRating: number;
  fuelEconomy: FuelEconomy;
  maintenance: MaintenanceInfo;
  reviews: Review[];
}

// Car Categories
export enum CarCategory {
  SEDAN = 'sedan',
  SUV = 'suv',
  HATCHBACK = 'hatchback',
  COUPE = 'coupe',
  CONVERTIBLE = 'convertible',
  WAGON = 'wagon',
  PICKUP = 'pickup',
  VAN = 'van',
  CROSSOVER = 'crossover',
  SPORTS = 'sports',
  LUXURY = 'luxury',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid'
}

// Body Types
export enum BodyType {
  SEDAN = 'sedan',
  HATCHBACK = 'hatchback',
  SUV = 'suv',
  COUPE = 'coupe',
  CONVERTIBLE = 'convertible',
  WAGON = 'wagon',
  PICKUP = 'pickup',
  VAN = 'van',
  CROSSOVER = 'crossover'
}

// Fuel Types
export enum FuelType {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid',
  PLUGIN_HYBRID = 'plugin_hybrid',
  CNG = 'cng',
  LPG = 'lpg'
}

// Transmission Types
export enum TransmissionType {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  CVT = 'cvt',
  SEMI_AUTOMATIC = 'semi_automatic'
}

// Car Variant
export interface CarVariant {
  id: string;
  name: string;
  nameAr: string;
  year: number;
  engineSize: number;
  engineType: string;
  horsepower: number;
  torque: number;
  transmission: TransmissionType;
  fuelType: FuelType;
  drivetrain: 'FWD' | 'RWD' | 'AWD' | '4WD';
  seatingCapacity: number;
  doors: number;
  price: PriceInfo;
  availability: 'available' | 'limited' | 'discontinued';
}

// Car Images
export interface CarImage {
  id: string;
  url: string;
  type: 'exterior' | 'interior' | 'engine' | '360' | '3d';
  angle: string;
  isPrimary: boolean;
}

// Car Specifications
export interface CarSpecifications {
  dimensions: {
    length: number;
    width: number;
    height: number;
    wheelbase: number;
    groundClearance: number;
    curbWeight: number;
    grossWeight: number;
  };
  engine: {
    type: string;
    displacement: number;
    cylinders: number;
    configuration: string;
    fuelSystem: string;
    compression: number;
    maxPower: number;
    maxTorque: number;
    redline: number;
  };
  performance: {
    topSpeed: number;
    acceleration0to100: number;
    brakingDistance: number;
  };
  fuelTank: {
    capacity: number;
    reserve: number;
  };
  suspension: {
    front: string;
    rear: string;
  };
  brakes: {
    front: string;
    rear: string;
    abs: boolean;
    ebd: boolean;
    brakeAssist: boolean;
  };
  steering: {
    type: string;
    powerAssisted: boolean;
    turningRadius: number;
  };
  tires: {
    front: string;
    rear: string;
    spareType: string;
  };
}

// Price Information
export interface PriceInfo {
  basePrice: number;
  currency: 'JOD' | 'USD';
  priceRange: {
    min: number;
    max: number;
  };
  marketPrice: number;
  dealerPrice: number;
  usedCarPrice?: {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
  };
  lastUpdated: string;
}

// Customs Costs (2025 Jordan)
export interface CustomsCosts {
  importDuty: number;
  importDutyPercentage: number;
  salesTax: number;
  salesTaxPercentage: number;
  specialTax: number;
  specialTaxPercentage: number;
  environmentalFee: number;
  clearanceFees: number;
  inspectionFees: number;
  totalCustomsCost: number;
  lastUpdated: string;
}

// Insurance Costs
export interface InsuranceCosts {
  compulsoryInsurance: number;
  comprehensiveInsurance: {
    min: number;
    max: number;
    average: number;
  };
  thirdPartyInsurance: number;
  factors: {
    age: number;
    experience: number;
    location: number;
    carValue: number;
  };
}

// Car Features
export interface CarFeature {
  id: string;
  name: string;
  nameAr: string;
  category: FeatureCategory;
  description: string;
  descriptionAr: string;
  isStandard: boolean;
  isOptional: boolean;
  additionalCost?: number;
}

// Feature Categories
export enum FeatureCategory {
  SAFETY = 'safety',
  COMFORT = 'comfort',
  TECHNOLOGY = 'technology',
  ENTERTAINMENT = 'entertainment',
  EXTERIOR = 'exterior',
  INTERIOR = 'interior',
  PERFORMANCE = 'performance'
}

// Fuel Economy
export interface FuelEconomy {
  city: number;
  highway: number;
  combined: number;
  unit: 'L/100km' | 'mpg' | 'km/L';
  co2Emissions: number;
  fuelCostPer100km: number;
}

// Maintenance Information
export interface MaintenanceInfo {
  warrantyPeriod: number;
  warrantyKilometers: number;
  serviceInterval: number;
  estimatedAnnualCost: number;
  majorServices: ServiceSchedule[];
  commonIssues: CommonIssue[];
  partsAvailability: 'excellent' | 'good' | 'fair' | 'poor';
  serviceNetworkSize: number;
}

// Service Schedule
export interface ServiceSchedule {
  kilometers: number;
  months: number;
  description: string;
  descriptionAr: string;
  estimatedCost: number;
  items: string[];
}

// Common Issues
export interface CommonIssue {
  id: string;
  description: string;
  descriptionAr: string;
  severity: 'low' | 'medium' | 'high';
  frequency: number;
  estimatedRepairCost: number;
  affectedYears: number[];
}

// Reviews
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  pros: string[];
  prosAr: string[];
  cons: string[];
  consAr: string[];
  verified: boolean;
  ownershipDuration: number;
  mileage: number;
  date: string;
  helpful: number;
}

// Search Filters
export interface SearchFilters {
  brands?: string[];
  categories?: CarCategory[];
  bodyTypes?: BodyType[];
  fuelTypes?: FuelType[];
  transmissionTypes?: TransmissionType[];
  yearRange?: {
    min: number;
    max: number;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  mileageRange?: {
    min: number;
    max: number;
  };
  engineSizeRange?: {
    min: number;
    max: number;
  };
  features?: string[];
  condition?: 'new' | 'used' | 'certified';
  location?: string;
  sortBy?: 'price' | 'year' | 'mileage' | 'popularity' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

// Comparison
export interface CarComparison {
  cars: CarModel[];
  criteria: ComparisonCriteria[];
}

export interface ComparisonCriteria {
  category: string;
  categoryAr: string;
  items: ComparisonItem[];
}

export interface ComparisonItem {
  name: string;
  nameAr: string;
  values: (string | number)[];
  unit?: string;
  better?: 'higher' | 'lower';
}

// User Preferences
export interface UserPreferences {
  budget: number;
  usage: 'daily' | 'weekend' | 'business' | 'family' | 'sport';
  priorities: Priority[];
  location: string;
  experience: 'beginner' | 'intermediate' | 'expert';
}

export interface Priority {
  factor: string;
  weight: number;
}

// Recommendation
export interface Recommendation {
  car: CarModel;
  score: number;
  reasons: RecommendationReason[];
  matchPercentage: number;
}

export interface RecommendationReason {
  factor: string;
  factorAr: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
  description: string;
  descriptionAr: string;
}