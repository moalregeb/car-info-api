import React from 'react';
import { motion } from 'framer-motion';
import { FiBarChart3 } from 'react-icons/fi';

const ComparePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">مقارنة السيارات</h1>
          
          <div className="text-center py-20">
            <FiBarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">صفحة المقارنة قيد التطوير...</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComparePage;