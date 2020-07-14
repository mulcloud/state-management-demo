# 批量操作型界面

该例子实现了如下功能：

* 从数据库里恢复出之前的状态
* 在页面上支持了增删改查，但是不用每次操作都数据库落盘，体验更好
* 点击保存的时候，批量把界面上的改动提交落盘

# 子表单的前端状态

批量就是在前端持有状态。

```ts
export class CounterForm extends Biz.MarkupView {
    public id: string;
    public readonly counter?: Counter;
    public value: number;
    public checked: boolean;
    public deleted: boolean;

    public onBegin() {
        this.value = this.counter?.value || 0;
    }

    // ...
}
```

在 onBegin 的时机（可以认为是 React 生命周期里的 onMount），把持久化的数据库状态复制一份变成可以在前端编辑的表单状态。

```ts
@Biz.command({ runAt: 'server' })
public save() {
    if (this.counter) {
        if (this.deleted) {
            this.scene.delete(this.counter);
        } else {
            this.counter.value = this.value;
        }
    } else {
        this.scene.add(Counter, { value: this.value })
    }
}
```

在 save 按钮触发的时候，把表单状态写回到数据库。

# 父表单的前端状态

父表单持有的状态更复杂一些是一个 array

```ts
export class CounterList extends Biz.MarkupView {

    public counters: CounterForm[] = [];

    public onBegin() {
        for (const counter of this.scene.query(Counter)) {
            this.counters.push(this.create(CounterForm, { counter }));
        }
    }

    // ...
}
```

类似的在 onBegin 的时机做了一份状态复制。因为有了这份副本

```ts
public onAdd() {
    this.counters.push(this.scene.add(CounterForm));
}
```

添加按钮就不需要去调用后端接口了，而是直接修改前端的状态。

```ts
@Biz.command({ runAt: 'server' })
@Biz.published
public onSave() {
    for (const form of this.counters) {
        form.save();
    }
}
```

在 save 的时候，把表单状态写回到数据库。按照这个模式，更复杂的批量界面也是照葫芦画瓢，无非是定义一个前端持有的对象图，在 onBegin 的时候做一次拷贝，然后在 save 的时候再拷贝回去。

# 不需要全局 store 也能持有复杂的前端状态

在 TSM 的解决方案里是没有区分组件本地状态和全局 store 的。当我们需要在前端持有批量操作中的状态的时候，可以直接把这个暂存的状态放在组件本地。这样的代码相比在全局 store 里同步一份组件的状态要更加好理解。某种程度上来说，有点类似于 jQuery 直接操作 DOM 的时候，直接查询 DOM 状态的感觉。

# 总结

批量操作的界面是更复杂的，因为多了一份表单状态需要管理。如果可能的话，优先说服产品经理不要设计这样的界面出来。
如果一定要做批量型界面，TSM 提供了 onBegin 的生命周期回调，让你可以选择绑定到前端状态，而不是只能绑定到数据库。