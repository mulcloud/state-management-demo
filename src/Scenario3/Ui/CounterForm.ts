import * as Biz from '@triones/biz-kernel';
import { Counter3 } from '@app/Scenario3/Public/Counter3';

export class CounterForm extends Biz.MarkupView {
    public id: string;
    public readonly counter: Counter3;
    public checked: boolean;

    public onMinus() {
        console.log(this.counter);
        this.counter.minus();
    }

    public onPlus() {
        this.counter.plus();
    }
}