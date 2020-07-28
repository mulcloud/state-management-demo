import * as React from 'react';
import styled from 'styled-components';
import * as Biz from '@triones/biz-kernel';

const styledComponents = new Map<string, any>();

type Props = {
    staticStyle?: string;
    model?: Biz.Entity;
} & React.HTMLProps<HTMLDivElement>;

export function Box(props: Props) {
    const { staticStyle, model, ...remainingProps } = props;
    if (model) {
        const modelClass = Biz.getQualifiedName(Biz.Entity.classOf(model));
        Reflect.set(remainingProps, 'data-model-class', modelClass);
        Reflect.set(remainingProps, 'data-model-id', model.id);
    }
    if (staticStyle) {
        const Component = getStyledComponent(staticStyle);
        return <Component {...remainingProps} />
    }
    return <div {...remainingProps} />
}

function getStyledComponent(staticStyle: string) {
    let styledComponent = styledComponents.get(staticStyle);
    if (styledComponent) {
        return styledComponent;
    }
    const arr = [staticStyle] as any;
    arr.raw = [staticStyle];
    styledComponents.set(staticStyle, (styledComponent = styled.div(arr)));
    return styledComponent;
}