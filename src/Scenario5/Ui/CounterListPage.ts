import * as Biz from '@triones/biz-kernel';
import * as React from 'react';
import { Counter } from '@app/Scenario5/Private/Counter';

export class CounterListPage extends Biz.MarkupView {
    
    public readonly pageNumber: number;
    public readonly pageSize?: number = 20;
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
        return this.scene.query(Biz.subset(Counter), {
            orderBys: [['id', 'DESC']],
            offset: this.pageNumber * this.pageSize!,
            limit: this.pageSize,
        });
    }

    public get hasMore() {
        // requested: this.pageSize
        // response: this.counters.length
        // if response is less than requested, we know end reached
        return this.counters.length === this.pageSize;
    }

    public get reachedEnd() {
        return !this.hasMore;
    }
}
