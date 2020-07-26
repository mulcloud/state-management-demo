<import from="@app/Scenario5/Ui/CounterListPage"/>
<import from="@app/Scenario5/Ui/React/InfiniteScroll"/>
<import from="@app/React/Ui/Loading/Suspense"/>
<template #default>
    <Suspense>
        <span #fallback>
            loading...
        </span>
        <InfiniteScroll>
            <CounterListPage #page :="#page"/>
            <div #loadingMore>
                正在加载...
            </div>
        </InfiniteScroll>
    </Suspense>
</template>

