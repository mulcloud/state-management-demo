import * as Biz from '@triones/biz-kernel';

@Biz.source(new Biz.GlobalMemStore())
export class Counter extends Biz.ActiveRecord {
    public value: number;
}