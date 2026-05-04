// 1. Arrays: Create an array of 5 Gambian cities
const gambianCities = ["Banjul", "Serekunda", "Brikama", "Bakau", "Farafenni"];

// 2. Objects: Create an object representing a taxi fare
const singleFare = {
    from: "Banjul",
    to: "Bakau",
    price: 25,
    vehicle: "Taxi"
};

// 3. Array of Objects: Create an array of 3 fare objects
const fares = [
    { id: 1, route: "Banjul-Serekunda", price: 15 },
    { id: 2, route: "Brikama-Banjul", price: 35 },
    { id: 3, route: "Bakau-Serekunda", price: 12 }
];

// 4. Array Methods:
// Use .map() to get all prices
const allPrices = fares.map(f => f.price);

// Use .filter() to get fares under D20
const cheapFares = fares.filter(f => f.price < 20);

// Use .find() to get a specific fare (id: 2)
const specificFare = fares.find(f => f.id === 2);

// 5. Template Literals: Create a formatted message
const message = `The fare from ${singleFare.from} to ${singleFare.to} costs D${singleFare.price}.`;

// Console Logs for Output
console.log("Cities:", gambianCities);
console.log("Prices Map:", allPrices);
console.log("Cheap Fares (under D20):", cheapFares);
console.log("Found Fare:", specificFare);
console.log("Formatted Message:", message);

/* 
OUTPUT:
Cities: [ 'Banjul', 'Serekunda', 'Brikama', 'Bakau', 'Farafenni' ]
Prices Map: [ 15, 35, 12 ]
Cheap Fares (under D20): [ { id: 1, route: 'Banjul-Serekunda', price: 15 }, { id: 3, route: 'Bakau-Serekunda', price: 12 } ]
Found Fare: { id: 2, route: 'Brikama-Banjul', price: 35 }
Formatted Message: The fare from Banjul to Bakau costs D25.
*/