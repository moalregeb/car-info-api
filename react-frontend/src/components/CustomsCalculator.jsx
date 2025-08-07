import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Car, 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Info,
  AlertCircle,
  CheckCircle,
  Zap,
  Shield,
  FileText
} from 'lucide-react';

const CustomsCalculator = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [declaredValue, setDeclaredValue] = useState("");
  const [carInfo, setCarInfo] = useState(null);
  const [calculation, setCalculation] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async (categoryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/brands?category_id=${categoryId}`);
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchModels = async (brandId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/models?brand_id=${brandId}`);
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const fetchCarInfo = async (modelId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/vehicle-info?model_id=${modelId}`);
      setCarInfo(response.data);
    } catch (error) {
      console.error('Error fetching car info:', error);
    }
  };

  const calculateCustoms = async () => {
    if (!selectedModel || !declaredValue) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/calculate-customs`, {
        model_id: selectedModel,
        declared_value: parseFloat(declaredValue)
      });
      setCalculation(response.data);
    } catch (error) {
      console.error('Error calculating customs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedBrand("");
    setSelectedModel("");
    setCarInfo(null);
    setCalculation(null);
    if (categoryId) {
      fetchBrands(categoryId);
    } else {
      setBrands([]);
      setModels([]);
    }
  };

  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId);
    setSelectedModel("");
    setCarInfo(null);
    setCalculation(null);
    if (brandId) {
      fetchModels(brandId);
    } else {
      setModels([]);
    }
  };

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
    setCarInfo(null);
    setCalculation(null);
    if (modelId) {
      fetchCarInfo(modelId);
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ar-JO').format(num);
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-color to-secondary-color bg-clip-text text-transparent">
            حاسبة الرسوم الجمركية
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            احسب الرسوم الجمركية والضريبية للسيارات في الأردن بسهولة ودقة
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            className="glass p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-primary-color" />
              حاسبة الرسوم
            </h2>

            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">فئة المركبة</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-3 rounded-lg bg-surface border border-border text-white focus:border-primary-color focus:outline-none transition-colors"
                >
                  <option value="">اختر الفئة</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">الشركة المصنعة</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  disabled={!brands.length}
                  className="w-full p-3 rounded-lg bg-surface border border-border text-white focus:border-primary-color focus:outline-none transition-colors disabled:opacity-50"
                >
                  <option value="">اختر الشركة</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">الموديل</label>
                <select
                  value={selectedModel}
                  onChange={(e) => handleModelChange(e.target.value)}
                  disabled={!models.length}
                  className="w-full p-3 rounded-lg bg-surface border border-border text-white focus:border-primary-color focus:outline-none transition-colors disabled:opacity-50"
                >
                  <option value="">اختر الموديل</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} ({model.year})
                    </option>
                  ))}
                </select>
              </div>

              {/* Declared Value */}
              <div>
                <label className="block text-sm font-medium mb-2">القيمة المعلنة (دينار أردني)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="number"
                    value={declaredValue}
                    onChange={(e) => setDeclaredValue(e.target.value)}
                    placeholder="أدخل القيمة المعلنة"
                    className="w-full p-3 pl-12 rounded-lg bg-surface border border-border text-white focus:border-primary-color focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <motion.button
                onClick={calculateCustoms}
                disabled={!selectedModel || !declaredValue || loading}
                className="w-full p-4 bg-gradient-to-r from-primary-color to-secondary-color text-white font-bold rounded-lg hover:from-primary-dark hover:to-primary-color transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Calculator className="w-5 h-5" />
                )}
                {loading ? 'جاري الحساب...' : 'احسب الرسوم'}
              </motion.button>
            </div>
          </motion.div>

          {/* Results */}
          <div className="space-y-6">
            {/* Car Information */}
            {carInfo && (
              <motion.div
                className="glass p-6 rounded-2xl shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-accent-color" />
                  معلومات المركبة
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">القيمة السوقية:</span>
                    <span className="font-semibold">{formatNumber(carInfo.market_value)} د.أ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">مستوى الطلب:</span>
                    <span className="font-semibold text-accent-color">{carInfo.demand_level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">نصائح الشراء:</span>
                    <span className="font-semibold text-text-secondary text-sm">{carInfo.acquisition_tips}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Calculation Results */}
            {calculation && (
              <motion.div
                className="glass p-6 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary-color" />
                  نتائج الحساب
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface rounded-lg p-3">
                      <div className="text-sm text-text-secondary">القيمة المعلنة</div>
                      <div className="text-lg font-bold">{formatNumber(calculation.declared_value)} د.أ</div>
                    </div>
                    <div className="bg-surface rounded-lg p-3">
                      <div className="text-sm text-text-secondary">إجمالي الرسوم</div>
                      <div className="text-lg font-bold text-secondary-color">{formatNumber(calculation.total_amount)} د.أ</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>رسوم الجمرك ({calculation.rates.duty_rate}%):</span>
                      <span>{formatNumber(calculation.duty_amount)} د.أ</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>الضريبة الخاصة ({calculation.rates.special_tax}%):</span>
                      <span>{formatNumber(calculation.special_tax_amount)} د.أ</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ضريبة المبيعات ({calculation.rates.vat_rate}%):</span>
                      <span>{formatNumber(calculation.vat_amount)} د.أ</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>السعر النهائي:</span>
                      <span className="text-accent-color">{formatNumber(calculation.final_price)} د.أ</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomsCalculator;