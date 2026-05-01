// Import fare data
const { fares } = require('./data.js');
// Keep track of next ID
let nextId = fares.length > 0 ? Math.max( ... fares.map(f => f.id)) + 1 : 1;
// Helper function to get current date
const getCurrentDate = () => {
const now = new Date();
return now.toISOString().split('T')[0]; // YYYY-MM-DD
};
// ============================================
// CREATE
// ============================================
/**
* Create a new fare
* @param {string} from - Starting location
* @param {string} to - Destination
* @param {string} vehicleType - Type of vehicle
* @param {number} price - Fare price
* @returns {object} The created fare
*/
function createFare(from, to, vehicleType, price) {
const newFare = {
id: nextId++,
from,
to,
vehicleType,
price,
lastUpdated: getCurrentDate()
};
fares.push(newFare);
console.log(`✅ Fare created: ${from} → ${to} (${vehicleType}) -
D${price}`);
return newFare;
}
// ============================================
// READ
// ============================================
/**
* Get all fares
* @returns {array} All fares
*/
function getAllFares() {
return fares;
}
/**
* Get fare by ID
* @param {number} id - Fare ID
* @returns {object|null} Fare object or null if not found
*/
function getFareById(id) {
return fares.find(fare => fare.id === id) || null;
}
/**
* Search fares by route
* @param {string} from - Starting location
* @param {string} to - Destination
* @returns {array} Matching fares
*/
function searchFaresByRoute(from, to) {
return fares.filter(fare =>
fare.from.toLowerCase() === from.toLowerCase() &&
fare.to.toLowerCase() === to.toLowerCase()
);
}
/**
* Search fares by vehicle type
* @param {string} vehicleType - Type of vehicle
* @returns {array} Matching fares
*/
function searchFaresByVehicle(vehicleType) {
return fares.filter(fare =>
fare.vehicleType.toLowerCase() === vehicleType.toLowerCase()
);
}
/**
* Search fares by location (from OR to)
* @param {string} location - Location name
* @returns {array} Matching fares
*/
function searchFaresByLocation(location) {
return fares.filter(fare =>
fare.from.toLowerCase() === location.toLowerCase() ||
fare.to.toLowerCase() === location.toLowerCase()
);
}
// ============================================
// UPDATE
// ============================================
/**
* Update a fare
* @param {number} id - Fare ID
* @param {object} updates - Properties to update
* @returns {object|null} Updated fare or null if not found
*/
function updateFare(id, updates) {
const fare = fares.find(f => f.id === id);
if (!fare) {
console.log(`❌ Fare with ID ${id} not found`);
return null;
}
// Update allowed properties
if (updates.from) fare.from = updates.from;
if (updates.to) fare.to = updates.to;
if (updates.vehicleType) fare.vehicleType = updates.vehicleType;
if (updates.price) fare.price = updates.price;
// Always update the lastUpdated date
fare.lastUpdated = getCurrentDate();
console.log(`✅ Fare ${id} updated`);
return fare;
}
// ============================================
// DELETE
// ============================================
/**
* Delete a fare
* @param {number} id - Fare ID
* @returns {boolean} True if deleted, false if not found
*/
function deleteFare(id) {
const index = fares.findIndex(f => f.id === id);
if (index === -1) {
console.log(`❌ Fare with ID ${id} not found`);
return false;
}
const deleted = fares.splice(index, 1)[0];
console.log(`✅ Fare deleted: ${deleted.from} → ${deleted.to}`);
return true;
}
// ============================================
// UTILITY FUNCTIONS
// ============================================
/**
* Get count of fares
* @returns {number} Total number of fares
*/
function getFareCount() {
return fares.length;
}
/**
* Get all unique locations
* @returns {array} Array of unique location names
*/
function getAllLocations() {
const locations = new Set();
fares.forEach(fare => {
locations.add(fare.from);
locations.add(fare.to);
});
return Array.from(locations).sort();
}
/**
* Get all unique vehicle types
* @returns {array} Array of unique vehicle types
*/
function getAllVehicleTypes() {
const types = new Set();
fares.forEach(fare => types.add(fare.vehicleType));
return Array.from(types).sort();
}
// Export all functions
module.exports = {
    createFare,
getAllFares,
getFareById,
searchFaresByRoute,
searchFaresByVehicle,
searchFaresByLocation,
updateFare,
deleteFare,
getFareCount,
getAllLocations,
getAllVehicleTypes
};