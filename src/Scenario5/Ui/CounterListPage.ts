import * as Biz from '@triones/biz-kernel';
import * as React from 'react';

export class CounterListPage extends Biz.MarkupView {
    public readonly pageNumber: number;
    public readonly pageSize: number | string;
    public readonly pageLoaded: (args: { pageNumber: number, hasMore: boolean }) => void;
    public readonly children: (scope: { data: any }) => React.ReactNode;
    public get items() {
        this.scene.sleep(1500);
        if (this.pageNumber === 4) {
            this.pageLoaded({ pageNumber: this.pageNumber, hasMore: false });
        } else {
            this.pageLoaded({ pageNumber: this.pageNumber, hasMore: true });
        }
        const items = [];
        for (let i = 0; i < 100; i++) {
            items.push(`item${i}`);
        }
        return items;
    }
}