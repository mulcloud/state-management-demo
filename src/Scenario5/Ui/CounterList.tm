<InfiniteScroll>
    <CounterListPage #children="#page" :pageNumber="#page.pageNumber" pageSize="5">
        <div #children="#row">
            {{ #page.pageNumber }} / {{ #row.data }}
        </div>
    </CounterListPage>
</InfiniteScroll>