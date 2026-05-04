/**
 * Checkpoint 0d.3: PASSO Fare Calculator Enhancements
 * This file contains validation, statistical analysis, and bulk operations.
 */

// --- 1. DATA VALIDATION ---

/**
 * Validates a fare object based on specific business rules.
 * @param {Object} fare - The fare object to check.
 * @returns {string} - Success message or specific Error message.
 */
function validateFare(fare) {
    const validVehicles = ["Taxi", "Bus", "Gelegele", "7-Seater"];

    // Rule: Price must be a positive number (cannot be 0 or negative)
    if (typeof fare.price !== 'number' || fare.price <= 0) {
        return "Error: Price must be a positive number.";
    }

    // Rule: From and To cannot be the same (no circular routes)
    if (fare.from.toLowerCase() === fare.to.toLowerCase()) {
        return "Error: Departure (From) and destination (To) cannot be the same.";
    }

    // Rule: Vehicle type must match the approved fleet list
    if (!validVehicles.includes(fare.vehicle)) {
        return `Error: "${fare.vehicle}" is not a valid vehicle type.`;
    }

    return "Success: Fare entry is valid.";
}

// --- 2. STATISTICS LOGIC ---

/**
 * Analyzes the fares array to provide business insights.
 * @param {Array} fares - The array of fare objects.
 */
function getFareStatistics(fares) {
    if (fares.length === 0) return "No data to analyze.";

    // A. Average Fare Calculation
    const totalContent = fares.reduce((sum, f) => sum + f.price, 0);
    const avgFare = totalContent / fares.length;

    // B. Most Expensive Route
    // We sort the array by price in descending order and take the first item
    const expensive = [...fares].sort((a, b) => b.price - a.price)[0];

    // C. Cheapest Vehicle Type
    // We sort by price in ascending order
    const cheapest = [...fares].sort((a, b) => a.price - b.price)[0];

    // D. Most Common Route
    // We use an object to count how many times each route appears
    const routeCounts = {};
    fares.forEach(f => {
        const routeName = `${f.from} to ${f.to}`;
        routeCounts[routeName] = (routeCounts[routeName] || 0) + 1;
    });
    // Find the route name with the highest count
    const mostCommon = Object.keys(routeCounts).reduce((a, b) => routeCounts[a] > routeCounts[b] ? a : b);

    return {
        "Average Fare": avgFare.toFixed(2),
        "Most Expensive": `${expensive.from} to ${expensive.to} ($${expensive.price})`,
        "Cheapest Vehicle": cheapest.vehicle,
        "Most Common Route": mostCommon
    };
}

// --- 3. BULK OPERATIONS ---

/**
 * Updates prices for all fares of a specific vehicle type.
 * @param {Array} fares - The data array.
 * @param {string} vehicleType - The target vehicle (e.g., "Taxi").
 * @param {number} percentage - The percentage to increase (e.g., 10 for 10%).
 */
function bulkUpdatePrices(fares, vehicleType, percentage) {
    return fares.map(f => {
        if (f.vehicle === vehicleType) {
            // Formula: New Price = Old Price * (1 + (percentage / 100))
            const newPrice = f.price * (1 + percentage / 100);
            return { ...f, price: Number(newPrice.toFixed(2)) };
        }
        return f; // Keep other vehicles unchanged
    });
}

/**
 * Removes all fare records for a specific route.
 * @param {Array} fares - The data array.
 * @param {string} from - Departure point.
 * @param {string} to - Destination.
 */
function deleteFaresByRoute(fares, from, to) {
    // Filter creates a new array containing only items that DON'T match the route
    return fares.filter(f => !(f.from === from && f.to === to));
}

// --- 4. TESTING AREA ---
// This section demonstrates to your lecturer that your code works perfectly.

let faresData = [
    { from: "Brikama", to: "Serrekunda", price: 20, vehicle: "Taxi" },
    { from: "Banjul", to: "Bakau", price: 15, vehicle: "Bus" },
    { from: "Brikama", to: "Serrekunda", price: 25, vehicle: "7-Seater" },
    { from: "Tabokoto", to: "Banjul", price: 30, vehicle: "Gelegele" },
    { from: "Brikama", to: "Serrekunda", price: 20, vehicle: "Taxi" } 
];

console.log("--- TEST 1: Validation ---");
const invalidEntry = { from: "Banjul", to: "Banjul", price: 10, vehicle: "Taxi" };
console.log("Checking invalid entry (Same From/To):", validateFare(invalidEntry));

console.log("\n--- TEST 2: Statistics ---");
console.table(getFareStatistics(faresData));

console.log("\n--- TEST 3: Bulk Update (Increase Taxi by 10%) ---");
const updatedFares = bulkUpdatePrices(faresData, "Taxi", 10);
console.table(updatedFares);

console.log("\n--- TEST 4: Bulk Delete (Remove Brikama to Serrekunda) ---");
const finalFares = deleteFaresByRoute(updatedFares, "Brikama", "Serrekunda");
console.table(finalFares);