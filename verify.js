/* Copyright (c) 2010 - 2020, Nordic Semiconductor ASA
All rights reserved.

Use in source and binary forms, redistribution in binary form only, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions in binary form, except as embedded into a Nordic Semiconductor ASA integrated circuit in a product or a software update for such product, must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

2. Neither the name of Nordic Semiconductor ASA nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

3. This software, with or without modification, must only be used with a Nordic Semiconductor ASA integrated circuit.

4. Any software provided in binary form under this license must not be reverse engineered, decompiled, modified and/or disassembled.

THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const db = require('.');

const noDuplicates = Object.keys(db)
  .filter(key => key !== 'schemas')
  .map(list => {
    let numberOfItems;
    let numberOfUniques;
    if (list === 'companies') {
      let companyCodes = db[list].map(company => company.code);
      numberOfItems = companyCodes.length;
      numberOfUniques = (new Set(companyCodes)).size;  
    } else {
      // GATT Attributes
      let uuids = db[list].map(gatt => gatt.uuid);
      numberOfItems = uuids.length;
      numberOfUniques = (new Set(uuids)).size;

      let identifiers = db[list].map(gatt => gatt.identifier);
      let numberOfUniqueIdentifiers = (new Set(identifiers)).size;
      if (numberOfItems !== numberOfUniqueIdentifiers) {
        console.error(`Failed to verify '${list}': '${numberOfItems - numberOfUniqueIdentifiers}' duplicate Identifier(s) found.`);
        return false;
      }
    }

    if (numberOfItems !== numberOfUniques) {            
      console.error(`Failed to verify '${list}': '${numberOfItems - numberOfUniques}' duplicate UUID(s) found.`);
      return false;
    }
    return true;
  })
  .every(v => v); // true if all are true

process.exit(noDuplicates ? 0 : 1);