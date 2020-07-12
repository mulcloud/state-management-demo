import * as Biz from '@triones/biz-kernel';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { Counter } from '@app/Scenario5/Private/Counter';

@instantiate(ReactHost, { concurrent: true, LOG_ENABLED: '*' })
export class CounterList extends Biz.MarkupView {
    public onBegin() {
        this.initData();
    }

    @Biz.command({ runAt: 'server' })
    @Biz.published
    private initData() {
        if (this.scene.query(Counter).length > 0) {
            return;
        }
        for (let i = 0; i < 113; i++) {
            this.scene.add(Counter, { value: i});
        }
    }
}