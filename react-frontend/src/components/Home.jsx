import React from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Calculator, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  Star,
  Users,
  Award,
  Clock
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Calculator,
      title: 'حاسبة دقيقة',
      description: 'احسب الرسوم الجمركية بدقة عالية وفقاً للقوانين الأردنية المحدثة',
      color: 'from-primary-color to-primary-dark'
    },
    {
      icon: Shield,
      title: 'معلومات موثوقة',
      description: 'بيانات محدثة من مصادر رسمية وموثوقة',
      color: 'from-accent-color to-green-600'
    },
    {
      icon: Zap,
      title: 'سرعة في الأداء',
      description: 'حسابات فورية وسهولة في الاستخدام',
      color: 'from-secondary-color to-orange-600'
    },
    {
      icon: TrendingUp,
      title: 'أسعار محدثة',
      description: 'أسعار السوق الحالية ومؤشرات الطلب',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { number: '1000+', label: 'حساب يومياً', icon: Calculator },
    { number: '50+', label: 'موديل سيارة', icon: Car },
    { number: '99%', label: 'دقة الحسابات', icon: Shield },
    { number: '24/7', label: 'متاح دائماً', icon: Clock }
  ];

  const recentUpdates = [
    {
      title: 'تخفيض الرسوم الجمركية',
      description: 'تم تخفيض نسبة الجمرك من 25% إلى 15% للسيارات العادية',
      date: '2024',
      type: 'update'
    },
    {
      title: 'إعفاء السيارات الكهربائية',
      description: 'إعفاء كامل من الرسوم الجمركية للسيارات الكهربائية',
      date: '2024',
      type: 'feature'
    },
    {
      title: 'تحديث النسب الضريبية',
      description: 'تحديث النسب الضريبية وفقاً لقرارات مجلس الوزراء',
      date: '2024',
      type: 'update'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-color via-secondary-color to-accent-color bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            حاسبة الرسوم الجمركية
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            احسب الرسوم الجمركية والضريبية للسيارات في الأردن بسهولة ودقة عالية
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="#calculator"
              className="px-8 py-4 bg-gradient-to-r from-primary-color to-secondary-color text-white font-bold rounded-xl hover:from-primary-dark hover:to-primary-color transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calculator className="w-5 h-5" />
              ابدأ الحساب الآن
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#models"
              className="px-8 py-4 glass text-white font-bold rounded-xl hover:bg-surface-light transition-all duration-200 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Car className="w-5 h-5" />
              استكشف النماذج
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">المميزات الرئيسية</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            كل ما تحتاجه لحساب الرسوم الجمركية بدقة وسهولة
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass p-6 rounded-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="glass p-8 rounded-2xl">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">إحصائيات الموقع</h2>
            <p className="text-lg text-text-secondary">أرقام تتحدث عن نفسها</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-color to-secondary-color rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Updates Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">أحدث التحديثات</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            آخر التحديثات في القوانين والرسوم الجمركية
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {recentUpdates.map((update, index) => (
            <motion.div
              key={update.title}
              className="glass p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  update.type === 'update' 
                    ? 'bg-gradient-to-r from-primary-color to-secondary-color' 
                    : 'bg-gradient-to-r from-accent-color to-green-600'
                }`}>
                  {update.type === 'update' ? (
                    <TrendingUp className="w-5 h-5 text-white" />
                  ) : (
                    <Star className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{update.title}</h3>
                  <p className="text-sm text-text-secondary">{update.date}</p>
                </div>
              </div>
              <p className="text-text-secondary">{update.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <motion.div
          className="glass p-8 rounded-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ابدأ الآن</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            احسب الرسوم الجمركية لسيارتك بسهولة ودقة عالية
          </p>
          <motion.a
            href="#calculator"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-color to-secondary-color text-white font-bold rounded-xl hover:from-primary-dark hover:to-primary-color transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calculator className="w-5 h-5" />
            ابدأ الحساب الآن
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;