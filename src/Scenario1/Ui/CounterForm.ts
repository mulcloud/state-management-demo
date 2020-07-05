import * as Biz from '@triones/biz-kernel';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { SaveCounter } from '@app/Scenario1/Private/SaveCounter';

@instantiate(ReactHost, { disableSatellite: true, concurrent: true })
export class CounterForm extends Biz.MarkupView {
    
    public name: string;
    public value: number = 0;

    public onPlus() {
        this.value += 1;
    }

    public onMinus() {
        this.value -= 1;
    }

    public get square() {
        return this.value * this.value;
    }

    public onSave() {
        this.call(SaveCounter, this);
    }
}