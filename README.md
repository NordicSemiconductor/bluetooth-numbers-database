# Bluetooth Numbers Database
![](https://github.com/NordicSemiconductor/bluetooth-uuid-database/workflows/Verify%20JSON%20Schemas/badge.svg)![](https://github.com/NordicSemiconductor/bluetooth-uuid-database/workflows/Check%20No%20Duplicates/badge.svg)

Welcome to the Bluetooth Numbers Database, an online repository containing metadata and definitions for a subset of [Bluetooth Assigned Numbers](https://www.bluetooth.com/specifications/assigned-numbers/). The goal of this project is to provide a shared open platform to access from a variety of platforms, such as web and mobile, with the intention of covering both GATT and industry specifications.

**Bluetooth Numbers Database** is maintained by Nordic Semiconductor ASA.

## Background

During the development of various Bluetooth tools at Nordic, many of the assigned numbers from the Bluetooth specifications have been taken into use in different areas, which has lead to duplication of effort between the different tools. Hence it has been seen as beneficial to unify the work efforts by using a single, cohesive project representing a [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth).

In addition to looking up officially defined numbers, it is common to extend the SIG-defined numbers with proprietary definitions that do not overlap with the standard. Such extension is permitted, but unless there is a place to check against whether your proposed UUID is used by others, we run the risk of having multiple uses for the same identifier.

Bluetooth Numbers Database aims to solve this problem by providing a centralized database for querying UUIDs and Company identifiers. It is also open to anyone who would like to contribute.

## Database Schemas

For the 'v1' release of the database, two types of data structures are used: UUIDs and Conpany Identifiers. Both of them defined as [JSON Schemas](http://json-schema.org/learn/getting-started-step-by-step.html).

### UUID Definitions
UUID definitions specified in this project use the following data structure:

| Field | Type | Description | Required |
| ------|------|----------| --- |
| uuid | `String` | **Unique Number** identifying the specific GATT Attribute. The number can be 16 or 128 bits UUID, and must comply with the format as defined in the [Bluetooth Core specification](https://www.bluetooth.com/specifications/bluetooth-core-specification/). Examples: "2902" for Client Characteristic Configuration Descriptor, "EF680100-9B35-4933-9B10-52FFA9740042" for Thingy Configuration Service.  | **Yes** |
| name | `String` | The GATT Attribute's name. | **Yes** |
| identifier | `String` | **Uniform Type Identifier**, a reverse-dot notation String used to set the context of the attribute. Apply the following naming convention to the identifier: (reverse domain URL).(attribute type).(generic use case).(specific use case). Example: `com.company.characteristic.example.configuration` | **Yes** |
| source | `String` | The source of the UUID's definition. For example: all GATT Services, Characteristics and Descriptors have a `gss` specification value. Accordingly, Nordic-defined Services, Characteristics and/or Descriptors are marked with a `nordic` source value. | **Yes** |

We have based the data structure above on the official listing of GATT Specifications as much as possible. You can check  [this listing of GATT Characteristics for reference](https://www.bluetooth.com/specifications/gatt/characteristics/). And as above, you can check our JSON Schema [here](https://github.com/NordicSemiconductor/bluetooth-uuid-database/blob/master/v1/gatt_schema.json).

### Company Identifiers

| Field | Type | Description | Required |
| ------|------|----------| --- |
| code  | `Integer` | Decimal value representing a Company as defined in the [official list of assigned Company Identifiers of the Bluetooth Specification](https://www.bluetooth.com/specifications/assigned-numbers/company-identifiers/). | **Yes** |
| name | `String` | Name of the Company | **Yes** |

This structure is a mirror of the official Bluetooth Specification. It is added as a convenience so that each application does not need to download and transfrom the online listings at the Bluetooth official website. Note that registration of new Company Identifiers must go through official channels at Bluetooth SIG.
The full JSON Schema for the Company ID Data Structure can be found [here](https://github.com/NordicSemiconductor/bluetooth-uuid-database/blob/master/v1/company_schema.json).

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

Copyright (c) 2010 - 2020, Nordic Semiconductor ASA
All rights reserved.

Use in source and binary forms, redistribution in binary form only, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions in binary form, except as embedded into a Nordic Semiconductor ASA integrated circuit in a product or a software update for such product, must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

2. Neither the name of Nordic Semiconductor ASA nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

3. This software, with or without modification, must only be used with a Nordic Semiconductor ASA integrated circuit.

4. Any software provided in binary form under this license must not be reverse engineered, decompiled, modified and/or disassembled.

THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
