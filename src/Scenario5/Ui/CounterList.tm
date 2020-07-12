<Suspense>
    <fragment #fallback>
        <span>loading...</span>
    </fragment>
    <InfiniteScroll>
        <CounterListPage #page :="#page" pageSize="5" />
    </InfiniteScroll>
</Suspense>