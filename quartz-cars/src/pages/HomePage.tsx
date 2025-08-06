import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiSearch, 
  FiTrendingUp, 
  FiAward, 
  FiShield, 
  FiDollarSign, 
  FiUsers,
  FiArrowRight,
  FiStar,
  FiEye,
  FiHeart,
  FiFilter,
  FiTrendingDown
} from 'react-icons/fi';
import { carBrands } from '../data/carBrands';
import { carModels } from '../data/carModels';
import { CarCategory, BodyType, FuelType } from '../types';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CarCategory | ''>('');
  const [selectedFuelType, setSelectedFuelType] = useState<FuelType | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  // Featured cars (first 3 from our data)
  const featuredCars = carModels.slice(0, 3);

  // Statistics
  const stats = [
    { icon: FiUsers, value: '15,000+', label: 'عميل راضٍ', color: 'text-blue-500' },
    { icon: FiAward, value: '500+', label: 'سيارة متاحة', color: 'text-green-500' },
    { icon: FiShield, value: '100%', label: 'ضمان الجودة', color: 'text-purple-500' },
    { icon: FiTrendingUp, value: '98%', label: 'معدل الرضا', color: 'text-quartz-500' },
  ];

  const features = [
    {
      icon: FiSearch,
      title: 'بحث ذكي متقدم',
      description: 'ابحث عن سيارتك المثالية باستخدام فلاتر متقدمة وذكية',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FiDollarSign,
      title: 'حاسبة التكاليف الشاملة',
      description: 'احسب التكلفة الإجمالية شاملة الجمرك والرسوم المحدثة لعام 2025',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FiShield,
      title: 'معلومات موثوقة ودقيقة',
      description: 'بيانات محدثة ودقيقة لجميع المواصفات والأسعار',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FiUsers,
      title: 'دليل الوكلاء المعتمدين',
      description: 'معلومات شاملة عن جميع الوكلاء المعتمدين في الأردن',
      color: 'from-quartz-500 to-quartz-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-quartz-50 via-white to-quartz-100 pt-20 pb-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ed751e' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                اكتشف سيارة أحلامك مع 
                <span className="text-gradient"> Quartz</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                المرجع الأول للسيارات في الأردن - أسعار دقيقة، معلومات شاملة، وحاسبة تكاليف محدثة مع التخفيضات الضريبية الجديدة لعام 2025
              </motion.p>

              {/* New Tax Reduction Banner */}
              <motion.div 
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl p-6 mb-8 max-w-4xl mx-auto shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <FiTrendingDown className="w-8 h-8 ml-3" />
                  <h2 className="text-2xl font-bold">🎉 تخفيضات ضريبية تاريخية - 2025</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-2">28%</div>
                    <div className="text-sm">توفير على السيارات العادية</div>
                    <div className="text-xs opacity-75">من 71% إلى 51%</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-2">35%</div>
                    <div className="text-sm">توفير على الهايبرد</div>
                    <div className="text-xs opacity-75">من 60% إلى 39%</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-2">27%</div>
                    <div className="text-sm">ضريبة موحدة للكهربائية</div>
                    <div className="text-xs opacity-75">بدلاً من معدلات متدرجة</div>
                  </div>
                </div>
                
                <div className="mt-4 text-sm opacity-90">
                  ✅ سارية المفعول من 29 يونيو 2025 | مصدر: قرار مجلس الوزراء الأردني
                </div>
              </motion.div>

            {/* Advanced Search Box */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Brand Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block text-right">العلامة التجارية</label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quartz-500 focus:border-transparent text-right"
                    >
                      <option value="">جميع العلامات</option>
                      {carBrands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block text-right">نوع السيارة</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as CarCategory)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quartz-500 focus:border-transparent text-right"
                    >
                      <option value="">جميع الأنواع</option>
                      <option value={CarCategory.SEDAN}>سيدان</option>
                      <option value={CarCategory.SUV}>SUV</option>
                      <option value={CarCategory.HATCHBACK}>هاتشباك</option>
                      <option value={CarCategory.ELECTRIC}>كهربائية</option>
                    </select>
                  </div>

                  {/* Fuel Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block text-right">نوع الوقود</label>
                    <select
                      value={selectedFuelType}
                      onChange={(e) => setSelectedFuelType(e.target.value as FuelType)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quartz-500 focus:border-transparent text-right"
                    >
                      <option value="">جميع الأنواع</option>
                      <option value={FuelType.GASOLINE}>بنزين</option>
                      <option value={FuelType.ELECTRIC}>كهربائي</option>
                      <option value={FuelType.HYBRID}>هايبرد</option>
                      <option value={FuelType.DIESEL}>ديزل</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block text-right opacity-0">البحث</label>
                    <Link
                      to="/search"
                      className="w-full bg-gradient-to-r from-quartz-500 to-quartz-600 text-white px-6 py-3 rounded-lg hover:from-quartz-600 hover:to-quartz-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-lg hover:shadow-xl"
                    >
                      <FiSearch className="w-5 h-5" />
                      <span className="font-medium">ابحث الآن</span>
                    </Link>
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {['تويوتا كامري', 'هوندا سيفيك', 'BYD أتو 3', 'فورد إكسبلورر'].map((filter) => (
                    <button
                      key={filter}
                      className="px-4 py-2 bg-quartz-50 text-quartz-600 rounded-full hover:bg-quartz-100 transition-colors text-sm"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section - Updated with new savings info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-quartz-600 mb-2">37+</div>
              <div className="text-gray-600">علامة تجارية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-quartz-600 mb-2">500+</div>
              <div className="text-gray-600">موديل سيارة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">51%</div>
              <div className="text-gray-600">ضريبة جديدة للعادية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">27%</div>
              <div className="text-gray-600">ضريبة الكهربائية</div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-quartz-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              السيارات المميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              اكتشف أفضل السيارات المتاحة مع أسعار تنافسية ومواصفات ممتازة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => {
              const brand = carBrands.find(b => b.id === car.brandId);
              const primaryImage = car.images.find(img => img.isPrimary) || car.images[0];
              
              return (
                <motion.div
                  key={car.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <FiEye className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <FiHeart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
                    </div>
                    
                    {/* New Savings Badge */}
                    {(() => {
                      const totalCost = calculateTotalCost(car);
                      if (totalCost.savingsFrom2024 > 0) {
                        return (
                          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            وفر ${totalCost.savingsFrom2024.toLocaleString()}
                          </div>
                        );
                      }
                    })()}
                    
                    <div className="absolute bottom-4 left-4 bg-quartz-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {car.category === CarCategory.ELECTRIC ? 'كهربائي' : 'جديد'}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {brand?.nameAr} {car.nameAr}
                      </h3>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{car.safetyRating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">المحرك:</span>
                        <span className="font-medium">{car.variants[0].engineSize}L {car.variants[0].engineType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">القوة:</span>
                        <span className="font-medium">{car.variants[0].horsepower} حصان</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">الوقود:</span>
                        <span className="font-medium">
                          {car.variants[0].fuelType === FuelType.ELECTRIC ? 'كهربائي' : 
                           car.variants[0].fuelType === FuelType.GASOLINE ? 'بنزين' : 'هايبرد'}
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-quartz-600">
                            ${car.prices.basePrice.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            + ${car.customsCosts.totalCustomsCost.toLocaleString()} جمرك محدث
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-semibold text-gray-900">
                            {Math.round((car.prices.basePrice + car.customsCosts.totalCustomsCost) * 0.71).toLocaleString()} د.أ
                          </div>
                          <div className="text-xs text-gray-500">السعر الإجمالي</div>
                        </div>
                      </div>
                      
                      {/* New Tax Rate Display */}
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-700">معدل الضريبة الجديد 2025:</span>
                          <span className="font-bold text-green-800">
                            {(() => {
                              const variant = car.variants[0];
                              if (variant.fuelType === FuelType.ELECTRIC) return '27%';
                              if (variant.fuelType === FuelType.HYBRID) return '39%';
                              return '51%';
                            })()}
                          </span>
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          توفير كبير مقارنة بالمعدلات السابقة
                        </div>
                      </div>

                      <Link
                        to={`/car/${car.id}`}
                        className="w-full bg-gradient-to-r from-quartz-500 to-quartz-600 text-white py-3 rounded-lg hover:from-quartz-600 hover:to-quartz-700 transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse group"
                      >
                        <span>عرض التفاصيل</span>
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/search"
              className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white text-quartz-600 px-8 py-4 rounded-lg hover:bg-quartz-50 transition-colors shadow-lg font-medium"
            >
              <span>عرض جميع السيارات</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختار Quartz؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم أفضل الخدمات والأدوات لمساعدتك في اتخاذ القرار الصحيح
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-quartz-500 to-quartz-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ابدأ رحلتك معنا اليوم
            </h2>
            <p className="text-xl text-quartz-100 mb-8 max-w-2xl mx-auto">
              اكتشف آلاف السيارات المتاحة واحصل على أفضل الأسعار والخدمات في الأردن
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="bg-white text-quartz-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-lg"
              >
                <FiSearch className="w-5 h-5" />
                <span>ابحث عن سيارة</span>
              </Link>
              <Link
                to="/calculator"
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-quartz-600 transition-colors font-medium flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <FiDollarSign className="w-5 h-5" />
                <span>احسب التكاليف</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;