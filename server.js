
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// بيانات وهمية
const categories = [
  { id: 1, name: "سيدان" },
  { id: 2, name: "SUV" },
];

const brands = [
  { id: 1, name: "Toyota", category_id: 1 },
  { id: 2, name: "BYD", category_id: 2 },
];

const models = [
  { id: 1, name: "Corolla", brand_id: 1 },
  { id: 2, name: "Seal", brand_id: 2 },
];

const carDetails = {
  1: {
    market_value: 17000,
    demand_level: "مرتفع",
    acquisition_tips: "موثوق واقتصادي",
    specs: { engine: "1.6L", transmission: "أوتوماتيك" },
    customs: { duty_rate: 25, special_tax: 15, vat_rate: 16 },
  },
  2: {
    market_value: 23000,
    demand_level: "جيد",
    acquisition_tips: "كهربائي بالكامل وموفر",
    specs: { battery: "82kWh", range: "570 كم" },
    customs: { duty_rate: 0, special_tax: 10, vat_rate: 16 },
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

app.listen(port, () => {
  console.log(`✅ API server running on http://localhost:${port}`);
});
