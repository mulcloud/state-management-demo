import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario2/Ui/CounterForm';
import * as Constraint from '@triones/biz-constraint';

@Biz.published
export class SaveCounters extends Biz.Command {
    public run(counters: CounterForm[]) {
        for (const counter of counters) {
            Constraint.clearValidationResults(counter);
            if (counter.value > 5) {
                Constraint.reportViolation(counter, 'value', { message: 'too big'});
            } else {
                console.log(`save ${counter.value}`);
            }
        }
    }
}