'use strict';

const version = require('./package.json').version.split('.')[0];
const pathForJson = filename => `${__dirname}/v${version}/${filename}.json`;

const companies = require(pathForJson('company_ids'));
const services = require(pathForJson('service_uuids'));
const characteristics = require(pathForJson('characteristic_uuids'));
const descriptors = require(pathForJson('descriptor_uuids'));

const companySchema = require(pathForJson('company_schema'));
const attributeSchema = require(pathForJson('attribute_schema'));

module.exports = {
    companies,
    services,
    characteristics,
    descriptors,
    schemas: {
        companies: companySchema,
        services: attributeSchema,
        characteristics: attributeSchema,
        descriptors: attributeSchema,
    }
};
