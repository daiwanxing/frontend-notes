# javascript随记

## 事件循环

#### 什么是事件循环?

1. js引擎执行任务时，<del>永远不会进行渲染（render），这里是指的是重新绘制DOM树，仅当任务完成之后才会重新绘制（浏览器每执行完一次宏任务之后就重新绘制DOM树）</del> 会在每一轮事件循环结束后开始一次渲染界面操作，一次事件循环可能会有多个宏任务被执行到，也可能只会执行一个宏任务。具体因素会由页面性能、task的执行时长等来决定。<strong>并不是每次事件循环结束后就会渲染界面，如果本次事件循环结束后并不会带来视觉上的改变，那么浏览器会聪明的跳过渲染。如果两个宏任务都会触发相同的界面的回流重绘，且宏任务的执行间隔过小，那么一次事件循环结束后只会立即应用到第二个宏任务的操作</strong>.

提到事件循环就得说下`requestAnimationFrame`这个API，它能够精确得分配自己的执行时间时发生在下一帧的绘制前，当前帧快结束时分配任务（一般16.6ms 执行一次回调），确保用户看到绘制的每一帧都是最新的，是一个非常适合用来做动画的微任务。

关于事件循环的实现（浏览器HTML5定义的规范）：[https://html.spec.whatwg.org/multipage/webappapis.html#task-queue](关于事件循环规范)

2. 一个宏任务队列里包含着若干个微任务，也就是说每个宏任务执行之后，就先执行当前这个宏任务包含的微任务队列。微任务队列执行完毕之后，会触发一个render。紧接着再接着执行其他宏任务。宏任务是一个个的执行的，微任务是一队列一队列的执行的。我的理解，微任务是发生在其他宏任务（渲染DOM，事件，ajax）之前会被执行 <br />

有一个地方可能没有讲明白，关于UI的渲染时机：<strong>UI render的时机是发生在本次loop中task（宏任务）执行完毕后，紧接着执行jobs queue(微任务队列)中的所有job后，在下一个宏任务开始之前，本次微任务队列中的所有job结束之后开始render。</strong>

`宏任务 --> 微任务队列 --> render ui --> 宏任务...`

render ui的时机不总是在微任务队列结束之后，下一次宏任务开始之前。如果当前微任务队列需要获取最新的DOM信息，那么就会将之前队列里的操作（引起重绘重排的操作）任务全部执行，并立即发生一次渲染，比如调用`$(li).offsetTop()`来保证用户得到最新的布局信息。

看一段代码
```js
// 加载script，这个操作本身是一个marcotask(宏任务)
console.log('hello-world'); // 将宏任务中的同步任务优先放到主线程执行，打印：hello-world
// 执行Promise.resolve()，这是一个同步任务，then函数是一个异步任务，放入微任务队列
Promise.resolve().then(function () {
    console.log('resolve done!'); // 打印该语句微任务队列所有任务结束完毕，将会在下一个定时器任务执行之前开始render页面
    // 如果有这么一段代码
    $(li).offsetTop(); // 此时会将之前对DOM的所有重排重绘操作全部应用到DOM上，并且立即执行一次渲染，保证用户拿到是最新的布局信息
    // 也就是说不一定渲染的时机在微任务队列全部执行完后开始。
});

// setTimeout是一个定时器任务，交给定时器线程处理，当指定的时间到达后，转给事件处理线程将回调放入宏任务队列，下一次事件循环轮询的时候会取出该任务并执行
setTimeout(function () {
    console.log("setTimeout done");
}, 3000);
```


UI渲染时机图:<br/>
<img src="https://zh.javascript.info/article/event-loop/eventLoop-full.svg" alt="render-ui时机">

先来看一个例子

``` js
setTimeout(() => {
    alert("timeOut");
});

Promise.resolve().then(() => {
    alert("promise")
});

alert("code");
```
它们是如何执行的，或者说它们的执行顺序是什么？

首先，整个script作为一个宏任务执行，紧接着执行宏任务中的同步代码`alert("code")`（执行任务都是放在主线程中）,接着执行then函数里的callback，这是一个微任务。
前面我们提到过，微任务一定是在其他宏任务开始之前被执行，因为要确保microTask-queue中的每个micro-job的execute-enviroment是一致的。
执行完所有的微任务队列并出队之后，紧接着执行下一个宏任务，这里就是`setTimeout(() => (alert('timeOut'))`。

参考资料：<br/>
    [JavaScript.info之事件循环](https://zh.javascript.info/article/event-loop/eventLoop-full.svg)<br/>
    [一次搞懂JS运行机制](https://juejin.cn/post/6844904050543034376#heading-19)

::: tip 提示
如果宏任务队列为空，则js引擎会进入“休眠”状态。直到出现了宏任务，又开始了新一轮的事件循环。
如果需要执行一个耗时很长的计算任务，不应该阻塞事件循环，可以使用web-workers，这是在另一个并行的线程中去运行代码的方式。
:::

## Web Worker

上面提到了web worker，本篇说说web-worker是一个什么技术。

随着芯片的高速发展，现在的cpu动不动就是6核，8核甚至12核 以及 N * 2 个线程（N为核心数）。由于js是单线程，无法并行执行多个任务，根本发挥不出计算机的全部威力，而且有的计算任务特别耗时容易阻塞事件循环导致界面响应不及时，卡顿等。在这样的背景之下，web worker诞生了。

web-worker可以在后台执行计算任务同时又不妨碍到主线程的执行，web-worker会将计算的到的结果返回给主线程。

```js 
 // index.js
 let worker = new worker('worker.js'); // 得到一个worker的实例， 初始化worker.js脚本文本，有一个self的全局对象或者称之为this

 worker.postmessage("some info"); // 发送给worker脚本

 worker.onmessage = e => {
     console.log(e,data); // a ha
 };
```

```js
    // worker.js

    self.addEventListener("message", e => {
        console.log(e.data); // some info
    });

    self.postMessage("a ha");
````

::: warning 注意
1. web-worker是无法操作DOM的，BOM中只能操作navigator和location对象
2. web-worker受同源策略限制（分配给worker中运行的脚本资源必须与主线程同源）
3. web-worker不能使用confirm, alert, 可以使用ajax
4. web-worker一旦创建就会一直运行下去，除非手动释放
5. web-worker和主线程不在一个context，通过post-message进行通信
:::

## async - await

async是Generator 函数的语法糖

```js
    // 声明一个生成器函数
    function* foo (x) {
        yield x + 1;
        yield x + 2;
        yield x + 3;
        return x + 4;
        yield x + 5;
    }

    let bar = foo(100); // 返回的是一个生成器函数的实例
    bar.next();
    // { value: 101, done: false } 每次调用实例的next方法就会返回一个对象，包含了yield的值和是否可继续调用next
    // 执行到return语句的时候，剩下的yield不再执行
```

## 可选链和??的语法使用

可选链:  ?. chrome 80+支持

双问号: ?? chrome 85+支持

```js

const demo = {};

const res = demo?.name; // 如果demo.name存在返回demo.name的值，否则就是undefined

const subject = null;

const result = subject || 2; // 如果 ?? 前面的是null或者undefined则输出问号后面的值， 和 || 语法不同。

```

## import & export

ES6 带来了ES Module的特性，模块的功能可以让我们更好的解耦代码功能逻辑，共用且不会与其他模块变量命名冲突, 浏览器的模块加载不同于node中的模块加载，浏览器是异步加载各个ESM。


1. 导入的几种方式

```js
    // 导入的是module的默认导出
    import moduleList from "./module.js";

    // 导入的是module脚本中的命名变量：moduleA
    import { moduleA } from "./module.js"; 

     // 导入的是module的默认导出与命名导出moduleA
    import moduleList, { moduleA } from "./module.js";

    // 导入的module脚本所有导出（包括默认导出）到 allModule变量中
    import * as allModule from "./module.js"; 
```

2. 导出的几种方式

```js
    // 导出的是一个默认导出foo变量 
    export default const foo = 1; 

    // 导出的是一个命名导出bar变量
    export const bar = 2;

    // 重新导出命名导出，从module脚本文件导出moduleA再导出给其他模块
    export { moduleA } from "./module.js";

    // 重新导出默认的导出,
    export { default } from "./module.js";

    // 重新将默认导出命名为命名导出
    export { default as moduleA } from "./module.js";

    // 将命名导出改为默认导出
    export { sayHi as Default }

    // 重新导出所有的命名导出
    export * from "./module.js";
```

3. 模块相互依赖

在commonjs与Es Module中，模块与模块之前相互引用对方所带来的一系列变化是不同的。

什么是模块与模块相互引用？

```js
// bar.js
import foo from "./foo.js"

// foo.js
import bar from "./bar.js"
```

可以从上面两段代码看出，执行脚本bar.js第一行代码时, 找到foo.js并执行，执行foo.js，开始导入bar.js并执行。由此可看到两个脚本相互构成了一个模块依赖关系。

回顾之前学过的知识，在ES Module中同一个脚本一旦被import就会被cache，之后不管import N次都只会取出之前缓存的脚本. 所以在上面这个例子中，并不会构成一个import死循环的关系。

当执行bar.js时，es module静态加载解析特性，将所有可提升的变量提升到模块最顶层作用域。接着加载foo.js导入bar.js中的api，如果该api已经被初始化则可立即被执行。接着执行foo.js剩余可执行的所有代码后回到bar.js执行剩余的代码。

一句话总结：一旦某个模块被循环加载，只会输出已经执行了部分，没有执行的不输出。

在CommonJS中循环依赖也是类似的策略，唯一不同的是commonjs脚本是动态加载的，导出的api不具有变量提升特性。


## ES Module 和 CommonJS模块化的区别

ES Module是静态导入的，在预解析时就能分析代码，必须写在模块的最顶层，ES Module 导出的是一个只读的副本，如果导出的是一个基本类型的值的变量，那么我们无法对变量的值进行更改，如果导出的是一个对象，那么不能更改对象的引用。而Common JS则相反，在运行时加载文件，而且Common JS允许在各种判断语句中动态require相关模块，ES Module则无法完成。Common JS 的this指向的是当前模块的最顶层，ES Module的this是undefined（ES Module自动开启严格模式，common js不会）。

此外，commonjs中输出的是一个值的拷贝，一旦模块内部的改变了这个值，则不影响外部的变化。

## 在node中使用es module

在node版本>= 14，支持使用es module, 需要将文件名命名成`.mjs`表示是一个es module的文件，或者可以直接在项目的根目录下的package.json文件中，设置`type = "module"` 表示所有的js文件都是基于es module规范。此外如果想单独在某个文件使用commonjs，可以将该文件命名成`.cjs`表示一个commonjs module。

:::tip
因为es module允许顶级await的特性（ES Modoule的脚本支持异步加载，而cjs加载的脚本必须同步加载），所以不能在cjs文件里直接导入mjs的文件，但是可以在mjs文件里导入cjs的默认导出，不能导出其命名导出。这是因为CJS脚本和ES Module内部执行逻辑不同，CJS脚本只有在执行时才计算它们的命名导出，而ES Module要求在解析脚本时就确定命名的导出。
:::

## ES Module
import.meta 对象包含了当前模块的信息，在内嵌脚本中，import.meta.url是文档的链接, 而对于外部脚本，import.meta.url的值则是脚本的链接

每一个module都有一个顶级作用域、每个模块的this都是undefined, module会自动开启严格模式。

```js
// commonjs 模块导出语法
exports = {};

export.a = 132;
```
现在node.js中也能使用es module，需要后缀名为`.mjs`的脚本或者在package.json中指定type为module

## dynamic import 动态导入

`import()`表达式加载模块并返回一个promise, 用于实现动态导入

`尽管import()看起来像一个函数调用，但它只是一种特殊语法，只是恰好使用了括号（类似于 super()）。因此，我们不能将 import 复制到一个变量中，或者对其使用 call/apply。因为它不是一个函数。`

## defer 和 async

script标签有一个defer和async属性，其兼容性在2021年已经非常不错了(IE不支持)。

<img :src="$withBase('/defer.png')" alt="defer兼容性">

defer和async的出现的目的是为了防止js脚本阻塞DOM的解析，我们都知道渲染进程解析html文档生成DOM树时，如果遇到script标签，那么会停止解析。转而去加载js脚本并且等脚本加载完毕并且执行脚本完毕之后再去解析DOM，这样会徒增FP的渲染时间。一般通用的做法是将js脚本放到body最后面，这对于老旧浏览器是最优解，但是defer和async能够让我们有更多的优化。

defer 和 async 的加载都是异步的，不会阻塞DOM的解析，唯一的区别在于，async是下载完毕之后就会被执行，执行的顺序和书写的顺序不一定保持一致（根据网络带宽决定）。
而带defer属性的脚本是在下载完毕之后，DOMCONTENTloaded事件触发之前会被执行。

都说一图胜千言，下面搬运外网图片比较三种脚本的加载方式的特点：

英语好的同学可以直接看外网链接[async vs defer attributes](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

`各个不同色块的含义`

![legend](https://www.growingwiththeweb.com/images/2014/02/26/legend.svg)

```js
    <script src="xxx.js"></script>
    // 可以看到先是解析html，接着解析到script标签，暂停html的解析，去下载脚本
    // 脚本下载完毕之后开始执行脚本，等到执行完毕之后。继续解析后面的HTML
```
![script normal](https://www.growingwiththeweb.com/images/2014/02/26/script.svg);

```js
    <script src="xxx.js" defer></script>
    // 正常解析HTML，遇到script标签会异步下载
    // 等到HTML解析完毕之后，DOMContentLoaded事件触发之前执行脚本 
```
![script defer](https://www.growingwiththeweb.com/images/2014/02/26/script-defer.svg);

```js {3}
    <script src="xxx.js" async></script>
    // 正常解析HTML，遇到script标签会异步下载
    // 异步下载完毕之后会立即执行该脚本，执行脚本期间会阻塞HTML的解析
```
![script async](https://www.growingwiththeweb.com/images/2014/02/26/script-async.svg);

我们应该根据不同的场景去使用对应的属性：

* 如果某些脚本需要依赖上一个脚本执行，推荐使用defer
* 如果某些脚本想在下载完毕之后立即去执行，同时也不需要操作DOM也不依赖其他脚本， 推荐使用async
* 如果脚本代码很小，推荐直接使用内联脚本放在body最后面
* 注意，script如果是一个ES Module，其默认设置了defer属性
* 注意，script标签还有一个`nomodule`属性，表示如果浏览器不支持ES2015+, 则执行该文件，一般用作降级策略
* 注意，如果是内嵌脚本（没有src）属性，设置defer无效 (但是设置了type为module的内嵌模块有效)（async可以用于普通的内嵌脚本）

## weak-map 弱引用

Weakmap对象只能接受对象作为键名，值可以是任意类型，弱引用的意思比较抽象，我的理解是`键名`所引用的`对象`的弱引用，弱引用在计算机中中的概念是:<br/>
``在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收``。
在js中手动创建一个对象一般都是强引用

```js
let obj = {}; // 这是一个强引用，手动设置obj = null， 才有可能释放obj这个对象的内存
```
那么弱引用呢？

```js
let obj = {};
let weakMap = new WeakMap();
weakMap.set(obj, 123);
obj = null; // 注意此时weakmap对象的“obj”这个键名所引用的对象自动被释放了！！

// 如果是强引用，是不可能会被自动释放的
let obj = {};
let obj2 = {
    obj
}
obj = null; // 注意此时 obj2.obj所引用的仍旧是 {}
```
从下面的代码可以看出WeakMap,在键名所引用的对象的其他引用释放了内存后，WeakMap也能“聪明”的将该键名所引用的对象的内存给释放掉，键名也会随之自动消失。
这就称之为弱引用，WeakMap为什么不可遍历，是因为不知道GC何时会执行，每次GC可能会造成weakmap里的成员个数变动。

```js
// 在node环境下查看内存占用情况
node --expose-gc

global.gc(); // 手动执行一次gc
// 获取内存的单位 - MB
function getMb () {
    global.gc();
    const size = process.memoryUsage().heapUsed;
    console.log(size / 1024 / 1024);
}

let obj = new Array(1024 * 1024);

let map = new WeakMap();
map.set(obj, "hi");
getMb(); // 9.76MB

obj = null;
getMb(); // 1.96MB
```

## reflect 的作用

ES5中的Object对象有一个defineProperty属性，为JS语言提供了’元编程‘的功能，但Object这个对象太重了，有二十多个属性，而且’元编程‘操作不应该是一个Object对象应该做的事情，所以ES6单独设计出了proxy和reflect两个方法。Reflect主要是可以对对象进行’元编程‘，可以根据操作的结果返回一个布尔值判断是否操作成功；

::: warning 警告
Reflect和Proxy 都是由Object原型构造的，两者都不能派生（new）新的实例，它们都是一个全局的对象；
:::

## 发布订阅模式实现

```js
class EventMitter {
    constructor() {
        this.events = new Map();
    }
    on(name, handler) {
        let targetSet;
        if (!this.events.has(name)) {
            this.events.set(name, new Set());
        }
        targetSet = this.events.get(name);
        targetSet.add(handler);
    }
    emit(...args) {
        let name = args[0];
        let targetSet = this.events.get(name);
        if (targetSet) {
            targetSet.forEach(handler => handler.apply(this, args.splice(1)));
        }
    }
    off(events, handler) {
        // 没有任何参数，取消该实例的所有的监听
        let eventMap = this.events;
        if (!arguments.length) {
            eventMap.forEach(setList => setList.clear());
            eventMap.clear();
            return;
        }
        if (Array.isArray(events)) {
            for (let index = 0; index < events.length; index++) {
                this.off(events[index], handler);
                eventMap.delete(events[index]);  
            }
            return;
        }
        let eventSet = eventMap.get(events);
        if (handler) {
            eventSet.delete(handler);
        } else {
            eventSet.clear();
        }
    }
}
```

## cookie 操作

cookie是由服务端响应给浏览器的，一般只有同源的情况下，浏览器才会自动保存cookie信息，如果需要跨域也能保存响应头的cookie信息。则服务器需要设置：

`Access-Control-Allow-Origin:  前端项目的域名`,`Access-Control-Allow-Credentials: true`,浏览器在请求的时候设置`withCredentials: true`,
对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为“*”。否则该请求将会失败。

通过调用`document.cookie`方法我们可以一串包含所有cookie信息的字符串，也可以通过该属性对某个cookie属性进行设置，<strong>每次调用document.cookie只能对一个cookie进行设置或更新，同时对多个cookie属性进行设置则会导致静默失败。</strong>

如果要删除一个cookie，直接将max-age设置为0或者-1即可删除，如果对expires进行设置过去的时间，则会在当前页关闭后清除，保留在本次会话中。如果设置cookie的时候没有定义expires/max-age，则cookie会在对话结束之后过期。

[更多资料请点击MDN-cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

## 子元素滚动到顶部或者尾部如何防止父元素也滚动？

一般这种业务场景出现在一个具有滚动条的浮层侧边栏，以及父元素body也有滚动条，那么我们在浮层侧边栏上滚动到顶部或者尾部，此时就不能再继续滚动条了，但是body会开始进行滚动，这就是浏览器的默认行为。

而我们为了更好的用户体验，希望子元素滚动到顶部或者尾部时，禁止body滚动。那么需要借助js来帮我们完成这个交互逻辑。

pc端的解决方案参考了[张鑫旭-父子滚动-pc](https://www.zhangxinxu.com/wordpress/2015/12/element-scroll-prevent-parent-element-scroll-js/),
移动端同样如此：[张鑫旭-父子滚动-h5](https://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/?shrink=1)

另外需注意：`mousewheel`是一个非standard的属性，而且已经被deprecated,非Gecko浏览器都实现了它，建议用wheel事件替换
```js
$(element).wheel(function () {}); //  注意mousewheel在firefox的类似事件名为DOMMouseScroll
// 其实有一种歪路子，当我子元素滚动的时候，我干掉父元素的滚动条，不就行了吗，当子元素消失的时候，
// 再让父元素滚动条出来，但是这种办法适用于浮层的情况，可以遮掉body的滚动条，用户本身就看不到，也不会有何影响。
// 所以这不是一种较为完美的解决办法
// 最好的移动端办法是，借助touchmove, touchstart 和 touchend
// touchStart获取第一次记录的触摸位置信息，判断是否往上走（负值）且滚动的位置已经到了底部，就执行默认事件，禁止父级和子级滚动
```

## JavaScript 原型链

在javaScript中每一个对象都有各自的prototype，借助原型，我们可以访问自身没有拥有但是原型链上拥有的方法和属性实现委托。每一个函数都有一个prototype属性，每一个对象都有__proto__属性（非标准，浏览器私有属性），__proto__指向的事创建该对象的构造函数的原型。

那么接下来讨论一个老生常谈的问题，当我们在new一个构造函数时，js引擎内部发生了什么？

1. new 关键字，意味着对一个函数进行’构造调用‘，首先会创建一个新的对象，新对象的prototype指向了这个构造函数的原型
2. 执行函数体，构造函数的this指向了新创建的对象
3. 执行完毕后，如果没有显示return，则return新创建的对象。

实现一个instanceof吧！

```js

 // 例子
 const obj = {};
 obj instanceof Object; // true

function isInstanceOf (origin, target) {
    let prototype = Object.getPrototypeOf(origin);
    let isTrue = false;
    while (prototype != null) {
       if  (prototype !== target.prototype) {
           prototype = Object.getPrototypeOf(prototype);
       } else {
           isTrue = true;
           prototype = null;
       }
    }
    return isTrue;
}
```

## js __proto__

__proto__的值必须是对象或者null， 否则会被忽略掉，(本质上__proto__就是一对getter和setter)
```js
const obj = {};

obj.__proto__ = 1; // 先检查obj自身或者原型链上是否存在同名的属性，此处可以访问到原型链上的__proto__
// 之前提到过__proto__本质上是accessor，对其执行setter，会验证值的类型，如果合法，允许赋值。
// 不会在obj对象自身创建同名的__proto__属性。（如果原型链上没有__proto__），则对象自身会创建一个同名的属性。
```

`__proto__`是浏览器的私有属性，过去没有一个方法可以获取到对象的原型，所有各大浏览器厂商在对象身上实现了`__proto__`获取对象的原型，
从ES6开始该属性已经被更好的`getPrototypeOf`取代，但是为了兼容性考虑浏览器必须实现`__proto__`，在非浏览器上该属性是可选的。

`__proto__`不是一个对象的属性，是`Object.prototype`的访问器属性。也就是`Object.protype`属性的getter / setter;
`__proto__`是一种访问`[[prototype]]`的方式，而不是`[[prototype]]`本身。

1. `Object.create` 创建一个空对象，该对象内部的`[[protoType]]`会链接到prototype

## js栈空间和堆空间

js中变量存储在栈中，对象存储在堆中。栈空间只是保留了堆中的地址，堆空间很大，可以放很多的数据，栈空间较小，一般存放一些原始类型的数据。

然后说说闭包，闭包的定义： 一个函数有权访问另一个函数作用域中的变量，那么闭包中访问的变量是咋存放的，当执行一个函数时函数内部的变量被其他函数所访问，闭包就产生了:clourse(a), 由于函数b中访问了b1这个变量，那么a执行完毕后，b1这个变量还是需要被b函数访问，不能释放，会存放到堆中。直到被调用才会释放。

```js
function a () {
    var b1 = 123;
    return function b () {
        return b1;
    }
}
```

## 中断异步任务

js 有个特殊的内置对象用来中断异步任务： `AbortController`,

通过`new AbortController()`生成一个控制器实例, 该实例具有一个属性： signal和一个method: abort()


```ts
const abortController = new AbortController();

const signal = abortController.signal;

abortController.abort(); // 执行中断方法
signal.addEventListener("abort", fn); // 监听abort的事件，执行回调
signal.aborted; // 返回一个布尔值，表示是否被中断
```

与fetch请求深度集成，通过调用fetch传递第二个配置参数对象中的signal属性，来中断fetch请求。（fetch会监听signal的值）


## requestIdleCallback 更精细的任务调度API

在js引擎处于<strong>空闲</strong> 状态时才会执行回调，空闲的字面意思是指本轮事件循环中主线程同步任务执行完毕了，且任务队列里的异步任务也一并执行完成了。它的任务调度优先级很低，一般用来在空闲时处理一些其他的额外的任务，进行更精细的任务调度,避免在主线程“拥挤”的时候执行某些代码。它支持你设定一个超时参数timeout，如果在timeout后仍未执行该回调，则在下一次事件循环中空闲时期下强制执行。
```js
    window.requestIdleCallback(deadline => {
        console.log(deadline);
        // deadline有一个属性叫didTimeout， 就是判断是否是超时执行的
        console.log(deadline.timeRemaining());   
    }, {
        timeout: 40000
    })
```

## JSON.parse

`JSON.parse`方法解析一个形如对象的json字符串的时候，会过滤掉其属性的值为undefined、function以及symbol类型的属性

`JSON.stringify`接收一个对象进行JSON转换时，会对其对象的属性值为`undefined`、`symbol`、`function`的属性直接过滤掉,

```js
const data = { name: undefined };

const json = JSON.stringify(data); // `{}`
```
当然我们也可以给对象声明一个`toJSON`的属性，其值是一个函数，`JSON.stringify`会调用该方法根据得到的返回值进行转化, `toJSON`存在的目的是为了能在某些无法解析值的场景下返回一个适当的值， 此外`JSON.stringify`接收第二个参数replacer，将对象中每一个即将被序列化的值进行转换。

```js
const data = { name: undefined, toJSON () { return { name: "david" } } };

const json = JSON.stringify(data); // `{ name: 'david' }`
```


## 为什么各大浏览器厂商都未实现尾递归调用优化？

尾递归调用是TC39在对ES2015上新增的一个特性，其目的是当一个函数仅在return 一个function的时候，保证其调用栈永远只会保留一个，提升了性能。但是前不久在阅读DC的新书<<JavaScript悟道>>一书中提到尾调用优化这个方案除了apple自家的safari浏览器实现了之外，其他各大浏览器均未实现该特性，理由是认为该特性在某些情况下会出现问题而拒绝实现。在知乎上也寻找到了相关的问题：[DC 的新书《JavaScript 悟道》里面讲了很多尾递归优化，可 TC39 不是已经判其死刑了吗？](https://www.zhihu.com/question/473997712)，不知在未来这个特性是否被永久删除。


## webGL 和 canvas 的区别 

canvas是HTML5推出一个具有绘图功能的画布，可以通过`getContext('2d')` 或者 `getContext('3d')`获取2d或者3d渲染上下文，其中3d是通过凭借webgl的渲染能力实现的。


## 如何获取css中的transform属性的值

假如我们有这么一行代码:

```ts
const el = document.querySelector(".box");
el.style.transform = `translateX(100px)`;
```
我们想通过js去得到el的translateX的值，可能很多人想到了可以直接`el.style.transform`拿到这个属性的值，但是可惜拿到的是一大串字符串，而且必须得
使正则去匹配花括号里面的值还要转换成number类型，较为麻烦。

于是我通过浏览stackOverflow得到一个更为优雅得办法，那就是使用`WebKitCSSMatrix`这个构造函数生成一个4*4的3D矩阵实例，它接收一个DOM对象，
并可以直接访问DOM对象的X,Y,Z轴的变换值。 

:::tip 提示
3D矩阵都是 4 * 4, 而2D矩阵则是3 * 3
:::

```ts
const matrix = new WebKitCSSMatrix(el);

matrix.m41; // 得到了translateX的变换值
```
你可能会好奇m41是个什么属性？为什么能拿到translateX的值?

前面我们提到WebKitCSSMatrix生成的是一个4*4的3D矩阵，4 * 4代表了4行4列，而translateX表示的是第四列第一行的坐标（也就是m41）,
而同样的translateY表示的是第四列第2行所在的坐标（也就是m42），下面有张图清晰的说明了这个偏移值所在的3D矩阵的坐标点。

![3D矩阵各个transform属性所在的位置](https://i.stack.imgur.com/QQX5V.png);


## delete操作符

delete操作符可以删除对象的一个属性（前提是该对象的属性是可配置的).
如果删除的操作成功， 则返回布尔值true, 否则返回false（如果要删除的属性不在对象自身，仍会返回true）

```ts
const obj = {
    name: "lucy"
};

delete obj.name // true
obj.name; // undefined

Object.defineProperty(obj, "gender", {
    configurable: false,
    value: 12
}); 

delete obj.gender; // false
obj.gender; // 12
```

如果对数组的元素进行delete操作则不会改变数组的长度, 只会删除数组下标属性的值, 留出一个空槽

```ts
const fruitList = ["apple", "pear"];

delete fruitList[1]; // true

fruitList; // ["apple", empty * 1];
```

## 生成器
 
生成器函数是一个特殊的函数，其最为强大的功能可以暂停/恢复函数内部的代码的运行。

1. 创建一个生成器 通过`*`标志创建一个生成器函数，执行该函数返回一个迭代器对象

```js
function *foo () {
    // 其中 yield关键字表示当迭代器解析到这行代码时暂停执行
    // 并且只有当调用下一个next时恢复这行代码的执行，直到遇到下一个yield关键字为止
}

const it = foo();

it.next(); // { value: undefined, done: false }
// 第一个next 只是为了负责启动生成器函数，当执行到一个yield时阻塞函数体内的代码的执行, 此时next函数返回的是yield关键字 后面的表达式的值，如果yield关键字后的表达式为空，
// 则value的值是undefined { value: undefined, done: false }
it.next(); // { value: undefined, done: false }
// next的最后一项的值，会作为生成器函数return的值， 如果没有显示指定return的值，则最后一个调用next函数所传递的值会被丢弃，return隐示的值是undefined
it.next();
```

2. 规范和所有兼容浏览器都会默认丢弃传递给第一个next的任何东西，因此第一个next只是负责用来启动生成器，不应该对其传递任何参数。
通常有个规律，next函数的调用次数 = 声明yield关键字的次数+1.
