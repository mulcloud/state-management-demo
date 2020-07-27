import * as Biz from '@triones/biz-kernel';
import { AxisBox2D, BoxDelta } from 'framer-motion';
import * as React from 'react';
import { Tower } from '@app/Scenario6/Ui/Tower';

export class Disk extends Biz.MarkupView {

    public background: string;
    public height: string;
    @Biz.prop({ transient: true })
    public ref: React.MutableRefObject<HTMLDivElement | null> = React.createRef();
    public zIndex = 1;
    public parent: Tower;
    public cursor = 'pointer';
    private originalParent: Tower;
    private originalParentDisks: Disk[];

    @Biz.unmanaged
    public onDragStart() {
        if (this.zIndex === 3) {
            return;
        }
        this.originalParent = this.parent;
        this.originalParentDisks = Array.from(this.parent.disks) as any;
        this.zIndex = 3;
    }

    @Biz.unmanaged
    public onDragEnd() {
        if (this.cursor === 'not-allowed') {
            if (this.parent !== this.originalParent) {
                this.parent.removeDisk(this as any);
                this.parent = this.originalParent;
            }
            this.originalParent.disks = this.originalParentDisks as any;
        }
        this.zIndex = 1;
        this.cursor = 'pointer';
    }

    @Biz.unmanaged
    public onViewportBoxUpdate(viewportBox: AxisBox2D, delta: BoxDelta) {
        if (this.zIndex === 1) {
            return;
        }
        const diskElem = this.ref.current;
        if (!diskElem) {
            return;
        }
        const towerElem = Disk.findTowerElement(
            diskElem.offsetLeft + diskElem.offsetWidth / 2 + delta.x.translate,
            diskElem.offsetTop + diskElem.offsetHeight / 2 + delta.y.translate,
        );
        if (!towerElem) {
            this.cursor = 'not-allowed';
            return;
        }
        const tower = Biz.getSceneMemEntity(this.scene, Tower, towerElem.dataset.viewId!)!;
        this.cursor = 'pointer';
        tower.onDragOver({ target: towerElem, dragging: diskElem, delta })
    }

    private static findTowerElement(x: number, y: number) {
        const elements = window.document.elementsFromPoint(x, y) as HTMLDivElement[];
        for (const element of elements) {
            if (element.dataset.viewClass === Tower.name) {
                return element;
            }
        }
        return undefined;
    }

    public static shouldSkipRender() {
        // required to show the animation
        return false;
    }
}
