# 父子表单以及后端校验

这个例子实现了如下功能：

* 前端动态构建的父子表单
* 选择框状态与按钮联动
* 提交父子表单到后端，由后端完成数据校验，并把错误回显到界面
* 查询后端持久化的数据

# 父子表单就是组件的组合

父子表单不需要用特殊的语法来表单，也就是和组装普通组件一样进行组合。

```html
<dynamic :expand="counters">
    <Counter_ #element :="#element" />
</dynamic>
```

子表单的状态声明在父组件上，由父组件往下传递，这个传递的语法是 `:="#element"`，代表“全绑定”

```ts
export class CounterList extends Biz.MarkupView {
    public counters: CounterForm[] = [];
}
```

添加一个子表单只需要修改这个数组，添加一个元素就可以了：

```ts
public onAdd() {
    this.counters.push(this.scene.add(CounterForm));
}
```

这种写法的核心收益是可以把一个父子组件的状态全部都收到一个地方来管理。相比 React 组件的默认状态管理，子组件的状态是子组件内部私有的，父组件很难获取得到。

# 在后端“修改”前端界面

用 React + Java 来写表单的后端校验，往往需要定义一个 DTO 来描述前端的表单结构。后端完成校验之后，要返回另外一个 DTO 来描述每个字段的错误。然后前端 React 还需要把这个 DTO 的结果更新到全局 store 里，最后更新每个组件的本地状态上。这个过程中需要定义重复的结构体，以及重复的数据复制。

在我们这个例子里，事情就要简单得多。CounterList 同时也承担了前后端之间数据交换协议的角色。在点 save 按钮的时候，onSave 方法是一个 rpc 接口，会自动往后端传当前的表单，也就是 CounterList。同时 onSave 函数处理完之后，CounterList 又会回传到界面上。

```ts
@Biz.command({ runAt: 'server' })
@Biz.published
public onSave() {
    for (const form of this.counters) {
        Constraint.clearValidationResults(form);
        if (form.value > 5) {
            Constraint.reportViolation(form, 'value', { message: 'too big'});
        } else {
            console.log(`save ${form.value}`);
            this.scene.add(Counter, { value: form.value });
        }
    }
}
```

值得一提的是 Biz.command 和 Biz.Command 的区别。这两种都是写 command 的方式，小写的 command 是一个方法，而大写的 Command 是一个类，但是干的活是一样的。方法会把所在的对象 this 自动做为一个隐藏参数，在 rpc 调用的时候传递。一般来说，如果一个命令与界面的关系更近，我们会把它写成一个 MarkupView 上的方法。如果这个命令与数据库存储更接近，就会把它写成一个独立的类。因为上面添加了 runAt server，所以这个 command 虽然写在了 Ui 里，但其实是在服务端运行的。

数据校验的结果不仅仅是一个 error message，而是要具体标记到字段级别的。所以如果用传统的写法来做，validate 这个后端 rpc 接口，需要一个很复杂的数据结构来承担 request，又要额外定义一个带一堆 error 字段的 response 做为数据结构返回到前端。在 TSM 里，这些 request 和 response 就不需要重复定义了，我们直接把 Ui 表单当 rpc 接口协议来用。每个表单字段都可以用 Constraint.reportViolation 来标记这个字段遇到的错误。在例子中， value 这个字段就会有一个 value_ERROR 字段。

```html
<FieldItem :value="&value">
    {{ id }}
    <Checkbox :checked="&checked"></Checkbox>{{ checked }}
    <button @onClick="onMinus">-</button>{{ value }}<button @onClick="onPlus">+</button>
</FieldItem>
```

通过上面这个 Ui 组件，把 value_ERROR 的内容给回显到了界面上。

同时因为前后端都是同一个编程语言，甚至定义在了同一个 class 里。onSave 方法可以抽取 validate 方法出来，被前后端共用。这样后端做的数据校验可以在前端提前做一遍，让用户可以得到更及时的响应。

# 从前端“直接”查询ORM

状态管理当然包括数据库 ORM。TSM 提供了增删改查的完整封装。而且这个 ORM 还延申到了前端，可以在前端直接查询数据库里的数据。

虽然我们让 CounterList / CounterForm 承担了很多角色，但是 CounterForm 本身并不适合做为数据库的持久化模型。只有及其简单的业务下，持久化的状态和界面状态有一一对应关系，绝大多数情况下，这两份状态所需要的字段都是不一样的。对于高度重复的简单场合，后面在 PCP 里，我们有基于代码生成的解决方案来自动用 Counter 生成 CounterForm。

```ts
@Biz.source(new Biz.GlobalMemStore())
export class Counter extends Biz.ActiveRecord {
    public value: number;
}
```

这里做为一个 demo，我们并没有使用 TSM 的官方存储，而是把内存当数据库来用了。

插入到数据库里必须在后端做，前端是没有权利不经过后端来添加数据的。this.scene.add(Counter) 可以看成 new Counter() 的另外一种写法。因为 Counter 定义了自己的 source，所以会自动被保存到 GlobalMemStore 里。

```ts
public onList() {
    for (const counter of this.scene.query(Counter)) {
        console.log(counter.value);
    }
}
```

虽然前端不能插入数据，但是前端可以不经过后端开接口就直接查询持久化数据。this.scene.query 类似于 GraphQL，就是一个通用的数据查询接口。这样后端只需要专注于控制数据的写入，数据的读取以及展示都是前端自己可以掌控的。你可能会担心这样的开放接口会不会有权限问题。这个在后面会有专门的权限介绍。

在 onList 里，Counter 这个类还承担了 response 状态的角色。我们不需要给 RPC 接口单独定义返回用的数据结构。你可能会担心后端给这样通用的接口，会造成 I/O 上的性能问题。针对这个问题后面也会专门有介绍。

这个例子想要说明的是：

* 持久化层的状态和界面状态是严格分离的，虽然前后端一体，虽然都是 javascript，但是并不意味着需要前后端复用同一个 model 定义。本质上前后端的 model 职责是不同的。
前端负责的是读，model 体现的更多的是如何呈现。后端不应该把数据封闭起来，应该允许前端任意组合查询。
* 后端负责的是写，model 更多体现的是发生过什么事情，如何发生的。前端必须通过后端接口的业务校验才能写入更新。

# 总结

在 TSM 里，没有组件状态，表单状态，数据库状态的区别。所有的不同技术实现的状态，都暴露出统一的 API。可以让前后端之间用更低的成本进行配合，减少沟通上的翻译成本。