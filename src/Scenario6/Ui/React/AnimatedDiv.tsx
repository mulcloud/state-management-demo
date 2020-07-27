import { motion } from 'framer-motion';
import * as React from 'react';

const MotionDiv = motion.div;

export const AnimatedDiv = React.forwardRef((props: Parameters<typeof MotionDiv>[0], ref) => {
    return <MotionDiv {...props} ref={ref as any} />
});
