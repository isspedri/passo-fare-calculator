// Import CRUD functions
const {
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
  } = require('./crud.js');
  
  // ============================================
  // DISPLAY FUNCTIONS
  // ============================================
  
  function displayFare(fare) {
    if (!fare) {
      console.log("No fare to display");
      return;
    }
  
    console.log(`
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Fare ID: ${fare.id}
  Route: ${fare.from} → ${fare.to}
  Vehicle: ${fare.vehicleType}
  Price: D${fare.price}
  Last Updated: ${fare.lastUpdated}
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
  }
  
  function displayFares(fares) {
    if (fares.length === 0) {
      console.log("No fares found.");
      return;
    }
  
    console.log("\n┌─────┬──────────────┬──────────────┬──────────────┬────────┐");
    console.log("│ ID  │ From         │ To           │ Vehicle      │ Price  │");
    console.log("├─────┼──────────────┼──────────────┼──────────────┼────────┤");
  
    fares.forEach(fare => {
      console.log(
        `│ ${String(fare.id).padEnd(3)} │ ` +
        `${fare.from.padEnd(12)} │ ` +
        `${fare.to.padEnd(12)} │ ` +
        `${fare.vehicleType.padEnd(12)} │ ` +
        `D${String(fare.price).padEnd(5)} │`
      );
    });
  
    console.log("└─────┴──────────────┴──────────────┴──────────────┴────────┘");
    console.log(`Total: ${fares.length} fare(s)\n`);
  }
  
  // ============================================
  // DEMO FUNCTIONS
  // ============================================
  
  function demoCreate() {
    console.log("\n📝 === CREATE DEMO ===");
    const newFare = createFare("Soma", "Farafenni", "Taxi", 50);
    displayFare(newFare);
  }
  
  function demoRead() {
    console.log("\n📖 === READ DEMO ===");
  
    console.log("\n1. All fares:");
    displayFares(getAllFares());
  
    console.log("2. Fare with ID 3:");
    displayFare(getFareById(3));
  
    console.log("3. Banjul → Serekunda:");
    displayFares(searchFaresByRoute("Banjul", "Serekunda"));
  
    console.log("4. Taxi fares:");
    displayFares(searchFaresByVehicle("Taxi"));
  
    console.log("5. Fares involving Banjul:");
    displayFares(searchFaresByLocation("Banjul"));
  }
  
  function demoUpdate() {
    console.log("\n✏️ === UPDATE DEMO ===");
  
    console.log("Before update:");
    displayFare(getFareById(1));
  
    updateFare(1, { price: 18 });
  
    console.log("After update:");
    displayFare(getFareById(1));
  }
  
  function demoDelete() {
    console.log("\n🗑️ === DELETE DEMO ===");
  
    console.log(`Before delete: ${getFareCount()}`);
    deleteFare(8);
    console.log(`After delete: ${getFareCount()}`);
  }
  
  function demoUtilities() {
    console.log("\n🔧 === UTILITIES ===");
  
    console.log(`Total fares: ${getFareCount()}`);
    console.log("Locations:", getAllLocations().join(", "));
    console.log("Vehicle types:", getAllVehicleTypes().join(", "));
  }
  
  // ============================================
  // MAIN
  // ============================================
  
  function main() {
    console.log("╔════════════════════════════════════════════╗");
    console.log("║   PASSO FARE CALCULATOR v1.0              ║");
    console.log("╚════════════════════════════════════════════╝");
  
    demoRead();
    demoCreate();
    demoUpdate();
    demoDelete();
    demoUtilities();
  
    console.log("\n✅ Done! Your app is working.");
  }
  
  main();