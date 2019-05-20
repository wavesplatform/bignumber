import { BigNumber as BigNum } from 'bignumber.js';
import { Config, IFormat } from './Config';

type TLong = string | number | BigNumber;

export class BigNumber {

    public readonly bn: BigNum;
    public static MAX_VALUE = new BigNumber('9223372036854775807');
    public static MIN_VALUE = new BigNumber('-9223372036854775808');
    public static MAX_UNSIGNED_VALUE = new BigNumber('18446744073709551615');
    public static config = new Config();

    constructor(long: TLong | BigNum) {
        this.bn = BigNumber.toBigNumberJs(long);
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

    public toBytes(): Uint8Array {

        if (!this.isInt()) {
            throw new Error('Cant create bytes from number with decimals!');
        }

        const isNegative = this.isNegative();
        const toAdd = isNegative ? '1' : '0';
        let baseStr = BigNumber._toLength(64, this.bn.plus(toAdd).abs().toString(2).replace('-', ''));

        const baseStrArr = baseStr.split('');
        const bytes = [];

        do {
            bytes.push(parseInt(baseStrArr.splice(0, 8).join(''), 2));
        } while (baseStrArr.length);

        return isNegative ? Uint8Array.from(bytes.map(byte => 255 - byte)) : Uint8Array.from(bytes);
    }

    public toFormat(decimals?: number, format?: IFormat): string {
        return this.bn.toFormat(decimals as number, format as IFormat);
    }

    public toFixed(decimals?: number): string {
        if (decimals == null) {
            return this.bn.toFixed();
        } else {
            return this.bn.toFixed(decimals);
        }
    }

    public toJSON(): string {
        return this.bn.toFixed();
    }

    public static fromBytes(bytes: Uint8Array | Array<number>): BigNumber {
        if (bytes.length !== 8) {
            throw new Error('Wrong bytes length! Need 8 bytes!');
        }

        const isNegative = bytes[0] > 127;
        const byteString = Array.from(bytes)
            .map(byte => isNegative ? 255 - byte : byte)
            .map(byte => BigNumber._toLength(8, byte.toString(2)))
            .join('');

        const result = new BigNumber(new BigNum(byteString, 2));

        if (isNegative) {
            return result.mul(-1).sub(1);
        } else {
            return result;
        }
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
