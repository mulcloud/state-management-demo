import * as Biz from '@triones/biz-kernel';
import { SystemUser } from '@app/Scenario5/Private/SystemUser';

@Biz.source(new Biz.GlobalMemStore())
export class Counter extends Biz.ActiveRecord {
    public value: number;
    @Biz.lookup
    public countedBy: SystemUser;
}