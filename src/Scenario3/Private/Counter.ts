import * as Biz from '@triones/biz-kernel';

@Biz.source(new Biz.GlobalMemStore())
@Biz.published
export class Counter extends Biz.ActiveRecord {
    public value: number = 0;

    @Biz.published
    public plus() {
        this.value += 1;
    }

    @Biz.published
    public minus() {
        this.value -= 1;
    }
}