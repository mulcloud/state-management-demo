import * as React from 'react';
import { useOperation, Slotlike, renderSlot } from '@triones/markup-shim-react';
import { tlog } from '@triones/tlog';

const stalk = tlog.tag('infs', 'stalk');

interface Props {
    loadingMore?: Slotlike;
    page: (args: { pageNumber: number; sentinel?: React.ReactNode }) => React.ReactNode;
}

export function InfiniteScroll({ page: renderPage, loadingMore }: Props) {
    const model = useInfiniteScrollModel();
    const sentinel = <Sentinel model={model} />;
    const pages = [];
    for (let i = 0; i < model.currentPage; i++) {
        let page: React.ReactNode;
        if (i === model.currentPage - 1) {
            page = renderPage({ pageNumber: i, sentinel });
        } else {
            page = renderPage({ pageNumber: i });
        }
        pages.push(<React.Fragment key={i}>{page}</React.Fragment>);
    }
    return (
        <div>
            {pages}
            <LoadingMore model={model} loadingMore={loadingMore} />
        </div>
    );
}

function useInfiniteScrollModel() {
    const [currentPage, setCurrentPage] = React.useState(2);
    const modelRef = React.useRef({
        currentPage,
        nextPage() {
            setCurrentPage(currentPage => currentPage + 1);
        },
        sentinelObserver: undefined as (() => void) | undefined,
    });
    modelRef.current.currentPage = currentPage;
    return modelRef.current;
}

function Sentinel({ model }: { model: ReturnType<typeof useInfiniteScrollModel> }) {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const intersectionObserver = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    model.sentinelObserver && model.sentinelObserver();
                }
            },
            { threshold: 1 },
        );
        intersectionObserver.observe(ref.current!);
        return () => {
            if (ref.current) {
                intersectionObserver.unobserve(ref.current!);
            }
        };
    }, []);
    return <div ref={ref} style={{ width: '1px', height: '1px' }} />;
}

function LoadingMore({ model, loadingMore }: { model: ReturnType<typeof useInfiniteScrollModel>, loadingMore?: Slotlike }): React.ReactElement | null {
    const [startOperation, isLoading] = useOperation('load more', { timeoutMs: 30000 });
    React.useEffect(() => {
        model.sentinelObserver = () => {
            startOperation(() => {
                stalk`load more`();
                model.nextPage();
            });
        };
    }, []);
    if (!isLoading) {
        return null;
    }
    if (loadingMore) {
        return renderSlot(loadingMore);
    }
    return <div>loading more...</div>;
}
