const LS_FORMULAS_KEY = 'formulaList';

function updateStore(storeKey, newValue) {
  localStorage.setItem(storeKey, JSON.stringify(newValue));
}

// function getMaxObjectId(objects) {
//   let maxId = -1;
//   objects?.forEach((object) => {
//     if (object.id > maxId) {
//       maxId = object.id;
//     }
//   });
//   return maxId;
// }

class FormulaStore {
  constructor() {
    this.formulas = [];
    this.lastObjectId = -1;
    this.fetchStore();
  }

  updateStore() {
    const dataToStore = {
      formulas: this.formulas,
      lastObjectId: this.lastObjectId,
    };
    updateStore(LS_FORMULAS_KEY, dataToStore);
  }

  fetchStore() {
    const storedData = JSON.parse(localStorage.getItem(LS_FORMULAS_KEY));
    if (storedData?.formulas !== undefined && storedData?.lastObjectId !== undefined) {
      this.formulas = storedData.formulas;
      this.lastObjectId = storedData.lastObjectId;
    }
  }

  getAll() {
    return this.formulas;
  }

  delete(formulaId) {
    this.formulas = this.formulas.filter((formula) => formula.id !== formulaId);
    this.updateStore();
  }

  post(makeName, modelName, yearComparisonType, year, fuelType, risk) {
    this.lastObjectId++;
    const newFormula = {
      id: this.lastObjectId,
      makeName,
      modelName,
      yearComparisonType,
      year,
      fuelType,
      risk,
    };
    this.formulas.push(newFormula);
    this.updateStore();
    return newFormula;
  }
}

export { FormulaStore, LS_FORMULAS_KEY };