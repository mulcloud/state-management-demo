import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario2/Ui/CounterForm';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import * as Constraint from '@triones/biz-constraint';
import { Counter } from '@app/Scenario2/Private/Counter';

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
        this.counters = filtered;
    }

    @Biz.command({ runAt: 'server' })
    @Biz.published
    public onSave() {
        for (const form of this.counters) {
            Constraint.clearValidationResults(form);
            if (form.value > 5) {
                Constraint.reportViolation(form, 'value', { message: 'too big'});
            } else {
                console.log(`save ${form.value}`);
                this.scene.add(Counter, { value: form.value });
            }
        }
    }

    public onList() {
        for (const counter of this.scene.query(Counter)) {
            console.log(counter.value);
        }
    }
}