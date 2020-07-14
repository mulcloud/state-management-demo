import * as Biz from '@triones/biz-kernel';

@Biz.source(new Biz.GlobalMemStore())
export class SystemUser extends Biz.ActiveRecord {
    public firstName: string;
    public lastName: string;
}