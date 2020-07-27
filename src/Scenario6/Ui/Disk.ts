import * as Biz from '@triones/biz-kernel';
import { Tower } from '@app/Scenario6/Ui/Tower';

export class Disk extends Biz.MarkupView {

    public background: string;
    public height: string;
    public cursor = 'pointer';
    public isDragging: boolean;
    public parent: Tower;
    // private originalParent: Tower;
    // private originalParentDisks: Disk[];

    @Biz.unmanaged
    public get zIndex() {
        return this.isDragging ? 3: 1;
    }

    @Biz.unmanaged
    public onDragStart() {
        // if (this.isDragging) {
        //     return;
        // }
        // this.originalParent = this.parent;
        // this.originalParentDisks = Array.from(this.parent.disks) as any;
    }

    @Biz.unmanaged
    public onDragEnd() {
        // if (this.cursor === 'not-allowed') {
        //     if (this.parent !== this.originalParent) {
        //         this.parent.removeDisk(this as any);
        //         this.parent = this.originalParent;
        //     }
        //     this.originalParent.disks = this.originalParentDisks as any;
        // }
        this.cursor = 'pointer';
    }

    public static shouldSkipRender() {
        // required to show the animation
        return false;
    }
}
