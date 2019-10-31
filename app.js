const Ajv = require('ajv');

const version = 1;
const pathForJson = filename => `${__dirname}/v${version}/${filename}.json`;

const companySchema = require(pathForJson('company_schema'));
const uuidSchema = require(pathForJson('uuid_schema'));

const companiesList = require(pathForJson('company_ids'));
const servicesList = require(pathForJson('services_uuid'));
const characteristicsList = require(pathForJson('characteristics_uuid'));
const descriptorsList = require(pathForJson('descriptors_uuid'));

const ajv = new Ajv();

const validate = (schema, list) => {
  if (!ajv.validate(companySchema, companiesList)) {
    console.error('failed to validate');
    process.exit(1);
  }
}

validate(companySchema, companiesList);
[servicesList, characteristicsList, descriptorsList]
  .forEach(list => validate(uuidSchema, list));
