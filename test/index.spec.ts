import { BigNumber } from '../src';
import Long from 'long';


describe('BigNumber', () => {
    it('clone', () => {
        const bn = new BigNumber(10);
        const clone = bn.clone();

        expect(bn === clone).toBeFalsy();
    });

    it('add, sub', () => {
        const bn = new BigNumber(Number.MAX_SAFE_INTEGER);
        expect(bn.add(100).sub(Number.MAX_SAFE_INTEGER).toFixed()).toBe('100');
    });

    it('mul, div', () => {
        const bn = new BigNumber(Number.MAX_SAFE_INTEGER);
        expect(bn.mul(2).div(2).toFixed()).toBe(String(Number.MAX_SAFE_INTEGER));
    });

    it('pow', () => {
        const bn = new BigNumber(2);
        expect(bn.pow(10).toFixed()).toBe('1024');
    });

    it('sqrt', () => {
        const bn = new BigNumber(16);
        expect(bn.sqrt().toFixed()).toBe('4');
    });

    it('abs', () => {
        const bn = new BigNumber('-100');
        expect(bn.abs().toFixed()).toBe('100');
    });

    it('mod', () => {
        const bn = new BigNumber(5);
        expect(bn.mod(2).toFixed()).toBe('1');
    });

    describe('roundTo', () => {

        it('Without params', () => {
            expect(new BigNumber(2.5).roundTo().toFixed()).toBe('3');
            expect(new BigNumber(2.4).roundTo().toFixed()).toBe('2');
        });

        it('With decimals', () => {
            expect(new BigNumber(2.56789).roundTo(3).toFixed()).toBe('2.568');
            expect(new BigNumber(2.54321).roundTo(2).toFixed()).toBe('2.54');
        });

        describe('Check round mode', () => {

            it('ROUND_UP', () => {
                expect(new BigNumber(-2.01).roundTo(0, BigNumber.ROUND_MODE.ROUND_UP).toFixed()).toBe('-3');
                expect(new BigNumber(2.01).roundTo(0, BigNumber.ROUND_MODE.ROUND_UP).toFixed()).toBe('3');
            });

            it('ROUND_DOWN', () => {
                expect(new BigNumber(-2.9).roundTo(0, BigNumber.ROUND_MODE.ROUND_DOWN).toFixed()).toBe('-2');
                expect(new BigNumber(2.9).roundTo(0, BigNumber.ROUND_MODE.ROUND_DOWN).toFixed()).toBe('2');
            });

            it('ROUND_CEIL', () => {
                expect(new BigNumber(-2.01).roundTo(0, BigNumber.ROUND_MODE.ROUND_CEIL).toFixed()).toBe('-2');
                expect(new BigNumber(2.01).roundTo(0, BigNumber.ROUND_MODE.ROUND_CEIL).toFixed()).toBe('3');
            });

            it('ROUND_FLOOR', () => {
                expect(new BigNumber(-2.9).roundTo(0, BigNumber.ROUND_MODE.ROUND_FLOOR).toFixed()).toBe('-3');
                expect(new BigNumber(2.9).roundTo(0, BigNumber.ROUND_MODE.ROUND_FLOOR).toFixed()).toBe('2');
            });

            it('ROUND_HALF_UP', () => {
                expect(new BigNumber(-2.4).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_UP).toFixed()).toBe('-2');
                expect(new BigNumber(-2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_UP).toFixed()).toBe('-3');
                expect(new BigNumber(2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_UP).toFixed()).toBe('3');
                expect(new BigNumber(2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_UP).toFixed()).toBe('3');
            });

            it('ROUND_HALF_DOWN', () => {
                expect(new BigNumber(-2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_DOWN).toFixed()).toBe('-2');
                expect(new BigNumber(-2.6).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_DOWN).toFixed()).toBe('-3');
                expect(new BigNumber(2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_DOWN).toFixed()).toBe('2');
                expect(new BigNumber(2.6).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_DOWN).toFixed()).toBe('3');
            });

            it('ROUND_HALF_EVEN', () => {
                expect(new BigNumber(-2.4).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_EVEN).toFixed()).toBe('-2');
                expect(new BigNumber(-2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_EVEN).toFixed()).toBe('-2');
                expect(new BigNumber(-2.6).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_EVEN).toFixed()).toBe('-3');
                expect(new BigNumber(2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_EVEN).toFixed()).toBe('2');
                expect(new BigNumber(2.6).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_EVEN).toFixed()).toBe('3');
                expect(new BigNumber(2.4).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_EVEN).toFixed()).toBe('2');
            });

            it('ROUND_HALF_CEIL', () => {
                expect(new BigNumber(-2.4).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_CEIL).toFixed()).toBe('-2');
                expect(new BigNumber(-2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_CEIL).toFixed()).toBe('-2');
                expect(new BigNumber(-2.6).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_CEIL).toFixed()).toBe('-3');
                expect(new BigNumber(2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_CEIL).toFixed()).toBe('3');
                expect(new BigNumber(2.6).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_CEIL).toFixed()).toBe('3');
                expect(new BigNumber(2.4).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_CEIL).toFixed()).toBe('2');
            });

            it('ROUND_HALF_FLOOR', () => {
                expect(new BigNumber(-2.4).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_FLOOR).toFixed()).toBe('-2');
                expect(new BigNumber(-2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_FLOOR).toFixed()).toBe('-3');
                expect(new BigNumber(-2.6).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_FLOOR).toFixed()).toBe('-3');
                expect(new BigNumber(2.5).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_FLOOR).toFixed()).toBe('2');
                expect(new BigNumber(2.6).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_FLOOR).toFixed()).toBe('3');
                expect(new BigNumber(2.4).roundTo(0, BigNumber.ROUND_MODE.ROUND_HALF_FLOOR).toFixed()).toBe('2');
            });
        });
    });

    it('eq', () => {
        expect(new BigNumber(1).eq('1')).toBeTruthy();
    });

    it('lt', () => {
        expect(new BigNumber(1).lt('2')).toBeTruthy();
        expect(new BigNumber(1).lt('1')).toBeFalsy();
    });

    it('gt', () => {
        expect(new BigNumber(1).gt('0')).toBeTruthy();
        expect(new BigNumber(0).gt('0')).toBeFalsy();
    });

    it('lte', () => {
        expect(new BigNumber(1).lte('2')).toBeTruthy();
        expect(new BigNumber(1).lte('1')).toBeTruthy();
    });

    it('gte', () => {
        expect(new BigNumber(1).gte('0')).toBeTruthy();
        expect(new BigNumber(0).gte('0')).toBeTruthy();
    });

    it('isNaN', () => {
        expect(new BigNumber(NaN).isNaN()).toBeTruthy();
    });

    it('isFinite', () => {
        expect(new BigNumber(1).isFinite()).toBeTruthy();
        expect(new BigNumber(Infinity).isFinite()).toBeFalsy();
    });

    it('isZero', () => {
        expect(new BigNumber(0).isZero()).toBeTruthy();
    });

    it('isPositive', () => {
        expect(new BigNumber(1).isPositive()).toBeTruthy();
    });

    it('isNegative', () => {
        expect(new BigNumber(-1).isNegative()).toBeTruthy();
    });

    it('isInt', () => {
        expect(new BigNumber(1).isInt()).toBeTruthy();
        expect(new BigNumber(1.2).isInt()).toBeFalsy();
    });

    it('getDecimalsCount', () => {
        expect(new BigNumber(1).getDecimalsCount()).toBe(0);
        expect(new BigNumber(1.2).getDecimalsCount()).toBe(1);
        expect(new BigNumber(1.2231).getDecimalsCount()).toBe(4);
    });

    it('toBytes from not int', () => {
        expect(() => new BigNumber(1.2).toBytes()).toThrowError('Cant create bytes from number with decimals!');
    });

    it('From bytes with wrong bytes length', () => {
        expect(() => BigNumber.fromBytes(new Uint8Array([1, 2]))).toThrowError('Wrong bytes length! Minimal length is 8 byte!');
    });

    it('toBytes from ', () => {
        expect(() => BigNumber.fromBytes(new Uint8Array([1, 2]))).toThrowError('Wrong bytes length! Minimal length is 8 byte!');
    });
    
    describe('toBytes', () => {
        describe('Check isSigned', () => {
            it('isSigned = true and signed range values', () => {
                const values = [
                    BigNumber.MIN_VALUE.toString(),
                    '-365',
                    '0',
                    '1',
                    '365',
                    BigNumber.MAX_VALUE.toString()
                ]

                values.forEach(value => {
                    const bignumberBytes = Array.from(new BigNumber(value).toBytes())
                    const longBytes = Long.fromValue(value).toBytes() 

                    expect(bignumberBytes).toEqual(longBytes);
                });
            });

            it('should throw error with isSigned = true and numbers from wrong range', () => {
                const values = [
                    BigNumber.MIN_VALUE.sub(1).toString(),
                    BigNumber.MAX_VALUE.add(1).toString()
                ]

                values.forEach(value => {
                    expect(() => new BigNumber(value).toBytes())
                    .toThrowError('Number is not from signed numbers range');
                });
            });

            it('isSigned = false and unsigned range values', () => {
                const values = [
                    '0',
                    '1',
                    '365',
                    BigNumber.MAX_UNSIGNED_VALUE.toString(),
                ]

                values.forEach(value => {
                    const bignumberBytes = Array.from(new BigNumber(value).toBytes({ isSigned: false }))
                    const longBytes = Long.fromValue(value).toBytes() 

                    expect(bignumberBytes).toEqual(longBytes);
                });
            });

            it('should throw error with isSigned = false and numbers from wrong range', () => {
                const values = [
                    BigNumber.MAX_UNSIGNED_VALUE.add(1).toString()
                ]

                values.forEach(value => {
                    expect(() => new BigNumber(value).toBytes({ isSigned: false }))
                        .toThrowError('Number is not from unsigned numbers range')
                });
            });

            it('should throw error with isSigned = false and negative number', () => {
                const value = BigNumber.MIN_UNSIGNED_VALUE.sub(1).toString();

                expect(() => new BigNumber(value).toBytes({ isSigned: false }))
                    .toThrowError('Cant create bytes from negative number in signed mode');
            });
        });

        describe('Check isLong', () => {
            it('isLong = false and signed range values', () => {
                const values = [
                    BigNumber.MIN_VALUE.toString(),
                    '-365',
                    '0',
                    '1',
                    '365',
                    BigNumber.MAX_VALUE.toString()
                ]

                values.forEach(value => {
                    const bignumberBytes = Array.from(new BigNumber(value).toBytes({ isLong: false }))
                    const longBytes = Long.fromValue(value).toBytes().slice(-bignumberBytes.length)

                    expect(longBytes).toEqual(bignumberBytes);
                });
            });
        });
    });

    describe('fromBytes', () => {
        describe('Check isSigned', () => {
            it('isSigned = true and signed range values', () => {
                const values = [
                    BigNumber.MIN_VALUE.toString(),
                    '-365',
                    '0',
                    '1',
                    '365',
                    BigNumber.MAX_VALUE.toString()
                ]

                values.forEach(value => {
                    const bytes = Long.fromValue(value).toBytes();

                    expect(BigNumber.fromBytes(bytes).toFixed()).toEqual(value);
                });
            });

            it('isSigned = false and unsigned range values', () => {
                const values = [
                    '0',
                    '1',
                    '365',
                    BigNumber.MAX_UNSIGNED_VALUE.toString(),
                ]

                values.forEach(value => {
                    const bytes = Long.fromValue(value).toBytes();

                    expect(BigNumber.fromBytes(bytes, { isSigned: false }).toFixed()).toEqual(value);
                });
            });
        });

        describe('Check isLong', () => {
            it('isLong = false and signed range values', () => {
                const values = [
                    BigNumber.MIN_VALUE.toString(),
                    '-365',
                    '0',
                    '1',
                    '365',
                    BigNumber.MAX_VALUE.toString()
                ]

                values.forEach(value => {
                    const bytes = Long.fromValue(value).toBytes();

                    expect(BigNumber.fromBytes(bytes, { isLong: false }).toFixed()).toEqual(value);
                });
            });
        });
    });

    it('toBytes, fromBytes', () => {
        const checkValue = [];
        let value = Long.MAX_VALUE;
        const step = Long.MAX_VALUE.div('10000');
        const checkMinValue = Long.MIN_VALUE.add(step);

        do {
            checkValue.push(value.toString());
            value = value.sub(step);
        } while (checkMinValue.lte(value));

        checkValue.push(Long.MIN_VALUE.toString());

        checkValue.forEach(value => {
            const bytes = new BigNumber(value).toBytes();
            expect(Long.fromValue(value).toBytes()).toEqual(Array.from(bytes));

            try {
                expect(BigNumber.fromBytes(bytes).toFixed()).toEqual(value);
            } catch (e) {
                throw new Error(`Bytes: ${bytes}, target: ${value}, result ${BigNumber.fromBytes(bytes).toFixed()}`);
            }
        });
    });

    it('config, toFormat', () => {
        expect(new BigNumber('1000000.12312').toFormat()).toBe('1,000,000.12312');
        BigNumber.config.set({
            FORMAT: {
                groupSeparator: ' '
            }
        });
        expect(new BigNumber('1000000.12312').toFormat()).toBe('1 000 000.12312');
    });

    it('toFixed', () => {
        expect(new BigNumber(234.5678).toFixed()).toBe('234.5678');
        expect(new BigNumber(234.5678).toFixed(1)).toBe('234.6');
        expect(new BigNumber(234.5678).toFixed(2)).toBe('234.57');
        expect(new BigNumber(234.5678).toFixed(3)).toBe('234.568');
        expect(new BigNumber(234.5678).toFixed(4)).toBe('234.5678');
        expect(new BigNumber(234.5678).toFixed(5)).toBe('234.56780');
    });

    it('toJSON', () => {
        expect(BigNumber.MAX_VALUE.toJSON())
            .toBe(BigNumber.MAX_VALUE.toFixed());
    });

    it('max', () => {
        expect(BigNumber.max(1, 3, 2).toFixed()).toBe('3');
    });

    it('min', () => {
        expect(BigNumber.min(2, 1, 3).toFixed()).toBe('1');
    });

    it('sum', () => {
        expect(BigNumber.sum(1, 2, 3).toFixed()).toBe('6');
    });

    it('toBigNumber', () => {
        expect(BigNumber.toBigNumber(1).toFixed()).toBe('1');
        expect(BigNumber.toBigNumber('1').toFixed()).toBe('1');
        expect(BigNumber.toBigNumber(['1', 2]).map(i => i.toFixed())).toEqual(['1', '2']);
    });

    it('toString(16)', () => {
        expect(BigNumber.toBigNumber(255).toString()).toBe('255');
        expect(BigNumber.toBigNumber(255).toString(16)).toBe('ff');
    });
});