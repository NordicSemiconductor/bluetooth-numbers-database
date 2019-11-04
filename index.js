'use strict';

const version = require('./package.json').version.split('.')[0];
const pathForJson = filename => `${__dirname}/v${version}/${filename}.json`;

const companies = require(pathForJson('company_ids'));
const services = require(pathForJson('services_uuid'));
const characteristics = require(pathForJson('characteristics_uuid'));
const descriptors = require(pathForJson('descriptors_uuid'));

const companySchema = require(pathForJson('company_schema'));
const uuidSchema = require(pathForJson('uuid_schema'));

module.exports = {
    companies,
    services,
    characteristics,
    descriptors,
    schemas: {
        companies: companySchema,
        services: uuidSchema,
        characteristics: uuidSchema,
        descriptors: uuidSchema,
    }
};
