import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario3/Ui/CounterForm';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { Counter } from '@app/Scenario3/Private/Counter';
import { BatchDeleteCounters } from '@app/Scenario3/Private/BatchDeleteCounters';

@instantiate(ReactHost, { concurrent: true, LOG_ENABLED: '*' })
export class CounterList extends Biz.MarkupView {
    
    public get counters() {
        return this.scene.query(Counter);
    }

    public get hasSelected() {
        for (const counter of this.scene.query(CounterForm)) {
            if (counter.checked) {
                return true;
            }
        }
        return false;
    }

    public onAdd() {
        this.scene.add(Counter);
    }

    public onDelete() {
        const deleted = [];
        for (const form of this.scene.query(CounterForm)) {
            if (form.checked) {
                deleted.push(form.counter);
            }
        }
        this.call(BatchDeleteCounters, deleted);
    }
}