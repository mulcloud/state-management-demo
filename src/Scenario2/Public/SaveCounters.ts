import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario2/Ui/CounterForm';

@Biz.published
export class SaveCounters extends Biz.Command {
    public run(counters: CounterForm[]) {
        for (const counter of counters) {
            console.log(`save ${counter.value}`);
        }
    }
}