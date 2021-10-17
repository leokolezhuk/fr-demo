const LS_FORMULAS_KEY = 'formulaList';

/**
 * Implements a store for formulas. Meant as a mock to a non-existing API.
 * Stores data in localStorage.
 */
class FormulaStore {
  constructor() {
    this.formulas = [];
    this.lastObjectId = -1;
    this.fetchStore();
  }

  /**
   * Update store based on the current instance.
   */
  updateStore() {
    const dataToStore = {
      formulas: this.formulas,
      lastObjectId: this.lastObjectId,
    };
    localStorage.setItem(LS_FORMULAS_KEY, JSON.stringify(dataToStore));
  }

  /**
   * Update current instance based on the stored data.
   */
  fetchStore() {
    const storedData = JSON.parse(localStorage.getItem(LS_FORMULAS_KEY));
    this.formulas = storedData?.formulas ?? [];
    this.lastObjectId = storedData?.lastObjectId ?? -1;
  }

  /**
   * Get all formulas.
   * @returns {Array[Object]} Array of formulas.
   */
  getAll() {
    return this.formulas;
  }

  /**
   * Delete a formula with a given id.
   * @param {String} formulaId The formula with this id will be deleted.
   */
  delete(formulaId) {
    this.formulas = this.formulas.filter((formula) => formula.id !== formulaId);
    this.updateStore();
  }

  /**
   * Creates a new formula.
   * @param {String} makeName Name of the vehicle make.
   * @param {String} modelName Name of the vehicle model.
   * @param {String} yearComparisonType Earlier, later or equal to a certain year.
   * @param {String} year Model year. Considered in combination with yearComparisonType.
   * @param {String} fuelType Type of vehicle fuel.
   * @param {String} Level of risk introduced.
   * @returns {Object} Created formula.
   */
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