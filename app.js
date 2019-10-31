var Ajv = require("ajv")
var fs = require("fs")

const version = 1

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

const names = ["company_ids.json", "services_uuid.json", "characteristics_uuid.json", "descriptors_uuid.json"]
const schemas = [companySchema, uuidSchema, uuidSchema, uuidSchema]
var ajv = new Ajv()
for (var i = 0, len = schemas.length; i < len; i++) {
  console.log("Validating " + names[i]);
  const jsonList = readAndParseJSON(names[i])
  ajv.validate(schemas[i], jsonList)
}

function readAndParseJSON(filename) {
  JSON.parse(fs.readFileSync(pathForJson(filename)))
}

function pathForJson(filename) {
  return __dirname + "/v" + version + "/" + filename
}
