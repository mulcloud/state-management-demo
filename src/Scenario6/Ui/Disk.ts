import * as Biz from '@triones/biz-kernel';
import { Tower } from '@app/Scenario6/Ui/Tower';
import { onDragEndArgs } from './React/AnimatedBox';
import { ActionHistory } from '@app/Scenario6/Ui/ActionHistory';
import { context } from '@triones/markup-shim-react';
import { ActionHistoryContext } from '@app/Scenario6/Ui/ActionHistoryContext';

export class Disk extends Biz.MarkupView {

    public background: string;
    public height: string;
    public isDragging: boolean;
    public parent: Tower;
    @context(ActionHistoryContext)
    private actionHistory: ActionHistory;

    public static shouldSkipRender() {
        // required to show the animation
        return false;
    }

    @Biz.unmanaged
    public get zIndex() {
        return this.isDragging ? 3: 1;
    }

    @Biz.unmanaged
    public onDragStart() {
        this.actionHistory.beginAction();
    }

    @Biz.unmanaged
    public onDragEnd({ droppable }: onDragEndArgs) {
        if (droppable) {
            this.actionHistory.commitAction();
        } else {
            this.actionHistory.rollbackAction();
        }
    }
}
