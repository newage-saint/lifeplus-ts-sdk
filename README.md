# LifePlus Healthcare Platform - TypeScript SDK

Official TypeScript/JavaScript SDK for the LifePlus Healthcare Platform API. This SDK provides easy access to Bangladesh's leading digital healthcare platform.

[![npm version](https://img.shields.io/npm/v/@lifeplus/sdk)](https://www.npmjs.com/package/@lifeplus/sdk)
[![License](https://img.shields.io/npm/l/@lifeplus/sdk)](LICENSE)

## Features

- 🏥 Complete healthcare platform integration
- 💊 Medicine ordering and delivery
- 👨‍⚕️ Doctor consultations and appointments
- 🏨 Hospital services and bookings
- 🚑 Ambulance services
- 🧬 Diagnostic and lab test bookings
- 📦 Healthcare package management
- 🔐 Secure authentication with automatic token management
- 🎯 Full TypeScript support with type definitions
- 📝 Comprehensive documentation
- ⚡ Works in Node.js and browsers

## Requirements

- Node.js 14 or higher
- TypeScript 4.5+ (for TypeScript projects)

## Installation

```bash
npm install @lifeplus/sdk
```

Or using yarn:

```bash
yarn add @lifeplus/sdk
```

## Quick Start

### TypeScript

```typescript
import { LifePlusClient } from '@lifeplus/sdk';

// Create client
const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');

// Partner API (server-to-server)
// Use this when integrating as a B2B partner with X-API-Key + X-Partner-ID
client.setPartnerCredentials('partner_123', 'lpk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

// Login
const session = await client.login('01712345678', 'password');
console.log(`Logged in as: ${session.data?.user?.name}`);

// Search for products
const products = await client.products().listProducts({
    searchKey: 'paracetamol',
    perPage: 10
});

for (const product of products) {
    console.log(`${product.name} - BDT ${product.price}`);
}
```

### JavaScript (ES6+)

```javascript
const { LifePlusClient } = require('@lifeplus/sdk');

// Create client
const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');

// Partner API (server-to-server)
// Use this when integrating as a B2B partner with X-API-Key + X-Partner-ID
client.setPartnerCredentials('partner_123', 'lpk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

// Login
const session = await client.login('01712345678', 'password');
console.log(`Logged in as: ${session.data.user.name}`);

// Search for products
const products = await client.products().listProducts({
    searchKey: 'paracetamol',
    perPage: 10
});

products.forEach(product => {
    console.log(`${product.name} - BDT ${product.price}`);
});
```

## Documentation

### Authentication

```typescript
// Login with phone and password
const session = await client.login('01712345678', 'password');

// Verify phone with OTP
const session = await client.verifyPhone('01712345678', '123456');

// Check authentication status
if (client.isAuthenticated()) {
    console.log('User is logged in');
}

// Get current user
const user = client.getSession()?.data?.user;

// Logout
await client.logout();
```

### Products & Medicine

```typescript
// List products with pagination
const products = await client.products().listProducts({
    page: 1,
    perPage: 20,
    searchKey: 'paracetamol'
});

// Get product details
const product = await client.products().getProduct({ productId: 123 });

// Get categories
const categories = await client.products().getLifestyleCategories();

// Get manufacturers
const manufacturers = await client.products().getManufacturers();
```

### Shopping Cart

```typescript
// Add item to cart
const cart = await client.cart().addToCart({
    addToCartRequest: {
        product_id: 123,
        quantity: 2
    }
});

// Update cart item
const updatedCart = await client.cart().updateCartItem({
    itemId: 456,
    cartItemUpdate: { quantity: 3 }
});

// Get cart
const cart = await client.cart().getCart();

// Clear cart
await client.cart().clearCart();
```

### Orders

```typescript
// Create order
const order = await client.orders().createOrder({
    createOrderRequest: {
        address_id: 1,
        payment_method: 'cod',
        items: [
            { product_id: 123, quantity: 2 }
        ]
    }
});

// List user orders
const orders = await client.orders().listOrders({
    page: 1,
    perPage: 10
});

// Get order details
const order = await client.orders().getOrder({ orderId: 123 });

// Track order
const tracking = await client.orders().trackOrder({ orderId: 123 });
```

### Doctors & Appointments

```typescript
// List doctors
const doctors = await client.doctors().listDoctors({
    specialtyId: 5,
    page: 1,
    perPage: 10
});

// Get doctor details
const doctor = await client.doctors().getDoctor({ doctorId: 123 });

// Get doctor's available slots
const slots = await client.doctors().getDoctorSlots({
    doctorId: 123,
    doctorSlotRequest: { date: '2024-01-15' }
});

// Book appointment
const appointment = await client.appointments().bookAppointment({
    appointmentRequest: {
        doctor_id: 123,
        appointment_date: '2024-01-15',
        slot_id: 456,
        payment_method: 'online'
    }
});

// List appointments
const appointments = await client.appointments().listAppointments();

// Get appointment details
const appointment = await client.appointments().getAppointment({
    appointmentId: 123
});
```

### Hospitals

```typescript
// List hospitals
const hospitals = await client.hospitals().listHospitals({
    page: 1,
    perPage: 10
});

// Get hospital details
const hospital = await client.hospitals().getHospital({ hospitalId: 123 });

// Search hospitals by location
const hospitals = await client.hospitals().listHospitals({
    searchKey: 'Dhaka'
});
```

### Healthcare Packages

```typescript
// List packages
const packages = await client.packages().listPackages({
    page: 1,
    perPage: 10
});

// Get package details
const pkg = await client.packages().getPackage({ packageId: 123 });

// Book package
const booking = await client.packages().bookPackage({
    bookPackageRequest: {
        package_id: 123,
        preferred_date: '2024-01-15',
        payment_method: 'online'
    }
});
```

### Ambulance Services

```typescript
// Get ambulance pricing
const pricing = await client.ambulance().getAmbulancePricing({
    ambulancePriceQuery: {
        from_latitude: 23.8103,
        from_longitude: 90.4125,
        to_latitude: 23.7809,
        to_longitude: 90.2792
    }
});

// Book ambulance
const booking = await client.ambulance().placeAmbulanceOrder({
    placeAmbulanceOrderRequest: {
        from_address: 'Gulshan, Dhaka',
        to_address: 'Mirpur, Dhaka',
        patient_name: 'John Doe',
        contact_number: '01712345678',
        emergency_type: 'medical'
    }
});
```

### Home Sample Collection

```typescript
// List available tests
const tests = await client.homeSample().listTests();

// Book home sample collection
const booking = await client.homeSample().bookHomeSample({
    homeSampleOrder: {
        test_ids: [1, 2, 3],
        collection_date: '2024-01-15',
        collection_time: '10:00',
        address_id: 1
    }
});
```

### Telemedicine

```typescript
// Get video call history
const history = await client.telemedicine().getVideoCallHistory();

// Get call details
const call = await client.telemedicine().getVideoCallDetails({ callId: 123 });
```

### Address Management

```typescript
// List addresses
const addresses = await client.addresses().listAddresses();

// Add address
const address = await client.addresses().addAddress({
    address: {
        address_line: '123 Main Street',
        area: 'Gulshan',
        city: 'Dhaka',
        postal_code: '1212',
        phone: '01712345678',
        is_default: true
    }
});

// Update address
const updated = await client.addresses().updateAddress({
    addressId: 123,
    address: { address_line: '456 New Street' }
});

// Delete address
await client.addresses().deleteAddress({ addressId: 123 });
```

### Lookup Data

```typescript
// Get specialties
const specialties = await client.lookup().getSpecialties();

// Get countries
const countries = await client.lookup().getCountries();
```

## Helper Functions

The SDK includes helper functions for common operations:

```typescript
import {
    formatPhone,
    formatPrice,
    stringOrEmpty,
    numberOrZero,
    isValidPhone,
    formatDate
} from '@lifeplus/sdk';

// Format phone number
const phone = formatPhone('+880 1712-345678'); // Returns: 01712345678

// Format price
const price = formatPrice(199.99); // Returns: BDT 199.99

// Safe null handling
const name = stringOrEmpty(user?.name);
const count = numberOrZero(product?.stock);

// Validate phone
if (isValidPhone('01712345678')) {
    console.log('Valid phone number');
}

// Format date
const date = formatDate(new Date()); // Returns: 2024-01-15
```

## Error Handling

```typescript
try {
    const products = await client.products().listProducts();
} catch (error) {
    if (error instanceof Response) {
        console.error(`API Error: ${error.status}`);
        const body = await error.json();
        console.error(body);
    } else {
        console.error(`Error: ${error}`);
    }
}
```

## React Integration

```typescript
import React, { useEffect, useState } from 'react';
import { LifePlusClient, Product } from '@lifeplus/sdk';

const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');

// Partner API (server-to-server)
// Use this when integrating as a B2B partner with X-API-Key + X-Partner-ID
// client.setPartnerCredentials('partner_123', 'lpk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await client.products().listProducts({
                    perPage: 10
                });
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>BDT {product.price}</p>
                </div>
            ))}
        </div>
    );
}
```

## Next.js Integration

```typescript
// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { LifePlusClient } from '@lifeplus/sdk';

const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const products = await client.products().listProducts({
            perPage: 10
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}
```

## Vue.js Integration

```typescript
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { LifePlusClient, Product } from '@lifeplus/sdk';

const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');
const products = ref<Product[]>([]);

onMounted(async () => {
    products.value = await client.products().listProducts({ perPage: 10 });
});
</script>

<template>
    <div v-for="product in products" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>BDT {{ product.price }}</p>
    </div>
</template>
```

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Examples

See the `examples/` directory for complete working examples:

- `demo.ts` - Basic usage demonstration
- `react-example.tsx` - React integration example
- `node-example.js` - Node.js usage example

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

- **Email**: mamun@lifeplusbd.com
- **Phone**: +880 1913705269
- **Sagor**: sagor@lifeplusbd.com / +880 1681408185
- **Website**: https://lifeplusbd.com

## License

This SDK is proprietary software owned by LifePlus Healthcare Platform.

## Changelog

### Version 3.1.0
- Initial release with full API coverage
- Complete authentication flow
- All healthcare services integrated
- Full TypeScript support
- React, Vue, and Next.js examples
- Comprehensive documentation

---

Made with ❤️ by LifePlus Healthcare Platform
