var Ajv = require("ajv")
var fs = require("fs")

const version = 1

const companiesList = readAndParseJSON("company_ids")
const companySchema = {
  "$type": "object",
  "properties": {
    "code": { "type": "integer" },
    "name": { "type": "string" }
  }
}

const uuidSchema = {
  "$type": "object",
  "properties": {
    "description": { "type": "string" },
    "identifier": { "type": "string" },
    "uuid": { "type": "string" },
    "specification": { "type": "string" }
  }
}
const servicesList = readAndParseJSON("services_uuid")
const characteristicsList = readAndParseJSON("characteristics_uuid")
const descriptorsList = readAndParseJSON("descriptors_uuid")

const schemas = [companySchema, uuidSchema, uuidSchema, uuidSchema]
const jsonLists = [companiesList, servicesList, characteristicsList, descriptorsList]
var ajv = new Ajv()
for (var i = 0, len = jsonLists.length; i < len; i++) {
  ajv.validate(schemas[i], jsonLists[i])
}

function readAndParseJSON(filename) {
  JSON.parse(fs.readFileSync(pathForJson(filename)))
}

function pathForJson(filename) {
  return __dirname + "/v" + version + "/" + filename + ".json"
}
