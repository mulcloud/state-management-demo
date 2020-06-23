import * as Biz from '@triones/biz-kernel';
import { Counter4 } from '@app/Scenario4/Public/Counter4';

export class CounterForm extends Biz.MarkupView {
    public id: string;
    public readonly counter?: Counter4;
    public value: number;
    public checked: boolean;
    public deleted: boolean;

    public onBegin() {
        this.value = this.counter?.value || 0;
    }
}