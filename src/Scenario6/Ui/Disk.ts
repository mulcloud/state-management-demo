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
    public parent: Tower;
    private rootComponent: RootComponent;

    public onBegin() {
        this.towerTable = Biz.getSceneMemTable(this.scene, Tower);
        this.rootComponent = this.scene.load(RootComponent);
    }

    @Biz.unmanaged
    public onDragStart() {
        this.zIndex = 3;
    }

    @Biz.unmanaged
    public onDragEnd() {
        this.zIndex = 1;
    }

    @Biz.unmanaged
    public onViewportBoxUpdate(viewportBox: AxisBox2D, delta: BoxDelta) {
        if (this.zIndex === 1) {
            return;
        }
        const disk = this.ref.current;
        if (!disk) {
            return;
        }
        const elements = window.document.elementsFromPoint(disk.offsetLeft + disk.offsetWidth / 2 + delta.x.translate, disk.offsetTop + disk.offsetHeight / 2 + delta.y.translate) as HTMLDivElement[];
        for (const element of elements) {
            if (element.dataset.viewClass === Tower.name) {
                const tower = this.towerTable.get(element.dataset.viewId!)!;
                this.rootComponent.onDragOver(tower, { dragging: disk, delta });
                return;
            }
        }
    }

    public static shouldSkipRender() {
        // required to show the animation
        return false;
    }
}
