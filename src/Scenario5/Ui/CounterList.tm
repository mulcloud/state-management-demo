<Suspense>
    <fragment #fallback>
        <span>loading...</span>
    </fragment>
    <InfiniteScroll>
        <CounterListPage #page :="#page">
            <attr #pageSize>20</attr>
        </CounterListPage>
    </InfiniteScroll>
</Suspense>