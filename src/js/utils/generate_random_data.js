import NHTSAStore from '@modules/nhtsa_store';
import { formulaStore } from '@modules/formula_store';



async function generateRandomData(n) {
  const nhtsaStore = new NHTSAStore();
  const availableMakes = await nhtsaStore.getAllMakes();
  const yearComparisonTypes = ['>', '<', '='];
  const riskTypes = ['high', 'medium', 'low'];
  const fuelTypes = ['diesel', 'petrol', 'electric'];

  for (let i = 0; i < n; i++) {
    try {
      const randomMakeIndex = Math.floor(Math.random() * availableMakes.length);
      const selectedMake = availableMakes[randomMakeIndex];

      const availableModels = await nhtsaStore.getModelsForMakeId(selectedMake.Make_ID);
      const randomModelIndex = Math.floor(Math.random() * availableModels.length);
      const selectedModel = availableModels[randomModelIndex];

      const selectedYear = Math.floor(Math.random() * 31) + 1990;
      const randomYearComparisonTypeIndex = Math.floor(Math.random() * 3);
      const selectedYearComparisonType = yearComparisonTypes[randomYearComparisonTypeIndex];

      const randomFuelIndex = Math.floor(Math.random() * 3);
      const selectedFuel = fuelTypes[randomFuelIndex];

      const randomRiskIndex = Math.floor(Math.random() * 3);
      const selectedRisk = riskTypes[randomRiskIndex];

      const createdFormula = formulaStore.post(
        selectedMake.Make_Name,
        selectedModel.Model_Name,
        selectedYearComparisonType,
        selectedYear,
        selectedFuel,
        selectedRisk
      );
    }
    catch (e) {
      console.warn(`An error has occured when generating random data. ${e}.`);
      continue;
    }
  }
}

export { generateRandomData };