import * as Biz from '@triones/biz-kernel';
import { unmanaged } from '@triones/biz-kernel';

// ActionHistory is a generic implementation of undo/redo pattern
export class ActionHistory extends Biz.MarkupView {
    public actionScene: Biz.Scene = Biz.newScene();
    public currentVersion: Biz.SceneVersion;
    public actions: { name: string; version: Biz.SceneVersion }[] = [];

    @Biz.unmanaged
    public beginAction() {
        if (!this.currentVersion) {
            this.currentVersion = Biz.createVersion(this.actionScene);
        }
    }

    @Biz.unmanaged
    public commitAction() {
        this.actions.push({ name: `action ${this.actions.length}`, version: this.currentVersion });
        this.currentVersion = Biz.createVersion(this.actionScene);
    }

    @Biz.unmanaged
    public rollbackAction() {
        Biz.restoreVersion(this.actionScene, this.currentVersion);
    }

    @unmanaged
    public undo(actionIndex: number) {
        this.currentVersion = this.actions[actionIndex].version;
        this.actions = this.actions.slice(0, actionIndex);
        Biz.restoreVersion(this.actionScene, this.currentVersion);
    }
}
