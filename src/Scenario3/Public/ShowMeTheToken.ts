import * as Biz from '@triones/biz-kernel';
import { GetCurrentTenantId } from '@app/TenantGateway/Public/GetCurrentTenantId';
import { CreateAdminToken } from '@app/TenantGateway/Public/CreateAdminToken';
import { LoadServiceCredential } from '@app/ServiceCredential/Public/LoadServiceCredential';

// never do this in production code
@Biz.published
export class ShowMeTheToken extends Biz.Command {
    public run() {
        const tenantId = this.call(GetCurrentTenantId);
        const adminToken = this.call(CreateAdminToken, this.call(LoadServiceCredential), tenantId);
        return adminToken;
    }
}