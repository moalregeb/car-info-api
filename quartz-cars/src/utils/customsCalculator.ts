import { FuelType, CarCategory } from '../types';

// Jordan Customs and Tax Rates 2025 - Based on Official Government Sources
export interface CustomsCalculationParams {
  carPrice: number; // USD
  engineSize: number; // Liters
  fuelType: FuelType;
  carAge: number; // Years
  category: CarCategory;
  isElectric?: boolean;
  isHybrid?: boolean;
}

export interface CustomsBreakdown {
  importDuty: number;
  importDutyRate: number;
  salesTax: number;
  salesTaxRate: number;
  specialTax: number;
  specialTaxRate: number;
  environmentalFee: number;
  clearanceFees: number;
  inspectionFees: number;
  weightTax: number;
  totalCustomsCost: number;
  totalCostUSD: number;
  totalCostJOD: number;
  lastUpdated: string;
}

// Official Jordan Customs Rates 2025
const CUSTOMS_RATES = {
  // Import Duty Rate (unchanged)
  IMPORT_DUTY_RATE: 0.27, // 27%
  
  // Sales Tax Rate (unchanged)
  SALES_TAX_RATE: 0.16, // 16%
  
  // NEW 2025 RATES - Based on Cabinet Decision June 28, 2025
  GASOLINE_CARS: {
    // Total tax reduced from 71% to 51% (28% reduction)
    TOTAL_TAX_RATE: 0.51,
    SPECIAL_TAX_RATE: 0.08 // Calculated based on new total
  },
  
  HYBRID_CARS: {
    // Total tax reduced from 60% to 39% (35% reduction) 
    TOTAL_TAX_RATE: 0.39,
    SPECIAL_TAX_RATE: 0.0 // Significantly reduced
  },
  
  ELECTRIC_CARS: {
    // Fixed unified rate of 27% for all electric vehicles
    TOTAL_TAX_RATE: 0.27,
    SPECIAL_TAX_RATE: 0.0 // No special tax
  },
  
  // Fixed fees
  ENVIRONMENTAL_FEE: {
    GASOLINE_LARGE: 500, // Engines > 2.0L
    GASOLINE_SMALL: 200, // Engines ≤ 2.0L
    ELECTRIC: 0, // Exempt
    HYBRID: 100 // Reduced fee
  },
  
  CLEARANCE_FEES: 500,
  INSPECTION_FEES: 200,
  
  // Weight-based fees (500-1500 JOD converted to USD)
  WEIGHT_TAX: {
    MIN: 704, // 500 JOD * 1.408 (JOD to USD)
    MAX: 2112 // 1500 JOD * 1.408
  }
};

// Exchange rate JOD to USD (approximate)
const JOD_TO_USD = 1.408;
const USD_TO_JOD = 0.71;

export function calculateCustomsCosts(params: CustomsCalculationParams): CustomsBreakdown {
  const {
    carPrice,
    engineSize,
    fuelType,
    carAge,
    category,
    isElectric = fuelType === FuelType.ELECTRIC,
    isHybrid = fuelType === FuelType.HYBRID || fuelType === FuelType.PLUGIN_HYBRID
  } = params;

  let importDuty = 0;
  let importDutyRate = 0;
  let salesTax = 0;
  let salesTaxRate = 0;
  let specialTax = 0;
  let specialTaxRate = 0;
  let environmentalFee = 0;
  let weightTax = 0;

  // Import Duty - Standard 27% for all vehicles
  importDuty = carPrice * CUSTOMS_RATES.IMPORT_DUTY_RATE;
  importDutyRate = CUSTOMS_RATES.IMPORT_DUTY_RATE;

  // Sales Tax - 16% on (car price + import duty)
  const taxableAmount = carPrice + importDuty;
  salesTax = taxableAmount * CUSTOMS_RATES.SALES_TAX_RATE;
  salesTaxRate = CUSTOMS_RATES.SALES_TAX_RATE;

  // Special Tax and Environmental Fee based on vehicle type
  if (isElectric) {
    // Electric vehicles: Fixed 27% total tax rate
    const totalTaxAmount = carPrice * CUSTOMS_RATES.ELECTRIC_CARS.TOTAL_TAX_RATE;
    specialTax = totalTaxAmount - importDuty - salesTax;
    specialTaxRate = specialTax > 0 ? specialTax / carPrice : 0;
    environmentalFee = CUSTOMS_RATES.ENVIRONMENTAL_FEE.ELECTRIC;
    
    // Electric cars: 4% of car value instead of weight tax (as per 2020 decision)
    weightTax = carPrice * 0.04;
  } else if (isHybrid) {
    // Hybrid vehicles: 39% total tax rate (reduced from 60%)
    const totalTaxAmount = carPrice * CUSTOMS_RATES.HYBRID_CARS.TOTAL_TAX_RATE;
    specialTax = Math.max(0, totalTaxAmount - importDuty - salesTax);
    specialTaxRate = specialTax > 0 ? specialTax / carPrice : 0;
    environmentalFee = CUSTOMS_RATES.ENVIRONMENTAL_FEE.HYBRID;
    
    // Weight tax for hybrids
    weightTax = calculateWeightTax(engineSize);
  } else {
    // Gasoline/Diesel vehicles: 51% total tax rate (reduced from 71%)
    const totalTaxAmount = carPrice * CUSTOMS_RATES.GASOLINE_CARS.TOTAL_TAX_RATE;
    specialTax = Math.max(0, totalTaxAmount - importDuty - salesTax);
    specialTaxRate = specialTax > 0 ? specialTax / carPrice : 0;
    
    // Environmental fee based on engine size
    environmentalFee = engineSize > 2.0 
      ? CUSTOMS_RATES.ENVIRONMENTAL_FEE.GASOLINE_LARGE 
      : CUSTOMS_RATES.ENVIRONMENTAL_FEE.GASOLINE_SMALL;
    
    // Weight tax for gasoline cars
    weightTax = calculateWeightTax(engineSize);
  }

  // Fixed fees
  const clearanceFees = CUSTOMS_RATES.CLEARANCE_FEES;
  const inspectionFees = CUSTOMS_RATES.INSPECTION_FEES;

  // Total customs cost
  const totalCustomsCost = importDuty + salesTax + specialTax + environmentalFee + clearanceFees + inspectionFees + weightTax;
  
  // Total cost
  const totalCostUSD = carPrice + totalCustomsCost;
  const totalCostJOD = totalCostUSD * USD_TO_JOD;

  return {
    importDuty: Math.round(importDuty),
    importDutyRate,
    salesTax: Math.round(salesTax),
    salesTaxRate,
    specialTax: Math.round(specialTax),
    specialTaxRate,
    environmentalFee,
    clearanceFees,
    inspectionFees,
    weightTax: Math.round(weightTax),
    totalCustomsCost: Math.round(totalCustomsCost),
    totalCostUSD: Math.round(totalCostUSD),
    totalCostJOD: Math.round(totalCostJOD),
    lastUpdated: '2025-08-06'
  };
}

function calculateWeightTax(engineSize: number): number {
  // Weight tax estimation based on engine size
  // Larger engines typically mean heavier cars
  if (engineSize <= 1.6) {
    return CUSTOMS_RATES.WEIGHT_TAX.MIN; // ~500 JOD
  } else if (engineSize <= 2.5) {
    return CUSTOMS_RATES.WEIGHT_TAX.MIN + 
           ((engineSize - 1.6) / 0.9) * 
           (CUSTOMS_RATES.WEIGHT_TAX.MAX - CUSTOMS_RATES.WEIGHT_TAX.MIN) * 0.5;
  } else {
    return CUSTOMS_RATES.WEIGHT_TAX.MAX; // ~1500 JOD
  }
}

// Validate calculation against official rates
export function validateCalculation(params: CustomsCalculationParams, result: CustomsBreakdown): boolean {
  const { carPrice, fuelType } = params;
  const { totalCustomsCost } = result;
  
  const totalTaxRate = totalCustomsCost / carPrice;
  
  if (fuelType === FuelType.ELECTRIC) {
    // Should be approximately 27% plus fixed fees
    return totalTaxRate >= 0.25 && totalTaxRate <= 0.35;
  } else if (fuelType === FuelType.HYBRID || fuelType === FuelType.PLUGIN_HYBRID) {
    // Should be approximately 39% plus fixed fees
    return totalTaxRate >= 0.35 && totalTaxRate <= 0.45;
  } else {
    // Gasoline: Should be approximately 51% plus fixed fees
    return totalTaxRate >= 0.45 && totalTaxRate <= 0.60;
  }
}

// Get tax reduction information
export function getTaxReductionInfo(fuelType: FuelType) {
  switch (fuelType) {
    case FuelType.GASOLINE:
    case FuelType.DIESEL:
      return {
        oldRate: '71%',
        newRate: '51%',
        reduction: '28%',
        effectiveDate: '2025-06-29'
      };
    case FuelType.HYBRID:
    case FuelType.PLUGIN_HYBRID:
      return {
        oldRate: '60%',
        newRate: '39%',
        reduction: '35%',
        effectiveDate: '2025-06-29'
      };
    case FuelType.ELECTRIC:
      return {
        oldRate: 'Variable (up to 55%)',
        newRate: '27%',
        reduction: 'Unified rate',
        effectiveDate: '2025-06-29'
      };
    default:
      return null;
  }
}