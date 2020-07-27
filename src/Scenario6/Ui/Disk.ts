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
    private tower: Tower;

    public onBegin() {
        this.tower = this.scene.load(Tower);
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
    public get viewClass() {
        return Biz.getQualifiedName(Disk);
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
        this.tower.onDragOver({ dragging: disk, delta });
    }

    public static shouldSkipRender() {
        // required to show the animation
        return false;
    }
}
