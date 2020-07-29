import * as Biz from '@triones/biz-kernel';
import { Disk } from '@app/Scenario6/Ui/Disk';
import { BoxDelta } from 'framer-motion';
import { onDragOverArgs } from './React/AnimatedBox';

export class Tower extends Biz.MarkupView {

    public disks: Disk[] = [];
    
    public onBegin() {
        this.disks = [
            this.scene.add(Disk, { background: '#FF008C', height: '3em', parent: this as any }),
            this.scene.add(Disk, { background: '#D309E1', height: '5em', parent: this as any }),
            this.scene.add(Disk, { background: '#9C1AFF', height: '6em', parent: this as any }),
            this.scene.add(Disk, { background: '#7700FF', height: '4em', parent: this as any }),
        ];
    }

    public onEnd() {
        for (const disk of this.disks) {
            this.scene.delete(disk);
        }
    }

    @Biz.unmanaged
    public removeDisk(disk: Disk) {
        this.disks = this.disks.filter(e => e !== disk);
    }

    @Biz.unmanaged
    public onDragOver({ dragging, droppable, delta }: onDragOverArgs) {
        const unsorted = Array.from(droppable.element.children);
        if (!unsorted.includes(dragging.element)) {
            unsorted.push(dragging.element);
        }
        const sorted = (unsorted as HTMLDivElement[]).sort((a, b) => {
            return Tower.getDiskYCoordinate(a, dragging.element, delta) - Tower.getDiskYCoordinate(b, dragging.element, delta);
        });
        const sortedDisks = [];
        let changed = false;
        for (const [i, elem] of sorted.entries()) {
            if (!this.disks[i] || this.disks[i].id !== elem.dataset.modelId!) {
                changed = true;
            }
            const disk = Biz.getSceneMemEntity(this.scene, Disk, elem.dataset.modelId!);
            if (disk.parent !== this as any) {
                disk.parent.removeDisk(disk);
                disk.parent = this as any;
            }
            sortedDisks.push(disk);
        }
        if (changed) {
            this.disks = sortedDisks;
        }
    }

    private static getDiskYCoordinate(elem: HTMLElement, draggingElement: HTMLElement, delta: BoxDelta) {
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
