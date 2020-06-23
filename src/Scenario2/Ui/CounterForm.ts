import * as Biz from '@triones/biz-kernel';

export class CounterForm extends Biz.MarkupView {
    
    public checked: boolean = false;
    public value: number = 0;

    public onPlus() {
        this.value += 1;
    }

    public onMinus() {
        this.value -= 1;
    }
}