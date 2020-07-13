<Suspense>
    <span #fallback>loading...</span>
    <InfiniteScroll>
        <CounterListPage #page :="#page" />
        <div #loadingMore>正在加载...</div>
    </InfiniteScroll>
</Suspense>