import {
    decimalDurationToDuration,
    durationToDecimalDuration,
    durationToISODuration,
    ISODurationToDuration,
    ISODurationToInputDuration,
    isValidDuration,
    maybeDurationToDecimalDuration,
} from '..';

describe('durationUtils', () => {
    describe('durationToISODuration', () => {
        it('converts {h: 0, m: 0} to ISODuration', () => {
            expect(durationToISODuration({ hours: 0, minutes: 0 })).toEqual('PT0H0M');
        });
        it('converts {h: undefined, m: 0} to ISODuration', () => {
            expect(durationToISODuration({ minutes: 0 })).toEqual('PT0H0M');
        });
        it('converts {h: 1, m: undefined} to ISODuration', () => {
            expect(durationToISODuration({ hours: 1 })).toEqual('PT1H0M');
        });
    });
    describe('ISODurationToDuration', () => {
        it('converts PT0H0M correctly', () => {
            const result = ISODurationToDuration('PT0H0M');
            expect(result?.hours).toEqual(0);
            expect(result?.minutes).toEqual(0);
        });
        it('converts PT10H50M correctly', () => {
            const result = ISODurationToDuration('PT10H50M');
            expect(result?.hours).toEqual(10);
            expect(result?.minutes).toEqual(50);
        });
        it('maintains overflow of minutes (more than 59 minutes)', () => {
            const result = ISODurationToDuration('PT10H65M');
            expect(result?.hours).toEqual(10);
            expect(result?.minutes).toEqual(65);
        });
    });
    describe('durationToDecimalDuration', () => {
        it('converts 1 hour correctly', () => {
            expect(durationToDecimalDuration({ hours: 1, minutes: 0 })).toEqual(1);
        });
        it('converts 1 hour and 30 minutes correctly', () => {
            expect(durationToDecimalDuration({ hours: 1, minutes: 30 })).toEqual(1.5);
        });
        it('converts 1 hour and 59 minutes correctly', () => {
            expect(durationToDecimalDuration({ hours: 1, minutes: 59 })).toEqual(1.98);
        });
    });
    describe('maybeDurationToDecimalDuration', () => {
        it('converts undefined hour and 2 minutes correctly', () => {
            expect(maybeDurationToDecimalDuration({ minutes: 30 })).toEqual(0.5);
        });
        it('converts one hour and undefined minutes correctly', () => {
            expect(maybeDurationToDecimalDuration({ hours: 1 })).toEqual(1);
        });
        it('converts 1 hour and 30 minutes correctly', () => {
            expect(maybeDurationToDecimalDuration({ hours: 1, minutes: 30 })).toEqual(1.5);
        });
        it('converts 1 hour and 59 minutes correctly', () => {
            expect(maybeDurationToDecimalDuration({ hours: 1, minutes: 59 })).toEqual(1.98);
        });
    });
    describe('decimalDurationToDuration', () => {
        it('converts 1 hour correctly', () => {
            const result = decimalDurationToDuration(1);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(0);
        });
        it('converts 1,5 hours correctly', () => {
            const result = decimalDurationToDuration(1.5);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(30);
        });
        it('converts 1,98 hours correctly', () => {
            const result = decimalDurationToDuration(1.98);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(59);
        });
    });
    describe('ISODurationToInputDuration', () => {
        it('returns undefined if duration is invalid', () => {
            expect(ISODurationToInputDuration('TABC')).toBeFalsy();
        });
        it('returns correct input duration when duration is valid', () => {
            expect(ISODurationToInputDuration('PT1H')?.hours).toEqual('1');
            expect(ISODurationToInputDuration('PT1M')?.minutes).toEqual('1');
        });
        it('returns 0 hours and 0 minutes when duration is valid, but hours and minutes not set', () => {
            expect(ISODurationToInputDuration('PT')?.hours).toEqual('0');
            expect(ISODurationToInputDuration('PT')?.minutes).toEqual('0');
        });
    });
    describe('isValidDuration', () => {
        it('returns true on valid duration', () => {
            expect(isValidDuration({ hours: 0, minutes: 0 })).toBeTruthy();
        });
        it('returns true on valid duration - with hours and minutes', () => {
            expect(isValidDuration({ hours: 15, minutes: 59 })).toBeTruthy();
        });
        it('returns false if duration has minutes above 59', () => {
            expect(isValidDuration({ hours: 15, minutes: 60 })).toBeFalsy();
        });
    });
});
