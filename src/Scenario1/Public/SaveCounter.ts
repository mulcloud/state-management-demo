import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario1/Ui/CounterForm';

@Biz.published
export class SaveCounter extends Biz.Command {
    public run(form: CounterForm) {
        console.log(`save ${form.value}`);
    }
}