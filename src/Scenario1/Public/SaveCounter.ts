import * as Biz from '@triones/biz-kernel';
import { Counter } from '@app/Scenario1/Ui/Counter';

@Biz.published
export class SaveCounter extends Biz.Command {
    public run(counter: Counter) {
        console.log(`save ${counter.value}`);
    }
}