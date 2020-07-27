import * as Biz from '@triones/biz-kernel';
import { Disk } from '@app/Scenario6/Ui/Disk';
import { BoxDelta } from 'framer-motion';

export class Tower extends Biz.MarkupView {

    public disks: Disk[] = [];

    public onBegin() {
        this.disks = [
            this.create(Disk, { background: '#FF008C', height: '3em' }),
            this.create(Disk, { background: '#D309E1', height: '5em' }),
            this.create(Disk, { background: '#9C1AFF', height: '6em' }),
            this.create(Disk, { background: '#7700FF', height: '4em' }),
        ];
    } 

    @Biz.unmanaged
    public onDragEnter(args: { target: HTMLElement, dragging: HTMLElement, draggingModel: Disk, delta: BoxDelta }) {
        const disk = args.draggingModel;
        disk.cursor = 'pointer'
        if (disk.parent && disk.parent !== this as any) {
            disk.parent.removeDisk(disk);
        }
        disk.parent = this as any;
    }

    @Biz.unmanaged
    public onDragExit(args: { target: HTMLElement, dragging: HTMLElement, draggingModel: Disk, delta: BoxDelta }) {
        args.draggingModel.cursor = 'not-allowed'
    }
    
    @Biz.unmanaged
    public onDragOver(args: { target: HTMLElement, dragging: HTMLElement, draggingModel: Disk, delta: BoxDelta }) {
        const elements = Array.from(args.target.children);
        if (!elements.includes(args.dragging)) {
            elements.push(args.dragging);
        }
        const sorted = (elements as HTMLDivElement[]).sort((a, b) => {
            return Tower.getY(a, args) - Tower.getY(b, args);
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
