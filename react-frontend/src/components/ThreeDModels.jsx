import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Box, 
  RotateCcw, 
  ZoomIn, 
  Download,
  Share2,
  Eye,
  Layers
} from 'lucide-react';

const ThreeDModels = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [viewMode, setViewMode] = useState('3d');

  const carModels = [
    {
      id: 1,
      name: 'Toyota Corolla 2023',
      category: 'سيدان',
      brand: 'Toyota',
      year: 2023,
      image: '/api/placeholder/300/200',
      model3d: '/models/corolla-2023.glb',
      specs: {
        engine: '1.6L',
        power: '121 حصان',
        transmission: 'أوتوماتيك',
        fuelType: 'بنزين'
      },
      angles: ['front', 'back', 'side', 'interior']
    },
    {
      id: 2,
      name: 'BYD Seal 2024',
      category: 'سيدان كهربائي',
      brand: 'BYD',
      year: 2024,
      image: '/api/placeholder/300/200',
      model3d: '/models/byd-seal-2024.glb',
      specs: {
        battery: '82kWh',
        range: '570 كم',
        power: '204 حصان',
        charging: 'DC سريع'
      },
      angles: ['front', 'back', 'side', 'interior']
    },
    {
      id: 3,
      name: 'Honda Civic 2023',
      category: 'سيدان',
      brand: 'Honda',
      year: 2023,
      image: '/api/placeholder/300/200',
      model3d: '/models/civic-2023.glb',
      specs: {
        engine: '1.5L Turbo',
        power: '182 حصان',
        transmission: 'CVT',
        fuelType: 'بنزين'
      },
      angles: ['front', 'back', 'side', 'interior']
    },
    {
      id: 4,
      name: 'Nissan X-Trail 2024',
      category: 'SUV',
      brand: 'Nissan',
      year: 2024,
      image: '/api/placeholder/300/200',
      model3d: '/models/x-trail-2024.glb',
      specs: {
        engine: '1.5L Turbo',
        power: '150 حصان',
        transmission: 'CVT',
        fuelType: 'بنزين'
      },
      angles: ['front', 'back', 'side', 'interior']
    }
  ];

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
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
            نماذج ثلاثية الأبعاد
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            استكشف السيارات بتفاصيلها الكاملة من خلال النماذج ثلاثية الأبعاد التفاعلية
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Model List */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Box className="w-6 h-6 text-primary-color" />
                النماذج المتاحة
              </h2>
              
              <div className="space-y-4">
                {carModels.map((model) => (
                  <motion.div
                    key={model.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedModel?.id === model.id 
                        ? 'bg-primary-color text-white' 
                        : 'bg-surface hover:bg-surface-light'
                    }`}
                    onClick={() => handleModelSelect(model)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-color to-secondary-color rounded-lg flex items-center justify-center">
                        <Car className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{model.name}</h3>
                        <p className="text-sm opacity-80">{model.brand} • {model.year}</p>
                        <p className="text-xs opacity-60">{model.category}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3D Viewer */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Eye className="w-6 h-6 text-accent-color" />
                  عارض ثلاثي الأبعاد
                </h2>
                
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleViewModeChange('3d')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === '3d' 
                        ? 'bg-primary-color text-white' 
                        : 'bg-surface text-text-secondary hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleViewModeChange('360')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === '360' 
                        ? 'bg-primary-color text-white' 
                        : 'bg-surface text-text-secondary hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {selectedModel ? (
                <div className="space-y-6">
                  {/* 3D Viewer Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-surface to-surface-light rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-color/20 to-secondary-color/20" />
                    <div className="relative z-10 text-center">
                      <Box className="w-16 h-16 mx-auto mb-4 text-primary-color" />
                      <h3 className="text-xl font-bold mb-2">{selectedModel.name}</h3>
                      <p className="text-text-secondary mb-4">عرض ثلاثي الأبعاد تفاعلي</p>
                      <div className="flex gap-2 justify-center">
                        <motion.button
                          className="px-4 py-2 bg-primary-color text-white rounded-lg flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ZoomIn className="w-4 h-4" />
                          تكبير
                        </motion.button>
                        <motion.button
                          className="px-4 py-2 bg-surface text-white rounded-lg flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Download className="w-4 h-4" />
                          تحميل
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Model Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass p-4 rounded-xl">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-accent-color" />
                        المواصفات
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(selectedModel.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-text-secondary">{key}:</span>
                            <span className="font-semibold">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass p-4 rounded-xl">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-secondary-color" />
                        زوايا العرض
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedModel.angles.map((angle) => (
                          <motion.button
                            key={angle}
                            className="p-2 bg-surface rounded-lg text-sm hover:bg-surface-light transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {angle === 'front' && 'أمامي'}
                            {angle === 'back' && 'خلفي'}
                            {angle === 'side' && 'جانبي'}
                            {angle === 'interior' && 'داخلي'}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      className="flex-1 p-3 bg-gradient-to-r from-primary-color to-secondary-color text-white rounded-lg font-bold flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Share2 className="w-5 h-5" />
                      مشاركة النموذج
                    </motion.button>
                    <motion.button
                      className="flex-1 p-3 bg-surface text-white rounded-lg font-bold flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-5 h-5" />
                      تحميل النموذج
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-surface to-surface-light rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Box className="w-16 h-16 mx-auto mb-4 text-text-muted" />
                    <h3 className="text-xl font-bold mb-2">اختر نموذجاً</h3>
                    <p className="text-text-secondary">اختر سيارة من القائمة لعرضها ثلاثي الأبعاد</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDModels;