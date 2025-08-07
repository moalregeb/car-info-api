
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// المسارات
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/brands", (req, res) => {
  const { category_id } = req.query;
  const filtered = brands.filter((b) => b.category_id == category_id);
  res.json(filtered);
});

app.get("/api/models", (req, res) => {
  const { brand_id } = req.query;
  const filtered = models.filter((m) => m.brand_id == brand_id);
  res.json(filtered);
});

app.get("/api/vehicle-info", (req, res) => {
  const { model_id } = req.query;
  const info = carDetails[model_id];
  if (!info) return res.status(404).json({ error: "الموديل غير موجود" });
  res.json(info);
});

// مسار لحساب الرسوم الجمركية
app.post("/api/calculate-customs", (req, res) => {
  const { model_id, declared_value } = req.body;
  const info = carDetails[model_id];
  
  if (!info) {
    return res.status(404).json({ error: "الموديل غير موجود" });
  }

  const duty_amount = (declared_value * info.customs.duty_rate) / 100;
  const special_tax_amount = (declared_value * info.customs.special_tax) / 100;
  const vat_amount = ((declared_value + duty_amount + special_tax_amount) * info.customs.vat_rate) / 100;
  const total_amount = duty_amount + special_tax_amount + vat_amount;
  const final_price = declared_value + total_amount;

  res.json({
    declared_value,
    duty_amount,
    special_tax_amount,
    vat_amount,
    total_amount,
    final_price,
    rates: info.customs
  });
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'react-frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-frontend/build', 'index.html'));
});

// بيانات وهمية محدثة
const categories = [
  { id: 1, name: "سيدان" },
  { id: 2, name: "SUV" },
  { id: 3, name: "هاتشباك" },
  { id: 4, name: "فان" },
  { id: 5, name: "شاحنة صغيرة" },
];

const brands = [
  { id: 1, name: "Toyota", category_id: 1 },
  { id: 2, name: "BYD", category_id: 2 },
  { id: 3, name: "Honda", category_id: 1 },
  { id: 4, name: "Nissan", category_id: 2 },
  { id: 5, name: "Hyundai", category_id: 1 },
  { id: 6, name: "Kia", category_id: 2 },
  { id: 7, name: "Mazda", category_id: 1 },
  { id: 8, name: "Mitsubishi", category_id: 2 },
];

const models = [
  { id: 1, name: "Corolla", brand_id: 1, year: 2023 },
  { id: 2, name: "Seal", brand_id: 2, year: 2024 },
  { id: 3, name: "Civic", brand_id: 3, year: 2023 },
  { id: 4, name: "X-Trail", brand_id: 4, year: 2024 },
  { id: 5, name: "Elantra", brand_id: 5, year: 2023 },
  { id: 6, name: "Sportage", brand_id: 6, year: 2024 },
  { id: 7, name: "3", brand_id: 7, year: 2023 },
  { id: 8, name: "Outlander", brand_id: 8, year: 2024 },
];

// النسب الجمركية المحدثة وفقاً لقرار مجلس الوزراء
const carDetails = {
  1: {
    market_value: 17000,
    demand_level: "مرتفع",
    acquisition_tips: "موثوق واقتصادي، استهلاك وقود منخفض",
    specs: { 
      engine: "1.6L", 
      transmission: "أوتوماتيك",
      fuel_type: "بنزين",
      power: "121 حصان"
    },
    customs: { 
      duty_rate: 15, // تم تخفيضها من 25% إلى 15%
      special_tax: 10, // تم تخفيضها من 15% إلى 10%
      vat_rate: 16,
      total_tax_rate: 41 // 15 + 10 + 16
    },
  },
  2: {
    market_value: 23000,
    demand_level: "جيد",
    acquisition_tips: "كهربائي بالكامل وموفر للطاقة، شحن سريع",
    specs: { 
      battery: "82kWh", 
      range: "570 كم",
      power: "204 حصان",
      charging: "DC سريع"
    },
    customs: { 
      duty_rate: 0, // السيارات الكهربائية معفاة من الجمرك
      special_tax: 5, // تخفيض للسيارات الكهربائية
      vat_rate: 16,
      total_tax_rate: 21 // 0 + 5 + 16
    },
  },
  3: {
    market_value: 18500,
    demand_level: "جيد",
    acquisition_tips: "أداء رياضي مع اقتصاد في الاستهلاك",
    specs: { 
      engine: "1.5L Turbo", 
      transmission: "CVT",
      fuel_type: "بنزين",
      power: "182 حصان"
    },
    customs: { 
      duty_rate: 15,
      special_tax: 10,
      vat_rate: 16,
      total_tax_rate: 41
    },
  },
  4: {
    market_value: 28000,
    demand_level: "متوسط",
    acquisition_tips: "SUV عائلي مع تقنيات متقدمة",
    specs: { 
      engine: "1.5L Turbo", 
      transmission: "CVT",
      fuel_type: "بنزين",
      power: "150 حصان"
    },
    customs: { 
      duty_rate: 15,
      special_tax: 10,
      vat_rate: 16,
      total_tax_rate: 41
    },
  },
  5: {
    market_value: 16000,
    demand_level: "جيد",
    acquisition_tips: "اقتصادي وموثوق، صيانة منخفضة",
    specs: { 
      engine: "1.6L", 
      transmission: "أوتوماتيك",
      fuel_type: "بنزين",
      power: "123 حصان"
    },
    customs: { 
      duty_rate: 15,
      special_tax: 10,
      vat_rate: 16,
      total_tax_rate: 41
    },
  },
  6: {
    market_value: 22000,
    demand_level: "جيد",
    acquisition_tips: "تصميم عصري مع ضمان طويل الأمد",
    specs: { 
      engine: "1.6L Turbo", 
      transmission: "أوتوماتيك",
      fuel_type: "بنزين",
      power: "150 حصان"
    },
    customs: { 
      duty_rate: 15,
      special_tax: 10,
      vat_rate: 16,
      total_tax_rate: 41
    },
  },
  7: {
    market_value: 19500,
    demand_level: "متوسط",
    acquisition_tips: "أداء رياضي مع تصميم أنيق",
    specs: { 
      engine: "2.0L", 
      transmission: "أوتوماتيك",
      fuel_type: "بنزين",
      power: "155 حصان"
    },
    customs: { 
      duty_rate: 15,
      special_tax: 10,
      vat_rate: 16,
      total_tax_rate: 41
    },
  },
  8: {
    market_value: 25000,
    demand_level: "متوسط",
    acquisition_tips: "SUV عملي مع مساحة داخلية كبيرة",
    specs: { 
      engine: "2.0L", 
      transmission: "CVT",
      fuel_type: "بنزين",
      power: "150 حصان"
    },
    customs: { 
      duty_rate: 15,
      special_tax: 10,
      vat_rate: 16,
      total_tax_rate: 41
    },
  },
};

// المسارات
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/brands", (req, res) => {
  const { category_id } = req.query;
  const filtered = brands.filter((b) => b.category_id == category_id);
  res.json(filtered);
});

app.get("/api/models", (req, res) => {
  const { brand_id } = req.query;
  const filtered = models.filter((m) => m.brand_id == brand_id);
  res.json(filtered);
});

app.get("/api/vehicle-info", (req, res) => {
  const { model_id } = req.query;
  const info = carDetails[model_id];
  if (!info) return res.status(404).json({ error: "الموديل غير موجود" });
  res.json(info);
});

// مسار لحساب الرسوم الجمركية
app.post("/api/calculate-customs", (req, res) => {
  const { model_id, declared_value } = req.body;
  const info = carDetails[model_id];
  
  if (!info) {
    return res.status(404).json({ error: "الموديل غير موجود" });
  }

  const duty_amount = (declared_value * info.customs.duty_rate) / 100;
  const special_tax_amount = (declared_value * info.customs.special_tax) / 100;
  const vat_amount = ((declared_value + duty_amount + special_tax_amount) * info.customs.vat_rate) / 100;
  const total_amount = duty_amount + special_tax_amount + vat_amount;
  const final_price = declared_value + total_amount;

  res.json({
    declared_value,
    duty_amount,
    special_tax_amount,
    vat_amount,
    total_amount,
    final_price,
    rates: info.customs
  });
});

app.listen(port, () => {
  console.log(`✅ API server running on http://localhost:${port}`);
});
