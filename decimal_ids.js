/* Copyright (c) 2019 - 2023, Nordic Semiconductor ASA
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of Nordic Semiconductor ASA nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BELIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const version = require('./package.json').version;
const pathForJson = filename => `${__dirname}/v${version.split('.')[0]}/${filename}.json`;

const companyIdsFile = pathForJson('company_ids')
console.debug(companyIdsFile)

// Regular expression to match hexadecimal values
const hexRegex = /"code"\s*:\s*(0x[0-9a-fA-F]+),*/g;

// Function to convert hexadecimal string to decimal
function hexToDecimal(hex) {
  return parseInt(hex, 16);
}

const fs = require('fs');
const readline = require('readline');

// Readline interface
const readlineInterface = readline.createInterface({
  input: fs.createReadStream(companyIdsFile),
  output: process.stdout,
  terminal: false
});

const processedLines = [];
var modificationsCount = 0

// Read line by line
readlineInterface.on('line', line => {
    try {
      const processedLine = line.replace(hexRegex, (match, hex) => {
        const decimal = hexToDecimal(hex);
        modificationsCount += 1
        console.debug(`Fixed hexadecimal code "${hex}" to decimal "${decimal}" `)
        return `"code": ${decimal},`;
      });
  
      // All lines are added here, whether they matched the regex or not.
      processedLines.push(processedLine)
    } catch (error) {
      console.error('Error processing line:', error);
    }
  });

readlineInterface.on('close', () => {
    const processedContent = processedLines.join('\n');
    console.log(processedContent)

    // Writeback
    fs.writeFile(companyIdsFile, processedContent, 'utf8', err => {
        if (err) {
            console.error('Error writing back to file:', err);
            return;
        }
    });
    console.log(`Hex Company IDs Fix-up completed. ${modificationsCount} IDs modified.`);
});