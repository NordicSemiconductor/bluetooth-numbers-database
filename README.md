# Nordic Bluetooth UUID Database
![](https://github.com/NordicSemiconductor/bluetooth-uuid-database/workflows/Verify%20JSON%20Schemas/badge.svg)![](https://github.com/NordicSemiconductor/bluetooth-uuid-database/workflows/Check%20No%20Duplicates/badge.svg)

Welcome to **[insert-project-name-here]**, a database containing metadata and descriptions of various Bluetooth Specification-related elements in use across all types of applications. Allowing you to outsource publishing, maintenance, and review of both your own Bluetooth specifications as well as those used by the rest of the industry.

**[insert-project-name-here]** is used and maintained by Nordic Semiconductor ASA, a Bluetooth-SIG founder and member.

## Scope

The Bluetooth Specification makes heave use of a Universally Unique Identifier field, known **UUID** for short, to define multiple key elements in the spec, such as a device's manufacturer, service definitions, and much more. In the development of our own tools, it was discovered that many of these definitions were duplicated and redefined in a variety of our own projects, hence the need to unify that body of work into a single, cohesive project usable by all.

In addition, it is common-case within the Bluetooth community, and covered by the specification, to extend the SIG-defined elements with proprietary definitions that do not overlap with the standard. As a Bluetooth hardware-provider and manufacturer, Nordic Semiconductor makes heavy use of these extensions, and recognises the value in allowing other hardware manufacturers to announce their own Bluetooth Services, Characteristics and Descriptors to the rest of the industry.

Therefore, the scope of this project is to provide a centralised database to access Company IDs, Service UUIDs, Characteristic UUIDs and Descriptor UUIDs, and is open to anyone and everyone who would like to participate, both passively (i.e. querying) and actively (i.e. submitting their own definitions)

## Specification

As part of the 'v1' release, two types of data structures are used, both of them defined as [JSON Schemas](http://json-schema.org/learn/getting-started-step-by-step.html). They are:

### Company IDs

| Field | Type | Description | Required |
| ------|------|----------| --- |
| code  | `Integer` | Decimal value representing a Company as defined in the [official list of assigned Company Identifiers of the Bluetooth Specification](https://www.bluetooth.com/specifications/assigned-numbers/company-identifiers/). | **Yes** |
| name | `String` | Name of the Company | **Yes** |

This structure is only used for one purpose, which is to mirror  the Official Bluetooth SIG Specification regarding Manufacturers (Companies).
As such, it is only used for that purpose. The full JSON Schema for the Company ID Data Structure can be found [here](https://github.com/NordicSemiconductor/bluetooth-uuid-database/blob/master/v1/company_schema.json).

### Service(s), Characteristic(s) and Descriptor(s)

The same Data Structure is used for all three. Its structure is as follows:

| Field | Type | Description | Required |
| ------|------|----------| --- |
| uuid | `String` | **Assigned Unique Number** identifying the specific Service, Characteristic or Descriptor. For example: "2902" is the unique number for the Client Characteristic Configuration Descriptor. | **Yes** |
| name | `String` | The name of the Service, Characteristic or Descriptor. | **Yes** |
| identifier | `String` | **Uniform Type Identifier**, a reverse-dot notation String used to group Service(s), Characteristic(s) and/or Descriptor(s) as part of a cohesive API. For example: The Blood Pressure Service uses the `org.bluetooth.service.blood_pressure` identifier, and its associated Blood Pressure Measurement Characteristic uses the `org.bluetooth.characteristic.blood_pressure_measurement` identifier. | **Yes** |
| specification | `String` | The owner of the described Service, Characteristic or Descriptor. For example: all GATT Services, Characteristics and Descriptors have a `gss` specification value. Accordingly, Nordic-owned Services, Characteristics and/or Descriptors are marked with a `nordic` specification value. | **Yes** |

We have based the data structure above on the official listing of GATT Specifications as much as possible. You can check  [this listing of GATT Characteristics for reference](https://www.bluetooth.com/specifications/gatt/characteristics/). And as before, you can check our JSON Schema [here](https://github.com/NordicSemiconductor/bluetooth-uuid-database/blob/master/v1/gatt_schema.json).

## Rules and Contributions

* Only Company IDs reflected in the [official Bluetooth SIG website](https://www.bluetooth.com/specifications/gatt/characteristics/) are allowed. Exceptions will be handled on a case-to-case basis, but only under very special circumstances.
* Service, Characteristics and Descriptor specifications **can and are meant to** be extended by the community.
** No duplicate UUIDs within each category, be it Services, Characteristics or Descriptors, are allowed. If a conflict exists, it'll be managed on a case-to-case basis.
* Nordic Semiconductor ASA is not responsible for UUIDs disclosed here that are not meant yet for public consumption. Please ensure your pull requests are safe and do not cause any harm to either you or a third-party.

The above being said, we have created this project with the purpose of attracting other members of the Bluetooth community that need to parse and identify UUIDs from a variety of vendors and devices. Whilst it seems easy for each one of us to do it on our own, conversely it means we all lose the ability to recognise the awesome features and products other members are releasing and launching.

To this effect, we encourage anyone and everyone to submit their own UUIDs according to their own specification. Just make a pull request, ensure it passes our Verification Tests, and if there are no conflicts with other makers, we will approve it and merge it.

Furthermore, please feel free to raise issues or pull requests with your own suggestions about how this project can or should improve. We at Nordic do not view **[insert-project-name-here]** as our property, but as a shared endeavour with the rest of the developer and Bluetooth communities. 

## License

This project is in active development. We will add a License when it is officially released.
