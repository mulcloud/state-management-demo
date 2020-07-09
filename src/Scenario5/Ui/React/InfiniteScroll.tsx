import * as React from 'react';

interface Props {
    children: (scope: { pageNumber: number }) => React.ReactNode
}

export function InfiniteScroll(props: Props) {
    return props.children({ pageNumber: 1})
}