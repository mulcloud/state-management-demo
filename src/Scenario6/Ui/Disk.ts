import * as Biz from '@triones/biz-kernel';
import { AxisBox2D, BoxDelta } from 'framer-motion';
import * as React from 'react';
import { Tower } from '@app/Scenario6/Ui/Tower';
import { RootComponent } from '@app/Scenario6/Ui/RootComponent';

export class Disk extends Biz.MarkupView {
    public background: string;
    public height: string;
    @Biz.prop({ transient: true })
    public ref: React.MutableRefObject<HTMLDivElement | null> = React.createRef();
    public zIndex = 1;
    private towerTable: Map<string, Tower>;
    @Biz.prop({ transient: true })
    public parent: Tower;
    public cursor = 'pointer';
    private rootComponent: RootComponent;
    private originalParent: Tower;
    private originalParentDisks: Disk[];

    public onBegin() {
        this.towerTable = Biz.getSceneMemTable(this.scene, Tower);
        this.rootComponent = this.scene.load(RootComponent);
    }

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
            this.rootComponent.refresh();
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
        const tower = this.towerTable.get(towerElem.dataset.viewId!)!;
        this.cursor = 'pointer';
        if (tower.onDragOver({ dragging: diskElem, delta })) {
            this.rootComponent.refresh();
        }
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
