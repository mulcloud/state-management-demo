import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario4/Ui/CounterForm';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { Counter } from '@app/Scenario4/Private/Counter';

@instantiate(ReactHost, { concurrent: true })
export class CounterList extends Biz.MarkupView {

    public counters: CounterForm[] = [];

    public onBegin() {
        for (const counter of this.scene.query(Counter)) {
            this.counters.push(this.create(CounterForm, { counter }));
        }
    }

    public get hasSelected() {
        for (const counter of this.counters) {
            if (counter.checked) {
                return true;
            }
        }
        return false;
    }

    public get notDeletedCounters() {
        const notDeletedCounters = [];
        for (const counter of this.counters) {
            if (!counter.deleted) {
                notDeletedCounters.push(counter);
            }
        }
        return notDeletedCounters;
    }

    public onAdd() {
        this.counters.push(this.create(CounterForm));
    }

    public onDelete() {
        for (const counter of this.counters) {
            if (counter.checked) {
                counter.deleted = true;
            }
        }
    }

    @Biz.command({ runAt: 'server' })
    @Biz.published
    public onSave() {
        for (const form of this.counters) {
            form.save();
        }
    }
}