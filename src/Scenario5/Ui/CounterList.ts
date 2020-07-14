import * as Biz from '@triones/biz-kernel';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { Counter } from '@app/Scenario5/Private/Counter';
import { SystemUser } from '@app/Scenario5/Private/SystemUser';

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
        const users = [
            this.scene.add(SystemUser, { firstName: 'Sean', lastName: 'Holler'}),
            this.scene.add(SystemUser, { firstName: 'Shirley', lastName: 'Walker'}),
            this.scene.add(SystemUser, { firstName: 'Etta', lastName: 'Fernandez'}),
            this.scene.add(SystemUser, { firstName: 'Brian', lastName: 'Smith'}),
            this.scene.add(SystemUser, { firstName: 'Lori', lastName: 'Watson'}),
            this.scene.add(SystemUser, { firstName: 'George', lastName: 'Cook'}),
            this.scene.add(SystemUser, { firstName: 'Sheila', lastName: 'Jones'}),
        ]
        for (let i = 0; i < 113; i++) {
            const userIndex = Math.floor(Math.random() * 100) % users.length;
            const countedBy = users[userIndex];
            this.scene.add(Counter, { value: i, countedBy });
        }
    }
}