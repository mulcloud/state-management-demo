import * as Biz from '@triones/biz-kernel';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { Disk } from '@app/Scenario6/Ui/Disk';

@instantiate(ReactHost, { concurrent: true, LOG_ENABLED: '*', disableSatellite: true })
export class Tower extends Biz.MarkupView {
    public disks: Disk[] = [];
    public onBegin() {
        this.disks = [
            this.create(Disk, { background: '#FF008C', children: 'A' }),
            this.create(Disk, { background: '#D309E1', children: 'B' }),
            this.create(Disk, { background: '#9C1AFF', children: 'C' }),
            this.create(Disk, { background: '#7700FF', children: 'D' }),
        ]
    }
}