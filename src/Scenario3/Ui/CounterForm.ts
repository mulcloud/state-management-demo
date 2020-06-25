import * as Biz from '@triones/biz-kernel';
import { Counter } from '@app/Scenario3/Private/Counter';

export class CounterForm extends Biz.MarkupView {
    public id: string;
    public readonly counter: Counter;
    public checked: boolean;

    public onMinus() {
        this.counter.minus();
    }

    public onPlus() {
        this.counter.plus();
    }
}