const db = require('.');

const noDuplicates = Object.keys(db)
  .filter(key => key !== 'schemas')
  .map(list => {
    let numberOfItems;
    let numberOfUniqueUUIDs;
    if (list === 'companies') {
      let companyCodes = db[list].map(company => company.code);
      numberOfItems = companyCodes.length;
      numberOfUniqueUUIDs = (new Set(companyCodes)).size;  
    } else {
      // GATT Attributes
      let uuids = db[list].map(gatt => gatt.uuid);
      numberOfItems = uuids.length;
      numberOfUniqueUUIDs = (new Set(uuids)).size;

      let identifiers = db[list].map(gatt => gatt.identifier);
      let numberOfUniqueIdentifiers = (new Set(identifiers)).size;
      if (numberOfItems !== numberOfUniqueIdentifiers) {
        console.error(`Failed to verify '${list}': '${numberOfItems - numberOfUniqueIdentifiers}' duplicate Identifier(s) found.`);
        return false;
      }
    }

    if (numberOfItems !== numberOfUniqueUUIDs) {            
      console.error(`Failed to verify '${list}': '${numberOfItems - numberOfUniqueUUIDs}' duplicate UUID(s) found.`);
      return false;
    }
    return true;
  })
  .every(v => v); // true if all are true

process.exit(noDuplicates ? 0 : 1);