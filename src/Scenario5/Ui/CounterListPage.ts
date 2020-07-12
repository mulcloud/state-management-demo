import * as Biz from '@triones/biz-kernel';
import * as React from 'react';

export class CounterListPage extends Biz.MarkupView {
    public readonly pageNumber: number;
    public readonly pageSize: number | string;
    public readonly sentinel: React.ReactNode;
    
    public get items() {
        this.scene.sleep(1500);
        const items = [];
        for (let i = 0; i < 100; i++) {
            items.push(`item${i}`);
        }
        return items;
    }
}