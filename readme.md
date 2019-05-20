@waves/bignumber
=======

A Long class for representing a 64 bit two's-complement value.

Usage
-----

The class is compatible with CommonJS and AMD loaders and is exposed globally as `BigNumber` if neither is available.

```javascript
var BigNumber = require("@waves/bignumber");

var longVal = new BigNumber('121231321321321313213');

console.log(longVal.toString());
...
```

API
---

### Constructor

* new **BigNumber**(long: `number | string | BigNumber`)<br />

### Constants

* BigNumber.**MAX_VALUE**: `BigNumber`<br />
  Maximum signed value.

* BigNumber.**MIN_VALUE**: `BigNumber`<br />
  Minimum signed value.

* BigNumber.**MAX_UNSIGNED_VALUE**: `BigNumber`<br />
  Maximum unsigned value.

### Methods

* BigNumber#**add**(addend: `Long | number | string`): `BigNumber`<br />
  Returns the sum of this and the specified Long.

* BigNumber#**div**(divisor: `Long | number | string`): `BigNumber`<br />
  Returns this Long divided by the specified.

* BigNumber#**eq**(other: `Long | number | string`): `boolean`<br />
  Tests if this Long's value equals the specified's.

* BigNumber#**gt**(other: `Long | number | string`): `boolean`<br />
  Tests if this Long's value is greater than the specified's.

* BigNumber#**gte**/**ge**(other: `Long | number | string`): `boolean`<br />
  Tests if this Long's value is greater than or equal the specified's.

* BigNumber#**isEven**(): `boolean`<br />
  Tests if this Long's value is even.

* BigNumber#**isNegative**(): `boolean`<br />
  Tests if this Long's value is negative.

* BigNumber#**isOdd**(): `boolean`<br />
  Tests if this Long's value is odd.

* BigNumber#**isPositive**(): `boolean`<br />
  Tests if this Long's value is positive.

* BigNumber#**isZero**(): `boolean`<br />
  Tests if this Long's value equals zero.

* BigNumber#**lt**(other: `Long | number | string`): `boolean`<br />
  Tests if this Long's value is less than the specified's.

* BigNumber#**lte**/**le**(other: `Long | number | string`): `boolean`<br />
  Tests if this Long's value is less than or equal the specified's.

* BigNumber#**mod**(divisor: `Long | number | string`): `BigNumber`<br />
  Returns this Long modulo the specified.

* BigNumber#**mul**(multiplier: `Long | number | string`): `BigNumber`<br />
  Returns the product of this and the specified Long.

* BigNumber#**toBytes**(le?: `boolean`): `number[]`<br />
  Converts this Long to its byte representation.

Building
--------

To build an UMD bundle to `dist/index.js`, run:

```bash
$> npm install @waves/bignumber
```

Running the [tests](./tests):

```bash
$> npm test
```