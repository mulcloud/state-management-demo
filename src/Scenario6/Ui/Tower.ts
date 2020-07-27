import * as Biz from '@triones/biz-kernel';
import * as React from 'react';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { Disk } from '@app/Scenario6/Ui/Disk';
import { BoxDelta } from 'framer-motion';

@instantiate(ReactHost, { concurrent: true, disableSatellite: true })
export class Tower extends Biz.MarkupView {
    @Biz.prop({ transient: true })
    public ref: React.MutableRefObject<HTMLDivElement | null> = React.createRef();
    public diskIds: string[] = [];
    public onBegin() {
        this.diskIds = [
            this.create(Disk, { background: '#FF008C', height: '3em' }).id,
            this.create(Disk, { background: '#D309E1', height: '5em' }).id,
            this.create(Disk, { background: '#9C1AFF', height: '6em' }).id,
            this.create(Disk, { background: '#7700FF', height: '4em' }).id,
        ];
    }
    public get disks() {
        const disks = [];
        for (const diskId of this.diskIds) {
            disks.push(this.scene.get(Disk, diskId));
        }
        return disks;
    }
    @Biz.unmanaged
    public onDragOver(args: { dragging: HTMLElement, delta: BoxDelta }) {
        const sorted = Array.from(this.ref.current!.children as Iterable<HTMLDivElement>).sort((a, b) => {
            return Tower.getY(a, args) - Tower.getY(b, args);
        });
        const sortedDiskIds = [];
        let changed = false;
        for (const [i, elem] of sorted.entries()) {
            if (this.diskIds[i] !== elem.dataset.viewId!) {
                changed = true;
            }
            sortedDiskIds.push(elem.dataset.viewId!);
        }
        if (changed) {
            this.diskIds = sortedDiskIds;
        }
    }

    private static getY(elem: HTMLDivElement, dragOverArgs: { dragging: HTMLElement, delta: BoxDelta }) {
        if (elem === dragOverArgs.dragging) {
            if (dragOverArgs.delta.y.translate > 0) {
                // the bottom edge
                return elem.offsetTop + elem.offsetHeight + dragOverArgs.delta.y.translate;
            } else {
                // the top edge
                return elem.offsetTop + dragOverArgs.delta.y.translate;
            }
        }
        // the middle
        return elem.offsetTop + elem.offsetHeight / 2;
    }
}
