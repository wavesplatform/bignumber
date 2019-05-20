import { BigNumber as BigNum } from 'bignumber.js';
import { BigNumber } from './BigNumber';
import ROUND_MODE = BigNumber.ROUND_MODE;


export class Config {

    private static DEFAULT_FORMAT: IFormat = {
        prefix: '',
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: ' ',
        fractionGroupSize: 0,
        suffix: ''
    };

    private format: IFormat;

    constructor() {
        this.format = Config.DEFAULT_FORMAT;
        BigNum.config({ FORMAT: this.format });
    }


    public set(configPart: Partial<IConfig>): void {
        if ('FORMAT' in configPart) {
            this.format = { ...this.format, ...configPart.FORMAT };
            configPart.FORMAT = this.format;
        }
        BigNum.config(configPart);
    }
}

export interface IConfig {
    ROUNDING_MODE: ROUND_MODE;
    FORMAT: Partial<IFormat>;
}

export interface IFormat {
    prefix: string;
    decimalSeparator: string;
    groupSeparator: string;
    groupSize: number;
    secondaryGroupSize: number;
    fractionGroupSeparator: string;
    fractionGroupSize: number;
    suffix: string;
}
