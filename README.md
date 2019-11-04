# Nordic Bluetooth UUID Database
![](https://github.com/NordicSemiconductor/bluetooth-uuid-database/workflows/Verify%20JSON%20Schemas/badge.svg)

## About

The Nordic Bluetooth UUID Database provides a simple mechanism through which you can keep an up-to-date listing of all the various Bluetooth Specification-related elements that are defined by our industry, such as Company IDs, Service UUIDs, Characteristic UUIDs and Descriptor UUIDs.

Many values are already a part of the Bluetooth SIG Specification. However, the Bluetooth Model allows for third-parties to define custom UUIDs for their own capabilities. By setting up a centralised database, we can all rely on this [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth) for fetching information of all the Bluetooth-related UUIDs we might find, allowing everyone in the community to reap its rewards. Companies can use it add their own UUIDs to it, allowing other third-parties that use this same database to be able to recognise them with almost no effort on their part.

Nordic recognises the benefits of using a database of this kind for our own software endeavours. But rather than keeping it to ourself, we'd like to open it up for the rest of the Bluetooth community.

## Specification

There are two data types currently represented in 'v1'. They are:

### Company IDs

Each Company ID follows the following [JSON Schema](http://json-schema.org/learn/getting-started-step-by-step.html):

```
{
  "title": "Company",
  "type": "object",
  "properties": {
    "code": { "type": "number" }
    "name": { "type": "string" }
  },
  "required": [
    "code",
    "name"
  ],
}
```

Where 'code' stands for the Decimal value available for each entry in the [official list of assigned Company Identifiers](https://www.bluetooth.com/specifications/assigned-numbers/company-identifiers/), and the name field is self-explanatory.

If you're not familiar with the definition of a JSON Object's schema, you might be taken aback by how long it seems. However, the above specification reduces itself to the following type definition in `Swift`, for example:

```
struct Company {
  let code: Int
  let name: String
}
```

### Service(s), Characteristic(s) and Descriptor(s)

For Service(s), Characteristic(s) and Descriptor(s), we follow the exact same JSON Schema which looks like:

```
{
  "title": "GATTSpecification",
  "type": "object",
  "properties": {
    "description": { "type": "string" },
    "identifier": { "type": "string" },
    "uuid": { "type": "string" },
    "specification": { "type": "string" }
  },
  "required": [
    "description",
    "identifier",
    "uuid",
    "specification"
  ]
}
```
To arrive at this definition, we have followed the table available in the official listing of GATT Specifications, like [this one for Characteristics](https://www.bluetooth.com/specifications/gatt/characteristics/). The first two fields are self-descriptive, however, the last two deserve a little bit more attention. For all specifications under the stewardship of one company, we recommend setting the same `specification` value. For example, we have set the value `nordic` for all the Service(s) and Descriptor(s) defined and maintained by us. Lastly, to group specifications regarding the same product or feature, we encourage the use of the same value for the `identifier` field.

Once again, if you're unfamiliar with JSON Schemas, this is what a single type definition for all three types look like in `Swift`:

```
struct GATTSpecification {
  let uuid: String
  let description: String
  let identifier: String
  let specification: String
}
```

## Usage

Coming Soon.

## Contributions

We have created this project with the sole purpose of attracting other members of the Bluetooth community that need to parse and identify UUIDs from a variety of vendors and devices. Whilst it seems easy for each one of us to do it on our own, conversely it means we all lose the ability to recognise the awesome features and products other members are releasing and launching.

To this effect, we would like to encourage anyone and everyone to submit their own UUIDs according to their own specification. Just make a pull request, ensure it passes our JSON Schema Verification Tests, and if there are no conflicts with other makers, we will approve it and add it.

Furthermore, please feel free to raise issues or pull requests with your own suggestions about how this project can or should improve. We see this Database not as something belonging to Nordic, but as one more thing we'd like to contribute to both the Open Source and Bluetooth communities. 

## License

This project is in active development. We will add a License when it is officially released.
