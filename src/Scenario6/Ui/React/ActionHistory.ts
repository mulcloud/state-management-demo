import * as Biz from '@triones/biz-kernel';
import { unmanaged } from '@triones/biz-kernel';
import { onRenderFunc, useForceUpdate } from '@triones/markup-shim-react';
import * as React from 'react';

// ActionHistory is a generic implementation of undo/redo pattern
export class ActionHistory extends Biz.MarkupView {
    public actionScene: Biz.Scene = Biz.newScene();
    public currentVersion: Biz.SceneVersion;
    public actions: { name: string; version: Biz.SceneVersion }[] = [];
    private forceUpdate: () => void;

    public static onRender: onRenderFunc = (props, fetcher: ActionHistory, doRender) => {
        const forceUpdate = useForceUpdate();
        if (fetcher) {
            fetcher.forceUpdate = forceUpdate;
        }
        return doRender();
    }

    @Biz.unmanaged
    public beginAction() {
        if (!this.currentVersion) {
            this.currentVersion = Biz.createVersion(this.actionScene);
        }
    }

    @Biz.unmanaged
    public commitAction(name?: string) {
        this.actions.push({ name: name || `action ${this.actions.length}`, version: this.currentVersion });
        this.currentVersion = Biz.createVersion(this.actionScene);
    }

    @Biz.unmanaged
    public rollbackAction() {
        Biz.restoreVersion(this.actionScene, this.currentVersion);
        // same as undo
        this.forceUpdate();
    }

    @unmanaged
    public undo(actionIndex: number) {
        this.currentVersion = this.actions[actionIndex].version;
        this.actions = this.actions.slice(0, actionIndex);
        Biz.restoreVersion(this.actionScene, this.currentVersion);
        // we do not want every ui component re-render independently, so restoreVersion will not trigger existing ui subscription
        // instead we do a forceUpdate from the top, which will re-render every single child beneth it
        this.forceUpdate();
    }

    // clonedChildren used to force re-render the children
    // otherwise the animation will not work
    @unmanaged
    public get clonedChildren() {

        if (!this.children) {
            return undefined;
        }
        return React.Children.map(this.children, c => {
            return React.cloneElement(c);
        })
    }
}
