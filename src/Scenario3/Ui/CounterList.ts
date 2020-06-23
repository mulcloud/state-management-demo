import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario3/Ui/CounterForm';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { Counter3 } from '@app/Scenario3/Public/Counter3';
import { BatchDeleteCounters } from '@app/Scenario3/Public/BatchDeleteCounters';
import { TrionesContext } from '@app/Io/Tri/TrionesContext';
import { ShowMeTheToken } from '@app/Scenario3/Public/ShowMeTheToken';

@instantiate(ReactHost, { area: 'Scenario3/Ui' })
export class CounterList extends Biz.MarkupView {
    
    public onBegin() {
        this.autoLogin();
    }

    private autoLogin() {
        const trionesContext = this.scene.get(TrionesContext);
        if (!trionesContext.token) {
            // never do this in production code
            trionesContext.login({ token: this.call(ShowMeTheToken) });
        }
    }

    public get counters() {
        return this.scene.query(Counter3);
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
        this.scene.add(Counter3);
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