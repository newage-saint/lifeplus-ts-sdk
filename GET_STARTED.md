# Get Started with LifePlus TypeScript SDK

## Installation

```bash
npm install @lifeplus/sdk
```

## Basic Usage

### TypeScript

```typescript
import { LifePlusClient } from '@lifeplus/sdk';

// Create client
const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');

// Partner API (server-to-server)
client.setPartnerCredentials('partner_123', 'lpk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

// Login
const session = await client.login('01712345678', 'password');
console.log(`Logged in as: ${session.data?.user?.name}`);

// Search products
const products = await client.products().listProducts({
    searchKey: 'paracetamol',
    perPage: 10
});

console.log(`Found ${products.length} products`);
products.forEach(product => {
    console.log(`- ${product.name}: BDT ${product.price}`);
});
```

### JavaScript

```javascript
const { LifePlusClient } = require('@lifeplus/sdk');

async function main() {
    // Create client
    const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');

    // Partner API (server-to-server)
    client.setPartnerCredentials('partner_123', 'lpk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    
    // Search products
    const products = await client.products().listProducts({
        searchKey: 'paracetamol',
        perPage: 10
    });
    
    console.log(`Found ${products.length} products`);
    products.forEach(product => {
        console.log(`- ${product.name}: BDT ${product.price}`);
    });
}

main();
```

## Run the Demo

```bash
cd node_modules/@lifeplus/sdk/examples
npm install
npm run demo
```

## Documentation

- **README.md** - Complete documentation
- **QUICKSTART.md** - 5-minute quick start
- **API Reference** - Full API documentation

## Support

- **Mamun**: mamun@lifeplusbd.com / +880 1913705269
- **Sagor**: sagor@lifeplusbd.com / +880 1681408185
