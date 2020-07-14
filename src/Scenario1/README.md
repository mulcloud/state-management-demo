# 简单表单

这个例子实现了如下功能

* 前端表单，收集到用户的输入
* 表单的输入会触发界面的部分更新
* 后端提供 rpc 接口，并提交表单到后端

使用 TSM 相对于用 Vue + Java，有如下收益

# 对写法的强约束

TSM 的目标是完全接管系统中各个部位的状态，是一个强约束的框架。这种对写法的强约束使得人员可以很快找到对应的代码在哪里，并切方便人员在不同小组之间的流动。顶层的目录结构

* app 编译出来的前后端代码，和 application 目录一一对应
* application 你定义的这个系统分多少个 app，至少应该包括前端一个 app，后端一个 app。同时一些固定的 conf 可以放在 app 的 src/conf 下
* build / esm / lib / stub：这四个是构建的中间产物
* src 源代码只能写在这里
* triones.json 代替了 package.json

在 src 目录下，代码也不是可以随意放置的，而是要遵循严格的规范

* Scenario1 / Public 其中 A / B 这个部分代表了业务领域划分。比如 Merchandise / Sell 或者 Security / Auth 这样的命名。Public 代表这里放的是后端可公开查询的数据
* Scenario1 / Private 其中 Private 代表了后端不对外公开查询的数据
* Scenario1 / Ui 这里是前端的数据
* 在 Public / Private / Ui 下可以再分子目录来表示进一步的分类

从 src 的目录划分可以看出 TSM 和 RoR 的区别。

TSM 是一个把前后端代码放在一个大工程下的写法。Ui 对应的后端代码应该放得更靠近一些，以体现两者之间的密切协作关系。
RoR 的顶层目录不是业务领域，而是 Controller / Model 这样的业务无关的分类。

# 业务逻辑与样式分离

和 Vue 一样，提供了对表单状态的直接支持。*.tm 文件和 *.ts 文件一一对应，呈绑定关系。

* `<Input :value="&name" />` 双向绑定的用法。绑定到对应 ts 文件里的 name 字段
* `<button @onClick="onMinus">-</button>{{ value }}<button @onClick="onPlus">+</button>` 单向绑定，由业务代码自己控制 command 如何处理

和 Vue 不同的地方在于，TSM 规定了 tm 可以写什么，ts 可以写什么，而不是随意发挥。在 tm 文件中无法写表达式，如果需要绑定的数据需要经过 transform，需要把对应的逻辑写到 ts 里。

```ts
public get square() {
    return this.value * this.value;
}
```

这种写法的坏处显然是不如 vue 自由，好处是可以保持 tm 里没有任何业务逻辑。这样我们做单元测试的时候，可以直接构造一个 ts 里的 MarkkupView 实例，就能对页面上所有的业务逻辑进行测试。

# 简化前后端通信

前端把用户在表单里填写的内容，通过 RPC 接口传递给后端。因为 TSM 把前后端代码囊括在了一个项目里，所以在前后端通信这个应用场景下可以节省大量传统上在两侧的工程里需要写的声明定义。

```ts
import * as Biz from '@triones/biz-kernel';
import { CounterForm } from '@app/Scenario1/Ui/CounterForm';

@Biz.published
export class SaveCounter extends Biz.Command {
    public run(form: CounterForm) {
        console.log(`save ${JSON.stringify(form)}`);
    }
}
```

后端只需要定义一个 Command，就提供了一个前端可以 call 的 RPC 接口。同时可以直接把前端表单做为 RPC 协议的结构体。

* 简化了 RPC 的样板代码
* 前端可以把自己的本地状态直接传给后端，而不用手工复制一份

# 总结

使用 Vue / GraphQL 等技术搭好脚手架也能达到同样的效果。TSM 相比之下节省了你的技术团队自己摸索这个最佳组合方案的时间，也统一了项目代码的风格，方便人员的换组。