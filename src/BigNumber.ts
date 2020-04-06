import { default as BigNum } from 'bignumber.js';
import { Config, IFormat } from './Config';

type TLong = string | number | BigNumber;

export class BigNumber {

    public readonly bn: BigNum;
    public static MIN_VALUE = new BigNumber('-9223372036854775808');
    public static MAX_VALUE = new BigNumber('9223372036854775807');
    public static MIN_UNSIGNED_VALUE = new BigNumber('0');
    public static MAX_UNSIGNED_VALUE = new BigNumber('18446744073709551615');
    public static config = new Config();

    constructor(long: TLong | BigNum | BigNumber) {
        if (typeof long === 'object' && BigNumber.isBigNumber(long)) {
            this.bn = long.bn.plus(0);
        } else {
            this.bn = BigNumber.toBigNumberJs(long);
        }
    }

    public clone(): BigNumber {
        return new BigNumber(this);
    }

    public add(long: TLong): BigNumber {
        return new BigNumber(this.bn.plus(BigNumber.toBigNumberJs(long)));
    }

    public sub(long: TLong): BigNumber {
        return new BigNumber(this.bn.minus(BigNumber.toBigNumberJs(long)));
    }

    public mul(long: TLong): BigNumber {
        return new BigNumber(this.bn.times(BigNumber.toBigNumberJs(long)));
    }

    public div(long: TLong): BigNumber {
        return new BigNumber(this.bn.div(BigNumber.toBigNumberJs(long)));
    }

    public pow(exp: TLong): BigNumber {
        return new BigNumber(this.bn.pow(BigNumber.toBigNumberJs(exp)));
    }

    public abs(): BigNumber {
        return new BigNumber(this.bn.abs());
    }

    public mod(divider: TLong): BigNumber {
        return new BigNumber(this.bn.mod(BigNumber.toBigNumberJs(divider)));
    }

    public roundTo(decimals: number = 0, mode: BigNumber.ROUND_MODE = BigNumber.ROUND_MODE.ROUND_HALF_UP): BigNumber {
        return new BigNumber(this.bn.dp(decimals || 0, mode));
    }

    public eq(long: TLong): boolean {
        return this.bn.eq(BigNumber.toBigNumberJs(long));
    }

    public lt(long: TLong): boolean {
        return this.bn.lt(BigNumber.toBigNumberJs(long));
    }

    public gt(long: TLong): boolean {
        return this.bn.gt(BigNumber.toBigNumberJs(long));
    }

    public lte(long: TLong): boolean {
        return this.bn.lte(BigNumber.toBigNumberJs(long));
    }

    public gte(long: TLong): boolean {
        return this.bn.gte(BigNumber.toBigNumberJs(long));
    }

    public isNaN(): boolean {
        return this.bn.isNaN();
    }

    public isFinite(): boolean {
        return this.bn.isFinite();
    }

    public isZero(): boolean {
        return this.eq(0);
    }

    public isPositive(): boolean {
        return this.gt(0);
    }

    public isNegative(): boolean {
        return this.lt(0);
    }

    public isInt(): boolean {
        return this.bn.isInteger();
    }

    public getDecimalsCount(): number {
        return this.bn.dp();
    }

    public isEven(): boolean {
        return this.mod(2).eq(0);
    }

    public isOdd(): boolean {
        return !this.isEven();
    }

    public isInSignedRange(): boolean {
        return (this.gte(BigNumber.MIN_VALUE) && this.lte(BigNumber.MAX_VALUE))
    }

    public isInUnsignedRange(): boolean {
        return (this.gte(BigNumber.MIN_UNSIGNED_VALUE) && this.lte(BigNumber.MAX_UNSIGNED_VALUE))
    }

    public toFormat(decimals?: number, roundMode?: BigNumber.ROUND_MODE, format?: IFormat): string {
        return this.bn.toFormat(decimals as number, roundMode as any, format as IFormat);
    }

    public toFixed(decimals?: number, roundMode?: BigNumber.ROUND_MODE): string {
        if (decimals == null) {
            return this.bn.toFixed();
        } else {
            return this.bn.toFixed(decimals, roundMode);
        }
    }

    public toString(): string {
        return this.toFixed();
    }

    public toNumber(): number {
        return this.bn.toNumber();
    }

    public toJSON(): string {
        return this.bn.toFixed();
    }

    public valueOf(): string {
        return this.bn.valueOf();
    }

    public toBytes({
        isSigned = true,
        isLong = true
    } = {}): Uint8Array {
        if (!this.isInt()) {
            throw new Error('Cant create bytes from number with decimals!');
        }

        if (!isSigned && this.isNegative()) {
            throw new Error('Cant create bytes from negative number in signed mode!');
        }

        if (isLong && isSigned && !this.isInSignedRange()) {
            throw new Error('Number is not from signed numbers range');
        } 

        if (isLong && !isSigned && !this.isInUnsignedRange()) {
            throw new Error('Number is not from unsigned numbers range');
        }

        const isNegative = isSigned && this.isNegative();

        const toAdd = isNegative ? '1' : '0';
        const byteString = this.bn.plus(toAdd).toString(2).replace('-', '')

        const stringLength = isLong
            ? 64
            : Math.ceil(byteString.length / 8) * 8

        let baseStr = BigNumber._toLength(stringLength, byteString);

        const baseStrArr = baseStr.split('');
        const bytes = [];

        do {
            bytes.push(parseInt(baseStrArr.splice(0, 8).join(''), 2));
        } while (baseStrArr.length);


        return isNegative
            ? Uint8Array.from(bytes.map(byte => 255 - byte))
            : Uint8Array.from(bytes);
    }

    public static fromBytes(bytes: Uint8Array | Array<number>, {
        isSigned = true,
        isLong = true
    } = {}): BigNumber {
        if (isLong && bytes.length !== 8) {
            throw new Error('Wrong bytes length! Minimal length is 8 byte!');
        }  
          
        bytes = ((!isLong && bytes.length > 0) || isLong)
            ? bytes
            : [0];

        const isNegative = isSigned ? bytes[0] > 127 : false;

        const byteString = Array.from(bytes)
            .map(byte => isNegative ? 255 - byte : byte)
            .map(byte => BigNumber._toLength(8, byte.toString(2)))
            .join('');

        const result = new BigNumber(new BigNum(byteString, 2));

        return isNegative
            ? result.mul(-1).sub(1)
            : result;
    }

    public static max(...items: Array<TLong>): BigNumber {
        return BigNumber.toBigNumber(items)
            .reduce((max, item) => max.gte(item) ? max : item);
    }

    public static min(...items: Array<TLong>): BigNumber {
        return BigNumber.toBigNumber(items)
            .reduce((min, item) => min.lte(item) ? min : item);
    }

    public static sum(...items: Array<TLong>): BigNumber {
        return BigNumber.toBigNumber(items)
            .reduce((acc, item) => acc.add(item));
    }

    public static isBigNumber(some: any): some is BigNumber {
        return some && typeof some === 'object' && (some instanceof BigNumber || Object.entries(BigNumber.prototype)
                .filter(([key]) => key.charAt(0) !== '_')
                .every(([key, value]) => (key in some) && typeof value === typeof some[key])
        );
    }

    public static toBigNumber(items: TLong): BigNumber;
    public static toBigNumber(items: Array<TLong>): Array<BigNumber>;
    public static toBigNumber(items: TLong | Array<TLong>): BigNumber | Array<BigNumber> {
        if (Array.isArray(items)) {
            return items.map(item => new BigNumber(item));
        } else {
            return new BigNumber(items);
        }
    }

    protected static toBigNumberJs(long: TLong | BigNum): BigNum {
        if (BigNum.isBigNumber(long)) {
            return long;
        } else if (long instanceof BigNumber) {
            return long.bn;
        } else {
            return new BigNum(long);
        }
    }

    private static _toLength(length: number, bytes: string): string {
        return new Array(length)
            .fill('0', 0, length)
            .concat(bytes.split(''))
            .slice(-length)
            .join('');
    }
}

export namespace BigNumber {
    export const enum ROUND_MODE {
        ROUND_UP,
        ROUND_DOWN,
        ROUND_CEIL,
        ROUND_FLOOR,
        ROUND_HALF_UP,
        ROUND_HALF_DOWN,
        ROUND_HALF_EVEN,
        ROUND_HALF_CEIL,
        ROUND_HALF_FLOOR
    }
}
