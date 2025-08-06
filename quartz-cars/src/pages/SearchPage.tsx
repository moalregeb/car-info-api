import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiSearch } from 'react-icons/fi';

const SearchPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">البحث عن السيارات</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <FiFilter className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">تم العثور على 125 سيارة</span>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-quartz-100 text-quartz-600' : 'text-gray-400'}`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-quartz-100 text-quartz-600' : 'text-gray-400'}`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="text-center py-20">
              <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">صفحة البحث قيد التطوير...</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;