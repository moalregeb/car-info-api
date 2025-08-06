import { CarBrand } from '../types';

export const carBrands: CarBrand[] = [
  // Japanese Brands
  {
    id: 'toyota',
    name: 'Toyota',
    nameAr: 'تويوتا',
    country: 'Japan',
    logo: '/assets/brands/toyota.png',
    established: 1937,
    website: 'https://www.toyota.com',
    dealersInJordan: [
      {
        id: 'toyota-amman',
        name: 'Toyota Jordan - Amman',
        nameAr: 'تويوتا الأردن - عمان',
        address: 'Mecca Street, Amman',
        addressAr: 'شارع مكة، عمان',
        phone: '+962-6-5815000',
        email: 'info@toyota.jo',
        website: 'https://www.toyota.jo',
        city: 'Amman',
        coordinates: { lat: 31.9454, lng: 35.9284 }
      }
    ]
  },
  {
    id: 'honda',
    name: 'Honda',
    nameAr: 'هوندا',
    country: 'Japan',
    logo: '/assets/brands/honda.png',
    established: 1948,
    website: 'https://www.honda.com',
    dealersInJordan: [
      {
        id: 'honda-amman',
        name: 'Honda Jordan',
        nameAr: 'هوندا الأردن',
        address: 'Queen Noor Street, Amman',
        addressAr: 'شارع الملكة نور، عمان',
        phone: '+962-6-5200300',
        email: 'info@honda.jo',
        city: 'Amman',
        coordinates: { lat: 31.9515, lng: 35.9239 }
      }
    ]
  },
  {
    id: 'nissan',
    name: 'Nissan',
    nameAr: 'نيسان',
    country: 'Japan',
    logo: '/assets/brands/nissan.png',
    established: 1933,
    website: 'https://www.nissan.com',
    dealersInJordan: [
      {
        id: 'nissan-amman',
        name: 'Nissan Jordan',
        nameAr: 'نيسان الأردن',
        address: 'Airport Road, Amman',
        addressAr: 'طريق المطار، عمان',
        phone: '+962-6-4291000',
        email: 'info@nissan.jo',
        city: 'Amman',
        coordinates: { lat: 31.9173, lng: 35.9924 }
      }
    ]
  },
  {
    id: 'mazda',
    name: 'Mazda',
    nameAr: 'مازدا',
    country: 'Japan',
    logo: '/assets/brands/mazda.png',
    established: 1920,
    website: 'https://www.mazda.com',
    dealersInJordan: [
      {
        id: 'mazda-amman',
        name: 'Mazda Jordan',
        nameAr: 'مازدا الأردن',
        address: 'Zahran Street, Amman',
        addressAr: 'شارع زهران، عمان',
        phone: '+962-6-4640000',
        email: 'info@mazda.jo',
        city: 'Amman',
        coordinates: { lat: 31.9539, lng: 35.9106 }
      }
    ]
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi',
    nameAr: 'ميتسوبيشي',
    country: 'Japan',
    logo: '/assets/brands/mitsubishi.png',
    established: 1870,
    website: 'https://www.mitsubishi-motors.com',
    dealersInJordan: [
      {
        id: 'mitsubishi-amman',
        name: 'Mitsubishi Jordan',
        nameAr: 'ميتسوبيشي الأردن',
        address: 'Abdali Boulevard, Amman',
        addressAr: 'العبدلي بوليفارد، عمان',
        phone: '+962-6-5000500',
        email: 'info@mitsubishi.jo',
        city: 'Amman',
        coordinates: { lat: 31.9614, lng: 35.8787 }
      }
    ]
  },
  {
    id: 'subaru',
    name: 'Subaru',
    nameAr: 'سوبارو',
    country: 'Japan',
    logo: '/assets/brands/subaru.png',
    established: 1953,
    website: 'https://www.subaru.com',
    dealersInJordan: []
  },
  {
    id: 'suzuki',
    name: 'Suzuki',
    nameAr: 'سوزوكي',
    country: 'Japan',
    logo: '/assets/brands/suzuki.png',
    established: 1909,
    website: 'https://www.suzuki.com',
    dealersInJordan: [
      {
        id: 'suzuki-amman',
        name: 'Suzuki Jordan',
        nameAr: 'سوزوكي الأردن',
        address: 'Sports City, Amman',
        addressAr: 'المدينة الرياضية، عمان',
        phone: '+962-6-5411000',
        email: 'info@suzuki.jo',
        city: 'Amman',
        coordinates: { lat: 31.9394, lng: 35.8936 }
      }
    ]
  },
  {
    id: 'isuzu',
    name: 'Isuzu',
    nameAr: 'إيسوزو',
    country: 'Japan',
    logo: '/assets/brands/isuzu.png',
    established: 1916,
    website: 'https://www.isuzu.com',
    dealersInJordan: []
  },

  // Korean Brands
  {
    id: 'hyundai',
    name: 'Hyundai',
    nameAr: 'هيونداي',
    country: 'South Korea',
    logo: '/assets/brands/hyundai.png',
    established: 1967,
    website: 'https://www.hyundai.com',
    dealersInJordan: [
      {
        id: 'hyundai-amman',
        name: 'Hyundai Jordan',
        nameAr: 'هيونداي الأردن',
        address: 'University Street, Amman',
        addressAr: 'شارع الجامعة، عمان',
        phone: '+962-6-5349000',
        email: 'info@hyundai.jo',
        website: 'https://www.hyundai.jo',
        city: 'Amman',
        coordinates: { lat: 31.9515, lng: 35.9239 }
      }
    ]
  },
  {
    id: 'kia',
    name: 'Kia',
    nameAr: 'كيا',
    country: 'South Korea',
    logo: '/assets/brands/kia.png',
    established: 1944,
    website: 'https://www.kia.com',
    dealersInJordan: [
      {
        id: 'kia-amman',
        name: 'Kia Jordan',
        nameAr: 'كيا الأردن',
        address: 'Khalil Al-Salem Street, Amman',
        addressAr: 'شارع خليل السالم، عمان',
        phone: '+962-6-5200200',
        email: 'info@kia.jo',
        city: 'Amman',
        coordinates: { lat: 31.9394, lng: 35.9349 }
      }
    ]
  },
  {
    id: 'genesis',
    name: 'Genesis',
    nameAr: 'جينيسيس',
    country: 'South Korea',
    logo: '/assets/brands/genesis.png',
    established: 2015,
    website: 'https://www.genesis.com',
    dealersInJordan: []
  },

  // American Brands
  {
    id: 'ford',
    name: 'Ford',
    nameAr: 'فورد',
    country: 'United States',
    logo: '/assets/brands/ford.png',
    established: 1903,
    website: 'https://www.ford.com',
    dealersInJordan: [
      {
        id: 'ford-amman',
        name: 'Ford Jordan',
        nameAr: 'فورد الأردن',
        address: 'King Abdullah II Street, Amman',
        addressAr: 'شارع الملك عبدالله الثاني، عمان',
        phone: '+962-6-5800800',
        email: 'info@ford.jo',
        city: 'Amman',
        coordinates: { lat: 31.9539, lng: 35.9106 }
      }
    ]
  },
  {
    id: 'chevrolet',
    name: 'Chevrolet',
    nameAr: 'شيفروليه',
    country: 'United States',
    logo: '/assets/brands/chevrolet.png',
    established: 1911,
    website: 'https://www.chevrolet.com',
    dealersInJordan: [
      {
        id: 'chevrolet-amman',
        name: 'Chevrolet Jordan',
        nameAr: 'شيفروليه الأردن',
        address: 'Madina Munawara Street, Amman',
        addressAr: 'شارع المدينة المنورة، عمان',
        phone: '+962-6-5600600',
        email: 'info@chevrolet.jo',
        city: 'Amman',
        coordinates: { lat: 31.9454, lng: 35.9284 }
      }
    ]
  },
  {
    id: 'gmc',
    name: 'GMC',
    nameAr: 'جي إم سي',
    country: 'United States',
    logo: '/assets/brands/gmc.png',
    established: 1911,
    website: 'https://www.gmc.com',
    dealersInJordan: []
  },
  {
    id: 'cadillac',
    name: 'Cadillac',
    nameAr: 'كاديلاك',
    country: 'United States',
    logo: '/assets/brands/cadillac.png',
    established: 1902,
    website: 'https://www.cadillac.com',
    dealersInJordan: []
  },
  {
    id: 'jeep',
    name: 'Jeep',
    nameAr: 'جيب',
    country: 'United States',
    logo: '/assets/brands/jeep.png',
    established: 1941,
    website: 'https://www.jeep.com',
    dealersInJordan: [
      {
        id: 'jeep-amman',
        name: 'Jeep Jordan',
        nameAr: 'جيب الأردن',
        address: 'Sweifieh, Amman',
        addressAr: 'الصويفية، عمان',
        phone: '+962-6-5820000',
        email: 'info@jeep.jo',
        city: 'Amman',
        coordinates: { lat: 31.9394, lng: 35.8936 }
      }
    ]
  },
  {
    id: 'dodge',
    name: 'Dodge',
    nameAr: 'دودج',
    country: 'United States',
    logo: '/assets/brands/dodge.png',
    established: 1900,
    website: 'https://www.dodge.com',
    dealersInJordan: []
  },
  {
    id: 'chrysler',
    name: 'Chrysler',
    nameAr: 'كرايسلر',
    country: 'United States',
    logo: '/assets/brands/chrysler.png',
    established: 1925,
    website: 'https://www.chrysler.com',
    dealersInJordan: []
  },

  // German Brands
  {
    id: 'bmw',
    name: 'BMW',
    nameAr: 'بي إم دبليو',
    country: 'Germany',
    logo: '/assets/brands/bmw.png',
    established: 1916,
    website: 'https://www.bmw.com',
    dealersInJordan: [
      {
        id: 'bmw-amman',
        name: 'BMW Jordan',
        nameAr: 'بي إم دبليو الأردن',
        address: 'Al-Thaqafa Street, Amman',
        addressAr: 'شارع الثقافة، عمان',
        phone: '+962-6-5900900',
        email: 'info@bmw.jo',
        website: 'https://www.bmw.jo',
        city: 'Amman',
        coordinates: { lat: 31.9614, lng: 35.8787 }
      }
    ]
  },
  {
    id: 'mercedes-benz',
    name: 'Mercedes-Benz',
    nameAr: 'مرسيدس بنز',
    country: 'Germany',
    logo: '/assets/brands/mercedes.png',
    established: 1926,
    website: 'https://www.mercedes-benz.com',
    dealersInJordan: [
      {
        id: 'mercedes-amman',
        name: 'Mercedes-Benz Jordan',
        nameAr: 'مرسيدس بنز الأردن',
        address: 'Abdoun, Amman',
        addressAr: 'عبدون، عمان',
        phone: '+962-6-5920000',
        email: 'info@mercedes.jo',
        city: 'Amman',
        coordinates: { lat: 31.9173, lng: 35.9924 }
      }
    ]
  },
  {
    id: 'audi',
    name: 'Audi',
    nameAr: 'أودي',
    country: 'Germany',
    logo: '/assets/brands/audi.png',
    established: 1909,
    website: 'https://www.audi.com',
    dealersInJordan: [
      {
        id: 'audi-amman',
        name: 'Audi Jordan',
        nameAr: 'أودي الأردن',
        address: 'Shmeisani, Amman',
        addressAr: 'الشميساني، عمان',
        phone: '+962-6-5650000',
        email: 'info@audi.jo',
        city: 'Amman',
        coordinates: { lat: 31.9539, lng: 35.9106 }
      }
    ]
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    nameAr: 'فولكسفاغن',
    country: 'Germany',
    logo: '/assets/brands/volkswagen.png',
    established: 1937,
    website: 'https://www.volkswagen.com',
    dealersInJordan: [
      {
        id: 'vw-amman',
        name: 'Volkswagen Jordan',
        nameAr: 'فولكسفاغن الأردن',
        address: 'Tabarbour, Amman',
        addressAr: 'طبربور، عمان',
        phone: '+962-6-4770000',
        email: 'info@vw.jo',
        city: 'Amman',
        coordinates: { lat: 31.9954, lng: 35.9284 }
      }
    ]
  },
  {
    id: 'porsche',
    name: 'Porsche',
    nameAr: 'بورشه',
    country: 'Germany',
    logo: '/assets/brands/porsche.png',
    established: 1931,
    website: 'https://www.porsche.com',
    dealersInJordan: []
  },

  // French Brands
  {
    id: 'peugeot',
    name: 'Peugeot',
    nameAr: 'بيجو',
    country: 'France',
    logo: '/assets/brands/peugeot.png',
    established: 1810,
    website: 'https://www.peugeot.com',
    dealersInJordan: [
      {
        id: 'peugeot-amman',
        name: 'Peugeot Jordan',
        nameAr: 'بيجو الأردن',
        address: 'Jabal Amman, Amman',
        addressAr: 'جبل عمان، عمان',
        phone: '+962-6-4630000',
        email: 'info@peugeot.jo',
        city: 'Amman',
        coordinates: { lat: 31.9515, lng: 35.9239 }
      }
    ]
  },
  {
    id: 'renault',
    name: 'Renault',
    nameAr: 'رينو',
    country: 'France',
    logo: '/assets/brands/renault.png',
    established: 1899,
    website: 'https://www.renault.com',
    dealersInJordan: [
      {
        id: 'renault-amman',
        name: 'Renault Jordan',
        nameAr: 'رينو الأردن',
        address: 'Marj Al-Hamam, Amman',
        addressAr: 'مرج الحمام، عمان',
        phone: '+962-6-5720000',
        email: 'info@renault.jo',
        city: 'Amman',
        coordinates: { lat: 31.8629, lng: 35.8794 }
      }
    ]
  },
  {
    id: 'citroen',
    name: 'Citroën',
    nameAr: 'ستروين',
    country: 'France',
    logo: '/assets/brands/citroen.png',
    established: 1919,
    website: 'https://www.citroen.com',
    dealersInJordan: []
  },

  // Italian Brands
  {
    id: 'fiat',
    name: 'Fiat',
    nameAr: 'فيات',
    country: 'Italy',
    logo: '/assets/brands/fiat.png',
    established: 1899,
    website: 'https://www.fiat.com',
    dealersInJordan: []
  },

  // Chinese Brands
  {
    id: 'byd',
    name: 'BYD',
    nameAr: 'بي واي دي',
    country: 'China',
    logo: '/assets/brands/byd.png',
    established: 1995,
    website: 'https://www.byd.com',
    dealersInJordan: [
      {
        id: 'byd-amman',
        name: 'BYD Jordan',
        nameAr: 'بي واي دي الأردن',
        address: 'Amman Industrial Estate',
        addressAr: 'المدينة الصناعية، عمان',
        phone: '+962-6-4880000',
        email: 'info@byd.jo',
        city: 'Amman',
        coordinates: { lat: 31.8629, lng: 35.8794 }
      }
    ]
  },
  {
    id: 'chery',
    name: 'Chery',
    nameAr: 'شيري',
    country: 'China',
    logo: '/assets/brands/chery.png',
    established: 1997,
    website: 'https://www.chery.com',
    dealersInJordan: [
      {
        id: 'chery-amman',
        name: 'Chery Jordan',
        nameAr: 'شيري الأردن',
        address: 'Sahab, Amman',
        addressAr: 'سحاب، عمان',
        phone: '+962-6-4020000',
        email: 'info@chery.jo',
        city: 'Amman',
        coordinates: { lat: 31.8703, lng: 36.0068 }
      }
    ]
  },
  {
    id: 'geely',
    name: 'Geely',
    nameAr: 'جيلي',
    country: 'China',
    logo: '/assets/brands/geely.png',
    established: 1986,
    website: 'https://www.geely.com',
    dealersInJordan: []
  },
  {
    id: 'mg',
    name: 'MG',
    nameAr: 'إم جي',
    country: 'China',
    logo: '/assets/brands/mg.png',
    established: 1924,
    website: 'https://www.mg.com',
    dealersInJordan: [
      {
        id: 'mg-amman',
        name: 'MG Jordan',
        nameAr: 'إم جي الأردن',
        address: 'Wadi Saqra, Amman',
        addressAr: 'وادي صقرة، عمان',
        phone: '+962-6-5330000',
        email: 'info@mg.jo',
        city: 'Amman',
        coordinates: { lat: 31.9173, lng: 35.9924 }
      }
    ]
  },
  {
    id: 'jac',
    name: 'JAC',
    nameAr: 'جاك',
    country: 'China',
    logo: '/assets/brands/jac.png',
    established: 1964,
    website: 'https://www.jac.com',
    dealersInJordan: []
  },
  {
    id: 'changan',
    name: 'Changan',
    nameAr: 'تشانغان',
    country: 'China',
    logo: '/assets/brands/changan.png',
    established: 1862,
    website: 'https://www.changan.com',
    dealersInJordan: []
  },
  {
    id: 'great-wall',
    name: 'Great Wall',
    nameAr: 'السور العظيم',
    country: 'China',
    logo: '/assets/brands/greatwall.png',
    established: 1984,
    website: 'https://www.gwm.com',
    dealersInJordan: []
  },
  {
    id: 'haval',
    name: 'Haval',
    nameAr: 'هافال',
    country: 'China',
    logo: '/assets/brands/haval.png',
    established: 2013,
    website: 'https://www.haval.com',
    dealersInJordan: []
  },

  // Electric/Tesla
  {
    id: 'tesla',
    name: 'Tesla',
    nameAr: 'تيسلا',
    country: 'United States',
    logo: '/assets/brands/tesla.png',
    established: 2003,
    website: 'https://www.tesla.com',
    dealersInJordan: []
  }
];