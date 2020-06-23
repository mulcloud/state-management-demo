import * as Biz from '@triones/biz-kernel';
import { Counter3 } from '@app/Scenario3/Public/Counter3';

@Biz.published
export class BatchDeleteCounters extends Biz.Command {
    
    public run(counters: Counter3[]) {
        for(const counter of counters) {
            this.scene.delete(counter);
        }
    }
}