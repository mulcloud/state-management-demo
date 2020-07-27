import { motion } from 'framer-motion';
import * as React from 'react';
import { BindingState, useBindingState, SceneContext } from '@triones/markup-shim-react';
import * as Biz from '@triones/biz-kernel';

const MotionDiv = motion.div;

type Props = {
    isDragging?: BindingState<boolean>;
    droppableTarget?: string;
    model?: Biz.Entity;
} & Parameters<typeof MotionDiv>[0];

export const AnimatedDiv = React.forwardRef((props: Props, ref) => {
    const [isDragging, setIsDragging] = useBindingState(props.isDragging);
    const scene = React.useContext(SceneContext);
    const draggingOver = React.useRef<Biz.Entity>();
    const myRef = React.useRef();
    if (!ref) {
        ref = myRef;
    }
    const { onDragStart, onDragEnd, droppableTarget, onViewportBoxUpdate: _onViewportBoxUpdate, model, ...remaingProps } = props;
    if (model) {
        Reflect.set(remaingProps, 'data-model-class', Biz.getQualifiedName(Biz.Entity.classOf(model)));
        Reflect.set(remaingProps, 'data-model-id', model.id);
        remaingProps.layoutId = model.id;
    }
    let onViewportBoxUpdate = _onViewportBoxUpdate;
    if (droppableTarget) {
        onViewportBoxUpdate = (viewportBox, delta) => {
            if (_onViewportBoxUpdate) {
                _onViewportBoxUpdate(viewportBox, delta);
            }
            if (!isDragging) {
                return;
            }
            const dragging = (ref as React.MutableRefObject<any>).current;
            if (!dragging) {
                return;
            }
            const draggingModel = getModel(scene, dragging);
            const target = findDroppableTarget(
                dragging.offsetLeft + dragging.offsetWidth / 2 + delta.x.translate,
                dragging.offsetTop + dragging.offsetHeight / 2 + delta.y.translate,
                droppableTarget
            );
            const targetModel = getModel(scene, target);
            if (draggingOver.current !== targetModel) {
                if (draggingOver.current) {
                    (draggingOver.current as any).onDragExit({ target, dragging, draggingModel, delta });
                }
                draggingOver.current = targetModel;
                if (targetModel) {
                    targetModel.onDragEnter({ target, dragging, draggingModel, delta });
                }
            }
            if (targetModel) {
                (draggingOver.current as any).onDragOver({ target, dragging, draggingModel, delta });
            }
        }
    }
    return (
        <MotionDiv
            ref={ref as any}
            onViewportBoxUpdate={onViewportBoxUpdate}
            onDragStart={(event, info) => {
                if (onDragStart) {
                    onDragStart(event, info);
                }
                setIsDragging(true);
            }}
            onDragEnd={(event, info) => {
                setIsDragging(false);
                if (onDragEnd) {
                    onDragEnd(event, info);
                }
            }}
            {...remaingProps}
        />
    );
});

function getModel(scene: Biz.Scene, target: HTMLDivElement | undefined) {
    if (target && target.dataset.modelClass && target.dataset.modelId) {
        return Biz.getSceneMemEntity(scene, Biz.getClass(target.dataset.modelClass), target.dataset.modelId);
    }
    return undefined;
}

function findDroppableTarget(x: number, y: number, droppableTarget: string) {
    const elements = window.document.elementsFromPoint(x, y) as HTMLDivElement[];
    for (const element of elements) {
        if (element.dataset.modelClass === droppableTarget) {
            return element;
        }
    }
    return undefined;
}