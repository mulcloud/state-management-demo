import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario2/Ui/CounterForm';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { SaveCounters } from '@app/Scenario2/Public/SaveCounters';

@instantiate(ReactHost, { area: 'Scenario2/Ui' })
export class CounterList extends Biz.MarkupView {
    public counters: CounterForm[] = [];

    public get hasSelected() {
        for (const counter of this.counters) {
            if (counter.checked) {
                return true;
            }
        }
        return false;
    }

    public onAdd() {
        this.counters.push(this.scene.add(CounterForm));
    }

    public onDelete() {
        const filtered = [];
        for (const counter of this.counters) {
            if (!counter.checked) {
                filtered.push(counter);
            } else {
                console.log('delete!', counter);
            }
        }
        console.log(filtered);
        this.counters = filtered;
    }

    public onSave() {
        this.call(SaveCounters, this.counters);
    }
}