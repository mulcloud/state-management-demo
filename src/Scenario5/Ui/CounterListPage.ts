import * as Biz from '@triones/biz-kernel';

export class CounterListPage extends Biz.MarkupView {
    public readonly pageNumber: number;
    public readonly pageSize: number | string;
    public readonly children: (scope: { data: any }) => React.ReactNode;
}