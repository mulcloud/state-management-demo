import * as Biz from '@triones/biz-kernel';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { eventHandler } from '@triones/markup-shim-react';
import { unmanaged } from '@triones/biz-kernel';

@instantiate(ReactHost, { concurrent: true, disableSatellite: true })
export class ActionHistory extends Biz.MarkupView {

    public actionScene: Biz.Scene = Biz.newScene();
    public currentVersion: Biz.SceneVersion;
    public actions: { name: string, version: Biz.SceneVersion }[] = [];

    @Biz.unmanaged
    public startAction() {
        if (!this.currentVersion) {
            this.currentVersion = Biz.createVersion(this.actionScene);
        }
    }

    @Biz.unmanaged
    public endAction() {
        this.actions.push({ name: `action ${this.actions.length}`, version: this.currentVersion });
        this.currentVersion = Biz.createVersion(this.actionScene);
    }

    @eventHandler({ useScopes: true })
    @unmanaged
    public undo(scopes: Record<string, any>) {
        this.currentVersion = scopes.entry.element.version;
        this.actions = this.actions.slice(0, scopes.entry.index);
        Biz.restoreVersion(this.actionScene, this.currentVersion);
    }
}