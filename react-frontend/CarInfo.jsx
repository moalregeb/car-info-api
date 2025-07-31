
import { useEffect, useState } from "react";
import axios from "axios";

export default function CarInfo() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [carInfo, setCarInfo] = useState(null);

  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    axios.get(`${BASE_URL}/api/categories`).then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`${BASE_URL}/api/brands?category_id=${selectedCategory}`).then((res) => setBrands(res.data));
    } else {
      setBrands([]);
      setModels([]);
    }
    setSelectedBrand("");
    setSelectedModel("");
    setCarInfo(null);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedBrand) {
      axios.get(`${BASE_URL}/api/models?brand_id=${selectedBrand}`).then((res) => setModels(res.data));
    } else {
      setModels([]);
    }
    setSelectedModel("");
    setCarInfo(null);
  }, [selectedBrand]);

  const fetchCarInfo = () => {
    if (!selectedModel) return;
    axios.get(`${BASE_URL}/api/vehicle-info?model_id=${selectedModel}`).then((res) => setCarInfo(res.data));
  };

  return (
    <div>
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="">اختر الفئة</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedBrand(e.target.value)} value={selectedBrand} disabled={!brands.length}>
        <option value="">اختر الشركة</option>
        {brands.map((b) => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedModel(e.target.value)} value={selectedModel} disabled={!models.length}>
        <option value="">اختر الموديل</option>
        {models.map((m) => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>

      <button onClick={fetchCarInfo} disabled={!selectedModel}>عرض التفاصيل</button>

      {carInfo && (
        <div>
          <h3>معلومات المركبة:</h3>
          <p>القيمة السوقية: {carInfo.market_value} دينار</p>
          <p>الطلب في السوق: {carInfo.demand_level}</p>
          <p>نصائح: {carInfo.acquisition_tips}</p>
          <p>المواصفات: {JSON.stringify(carInfo.specs)}</p>
          <p>الرسوم الجمركية:</p>
          <ul>
            <li>جمرك: {carInfo.customs.duty_rate}%</li>
            <li>ضريبة خاصة: {carInfo.customs.special_tax}%</li>
            <li>ضريبة مبيعات: {carInfo.customs.vat_rate}%</li>
          </ul>
        </div>
      )}
    </div>
  );
}
