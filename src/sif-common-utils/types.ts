/** YYYY-MM-DD/YYYY-MM-DD */
export type ISODateRange = string;

/** PT0H0M - kun timer og minutter */
export type ISODuration = string;

/** YYYY-MM-DD */
export type ISODate = string;

export interface DateRange {
    from: Date;
    to: Date;
}
export type MaybeDateRange = Partial<DateRange>;

export interface Duration {
    hours: number;
    minutes: number;
}
export interface InputDuration {
    hours: string;
    minutes: string;
}

export type DecimalTime = number;
