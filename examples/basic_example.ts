import { LifePlusClient } from '@lifeplus/sdk';

// Initialize the SDK client with your API key
const client = new LifePlusClient({
  apiKey: 'lpak_test_xxx...',
});

async function runExamples() {
  try {
    // Example 1: List products
    console.log('=== Listing Products ===');
    const products = await client.products.list({
      page: 1,
      perPage: 10,
    });
    console.log(`Found ${products.length} products\n`);

    // Example 2: Get user profile
    console.log('=== Getting User Profile ===');
    const profile = await client.auth.getProfile();
    console.log(`User: ${profile.name} (${profile.email})\n`);

    // Example 3: Add item to cart
    console.log('=== Adding to Cart ===');
    const cartItem = await client.cart.addItem({
      productId: 123,
      quantity: 2,
    });
    console.log(`Added to cart: ${cartItem.id}\n`);

    // Example 4: Get cart contents
    console.log('=== Getting Cart ===');
    const cart = await client.cart.get();
    console.log(`Cart total: ${cart.total}`);
    console.log(`Items: ${cart.items.length}\n`);

    // Example 5: Place order
    console.log('=== Placing Order ===');
    const order = await client.orders.create({
      cartId: cart.id,
      addressId: 'addr_456',
      paymentMethod: 'cash_on_delivery',
    });
    console.log(`Order placed: ${order.id}`);
    console.log(`Status: ${order.status}\n`);

    console.log('✅ All examples completed successfully!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error:', error.message);
    } else {
      console.error('❌ Unknown error:', error);
    }
  }
}

// Run examples
runExamples();
