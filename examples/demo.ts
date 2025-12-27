import { LifePlusClient } from '../';
import { stringOrEmpty, formatPrice, numberOrZero } from '../helpers';

async function main() {
    console.log('=== LifePlus TypeScript SDK Demo ===\n');

    try {
        // Create client
        const client = new LifePlusClient('https://api.lifeplusbd.com/api/v2');

        // Example 1: List Products
        console.log('1. Listing products...');
        const products = await client.products().listProducts({
            page: 1,
            perPage: 5
        });

        console.log(`✓ Found ${products.length} products:`);
        products.forEach((product, i) => {
            const name = stringOrEmpty(product.name);
            const price = numberOrZero(product.price);
            console.log(`  ${i + 1}. ${name} - ${formatPrice(price)}`);
        });
        console.log();

        // Example 2: Search Products
        console.log('2. Searching for products...');
        const searchResults = await client.products().listProducts({
            searchKey: 'paracetamol',
            perPage: 3
        });

        console.log(`✓ Search found ${searchResults.length} results:`);
        searchResults.forEach((product, i) => {
            const name = stringOrEmpty(product.name);
            const price = numberOrZero(product.price);
            console.log(`  ${i + 1}. ${name} - ${formatPrice(price)}`);
        });
        console.log();

        // Example 3: Get Categories
        console.log('3. Getting categories...');
        const categories = await client.products().getLifestyleCategories();

        console.log(`✓ Found ${categories.length} categories`);
        categories.slice(0, 5).forEach((category, i) => {
            console.log(`  ${i + 1}. ${stringOrEmpty(category.name)}`);
        });
        console.log();

        // Example 4: List Doctors
        console.log('4. Listing doctors...');
        const doctors = await client.doctors().listDoctors({
            page: 1,
            perPage: 3
        });

        console.log(`✓ Found ${doctors.length} doctors:`);
        doctors.forEach((doctor, i) => {
            const name = stringOrEmpty(doctor.name);
            const specialty = stringOrEmpty(doctor.specialty_name);
            const fee = numberOrZero(doctor.consultation_fee);
            console.log(`  ${i + 1}. Dr. ${name} - ${specialty} (${formatPrice(fee)})`);
        });
        console.log();

        // Example 5: Get Specialties
        console.log('5. Getting specialties...');
        const specialties = await client.lookup().getSpecialties();

        console.log(`✓ Found ${specialties.length} specialties`);
        specialties.slice(0, 5).forEach((specialty, i) => {
            console.log(`  ${i + 1}. ${stringOrEmpty(specialty.name)}`);
        });
        console.log();

        // Example 6: List Hospitals
        console.log('6. Listing hospitals...');
        const hospitals = await client.hospitals().listHospitals({
            page: 1,
            perPage: 3
        });

        console.log(`✓ Found ${hospitals.length} hospitals:`);
        hospitals.forEach((hospital, i) => {
            const name = stringOrEmpty(hospital.name);
            const address = stringOrEmpty(hospital.address);
            console.log(`  ${i + 1}. ${name}`);
            console.log(`     Location: ${address}`);
        });
        console.log();

        // Example 7: List Packages
        console.log('7. Listing healthcare packages...');
        const packages = await client.packages().listPackages({
            page: 1,
            perPage: 3
        });

        console.log(`✓ Found ${packages.length} packages:`);
        packages.forEach((pkg, i) => {
            const name = stringOrEmpty(pkg.name);
            const price = numberOrZero(pkg.price);
            console.log(`  ${i + 1}. ${name} - ${formatPrice(price)}`);
        });
        console.log();

        console.log('✓ Demo completed!\n');
        console.log('Note: Login with real credentials to test authenticated endpoints.');
        console.log('Contact: mamun@lifeplusbd.com / +880 1913705269');

    } catch (error) {
        if (error instanceof Response) {
            console.error(`❌ API Error: ${error.status}`);
            try {
                const body = await error.json();
                console.error('Response:', body);
            } catch (e) {
                console.error('Could not parse error response');
            }
        } else {
            console.error('❌ Error:', error);
        }
        process.exit(1);
    }
}

main();
