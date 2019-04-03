export interface fixedLengthArray<T extends any, L extends number> extends Array<T> {
    [c:number]:T;
    length:L;
}