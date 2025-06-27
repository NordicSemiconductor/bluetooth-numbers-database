/* Copyright (c) 2019 - 2025, Nordic Semiconductor ASA
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of Nordic Semiconductor ASA nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BELIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const fs = require('fs');
const yaml = require('yaml');
const version = require('./package.json').version;
const pathForJson = filename => `${__dirname}/v${version.split('.')[0]}/${filename}.json`;
const companyIdentifiersSource = `${__dirname}/public/assigned_numbers/company_identifiers/company_identifiers.yaml`;

function convertCompanyIdentifiers(inputFile) {
    const companyIdentifiersOutput = pathForJson('company_ids')

    const yamlContent = fs.readFileSync(inputFile, 'utf8');
    const data = yaml.parse(yamlContent);

    data.company_identifiers.push(
        { value: 0x0418, name: "Reserved" },
        { value: 0x0943, name: "Reserved" },
        { value: 0x0CBE, name: "Reserved" },
        { value: 0xFFFF, name: "Bluetooth SIG Specification Reserved Default Vendor ID for Remote Devices Without Device ID Service Record." }
    );

    const sortedArray = data.company_identifiers
        .map(item => ({
            code: parseInt(item.value),
            name: item.name
        }))
        .sort((a, b) => a.code - b.code);

    const formattedJson = JSON.stringify(sortedArray, null, 4)
        .replace(/\n        /g, ' ')
        .replace(/\n    }/g, ' }');

    fs.writeFileSync(companyIdentifiersOutput, formattedJson);
}

if (fs.existsSync(companyIdentifiersSource)) {
    convertCompanyIdentifiers(companyIdentifiersSource);
} else {
    console.error('Please clone the Bluetooth SIG repo first: https://bitbucket.org/bluetooth-SIG/public.git');
    process.exit(1);
}
