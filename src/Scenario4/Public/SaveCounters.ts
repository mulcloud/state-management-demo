import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario4/Ui/CounterForm';
import { Counter4 } from '@app/Scenario4/Public/Counter4';

export class SaveCounters extends Biz.Command {
    public run(forms: CounterForm[]) {
        for (const form of forms) {
            if (form.counter) {
                if (form.deleted) {
                    this.scene.delete(form.counter);
                } else {
                    form.counter.value = form.value;
                }
            } else {
                this.scene.add(Counter4, { value: form.value })
            }
        }
    }
}