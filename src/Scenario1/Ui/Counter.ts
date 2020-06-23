import * as Biz from '@triones/biz-kernel';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { SaveCounter } from '@app/Scenario1/Public/SaveCounter';

@instantiate(ReactHost, { area: 'Scenario1/Ui' })
export class Counter extends Biz.MarkupView {
    
    public value: number = 0;

    public onPlus() {
        this.value += 1;
    }

    public onMinus() {
        this.value -= 1;
    }

    public onSave() {
        this.call(SaveCounter, this);
    }
}