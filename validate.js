const ajv = new require('ajv')();
const db = require('.');

const allValid = Object.keys(db)
  .filter(key => key !== 'schemas')
  .map(list => {
    if (!db.schemas[list]) {
      console.error(`Missing schema for '${list}'.`);
      return false;
    }
    if (!ajv.validate(db.schemas[list], db[list])) {
      console.error(`Failed to validate '${list}':`);
      console.error(ajv.errors);
      return false;
    }
    return true;
  })
  .every(v => v); // true if all are true

process.exit(allValid ? 0 : 1);
