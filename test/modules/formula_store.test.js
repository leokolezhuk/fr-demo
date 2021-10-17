import { formulaStore, LS_FORMULAS_KEY } from '@modules/formula_store';

describe('Formula Store', () => {

  function postFormula(formulaDefinition) {
    formulaStore.post(
      formulaDefinition.makeName,
      formulaDefinition.modelName,
      formulaDefinition.yearComparisonType,
      formulaDefinition.year,
      formulaDefinition.fuelType,
      formulaDefinition.risk
    );
  }

  beforeEach(() => {
    localStorage.removeItem(LS_FORMULAS_KEY);
    formulaStore.fetchStore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('creating a new instance', () => {
    describe('with no previously stored data available', () => {
      it('should initialize the formula store correctly', () => {
        expect(formulaStore.formulas).toHaveLength(0);
        expect(formulaStore.getAll()).toHaveLength(0);
        expect(formulaStore.lastObjectId).toBe(-1);
      });
    });
  });

  describe('when post is called', () => {
    let expectedStoredFormula;
    beforeEach(() => {
      expectedStoredFormula = {
        id: 0,
        makeName: 'Audi',
        modelName: 'A3',
        yearComparisonType: '>',
        year: 2021,
        fuelType: 'petrol',
        risk: 'high',
      };
      formulaStore.post('Audi', 'A3', '>', 2021, 'petrol', 'high');
    });

    it('should add the requested formula to the store', () => {
      const storedFormula = formulaStore.getAll().filter((formula) => formula.id === 0)[0];
      expect(storedFormula).toMatchObject(expectedStoredFormula);
    });

    it('should store the object representation in persistent storage', () => {
      const persistentStorage = JSON.parse(localStorage.getItem(LS_FORMULAS_KEY));
      expect(persistentStorage).toEqual(expect.objectContaining({
        lastObjectId: 0,
        formulas: [expectedStoredFormula]
      }));
    });
  });

  describe('when getAll is called', () => {
    let formula1, formula2;
    beforeEach(() => {
      formula1 = {
        id: 0,
        makeName: 'Audi',
        modelName: 'A3',
        yearComparisonType: '>',
        year: 2021,
        fuelType: 'petrol',
        risk: 'high',
      };
      formula2 = {
        id: 1,
        makeName: 'Audi',
        modelName: 'A2',
        yearComparisonType: '<',
        year: 2015,
        fuelType: 'diesel',
        risk: 'high',
      };
      postFormula(formula1);
      postFormula(formula2);
    });

    it('should return all stored formulas', () => {
      expect(formulaStore.getAll()).toHaveLength(2);
      expect(formulaStore.getAll()).toContainEqual(formula1);
      expect(formulaStore.getAll()).toContainEqual(formula2);
    });
  });

  describe('when delete is called', () => {
    let formula1, formula2, updateStoreSpy;
    beforeEach(() => {
      formula1 = {
        id: 0,
        makeName: 'Audi',
        modelName: 'A3',
        yearComparisonType: '>',
        year: 2021,
        fuelType: 'petrol',
        risk: 'high',
      };
      formula2 = {
        id: 1,
        makeName: 'Audi',
        modelName: 'A2',
        yearComparisonType: '<',
        year: 2015,
        fuelType: 'diesel',
        risk: 'high',
      };
      postFormula(formula1);
      postFormula(formula2);
      updateStoreSpy = jest.spyOn(formulaStore, 'updateStore');
    });

    describe('when the object with given id exists', () => {
      it('should delete the object with the given id', () => {
        expect(formulaStore.getAll()).toHaveLength(2);

        formulaStore.delete(0);
        expect(formulaStore.getAll()).toHaveLength(1);
        expect(formulaStore.getAll()).toContainEqual(expect.objectContaining({ id: 1 }));
        expect(updateStoreSpy).toHaveBeenCalledTimes(1);

        formulaStore.delete(1);
        expect(formulaStore.getAll()).toHaveLength(0);
        expect(updateStoreSpy).toHaveBeenCalledTimes(2);
      });
    });

    describe('when the object with given id does NOT exist', () => {
      it('should keep all existing objects', () => {
        expect(formulaStore.getAll()).toHaveLength(2);
        formulaStore.delete(2);
        expect(formulaStore.getAll()).toHaveLength(2);
        expect(formulaStore.getAll()).toContainEqual(expect.objectContaining({ id: 0 }));
        expect(formulaStore.getAll()).toContainEqual(expect.objectContaining({ id: 1 }));
        expect(updateStoreSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
