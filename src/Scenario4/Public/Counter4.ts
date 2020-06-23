import * as Biz from '@triones/biz-kernel';

@Biz.authentic
export class Counter4 extends Biz.ActiveRecord {
    public value: number;
}