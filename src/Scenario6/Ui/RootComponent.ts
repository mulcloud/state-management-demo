import * as Biz from '@triones/biz-kernel';
import { ActionHistory } from '@app/Scenario6/Ui/React/ActionHistory';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';

@instantiate(ReactHost, { concurrent: true, disableSatellite: true })
export class RootComponent extends Biz.MarkupView {

    public actionHistory: ActionHistory;

    public onBegin() {
        this.actionHistory = this.create(ActionHistory);
    }
}