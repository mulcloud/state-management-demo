import * as Biz from '@triones/biz-kernel';
import { instantiate } from '@triones/tri-package';
import { ReactHost } from '@app/React/Host/ReactHost';
import { BoxDelta } from 'framer-motion';
import { Tower } from '@app/Scenario6/Ui/Tower';
import { onRenderFunc, useForceUpdate } from '@triones/markup-shim-react';

@instantiate(ReactHost, { concurrent: true, disableSatellite: true })
export class RootComponent extends Biz.MarkupView {
    private forceUpdate: () => void;

    public static onRender: onRenderFunc = (props, fetcher: RootComponent, doRender) => {
        const forceUpdate = useForceUpdate();
        if (fetcher) {
            fetcher.forceUpdate = forceUpdate;
        }
        return doRender();
    }

    @Biz.unmanaged
    public onDragOver(tower: Tower, args: { dragging: HTMLElement, delta: BoxDelta }) {
        if (tower.onDragOver(args)) {
            this.forceUpdate();
        }
    }
}