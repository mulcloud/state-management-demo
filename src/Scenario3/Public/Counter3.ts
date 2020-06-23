import * as Biz from '@triones/biz-kernel';

@Biz.authentic
export class Counter3 extends Biz.ActiveRecord {
    public value: number;
}