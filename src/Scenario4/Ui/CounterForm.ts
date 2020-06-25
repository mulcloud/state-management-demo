import { Counter } from '@app/Scenario4/Private/Counter';
import * as Biz from '@triones/biz-kernel';

export class CounterForm extends Biz.MarkupView {
    public id: string;
    public readonly counter?: Counter;
    public value: number;
    public checked: boolean;
    public deleted: boolean;

    public onBegin() {
        this.value = this.counter?.value || 0;
    }

    public onPlus() {
        this.value += 1;
    }

    public onMinus() {
        this.value -= 1;
    }

    @Biz.command({ runAt: 'server' })
    public save() {
        if (this.counter) {
            if (this.deleted) {
                this.scene.delete(this.counter);
            } else {
                this.counter.value = this.value;
            }
        } else {
            this.scene.add(Counter, { value: this.value })
        }
    }
}