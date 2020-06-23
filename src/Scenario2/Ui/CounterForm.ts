import * as Biz from '@triones/biz-kernel';

export class CounterForm extends Biz.MarkupView {
    public id: string;
    public checked: boolean;
    public value: number = 0;

    public onPlus() {
        this.value += 1;
    }

    public onMinus() {
        this.value -= 1;
    }
}