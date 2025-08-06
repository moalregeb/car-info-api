import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCar } from 'react-icons/fi';

const CarDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-8"
        >
          <div className="text-center py-20">
            <FiCar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">تفاصيل السيارة</h1>
            <p className="text-gray-500">معرف السيارة: {id}</p>
            <p className="text-gray-500 mt-2">صفحة التفاصيل قيد التطوير...</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarDetailsPage;