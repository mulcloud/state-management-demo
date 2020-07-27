import { motion } from 'framer-motion';
import * as React from 'react';
import { BindingState, useBindingState } from '@triones/markup-shim-react';

const MotionDiv = motion.div;

type Props = {
    isDragging?: BindingState<boolean>;
} & Parameters<typeof MotionDiv>[0];

export const AnimatedDiv = React.forwardRef((props: Props, ref) => {
    const [isDragging, setIsDragging] = useBindingState(props.isDragging);
    const { onDragStart, onDragEnd, ...remaingProps } = props;
    return (
        <MotionDiv
            ref={ref as any}
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
