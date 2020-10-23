### @waves/bignumber

A JavaScript library for arbitrary-precision decimal and non-decimal arithmetic.

<br />

## Load

The library is the single JavaScript file *bignumber.umd.js* (or minified, *bignumber.umd.min.js*).

Browser:

```html
<script src='path/to/bignumber.js'></script>
```

[Node.js](http://nodejs.org):

```bash
$ npm install @waves/bignumber
```

```javascript
const { BigNumber } = require('@waves/bignumber');
```

ES6 module:

```javascript
import { BigNumber } from "@waves/bignumber"
```

AMD loader libraries such as [requireJS](http://requirejs.org/):

```javascript
require(['@waves/bignumber'], function(BigNumber) {
    // Use BigNumber here in local scope. No global BigNumber.
});
```

## Use

```javascript
let x = new BigNumber(123.4567);
let y = BigNumber('123456.7e-3');
let z = new BigNumber(x);
x.eq(y) && y.eq(z) && x.eq(z);      // true
```

To get the string value of a BigNumber use [`toString()`](http://mikemcl.github.io/bignumber.js/#toS) or [`toFixed()`](http://mikemcl.github.io/bignumber.js/#toFix). Using `toFixed()` prevents exponential notation being returned, no matter how large or small the value.

```javascript
let x = new BigNumber('1111222233334444555566');
x.toString();                       // "1111222233334444555566"
x.toFixed();                        // "1111222233334444555566"
```

##### Clone
Клонирует объект 

```javascript
const some = new BigNumber(1);
const clone = some.clone();
```

##### Add
Выполняет сложение
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.add('50'); // with method toFixed '150'
```

##### Sub
Вычитание
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.sub('50'); // with method toFixed '50'
```

##### Mul
Умножение
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.mul(2); // with method toFixed '200'
```

##### Div
Деление
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.div(2); //  with method toFixed '50'
```

##### Pow
Возведение в степень
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.pow(2); // with method toFixed '10000'
```

##### Sqrt
Квадратный корень
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.sqrt(); // with method toFixed '10'
```


##### Abs
Модуль
```javascript
const bigNum = new BigNumber('-100');
const result = bigNum.abs(); // with method toFixed 100
```

##### Mod 
Остаток от деления

```javascript
const bigNum = new BigNumber('100');
const result = bigNum.mod(10); // with method toFixed '0' 
```

##### RoundTo
Округляет. Принимает количество знаков после запятой после округлени и режим округления
см тут: http://mikemcl.github.io/bignumber.js/#constructor-properties
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.roundTo(); //
```

##### Eq
Равенство
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.eq(100); // true
```

##### Lt
Меньше
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.lt(); //
```

##### Gt
Больше
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.gt(); //
```

##### Lte
Меньше или равно
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.lte(); //
```

##### Gte
Больше или равно
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.gte(); //
```

##### IsNaN
Проверяет на NaN
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isNaN(); // false
```

##### IsFinite
Проверяет на Infinity (положительный и отрицательный)
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isFinite(); //
```

##### IsZero
Проверяет на равенство нулю
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isZero(); // false
```

##### IsPositive
Больше нуля
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isPositive(); // true
```

##### IsNegative
Меньше нуля
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isNegative(); // false
```

##### IsInt
Проверяет целое ли число
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isInt(); //
```

##### GetDecimalsCount
Получаем количество занков после запятой у числа
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.getDecimalsCount(); // 0
```

##### IsEven
Четное
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isEven(); // true
```

##### IsOdd
Не чётное
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.isOdd(); // false
```

##### ToBytes
Переводим число в байты со знаком (8 байт). Работает только с целыми числами. 
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.toBytes();
```

##### ToFormat
Выводим число в строковом эквиваленте c с учётом настроек форматирования. 
Опционально принимает количество знаков округления, режим округления (как в roundTo) и настройки формата вывода.
```javascript
const bigNum = new BigNumber('1000000.12312');
bigNum.toFormat(); // 1,000,000.12312 
bigNum.toFormat(2); // 1,000,000.12 
bigNum.toFormat(2); // 1,000,000.12 
bigNum.toFormat(2, 0); // 1,000,000.13 
bigNum.toFormat(2, 0, { groupSeparator: ' ' }); // 1 000 000.13 
```

##### ToFixed
Выводим число в строковом эквиваленте. Опционально принимает количество знаков округления и режим округления (как в roundTo)
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.toFixed(); //
```

##### ToNumber
Приводит к числу
```javascript
const bigNum = new BigNumber('100');
const result = bigNum.toNumber(); //
```

### Static Methods

##### fromBytes
Выводит знаковое число из байт. Работает только с 8 байтами.
```javascript
const some = BigNumber.fromBytes(Uint8Array.from([1,2,3,4,5,6,7,8]));
```

##### max
Принимает любое количество аргументов, выбирает наибольшее число из аргументов
```javascript
BigNumber.max(1, '2', new BigNumber(4)); // with method toFixed '4'
```
##### min
Принимает любое количество аргументов, выбирает наименьшее число из аргументов
```javascript
BigNumber.min(1, '2', new BigNumber(4)); // with method toFixed '1'
```
##### sum
Принимает любое количество аргументов, складывает числа
```javascript
BigNumber.min(1, '2', new BigNumber(4)); //with method toFixed '7'
```
