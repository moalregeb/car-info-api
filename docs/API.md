# API Documentation

## Overview

The Customs Calculator API provides endpoints for calculating customs duties and taxes for vehicles in Jordan. The API is built with Express.js and follows RESTful conventions.

## Base URL

```
http://localhost:3001/api
```

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## Endpoints

### Categories

#### GET /categories

Returns a list of all vehicle categories.

**Response:**
```json
[
  {
    "id": 1,
    "name": "سيدان"
  },
  {
    "id": 2,
    "name": "SUV"
  },
  {
    "id": 3,
    "name": "هاتشباك"
  },
  {
    "id": 4,
    "name": "فان"
  },
  {
    "id": 5,
    "name": "شاحنة صغيرة"
  }
]
```

### Brands

#### GET /brands

Returns brands filtered by category.

**Query Parameters:**
- `category_id` (required): The ID of the category

**Example:**
```
GET /api/brands?category_id=1
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Toyota",
    "category_id": 1
  },
  {
    "id": 3,
    "name": "Honda",
    "category_id": 1
  }
]
```

### Models

#### GET /models

Returns models filtered by brand.

**Query Parameters:**
- `brand_id` (required): The ID of the brand

**Example:**
```
GET /api/models?brand_id=1
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Corolla",
    "brand_id": 1,
    "year": 2023
  },
  {
    "id": 3,
    "name": "Civic",
    "brand_id": 3,
    "year": 2023
  }
]
```

### Vehicle Information

#### GET /vehicle-info

Returns detailed information about a specific vehicle model.

**Query Parameters:**
- `model_id` (required): The ID of the model

**Example:**
```
GET /api/vehicle-info?model_id=1
```

**Response:**
```json
{
  "market_value": 17000,
  "demand_level": "مرتفع",
  "acquisition_tips": "موثوق واقتصادي، استهلاك وقود منخفض",
  "specs": {
    "engine": "1.6L",
    "transmission": "أوتوماتيك",
    "fuel_type": "بنزين",
    "power": "121 حصان"
  },
  "customs": {
    "duty_rate": 15,
    "special_tax": 10,
    "vat_rate": 16,
    "total_tax_rate": 41
  }
}
```

### Customs Calculation

#### POST /calculate-customs

Calculates customs duties and taxes for a vehicle.

**Request Body:**
```json
{
  "model_id": 1,
  "declared_value": 17000
}
```

**Response:**
```json
{
  "declared_value": 17000,
  "duty_amount": 2550,
  "special_tax_amount": 1700,
  "vat_amount": 3400,
  "total_amount": 7650,
  "final_price": 24650,
  "rates": {
    "duty_rate": 15,
    "special_tax": 10,
    "vat_rate": 16,
    "total_tax_rate": 41
  }
}
```

## Error Responses

### 404 Not Found

When a requested resource is not found:

```json
{
  "error": "الموديل غير موجود"
}
```

### 400 Bad Request

When required parameters are missing or invalid:

```json
{
  "error": "Missing required parameter: model_id"
}
```

### 500 Internal Server Error

When an unexpected error occurs:

```json
{
  "error": "Internal server error"
}
```

## Rate Limits

Currently, there are no rate limits implemented. However, this may change in future versions.

## CORS

The API supports CORS and allows requests from any origin. In production, this should be restricted to specific domains.

## Data Types

### Numbers
- All monetary values are in Jordanian Dinar (JOD)
- Percentages are represented as integers (e.g., 15 for 15%)

### Strings
- All text is in Arabic
- UTF-8 encoding is used

### Booleans
- Standard JSON boolean values (true/false)

## Versioning

The API version is included in the URL path. Current version is v1:

```
http://localhost:3001/api/v1/
```

## Examples

### Complete Calculation Flow

1. Get categories:
```bash
curl http://localhost:3001/api/categories
```

2. Get brands for a category:
```bash
curl "http://localhost:3001/api/brands?category_id=1"
```

3. Get models for a brand:
```bash
curl "http://localhost:3001/api/models?brand_id=1"
```

4. Get vehicle information:
```bash
curl "http://localhost:3001/api/vehicle-info?model_id=1"
```

5. Calculate customs:
```bash
curl -X POST http://localhost:3001/api/calculate-customs \
  -H "Content-Type: application/json" \
  -d '{"model_id": 1, "declared_value": 17000}'
```

## Testing

You can test the API using tools like:
- cURL
- Postman
- Insomnia
- Browser developer tools

## Support

For API support, please contact:
- Email: api@customs-calculator.jo
- Documentation: https://customs-calculator.jo/docs
- Issues: https://github.com/your-username/customs-calculator/issues