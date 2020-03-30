# Bluetooth Numbers Database
![](https://github.com/NordicSemiconductor/bluetooth-uuid-database/workflows/Verify%20JSON%20Schemas/badge.svg)![](https://github.com/NordicSemiconductor/bluetooth-uuid-database/workflows/Check%20No%20Duplicates/badge.svg)

Welcome to the Bluetooth Numbers Database, an online repository containing metadata and definitions for a subset of [Bluetooth Assigned Numbers](https://www.bluetooth.com/specifications/assigned-numbers/). The goal of this project is to provide a shared open platform to access from a variety of platforms, such as web and mobile, with the intention of covering both GATT and industry specifications.

**Bluetooth Numbers Database** is maintained by Nordic Semiconductor ASA.

## Scope

The Bluetooth Specification makes heave use of a Universally Unique Identifier field, known **UUID** for short, to define multiple key elements in the spec, such as a device's manufacturer information. In the development of our own tools, it was discovered many of these definitions were duplicated and redefined in a variety of projects, hence the need to unify that body of work into a single, cohesive project representing a [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth).

In addition, it is common-case within the Bluetooth community, and covered by the specification, to extend the SIG-defined elements with proprietary definitions that do not overlap with the standard. This is perfectly allowed, but without a single place to check against whether your proposed UUID is used by others, we run the risk of having multiple uses for the same identifier.

Bluetooth Numbers Database aims to solve this problem, as a centralised database for querying Company IDs and GATT Attributes, and is open to anyone who would like to contribute.

## Specification

As part of the 'v1' release, two types of data structures are used, both of them defined as [JSON Schemas](http://json-schema.org/learn/getting-started-step-by-step.html). They are:

### Company IDs

| Field | Type | Description | Required |
| ------|------|----------| --- |
| code  | `Integer` | Decimal value representing a Company as defined in the [official list of assigned Company Identifiers of the Bluetooth Specification](https://www.bluetooth.com/specifications/assigned-numbers/company-identifiers/). | **Yes** |
| name | `String` | Name of the Company | **Yes** |

This structure is only used for one purpose, which is to mirror  the Official Bluetooth SIG Specification regarding Manufacturers (Companies). The full JSON Schema for the Company ID Data Structure can be found [here](https://github.com/NordicSemiconductor/bluetooth-uuid-database/blob/master/v1/company_schema.json).

### GATT Attributes

This same Data Structure is used for Services, Characteristics and Descriptors:

| Field | Type | Description | Required |
| ------|------|----------| --- |
| uuid | `String` | **Unique Number** identifying the specific GATT Attribute. Unique Numbers can either be 16-bit, like "2902" for Client Characteristic Configuration Descriptor, or 128-bit, like "EF680100-9B35-4933-9B10-52FFA9740042" for Thingy Configuration Service. | **Yes** |
| name | `String` | The GATT Attribute's name. | **Yes** |
| identifier | `String` | **Unique Uniform Type Identifier**, a reverse-dot notation String used to set the context of the attribute. For example, many attributes could use "Configuration" as a name, and to differentiate them, we can rely on their identifier, such as `com.company.service.example.configuration` versus `com.company.characteristic.example.configuration` to discern whether it's a Service or a Characteristic respectively. | **Yes** |
| source | `String` | The source of the attribute's definition. For example: all GATT Services, Characteristics and Descriptors have a `gss` specification value. Accordingly, Nordic-defined Services, Characteristics and/or Descriptors are marked with a `nordic` source value. | **Yes** |

We have based the data structure above on the official listing of GATT Specifications as much as possible. You can check  [this listing of GATT Characteristics for reference](https://www.bluetooth.com/specifications/gatt/characteristics/). And as above, you can check our JSON Schema [here](https://github.com/NordicSemiconductor/bluetooth-uuid-database/blob/master/v1/gatt_schema.json).

## Rules and Contributions

* The purpose of this project is to be an online shared directory of Bluetooth numbers, so all listings (Company IDs, Services, etc.) **can and are meant to** be extended by the community, as long as they're Bluetooth SIG-Compliant. (More on this below.)
* Only new 128-bit Company IDs can be freely contributed, since [all 16-bit identifiers are assigned by Bluetooth SIG itself](https://www.bluetooth.com/specifications/assigned-numbers/16-bit-uuids-for-members/). Exceptions will be handled on a case-to-case basis, but only under very special circumstances.
* Many 16-bit UUIDs assigned to Bluetooth SIG Members are currently missing, because the official listing does not provide enough information. We are hoping the onwers of said UUIDs could either provide us with the information we need (Description and Identifier), or submit a pull request themselves.
* No duplicate 128-bit UUIDs or identifiers within each GATT Attribute Category (Services, Characteristics and Descriptors) are allowed. If a conflict exists, it'll be managed on a case-to-case basis.
* Nordic Semiconductor ASA is not responsible for UUIDs disclosed here that are not meant yet for public consumption. Please ensure your pull requests are safe and do not cause any harm to either you or a third-party.

Furthermore, please feel free to raise issues or pull requests with your own suggestions about how this project can or should improve. **We at Nordic do not view Bluetooth Numbers Database as our property**, but as a shared endeavour with the rest of the developer and Bluetooth communities. 

## Motivation

The #1 question most Bluetooth developers will ask themselves when seeing this repo is a variation along the lines of `Don't need another library - I can write this in 5 minutes`. And whilst true, this does not cover the entire picture, because **it's everyone writing the same piece of code 5 minutes**, and then having to keep it up to date. That's the weight we're removing from you by using this community project. You don't need to worry about staying up to date regarding new Company IDs or GATT Attributes - just write code that pulls information from this repo every once in a while, and your apps will permanently be kept up to date. No need for reinventing the wheel.

## License

This project is in active development. We will add a License when it is officially released.
