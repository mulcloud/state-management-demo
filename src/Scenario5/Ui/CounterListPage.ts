import * as Biz from '@triones/biz-kernel';
import * as React from 'react';
import { Counter } from '@app/Scenario5/Private/Counter';

export class CounterListPage extends Biz.MarkupView {
    public readonly pageNumber: number;
    public readonly pageSize: number;
    @Biz.prop({ transient: true })
    public readonly sentinel: React.ReactNode;
    public counters: Counter[];

    public onBegin() {
        this.counters = this.queryCounters();
    }

    @Biz.command({ runAt: 'server' })
    @Biz.published
    private queryCounters() {
        this.scene.sleep(1500);
        const offset = this.pageNumber * this.pageSize;
        const subset = Biz.subset(Counter);
        return this.scene.query(subset, {
            orderBys: [subset.orderBy('id')],
            offset: offset,
            limit: this.pageSize,
        });
    }

    public get hasMore() {
        return this.counters.length === this.pageSize;
    }

    public get reachedEnd() {
        return !this.hasMore;
    }
}
