'use strict';

const companies = require('./v1/company_ids.json');
const services = require('./v1/services_uuid.json');
const characteristics = require('./v1/characteristics_uuid.json');
const descriptors = require('./v1/descriptors_uuid.json');

const companySchema = require('./v1/company_schema.json');
const uuidSchema = require('./v1/uuid_schema.json');

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
