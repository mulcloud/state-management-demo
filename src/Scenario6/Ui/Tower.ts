import * as Biz from '@triones/biz-kernel';
import * as React from 'react';
import { Disk } from '@app/Scenario6/Ui/Disk';
import { BoxDelta } from 'framer-motion';

export class Tower extends Biz.MarkupView {
    @Biz.prop({ transient: true })
    public ref: React.MutableRefObject<HTMLDivElement | null> = React.createRef();
    @Biz.prop({ transient: true })
    public disks: Disk[] = [];
    private diskTable: Map<string, Disk>;
    public onBegin() {
        this.diskTable = Biz.getSceneMemTable(this.scene, Disk);
        this.disks = [
            this.create(Disk, { background: '#FF008C', height: '3em', parent: this as any }),
            this.create(Disk, { background: '#D309E1', height: '5em', parent: this as any }),
            this.create(Disk, { background: '#9C1AFF', height: '6em', parent: this as any }),
            this.create(Disk, { background: '#7700FF', height: '4em', parent: this as any }),
        ];
    } 
    
    @Biz.unmanaged
    public onDragOver(args: { dragging: HTMLElement, delta: BoxDelta }) {
        const elements = Array.from(this.ref.current!.children);
        if (!elements.includes(args.dragging)) {
            elements.push(args.dragging);
        }
        const sorted = (elements as HTMLDivElement[]).sort((a, b) => {
            return Tower.getY(a, args) - Tower.getY(b, args);
        });
        const sortedDisks = [];
        let changed = false;
        for (const [i, elem] of sorted.entries()) {
            if (!this.disks[i] || this.disks[i].id !== elem.dataset.viewId!) {
                changed = true;
            }
            sortedDisks.push(this.diskTable.get(elem.dataset.viewId!)!);
        }
        if (!changed) {
            return false;
        }
        this.disks = sortedDisks;
        const draggingDisk = this.diskTable.get(args.dragging.dataset.viewId!)!;
        if (draggingDisk.parent !== this as any) {
            draggingDisk.parent.removeDisk(draggingDisk);
            draggingDisk.parent = this as any;
        }
        return true;
    }

    @Biz.unmanaged
    public removeDisk(disk: Disk) {
        const pos = this.disks.indexOf(disk);
        if (pos !== -1) {
            this.disks.splice(pos, 1);
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
    
    public static shouldSkipRender() {
        // required to show the animation
        return false;
    }
}
