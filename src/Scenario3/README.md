# 界面绑定数据库

这个例子实现了如下功能

* 把数据库“绑定”到界面上
* 界面上可以发新增，删除，以及修改的命令。这些命令的结果会触发受影响界面的刷新。

# 比 rxjs 更简洁的异步数据流绑定

React/Vue 等前端框架虽然支持数据绑定，但是都只能绑定到一个前端内的本地状态。TSM 把绑定的边界拓展了，支持直接写一个 RPC 请求，然后让界面与这个请求的结果进行绑定。当远程数据更新了之后，被绑定的界面也会自动刷新。

```html
<dynamic :expand="counters">
    <Counter_ #element :counter="#element" />
</dynamic>
```

上面绑定的 counters 就是一个执行 RPC 查询的 getter。注意到这个实际上一个异步请求，你不需要写 rxjs 这样的东西，也可以操纵异步数据流。

```ts
public get counters() {
    return this.scene.query(Counter);
}
```

点 add 按钮的时候会触发命令，发给后端（因为 Counter 上标记了 @Biz.published，所以做为 api 直接在网络上暴露了）

```ts
public onAdd() {
    this.scene.add(Counter);
}
```

add 之后，绑定的 counters 查询会重新执行一遍。之所以 add 之后可以做到自动刷新，就是因为前面写 counters 这个 getter 时建立的绑定关系。这样做的收益就是事实上前端表单“状态”是没有的，相当于直接数据库状态绑定到了DOM上。这样对于程序员来说就少一份需要管理的状态。

# 兄弟组件通信不再是麻烦的问题

当没有勾选的时候，delete按钮不出现。勾选了之后，delete 按钮才出现。这个需求本质上是要求两个状态保持一致。这个需求直接用 React 组件来实现之所以难做是因为涉及到兄弟组件的通信问题。经典的解决办法是把状态上提到公共的父组件上，由父组件重渲染来实现兄弟组件的联动。而 TSM 允许我们把这样的两个状态之间的关系直接用一个简单的 getter 来表达

```ts
public get hasSelected() {
    for (const form of this.scene.query(CounterForm)) {
        if (form.checked) {
            return true;
        }
    }
    return false;
}
```

其想法就是“Ui as Database”。所有组件的状态都是 scene 这个内存数据库里可以查询到的东西。CounterForm 既是 Ui 组件，同时又是一份可以被 query 的前端状态。然后我们把 delete 按钮是否可见的属性和这个查询进行绑定。一旦勾选，就会联动刷新。

```ts
public onDelete() {
    const deleted = [];
    for (const form of this.scene.query(CounterForm)) {
        if (form.checked) {
            deleted.push(form.counter);
        }
    }
    this.call(BatchDeleteCounters, deleted);
}
```

提交表单的时候，也可以是用这个来实现仅删除选中的 counter。

# 总结

这个案例的主旨是绑定到查询。这个查询可以是跨网络边界的远程查询，也可以把Ui组件当成数据库来看待，绑定到兄弟组件的状态的查询上。