const LS_FORMULAS_KEY = 'formulaList';

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
    localStorage.setItem(LS_FORMULAS_KEY, JSON.stringify(dataToStore));
  }

  fetchStore() {
    const storedData = JSON.parse(localStorage.getItem(LS_FORMULAS_KEY));
    this.formulas = storedData?.formulas ?? [];
    this.lastObjectId = storedData?.lastObjectId ?? -1;
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

// Export only a single instance effectively making this a singleton.
const formulaStore = new FormulaStore();

export { formulaStore, LS_FORMULAS_KEY };