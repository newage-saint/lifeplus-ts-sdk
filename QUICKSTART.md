# LifePlus TypeScript SDK - Quick Start Guide

Get up and running with the LifePlus Healthcare Platform API in 5 minutes.

## Installation

```bash
npm install @lifeplus/sdk
```

## 1. Initialize the Client

```typescript
import { LifePlusClient } from '@lifeplus/sdk';

const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');
```

## 2. Authentication

```typescript
// Partner API (server-to-server)
client.setPartnerCredentials('partner_123', 'lpk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

// Login with phone and password
const session = await client.login('01712345678', 'password');
console.log(`Welcome, ${session.data?.user?.name}!`);

// Or verify with OTP
const session = await client.verifyPhone('01712345678', '123456');
```

## 3. Browse Products

```typescript
// Search for medicine
const products = await client.products().listProducts({
    searchKey: 'paracetamol',
    perPage: 10
});

products.forEach(product => {
    console.log(`${product.name} - BDT ${product.price}`);
});
```

## 4. Manage Cart

```typescript
// Add to cart
const cart = await client.cart().addToCart({
    addToCartRequest: {
        product_id: 123,
        quantity: 2
    }
});

// View cart
const currentCart = await client.cart().getCart();
console.log(`Cart total: BDT ${currentCart.total}`);
```

## 5. Place Order

```typescript
// Create order
const order = await client.orders().createOrder({
    createOrderRequest: {
        address_id: 1,
        payment_method: 'cod'
    }
});

console.log(`Order placed! Order ID: ${order.id}`);
```

## 6. Find Doctors

```typescript
// List doctors
const doctors = await client.doctors().listDoctors({
    specialtyId: 5,
    perPage: 5
});

doctors.forEach(doctor => {
    console.log(`Dr. ${doctor.name} - ${doctor.specialty_name}`);
    console.log(`Fee: BDT ${doctor.consultation_fee}\n`);
});
```

## 7. Book Appointment

```typescript
// Get available slots
const slots = await client.doctors().getDoctorSlots({
    doctorId: 123,
    doctorSlotRequest: { date: '2024-01-15' }
});

// Book appointment
const appointment = await client.appointments().bookAppointment({
    appointmentRequest: {
        doctor_id: 123,
        appointment_date: '2024-01-15',
        slot_id: slots[0]?.id,
        payment_method: 'online'
    }
});

console.log(`Appointment booked! ID: ${appointment.id}`);
```

## 8. Healthcare Packages

```typescript
// Browse packages
const packages = await client.packages().listPackages();

packages.forEach(pkg => {
    console.log(`${pkg.name} - BDT ${pkg.price}`);
});

// Book package
const booking = await client.packages().bookPackage({
    bookPackageRequest: {
        package_id: 123,
        preferred_date: '2024-01-15',
        payment_method: 'online'
    }
});
```

## 9. Ambulance Service

```typescript
// Get pricing
const pricing = await client.ambulance().getAmbulancePricing({
    ambulancePriceQuery: {
        from_latitude: 23.8103,
        from_longitude: 90.4125,
        to_latitude: 23.7809,
        to_longitude: 90.2792
    }
});

console.log(`Estimated fare: BDT ${pricing.fare}`);

// Book ambulance
const booking = await client.ambulance().placeAmbulanceOrder({
    placeAmbulanceOrderRequest: {
        from_address: 'Gulshan, Dhaka',
        to_address: 'Mirpur, Dhaka',
        patient_name: 'John Doe',
        contact_number: '01712345678'
    }
});
```

## 10. Error Handling

```typescript
try {
    const products = await client.products().listProducts();
} catch (error) {
    if (error instanceof Response) {
        console.error(`API Error: ${error.status}`);
    } else {
        console.error(`Error: ${error}`);
    }
}
```

## Complete Example

```typescript
import { LifePlusClient } from '@lifeplus/sdk';

async function main() {
    try {
        // Initialize
        const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');
        
        // Login
        const session = await client.login('01712345678', 'password');
        console.log(`✓ Logged in as: ${session.data?.user?.name}\n`);
        
        // Search products
        const products = await client.products().listProducts({
            searchKey: 'paracetamol',
            perPage: 5
        });
        console.log(`✓ Found ${products.length} products\n`);
        
        // Add to cart
        if (products.length > 0) {
            await client.cart().addToCart({
                addToCartRequest: {
                    product_id: products[0].id!,
                    quantity: 2
                }
            });
            console.log('✓ Added to cart\n');
        }
        
        // View cart
        const cart = await client.cart().getCart();
        console.log(`✓ Cart total: BDT ${cart.total}\n`);
        
        // List doctors
        const doctors = await client.doctors().listDoctors({ perPage: 3 });
        console.log(`✓ Found ${doctors.length} doctors\n`);
        
        // Logout
        await client.logout();
        console.log('✓ Logged out\n');
        
        console.log('✅ Quick start completed successfully!');
        
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

main();
```

## React Example

```typescript
import React, { useEffect, useState } from 'react';
import { LifePlusClient, Product } from '@lifeplus/sdk';

const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        client.products().listProducts({ perPage: 10 })
            .then(setProducts)
            .catch(console.error);
    }, []);

    return (
        <div>
            <h1>Products</h1>
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

## Next Steps

- Read the [Complete Documentation](README.md)
- Explore [API Reference](docs/)
- Check out [Examples](examples/)
- Join our developer community

## Support

- **Email**: mamun@lifeplusbd.com
- **Phone**: +880 1913705269
- **Website**: https://lifeplusbd.com

---

Happy coding! 🚀
