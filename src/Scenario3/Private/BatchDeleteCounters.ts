import * as Biz from '@triones/biz-kernel';
import { Counter } from '@app/Scenario3/Private/Counter';

@Biz.published
export class BatchDeleteCounters extends Biz.Command {
    
    public run(counters: Counter[]) {
        for(const counter of counters) {
            this.scene.delete(counter);
        }
    }
}