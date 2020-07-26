import * as Biz from '@triones/biz-kernel';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { Disk } from '@app/Scenario6/Ui/Disk';

@instantiate(ReactHost, { concurrent: false, LOG_ENABLED: '*', disableSatellite: true })
export class Tower extends Biz.MarkupView {
    public disks: Disk[] = [];
    public onBegin() {
        this.disks = [
            this.create(Disk, { background: '#FF008C', height: '3em' }),
            this.create(Disk, { background: '#D309E1', height: '5em' }),
            this.create(Disk, { background: '#9C1AFF', height: '6em' }),
            this.create(Disk, { background: '#7700FF', height: '4em' }),
        ];
    }
}
