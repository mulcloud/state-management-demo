import * as Biz from '@triones/biz-kernel';
import { Disk } from '@app/Scenario6/Ui/Disk';
import { BoxDelta } from 'framer-motion';
import { onDragOver, onDragEnter, onDragExit } from './React/AnimatedBox';

export class Tower extends Biz.MarkupView {

    public disks: Disk[] = [];
    
    public static shouldSkipRender() {
        // required to show the animation
        return false;
    }

    public onBegin() {
        this.disks = [
            this.create(Disk, { background: '#FF008C', height: '3em' }),
            this.create(Disk, { background: '#D309E1', height: '5em' }),
            this.create(Disk, { background: '#9C1AFF', height: '6em' }),
            this.create(Disk, { background: '#7700FF', height: '4em' }),
        ];
    } 

    public onDragEnter: onDragEnter = function(this: Tower, { dragging }) {
        const disk = dragging.model as Disk;
        if (disk.parent && disk.parent !== this as any) {
            disk.parent.removeDisk(disk);
        }
        disk.parent = this as any;
    }

    public onDragExit: onDragExit = function() {
    }
    
    public onDragOver: onDragOver = function(this: Tower, { dragging, droppable, delta }) {
        const unsorted = Array.from(droppable.element.children);
        if (!unsorted.includes(dragging.element)) {
            unsorted.push(dragging.element);
        }
        const sorted = (unsorted as HTMLDivElement[]).sort((a, b) => {
            return Tower.getY(a, dragging.element, delta) - Tower.getY(b, dragging.element, delta);
        });
        const sortedDisks = [];
        let changed = false;
        for (const [i, elem] of sorted.entries()) {
            if (!this.disks[i] || this.disks[i].id !== elem.dataset.modelId!) {
                changed = true;
            }
            sortedDisks.push(Biz.getSceneMemEntity(this.scene, Disk, elem.dataset.modelId!)!);
        }
        if (changed) {
            this.disks = sortedDisks;
        }
    }

    @Biz.unmanaged
    public removeDisk(disk: Disk) {
        this.disks = this.disks.filter(e => e !== disk);
    }

    private static getY(elem: HTMLElement, draggingElement: HTMLElement, delta: BoxDelta) {
        if (elem === draggingElement) {
            if (delta.y.translate > 0) {
                // the bottom edge
                return elem.offsetTop + elem.offsetHeight + delta.y.translate;
            } else {
                // the top edge
                return elem.offsetTop + delta.y.translate;
            }
        }
        // the middle
        return elem.offsetTop + elem.offsetHeight / 2;
    }
}
