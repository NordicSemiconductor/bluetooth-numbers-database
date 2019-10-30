# Nordic UUID Database

## About

The Nordic UUID Database provides a simple mechanism through which you can keep an up-to-date listing of all the various Bluetooth Specification-related elements that are defined by our industry, such as Company IDs, Service UUIDs, Characteristic UUIDs and Descriptor UUIDs.

Many values are already a part of the Bluetooth SIG Specification. However, the Bluetooth Model allows for third-parties to define custom UUIDs for their own capabilities. By setting up a centralised database, we can all rely on this [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth) for fetching information of all the Bluetooth-related UUIDs we might find, allowing everyone in the community to reap its rewards. Companies can use it add their own UUIDs to it, allowing other third-parties that use this same database to be able to recognise them with almost no effort on their part.

Nordic recognises the benefits of using a database of this kind for our own software endeavours. But rather than keeping it to ourself, we'd like to open it up for the rest of the Bluetooth community.

## Specification

There are two data types currently represented in 'v1'. They are:

### Company IDs

Each Company ID element can be represented the following way:

```
struct Company {
  let code: Int
  let name: String
}
```

Where 'code' stands for the Decimal value available for each entry in the (official list of assigned Company Identifiers)[https://www.bluetooth.com/specifications/assigned-numbers/company-identifiers/], and the name is self-explanatory.

### Service(s), Characteristic(s) and Descriptor(s)

All three of these types follow the same structure:

```
struct GATTSpecification {
  let uuid: String
  let description: String
  let identifier: String
  let specification: String
}
```

To represent these types, we have followed the table available in the official listing of GATT Specifications, like (this one for Characteristics)[https://www.bluetooth.com/specifications/gatt/characteristics/]. The first two fields are self-descriptive, however, the last two deserve a little bit more attention. For all specifications under the stewardship of one company, we recommend setting the same `specification` value. For example, we have set the value `nordic` for all the Service(s) and Descriptor(s) defined and maintained by us. Lastly, to group specifications regarding the same product or feature, we encourage the use of the same value for the `identifier` field.

## Usage

Coming Soon.

## Original Author

Mobile Applications Team, Nordic Semiconductor ASA.

Contact: dinesharjani <dinesh.harjani@nordicsemi.no>

## License

This project is in active development. We will add a License when it is officially released.
