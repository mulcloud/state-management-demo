# 无尽滚动与批量查询

该例子实现了如下功能：

* 用上拉触发加载的方式实现的分页
* 加载过程中会在底部出现 loading... 字样
* 每条数据又会加载自己的关联数据，并把这些 I/O 查询实现合并后的批量加载

# 托管 loading 状态

传统的 React 写法是加一个 isLoading 的 flag。在开始加载之前需要设置为 true，加载完成之后需要设置为 false。而且要脱离界面把界面需要的数据先加载进来，包括界面下的子组件依赖的数据，要不然就没法确定什么时候 loading 完成了。

```html
<Suspense>
    <span #fallback>loading...</span>
    <InfiniteScroll>
        <CounterListPage #page :="#page" />
        <div #loadingMore>正在加载...</div>
    </InfiniteScroll>
</Suspense>
```

使用 TSM 就不需要手工去设置 isLoading 了。加载数据的过程就是页面渲染的过程，整个I/O加载是被完全托管的，从框架里可以直接拿到当前的 isLoading 状态。比如我们这里使用的 tsx 封装的组件 InfiniteScroll：

```ts
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
```

根据 useOperation 返回的 isLoading 决定是不是要出 loading indicator 就可以了。

# 自动合并 I/O 为批量查询

渲染界面一个常见的问题是渲染一个表格，每一行都需要额外加载其他数据。这样就会导致1条查询出这个表格，然后每一行又追加N条子查询。这种 N+1 查询的问题在 TSM 的底层 I/O 调度上上得到了解决。业务上直接在界面上说要什么数据就可以了

```html
<dynamic :expand="counters">
    <div #element>
        {{ pageNumber }} / {{ #element.value }} -- 
        <Name>{{ #element.countedBy.firstName }}</Name>
        <Name>{{ #element.countedBy.lastName }}</Name>
    </div>
</dynamic>
```

这里引用了 counter.countedBy 这个关联数据。其定义是

```ts
import * as Biz from '@triones/biz-kernel';
import { SystemUser } from '@app/Scenario5/Private/SystemUser';

@Biz.source(new Biz.GlobalMemStore())
export class Counter extends Biz.ActiveRecord {
    public value: number;
    @Biz.lookup
    public countedBy: SystemUser;
}
```

当访问 countedBy 的时候，会触发一条查询去加载 SystemUser。但是在写的时候，完全不用关心运行时是如何把界面上多个组件发出的这些子查询合并成一条批量查询的问题。

# 总结
TSM 托管了加载过程，并且处理了数据加载的常见性能问题。