import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario4/Ui/CounterForm';
import { instantiate } from '@triones/tri-package';
import { SaveCounters } from '@app/Scenario4/Public/SaveCounters';
import { ReactHost } from '@app/React/Host/ReactHost';
import { Counter4 } from '@app/Scenario4/Public/Counter4';
import { TrionesContext } from '@app/Io/Tri/TrionesContext';
import { ShowMeTheToken } from '@app/Scenario4/Public/ShowMeTheToken';

@instantiate(ReactHost, { area: 'Scenario4/Ui' })
export class CounterList extends Biz.MarkupView {
    public counters: CounterForm[] = [];

    public onBegin() {
        this.autoLogin();
        for (const counter of this.scene.query(Counter4)) {
            this.counters.push(this.scene.add(CounterForm, { counter }));
        }
    }

    private autoLogin() {
        const trionesContext = this.scene.get(TrionesContext);
        if (!trionesContext.token) {
            // never do this in production code
            trionesContext.login({ token: this.call(ShowMeTheToken) });
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
        this.counters.push(this.scene.add(CounterForm));
    }

    public onDelete() {
        for (const counter of this.counters) {
            if (counter.checked) {
                counter.deleted = true;
            }
        }
    }

    public onSave() {
        this.call(SaveCounters, this.counters);
    }
}