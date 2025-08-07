import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import CustomsCalculator from './components/CustomsCalculator';
import ThreeDModels from './components/ThreeDModels';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'calculator', 'models', 'info'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-primary-color to-secondary-color rounded-2xl flex items-center justify-center mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-12 h-12 bg-white rounded-xl" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">حاسبة الجمرك</h2>
          <p className="text-text-secondary">جاري التحميل...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Home Section */}
          <section id="home">
            <Home />
          </section>

          {/* Calculator Section */}
          <section id="calculator">
            <CustomsCalculator />
          </section>

          {/* 3D Models Section */}
          <section id="models">
            <ThreeDModels />
          </section>

          {/* Info Section */}
          <section id="info" className="min-h-screen pt-20 pb-8">
            <div className="container mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-color to-secondary-color bg-clip-text text-transparent">
                  معلومات مهمة
                </h1>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  تعرف على آخر التحديثات في القوانين الجمركية والضريبية
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                  className="glass p-8 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-6">التحديثات الجمركية 2024</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-surface rounded-lg">
                      <h3 className="font-bold text-accent-color mb-2">تخفيض الرسوم الجمركية</h3>
                      <p className="text-text-secondary">
                        تم تخفيض نسبة الجمرك من 25% إلى 15% للسيارات العادية، وتم إعفاء السيارات الكهربائية بالكامل من الرسوم الجمركية.
                      </p>
                    </div>
                    <div className="p-4 bg-surface rounded-lg">
                      <h3 className="font-bold text-secondary-color mb-2">الضريبة الخاصة</h3>
                      <p className="text-text-secondary">
                        تم تخفيض الضريبة الخاصة من 15% إلى 10% للسيارات العادية، وتم تخفيضها إلى 5% للسيارات الكهربائية.
                      </p>
                    </div>
                    <div className="p-4 bg-surface rounded-lg">
                      <h3 className="font-bold text-primary-color mb-2">ضريبة المبيعات</h3>
                      <p className="text-text-secondary">
                        ضريبة المبيعات تبقى 16% كما هي، وتطبق على القيمة الإجمالية بعد إضافة الجمرك والضريبة الخاصة.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="glass p-8 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold mb-6">نصائح مهمة</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent-color rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">تأكد من القيمة المعلنة</h3>
                        <p className="text-text-secondary text-sm">
                          تأكد من أن القيمة المعلنة تعكس القيمة الحقيقية للسيارة لتجنب المشاكل القانونية.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary-color rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">استشر خبيراً</h3>
                        <p className="text-text-secondary text-sm">
                          استشر خبيراً جمركياً للحصول على معلومات دقيقة ومحدثة قبل الاستيراد.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-color rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">تحقق من الوثائق</h3>
                        <p className="text-text-secondary text-sm">
                          تأكد من وجود جميع الوثائق المطلوبة قبل بدء إجراءات الاستيراد.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;