import * as Biz from '@triones/biz-kernel';
import { ActionHistory } from '@app/Scenario6/Ui/React/ActionHistory';
import { eventHandler } from '@triones/markup-shim-react';

export class ActionPanel extends Biz.MarkupView {
    public readonly actionHistory: ActionHistory;

    @eventHandler({ useScopes: true })
    @Biz.unmanaged
    public undo(scopes: Record<string, any>) {
        this.actionHistory.undo(scopes.entry.index);
    }
}