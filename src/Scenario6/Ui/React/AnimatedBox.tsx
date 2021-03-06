import { motion, BoxDelta, PanInfo } from 'framer-motion';
import * as React from 'react';
import { BindingState, useBindingState, SceneContext } from '@triones/markup-shim-react';
import * as Biz from '@triones/biz-kernel';
import styled from 'styled-components';

type AnyPointerEvent = MouseEvent | TouchEvent | PointerEvent;
const MotionDiv = motion.div;
const styledComponents = new Map<string, any>();

export type Props = {
    isDragging?: BindingState<boolean>;
    droppableModelClass?: string;
    model?: Biz.Entity;
    style?: React.CSSProperties;
    staticStyle?: string;
    onDragEnd?: onDragEnd;
    onDragStart?: onDragStart;
} & Omit<Parameters<typeof MotionDiv>[0], 'onDragEnd' | 'onDragStart'>;

export type Droppable = {
    element: HTMLElement;
    model: Biz.Entity & {
        onDragEnter?: onDragEnter
        onDragExit?: onDragExit
        onDragOver?: onDragOver
    };
};

export type Dragging = {
    element: HTMLElement;
    model: Biz.Entity;
};

export type onDragStartArgs = { event: AnyPointerEvent, info: PanInfo };
export type onDragStart = (args: onDragStartArgs) => void;
export type onDragEndArgs = { event: AnyPointerEvent, info: PanInfo, droppable?: Droppable };
export type onDragEnd = (args: onDragEndArgs) => void;
export type onDragExitArgs = { dragging: Dragging; droppable: Droppable };
export type onDragExit = (args: onDragExitArgs) => void;
export type onDragEnterArgs = { dragging: Dragging; droppable: Droppable };
export type onDragEnter = (args: onDragEnterArgs) => void;
export type onDragOverArgs = { dragging: Dragging; droppable: Droppable; delta: BoxDelta };
export type onDragOver = (args: onDragOverArgs) => void;

export const AnimatedBox = React.forwardRef((props: Props, ref) => {
    const [isDragging, setIsDragging] = useBindingState(props.isDragging);
    const scene = React.useContext(SceneContext);
    const [draggingOver, setDraggingOver] = React.useState<Droppable>();
    const myRef = React.useRef();
    if (!ref) {
        ref = myRef;
    }
    const {
        onDragStart,
        onDragEnd,
        droppableModelClass,
        onViewportBoxUpdate: _onViewportBoxUpdate,
        model,
        staticStyle,
        style,
        ...remainingProps
    } = props;
    if (model) {
        const modelClass = Biz.getQualifiedName(Biz.Entity.classOf(model));
        Reflect.set(remainingProps, 'data-model-class', modelClass);
        Reflect.set(remainingProps, 'data-model-id', model.id);
        remainingProps.layoutId = `${modelClass}:${model.id}`;
    }
    let onViewportBoxUpdate = _onViewportBoxUpdate;
    if (droppableModelClass) {
        onViewportBoxUpdate = (viewportBox, delta) => {
            if (_onViewportBoxUpdate) {
                _onViewportBoxUpdate(viewportBox, delta);
            }
            if (!isDragging) {
                return;
            }
            const draggingElement = (ref as React.MutableRefObject<any>).current;
            if (!draggingElement) {
                return;
            }
            const dragging: Dragging = { element: draggingElement, model: getModel(scene, draggingElement) };
            const droppable = findDroppable(
                scene,
                draggingElement.offsetLeft + draggingElement.offsetWidth / 2 + delta.x.translate,
                draggingElement.offsetTop + draggingElement.offsetHeight / 2 + delta.y.translate,
                droppableModelClass,
            );
            if (draggingOver?.model !== droppable?.model) {
                if (draggingOver?.model && draggingOver.model.onDragExit) {
                    draggingOver.model.onDragExit({ droppable: draggingOver, dragging });
                }
                setDraggingOver(droppable);
                if (droppable?.model && droppable.model.onDragEnter) {
                    droppable.model.onDragEnter({ droppable, dragging });
                }
            }
            if (droppable?.model && droppable.model.onDragOver) {
                droppable.model.onDragOver.call(droppable.model, { droppable, dragging, delta });
            }
        };
    }
    let cursor = props.drag ? 'pointer' : undefined;
    if (isDragging) {
        cursor = draggingOver ? 'pointer' : 'not-allowed';
    }
    let Component = MotionDiv;
    if (staticStyle) {
        Component = getStyledComponent(MotionDiv, staticStyle);
    }
    return (
        <Component
            ref={ref as any}
            style={{ ...style, cursor }}
            onViewportBoxUpdate={onViewportBoxUpdate}
            onDragStart={
                props.drag
                    ? (event, info) => {
                          if (onDragStart && !isDragging) {
                              onDragStart({ event, info });
                          }
                          setIsDragging(true);
                      }
                    : undefined
            }
            onDragEnd={
                props.drag
                    ? (event, info) => {
                          setIsDragging(false);
                          setDraggingOver(undefined);
                          if (onDragEnd) {
                              onDragEnd({ event, info, droppable: draggingOver });
                          }
                      }
                    : undefined
            }
            {...remainingProps}
        />
    );
});

function getStyledComponent<C>(comp: C, staticStyle: string): C {
    let styledComponent = styledComponents.get(staticStyle);
    if (styledComponent) {
        return styledComponent as C;
    }
    const arr = [staticStyle] as any;
    arr.raw = [staticStyle];
    styledComponents.set(staticStyle, (styledComponent = styled(comp as any)(arr)));
    return styledComponent as C;
}

function findDroppable(scene: Biz.Scene, x: number, y: number, droppableModelClass: string): Droppable | undefined {
    const element = findDroppableElement(x, y, droppableModelClass);
    const model = getModel(scene, element);
    if (element && model) {
        return { element, model };
    }
    return undefined;
}

function getModel(scene: Biz.Scene, target: HTMLDivElement | undefined) {
    if (target && target.dataset.modelClass && target.dataset.modelId) {
        return Biz.getSceneMemEntity(scene, Biz.getClass(target.dataset.modelClass), target.dataset.modelId);
    }
    return undefined;
}

function findDroppableElement(x: number, y: number, droppableModelClass: string) {
    const elements = window.document.elementsFromPoint(x, y) as HTMLDivElement[];
    for (const element of elements) {
        if (element.dataset.modelClass === droppableModelClass) {
            return element;
        }
    }
    return undefined;
}
