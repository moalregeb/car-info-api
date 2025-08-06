import React, { useState } from 'react';
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
  
  const params: CustomsCalculationParams = {
    carPrice,
    engineSize,
    fuelType,
    carAge,
    category
  };
  
  const costs = calculateCustomsCosts(params);
  const taxReduction = getTaxReductionInfo(fuelType);

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
            {/* Input Form */}
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
                    <option value={1.0}>1.0 لتر</option>
                    <option value={1.2}>1.2 لتر</option>
                    <option value={1.4}>1.4 لتر</option>
                    <option value={1.6}>1.6 لتر</option>
                    <option value={1.8}>1.8 لتر</option>
                    <option value={2.0}>2.0 لتر</option>
                    <option value={2.4}>2.4 لتر</option>
                    <option value={2.5}>2.5 لتر</option>
                    <option value={3.0}>3.0 لتر</option>
                    <option value={3.5}>3.5 لتر</option>
                    <option value={4.0}>4.0 لتر</option>
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

                {/* Updated Information Box */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <FiInfo className="w-5 h-5 text-blue-500 mt-0.5 ml-2" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium mb-1">التحديثات الجديدة لعام 2025:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• تخفيض الضرائب على السيارات العادية من 71% إلى 51%</li>
                        <li>• تخفيض الضرائب على الهايبرد من 60% إلى 39%</li>
                        <li>• ضريبة موحدة 27% للسيارات الكهربائية</li>
                        <li>• رسوم الجمرك: 27% من قيمة السيارة</li>
                        <li>• ضريبة المبيعات: 16% من (السعر + الجمرك)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiDollarSign className="w-6 h-6 ml-2" />
                تفصيل التكاليف المحدث
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">سعر السيارة الأساسي:</span>
                  <span className="font-medium">${carPrice.toLocaleString()}</span>
                </div>

                <div className="space-y-3 py-4 bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">رسوم الجمرك والضرائب:</h3>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم الجمرك ({(costs.importDutyRate * 100).toFixed(0)}%):</span>
                    <span>${costs.importDuty.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">ضريبة المبيعات ({(costs.salesTaxRate * 100).toFixed(0)}%):</span>
                    <span>${costs.salesTax.toLocaleString()}</span>
                  </div>
                  
                  {costs.specialTax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">الضريبة الخاصة ({(costs.specialTaxRate * 100).toFixed(1)}%):</span>
                      <span>${costs.specialTax.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم بيئية:</span>
                    <span>${costs.environmentalFee}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم الوزن/القيمة:</span>
                    <span>${costs.weightTax.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم التخليص:</span>
                    <span>${costs.clearanceFees}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم الفحص:</span>
                    <span>${costs.inspectionFees}</span>
                  </div>
                  
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                    <span>إجمالي الرسوم:</span>
                    <span className="text-red-600">${costs.totalCustomsCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-quartz-50 to-quartz-100 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-gray-900">التكلفة الإجمالية:</span>
                    <span className="text-2xl font-bold text-quartz-600">
                      ${costs.totalCostUSD.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">بالدينار الأردني:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {costs.totalCostJOD.toLocaleString()} د.أ
                    </span>
                  </div>

                  {/* Tax Savings Display */}
                  {taxReduction && (
                    <div className="bg-green-100 rounded-lg p-4 mb-4">
                      <div className="flex items-center mb-2">
                        <FiCheckCircle className="w-5 h-5 text-green-600 ml-2" />
                        <span className="font-medium text-green-800">توفير بالتخفيضات الجديدة</span>
                      </div>
                      <div className="text-sm text-green-700">
                        <p>• معدل الضريبة السابق: {taxReduction.oldRate}</p>
                        <p>• معدل الضريبة الجديد: {taxReduction.newRate}</p>
                        <p>• نسبة التوفير: {taxReduction.reduction}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-600">
                    <p>* سعر الصرف المستخدم: 1 USD = 0.71 JOD</p>
                    <p>* الأسعار محدثة حسب القرارات الحكومية الجديدة</p>
                    <p>* آخر تحديث: {costs.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Information */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">التأمين الإجباري</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">• التأمين الإجباري: 200-400 د.أ سنوياً</p>
                <p className="text-gray-600">• التأمين الشامل: 800-2000 د.أ سنوياً</p>
                <p className="text-gray-600">• يعتمد على قيمة السيارة وعمر السائق</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">رسوم إضافية</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">• رسوم الترخيص: 200-500 د.أ</p>
                <p className="text-gray-600">• فحص السيارة: 50-100 د.أ</p>
                <p className="text-gray-600">• رسوم النقل والشحن: حسب الموقع</p>
              </div>
            </div>
          </motion.div>

          {/* Government Sources */}
          <motion.div
            className="mt-8 bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">المصادر الرسمية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">قرار مجلس الوزراء - 28 يونيو 2025:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• تخفيض الضرائب على السيارات العادية بنسبة 28%</li>
                  <li>• تخفيض الضرائب على الهايبرد بنسبة 35%</li>
                  <li>• توحيد ضريبة السيارات الكهربائية عند 27%</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">المواقع الرسمية:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• دائرة الجمارك الأردنية: customs.gov.jo</li>
                  <li>• دائرة ضريبة الدخل والمبيعات: istd.gov.jo</li>
                  <li>• وزارة المالية: mof.gov.jo</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorPage;