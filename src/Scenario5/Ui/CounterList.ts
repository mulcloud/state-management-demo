import * as Biz from '@triones/biz-kernel';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';

@instantiate(ReactHost, { concurrent: true, LOG_ENABLED: '*' })
export class CounterList extends Biz.MarkupView {
}