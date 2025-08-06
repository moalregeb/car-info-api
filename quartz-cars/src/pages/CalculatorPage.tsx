import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiCalculator, FiDollarSign, FiInfo, FiTrendingDown, FiCheckCircle } from 'react-icons/fi';
import { FuelType, CarCategory } from '../types';
import { calculateCustomsCosts, getTaxReductionInfo, CustomsCalculationParams } from '../utils/customsCalculator';

const CalculatorPage: React.FC = () => {
  const [carPrice, setCarPrice] = useState<number>(25000);
  const [engineSize, setEngineSize] = useState<number>(2.0);
  const [carAge, setCarAge] = useState<number>(0);
  const [fuelType, setFuelType] = useState<FuelType>(FuelType.GASOLINE);
  const [category, setCategory] = useState<CarCategory>(CarCategory.SEDAN);
  
  // Memoize expensive calculations
  const params: CustomsCalculationParams = useMemo(() => ({
    carPrice,
    engineSize,
    fuelType,
    carAge,
    category
  }), [carPrice, engineSize, fuelType, carAge, category]);
  
  const costs = useMemo(() => calculateCustomsCosts(params), [params]);
  const taxReduction = useMemo(() => getTaxReductionInfo(fuelType), [fuelType]);

  // Memoize engine options to prevent re-renders
  const engineOptions = useMemo(() => [
    { value: 1.0, label: '1.0 لتر' },
    { value: 1.2, label: '1.2 لتر' },
    { value: 1.4, label: '1.4 لتر' },
    { value: 1.6, label: '1.6 لتر' },
    { value: 1.8, label: '1.8 لتر' },
    { value: 2.0, label: '2.0 لتر' },
    { value: 2.4, label: '2.4 لتر' },
    { value: 2.5, label: '2.5 لتر' },
    { value: 3.0, label: '3.0 لتر' },
    { value: 3.5, label: '3.5 لتر' },
    { value: 4.0, label: '4.0 لتر' }
  ], []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">حاسبة التكاليف الشاملة</h1>
            <p className="text-gray-600 mb-4">
              احسب التكلفة الإجمالية للسيارة شاملة رسوم الجمرك المحدثة والمخفضة لعام 2025
            </p>
            
            {/* Tax Reduction Banner */}
            <motion.div 
              className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <FiTrendingDown className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  🎉 تخفيضات ضريبية جديدة اعتباراً من 29 يونيو 2025
                </span>
              </div>
              {taxReduction && (
                <div className="mt-2 text-sm text-green-700">
                  تم تخفيض الضرائب من {taxReduction.oldRate} إلى {taxReduction.newRate} 
                  (توفير {taxReduction.reduction})
                </div>
              )}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form - Optimized */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiCalculator className="w-6 h-6 ml-2" />
                بيانات السيارة
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    سعر السيارة (بالدولار الأمريكي)
                  </label>
                  <input
                    type="number"
                    value={carPrice}
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quartz-500 focus:border-transparent"
                    placeholder="25000"
                    min="1000"
                    max="200000"
                    step="1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع الوقود
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value as FuelType)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quartz-500 focus:border-transparent"
                  >
                    <option value={FuelType.GASOLINE}>بنزين</option>
                    <option value={FuelType.HYBRID}>هايبرد</option>
                    <option value={FuelType.ELECTRIC}>كهربائي</option>
                    <option value={FuelType.DIESEL}>ديزل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حجم المحرك (باللتر)
                  </label>
                  <select
                    value={engineSize}
                    onChange={(e) => setEngineSize(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quartz-500 focus:border-transparent"
                    disabled={fuelType === FuelType.ELECTRIC}
                  >
                    {engineOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fuelType === FuelType.ELECTRIC && (
                    <p className="text-sm text-gray-500 mt-1">لا ينطبق على السيارات الكهربائية</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    فئة السيارة
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CarCategory)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quartz-500 focus:border-transparent"
                  >
                    <option value={CarCategory.SEDAN}>سيدان</option>
                    <option value={CarCategory.SUV}>SUV</option>
                    <option value={CarCategory.HATCHBACK}>هاتشباك</option>
                    <option value={CarCategory.COUPE}>كوبيه</option>
                    <option value={CarCategory.PICKUP}>بيك أب</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عمر السيارة (بالسنوات)
                  </label>
                  <select
                    value={carAge}
                    onChange={(e) => setCarAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quartz-500 focus:border-transparent"
                  >
                    <option value={0}>جديدة (0 سنة)</option>
                    <option value={1}>سنة واحدة</option>
                    <option value={2}>سنتان</option>
                    <option value={3}>3 سنوات</option>
                    <option value={4}>4 سنوات</option>
                    <option value={5}>5 سنوات</option>
                  </select>
                </div>

                {/* Quick calculation tips */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <FiInfo className="w-5 h-5 text-blue-500 mt-0.5 ml-2 flex-shrink-0" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium mb-1">💡 نصائح سريعة:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• السيارات الكهربائية: ضريبة موحدة 27%</li>
                        <li>• الهايبرد: توفير 35% عن المعدلات السابقة</li>
                        <li>• العادية: توفير 28% عن المعدلات السابقة</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results - Optimized with better layout */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiDollarSign className="w-6 h-6 ml-2" />
                النتائج المحدثة
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">سعر السيارة:</span>
                  <span className="font-bold text-lg">${carPrice.toLocaleString()}</span>
                </div>

                <div className="space-y-3 py-4 bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">💰 تفصيل الرسوم:</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">جمرك:</span>
                      <span className="font-medium">${costs.importDuty.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">مبيعات:</span>
                      <span className="font-medium">${costs.salesTax.toLocaleString()}</span>
                    </div>
                    
                    {costs.specialTax > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">خاصة:</span>
                        <span className="font-medium">${costs.specialTax.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">بيئية:</span>
                      <span className="font-medium">${costs.environmentalFee}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">وزن:</span>
                      <span className="font-medium">${costs.weightTax.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">رسوم:</span>
                      <span className="font-medium">${costs.clearanceFees + costs.inspectionFees}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
                    <span>إجمالي الرسوم:</span>
                    <span className="text-red-600">${costs.totalCustomsCost.toLocaleString()}</span>
                  </div>
                </div>

                {/* Final Results */}
                <div className="bg-gradient-to-r from-quartz-50 to-quartz-100 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-quartz-600 mb-1">
                        ${costs.totalCostUSD.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">إجمالي بالدولار</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {costs.totalCostJOD.toLocaleString()} د.أ
                      </div>
                      <div className="text-sm text-gray-600">إجمالي بالدينار</div>
                    </div>
                  </div>

                  {/* Tax Savings Display */}
                  {taxReduction && (
                    <div className="bg-green-100 rounded-lg p-4 mb-4">
                      <div className="flex items-center mb-2">
                        <FiCheckCircle className="w-5 h-5 text-green-600 ml-2" />
                        <span className="font-medium text-green-800">🎉 توفير 2025</span>
                      </div>
                      <div className="text-sm text-green-700 grid grid-cols-2 gap-2">
                        <div>سابقاً: {taxReduction.oldRate}</div>
                        <div>حالياً: {taxReduction.newRate}</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-600 text-center">
                    <p>💱 سعر الصرف: 1 USD = 0.71 JOD</p>
                    <p>📅 آخر تحديث: {costs.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Info Cards */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <h3 className="font-bold text-gray-900 mb-2">🚗 تأمين إجباري</h3>
              <p className="text-sm text-gray-600">200-400 د.أ سنوياً</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <h3 className="font-bold text-gray-900 mb-2">📋 ترخيص</h3>
              <p className="text-sm text-gray-600">200-500 د.أ</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <h3 className="font-bold text-gray-900 mb-2">🔧 فحص</h3>
              <p className="text-sm text-gray-600">50-100 د.أ</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorPage;