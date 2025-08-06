import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalculator, FiDollarSign, FiInfo } from 'react-icons/fi';

const CalculatorPage: React.FC = () => {
  const [carPrice, setCarPrice] = useState<number>(25000);
  const [engineSize, setEngineSize] = useState<number>(2.0);
  const [carAge, setCarAge] = useState<number>(0);
  
  // Jordan Customs Rates 2025
  const calculateCosts = () => {
    const importDuty = carPrice * 0.27; // 27%
    const salesTax = (carPrice + importDuty) * 0.16; // 16%
    const specialTax = engineSize > 2.0 ? carPrice * 0.10 : 0; // 10% for engines > 2.0L
    const environmentalFee = engineSize > 2.0 ? 500 : 200;
    const clearanceFees = 500;
    const inspectionFees = 200;
    
    const totalCustoms = importDuty + salesTax + specialTax + environmentalFee + clearanceFees + inspectionFees;
    const totalCost = carPrice + totalCustoms;
    const totalCostJOD = totalCost * 0.71; // USD to JOD conversion
    
    return {
      importDuty,
      salesTax,
      specialTax,
      environmentalFee,
      clearanceFees,
      inspectionFees,
      totalCustoms,
      totalCost,
      totalCostJOD
    };
  };
  
  const costs = calculateCosts();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">حاسبة التكاليف الشاملة</h1>
            <p className="text-gray-600">احسب التكلفة الإجمالية للسيارة شاملة رسوم الجمرك المحدثة لعام 2025</p>
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
                    حجم المحرك (باللتر)
                  </label>
                  <select
                    value={engineSize}
                    onChange={(e) => setEngineSize(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quartz-500 focus:border-transparent"
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

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <FiInfo className="w-5 h-5 text-blue-500 mt-0.5 ml-2" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium mb-1">معلومات مهمة:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• رسوم الجمرك: 27% من قيمة السيارة</li>
                        <li>• ضريبة المبيعات: 16% من (السعر + الجمرك)</li>
                        <li>• ضريبة خاصة: 10% للمحركات أكبر من 2.0L</li>
                        <li>• رسوم إضافية: فحص وتخليص ورسوم بيئية</li>
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
                تفصيل التكاليف
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">سعر السيارة الأساسي:</span>
                  <span className="font-medium">${carPrice.toLocaleString()}</span>
                </div>

                <div className="space-y-3 py-4 bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">رسوم الجمرك والضرائب:</h3>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم الجمرك (27%):</span>
                    <span>${costs.importDuty.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">ضريبة المبيعات (16%):</span>
                    <span>${costs.salesTax.toLocaleString()}</span>
                  </div>
                  
                  {costs.specialTax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">ضريبة خاصة (10%):</span>
                      <span>${costs.specialTax.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم بيئية:</span>
                    <span>${costs.environmentalFee}</span>
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
                    <span className="text-red-600">${costs.totalCustoms.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-quartz-50 to-quartz-100 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-gray-900">التكلفة الإجمالية:</span>
                    <span className="text-2xl font-bold text-quartz-600">
                      ${costs.totalCost.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">بالدينار الأردني:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {costs.totalCostJOD.toLocaleString()} د.أ
                    </span>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p>* سعر الصرف المستخدم: 1 USD = 0.71 JOD</p>
                    <p>* الأسعار تقديرية وقد تختلف حسب التقييم الجمركي الفعلي</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Information */}
          <motion.div
            className="mt-8 bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">معلومات إضافية مهمة</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">التأمين الإجباري:</h4>
                <p className="text-sm text-gray-600 mb-1">• التأمين الإجباري: 200-400 د.أ سنوياً</p>
                <p className="text-sm text-gray-600 mb-1">• التأمين الشامل: 800-2000 د.أ سنوياً</p>
                <p className="text-sm text-gray-600">• يعتمد على قيمة السيارة وعمر السائق</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">رسوم إضافية:</h4>
                <p className="text-sm text-gray-600 mb-1">• رسوم الترخيص: 200-500 د.أ</p>
                <p className="text-sm text-gray-600 mb-1">• فحص السيارة: 50-100 د.أ</p>
                <p className="text-sm text-gray-600">• رسوم النقل والشحن: حسب الموقع</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorPage;