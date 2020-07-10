<Suspense>
    <fragment #fallback>
        <span>loading...</span>
    </fragment>
    <InfiniteScroll>
        <CounterListPage #children="#page" :="#page" pageSize="5">
            <div #children="#row">
                {{ #page.pageNumber }} / {{ #row.data }}
            </div>
        </CounterListPage>
    </InfiniteScroll>
</Suspense>