import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { useOperation } from '@triones/markup-shim-react';
import { tlog } from '@triones/tlog';

const stalk = tlog.tag('infs', 'stalk');

interface Props {
    children: (scope: {
        pageNumber: number;
        pageLoaded: (args: { pageNumber: number; hasMore: boolean }) => void;
    }) => React.ReactNode;
}

export function InfiniteScroll(props: Props) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const loaded = React.useRef({ pageNumber: 0, hasMore: true });
    const pageLoaded = React.useCallback((args: { pageNumber: number; hasMore: boolean }) => {
        loaded.current = args;
    }, []);
    const pages = [];
    for (let i = 0; i < currentPage; i++) {
        pages.push(<React.Fragment key={i}>{props.children({ pageNumber: i, pageLoaded })}</React.Fragment>);
    }
    return (
        <div>
            {pages}
            {loaded.current.hasMore ? (
                <Sentinel currentPage={currentPage} setCurrentPage={setCurrentPage} />
            ) : (
                <div>reached end</div>
            )}
        </div>
    );
}

function Sentinel({ currentPage, setCurrentPage }: { currentPage: number; setCurrentPage: (next: number) => void }) {
    const [startOperation, isLoading] = useOperation('sentinel in view, trigger load more', { timeoutMs: 30000 });
    const [ref, inView] = useInView();
    React.useEffect(() => {
        if (inView) {
            stalk`sentinel in view, trigger load more`();
            startOperation(() => {
                setCurrentPage(currentPage + 1);
            });
        }
    }, [inView]);
    return (
        <div ref={ref}>
            {isLoading ? <div style={{ position: 'sticky', top: 0 }}>loading ${new Date().toString()}...</div> : null}
        </div>
    );
}
