# typescript 随记

## 介绍typescript

1. typescript是javascript的超集，ts并不是一门的新的语言，它在js的基础上为js带来了只有静态语言拥有的相关特性，例如：泛型、类型检查、类型推断、接口以及多态、重载等等。

2. typescript 需要通过ts compiler 将其编译成js文件，在webpack中我们需要借助ts-loader将其编译成js文件.

3. 使用ts进行项目开发可以得到严格的类型检查，确保在开发的过程中能够及时发现数据类型不一致等低级的错误bug.


## typescript 类型注解

```ts
// interface 描述了一种“填鸭式“的数据结构
interface People {
    name: string
}

let numberScore: Array<number>;

let a:number = 123; // 声明变量a的值必须是一个number类型
let b:string = 'harmony'; // 声明变量b的值必须是一个string类型
let c:People = {
    // 要求变量c的值必须是一个people类型，且实现people类型下的name属性
    name: "dwx"
}
// 定义变量d的值必须是一个函数，而且该函数需要返回一个string类型的值
let d: () => string = function () {
    return 'foo'
}
```

## tuple

数组是将同一类型的数据聚合到了一起，而tuple(元组)定义了数组中不同类型的数据，

```ts
const tuple: [number, string] = [0, '1']; // 定义了tuple数组只能接收number和string两种类型的数据
```

## interface

接口类似于‘鸭子类型’或者‘结构化类型’，给定一个变量声明其属于某个interface，需要实现interface中定义的相关属性

```ts
interface Duck {
    readonly duckType: 'gray' | 'white', // 定义duckType为只读属性，而且类型只能是gray或者white
    age: number,
    gender?: string, // 可以不指定gender
    quack: (x: number, y:number, z?: number) => number // 定义 一个quack方法，返回的是一个number类型
}
``` 


## 类型推论

在typescript 中，如果没有明确指定值的类型，那么ts会自动推断出该值的类型

```ts

let name = 'foo' // string 自动将name推断成string类型，如果尝试赋值其他类型的值会编译失败

name = 1; // error 
```

## 联合类型（union）

```ts
let midType = string | number; // 指定midType可以是string也可以是number
```

## 交叉类型: 多种类型的集合

```ts
type Male = {
    name: string;
    sex: "male";
    age: number;
}

type FeMale = {
    name: string;
    sex: "female";
    age: number
}

 //注意，如果有相同的属性，但是类型不同，则交叉得到的是一个never类型, 这里的People是一个Never
type People = Male & FeMale;
```

## 类型断言：手动指定一个值的类型

可以通过`as`关键字断言一个值的类型；因为某些时刻开发者比ts更清楚的知道值的类型，所以可以通过as断言成我们想要的类型

```ts
let image = document.querySelector("#img");
// 尝试访问 image.src tslint 会报错， 因为image被推断成了Element类型，Element未实现src属性
// 开发者比ts更清楚的知道这是一个image标签，可以断言成HTMLImageElement类型
let image = document.querySelector("#img") as HTMLImageElement;
```

## 类和接口

ts 中对类定义进行了增强 （public, private, protected）

## implements 实现接口

interface将一些共性的东西抽取到接口中，通过类的implements 实现该接口

```ts
class Car {
    readonly videoName: string; // videoName是一个只读的属性
    constructor (name: string) {
        this.videoName = name;
    }
    playVideo () {
        console.log('play video: ', this.videoName);
    }
    pauseVideo () {
        console.log('pause video: ', this.videoName);
    }
}

class CellPhone {
    videoName: string;
    constructor (name: string) {
        this.videoName = name
    }
    playVideo () {
        console.log('play video: ', this.videoName);
    }
    pauseVideo () {
        console.log('pause video: ', this.videoName);
    }
}
```

Car和CellPhone两个类都具有播放video和暂停video的方法，应该将公共的功能提取出来，方便维护扩展，但是Car和CellPhone并没有相关联的联系，
也无法将播放video和暂停video的方法提取到一个彼此的父类中。我们可以通过将其定义到interface来实现复用。

```ts {8,21}
interface Video {
    videoName: string,
    playVideo(): void,
    pauseVideo(): void
}


class Car implements Video {
    videoName: string
    constructor (name: string) {
        this.videoName = name;
    }
    playVideo () {
        console.log('play video: ', this.videoName);
    }
    pauseVideo () {
        console.log('pause video: ', this.videoName);
    }
}

class CellPhone implements Video {
    videoName: string;
    constructor (name: string) {
        this.videoName = name
    }
    playVideo () {
        console.log('play video: ', this.videoName);
    }
    pauseVideo () {
        console.log('pause video: ', this.videoName);
    }
}
```

使用implements关键字可以实现多个接口

```ts {5}
    interface Battery {
        chargeBattery (chargeVal: number):number
    }

    class CellPhone implements Video, Battery {
    videoName: string;
    constructor (name: string) {
        this.videoName = name
    }
    playVideo () {
        console.log('play video: ', this.videoName);
    }
    pauseVideo () {
        console.log('pause video: ', this.videoName);
    }
    chargeBattery (val: number) {
        return val;
    }
}
```

## 接口继承

在typescript中，接口也能实现继承

```ts
interface Ball {
    shape: String
}

interface Light extends Ball {
    color: string
}
```
<strong>注意，接口在继承时如果继承的接口和被继承的接口属性名相同但类型不同，则无法继承，并不会出现后者覆盖前者的情况</strong>

```ts
interface Ball {
    shape: String
}

interface Light extends Ball {
    color: string;
    shape: number // Types of property 'shape' are incompatible
}
```
接口也能实现交叉类型，也请注意，如果两个交叉的接口如果有相同的属性名但类型不同，则会被视作never类型

## 枚举

```ts
enum Direction {
    Top, // 0
    Left, // 1
    Right, // 2
    Down, // 3
}
```

使用枚举可以限定值的访问范围，在Direction枚举常量中只能访问Top,Left,Right以及Down，初始值默认是从0开始依次递增1

```ts
Direction.Top; // 0

Direction[0]; // Top

// 我们也可以给枚举的属性分配常量值

enum Direction {
    Top = "Top",
    Left = "Left",
    Right = "Right"
    Down = "Down"
}

// Direction.Top // Top 可以被正确推断Direction.Top的值是一个字符串类型的值
```

枚举的值有两种类型，一种是常量值，一种是计算值，常量枚举要比普通枚举性能更高, 在编译时会直接被删除, 常量枚举不能使用计算属性。

## 泛型

泛型可以根据传入类型，推断返回的数据类型，也就是说用户输入的类型是什么，那么可以动态推断返回的类型

### 函数泛型
```ts
function eat<T, U> (food: T, who: U, taste: string): [U, T, string] {
    return [who, food, taste]
}

let result = eat("面条", "小明", "不好吃");

// 泛型不指定，也能被推断
function Print<T, V extends keyof T = keyof T>(printHandler: T, msg: V): void {
    // msg会被推断成一个string类型, 并且约束了string类型的值得范围是T的所有的任一键名
}

Print({ name: "dwx" }, "name");
```

泛型约束，约定一个泛型T具有某些属性
```ts
interface Length {
    length: number,
    replace: Function
}

function checkPoint<T extends Length>(name: T): void {
    // T是一个任意类型， name不一定是一个string类型，那么也就不一定具有有length属性
    name.replace("v", "");
}

checkPoint("hello");
checkPoint(123); // ERROR
```

### 泛型类

```ts
class Computer<T> {
    print (text: T) {
        return text;
    }
}
let notebook = new Computer<string>(); // Computer的类型是string
let Cres = notebook.print("lorem");
```

### 接口泛型

在下面的KeyPair接口中，我们无法事先确定key 和 value的类型，可以通过泛型，通过传入的参数动态确定key和value的类型
```ts
interface KeyPair<T, U> {
    key: T,
    value: U
}

// 指定key为string类型， value为number类型
let json: KeyPair<string, number> = {
    key: 'name',
    value: 9587
}
```

## 声明文件(d.ts)

当我们使用第三方库时，需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。如果一些三方库没有自带声明文件时，我们需要自己手动编写d.ts文件，当然大多数第三方库一般可以通过`npm install @types/xxx --save-dev` 下载安装声明文件。

```ts
// jQuery.d.ts 一个简单的【jQuery声明语句，声明文件在生产环境时不会被打包，仅用于开发项目时的编译提示
declare const $: (selector: string) => any;

// 或者

declare function $ (selecotr: string): any;
```

在声明语句中只能定义类型，不能定义具体的实现

```ts
declare function $ (selecotr: string): any {
    return document.querySelectory(selector); // ERROR
}
```

在声明文件里也可以用到函数重载
```ts
declare function $(selector: string): any
declare function $(domReadyCallBack: () => any): any
```

可以在声明文件对`class`进行类型声明
```ts
declare class Animal {
    name: string;
    constructor (name: string);
    sayHi(alertMessage: string): void
}
```

## 仅限类型导入导出

ts3.8新增的一个特性，ts文件中可以设置仅导入导出类型, 有了这个特性后，当我们导出一个类型如果被当作变量使用就会报错

```ts
import type { ICardCollection } from './type'; // 仅导入ICardCollection这个类型


ICardCollection(); // 错误，ICardCollection是一个类型，而被当作一个值来使用

// ts中的类型导出和变量命名导出是可以同名的， 但是同时导入他们的话要为其中一个起别名

export type gender = "male" | "female";  // 仅导出类型

export const gender = "male";
```

类型导入会在运行时将其"擦除"，不会留下任何代码，而且仅导入导出的声明语法能够让别人一目了然导出的是个类型。

另外再看一个例子

```ts
import { ICollection } from "hook.ts"

export {  ICollection }
// 没有人知道ICollection到底是个类型还是变量，连ts编译器也不知道是不是要在编译的时候删除它。所以不够好，才出来了类型导入这个功能
// 具体看这个链接 https://segmentfault.com/a/1190000039800522?utm_source=tag-newest
```

## interface和type的抉择

interface 和 type 在大多数情况下是非常相似的，但是也有很多区别， type 一旦被创建之后，就不允许被继续扩展了。而interface恰恰相反

for example:

```ts
interface Person {
    name?: string;
}

interface Person {
    age?: number
} // no error

type Person = {
    age?: number;
}

type Person = {
    name?: string;
    // error Duplicate identifier 'Person'.ts(2300)
}
```

interface更适合对一个大的对象每个属性类型进行约束, 以及继承别的接口进行扩展。而type适合确定某个变量的类型，以及使用union 进行类型收窄。

## Keyof 操作符

将一个对象的所有的键名映射成一个联合类型

```ts
interface Man {
    name: string;
    age: number;
    length: number;
    weight: number;
    power: number;
    married: boolean
}

type Ali<T> = {
    [property in keyof T]: string;
}

const lihua: Partial<Ali<Man>> = {
    name: "lihua"
}

```

## Typeof 操作符

```ts
let a1 =  "dsa";

let b1: typeof a1 = "string type";

// 这里的a1是一个常量，它的类型被infer成了string; 

type Ta1 = "stringType"; 
typeof Ta1; // 得到的一个“stringType” 的字面量类型
```

typeof 用在基本类型推断有点鸡肋， 搭配其他内置类型一起使用作用最大，例如 ReturnType内置类型，这个内置类型接受一个函数类型T，并且返回T的类型，
然后我们可以搭配typeof操作符一起使用


```ts
function printAll (): string {
    return "hello print";
}

let c1: ReturnType<typeof printAll>;
```


## TS 公共类型（Utility Types）

TypeScript 提供内置的公共类型用于常见的类型转换

1. `Partial<T>` 让一个结构化类型中的所有参数变得可选

```ts
interface Todo {
    title: string;
    desc: string;
}

let todoList:Partial<Todo> = {
    title?: string,
    desc?: string
}
```

2. `Omit<type property>` 屏蔽类型中的某个属性

3. `Required<T>` 要求泛型T中所有的属性需要被设置

```ts
interface Todo {
    title?: string;
    desc?: string;
}   

let todoItem:Todo = {}; // pass

let todoItem:Required<Todo> = {}; // ERROR
```

4. `Readonly<T>`

```ts
// 构造一个类型，type身上的所有的属性变为只读，意味着初次分配后 不能再重新分配新的类型
let readOnlyTodo:Readonly<Todo> = {
    title: "今日清单",
    desc: "2021/7/29"
}

readOnlyTodo.title = '123'; // error 不能再重新赋值
```

5. `Pick<T, K>`

<del>怎么感觉有点像Omit类型 ？</del> 从类型T里面选择一个property 或者一个union type

还是有一定区别，Omit类型是屏蔽某个或多个key，而Pick只选择某个属性（Omit取反）

```ts
let pickTodo:Pick<Todo, 'title'> = {
    title: 'xxx'
}
```

6. `record <K, T>`

构造一个对象类型，属性的键名必须是keys(或者keys如果是js内置类型，则必须是该类型的属性名， 
众所周知，js对象的属性名的类型是string或者symbol，也可以是number，但是number最终还是会转换成string)，属性的值的类型必须是Type


```ts
interface CatInfo {
    age?: number;
    breed?: Record<CatName, CatInfo>;
  }
   
type CatName = "miffy" | "boris" | "mordred";

let plainObject:Record<CatName, CatInfo> = {
    miffy: {
        age: 123,
        breed: {
            miffy: {
            },
            boris: {
            },
            mordred: {
            }
        }
    },    boris: {},
    mordred: {
    }
}
```

7. exclude `<Type, excludeUnion>` 字面意思就是排除的意思，构造一个类型 T, 该类型将排除union中指定的类型

下面的示例中，将type中定义的三个字面量类型中的c进行排除

```ts
type tempExclude = Exclude<"a" | "b" | "c", "c">;

let ab:tempExclude = "a";
```

8. parameters `<T>`

提取一个函数的所有形参的全部类型并构造一个元组类型，会过滤掉所有的never类型

```ts
type MyParameters = Parameters<(name: string, age: number) => void>; // 构造一个元组类型，元组数组的类型为参数的类型

// type MyParameters = [name: string, age: number]
```
到现在关于Exclude和Extract的概念还是比较模糊的，

Exclude 字面意思是排除，接受两个参数 T, U, 从T中找到<strong>不extends U</strong>中的类型，并将其返回(返回U中有但是T中无的类型)

Extract 字面意思是提取, 接受两个参数 T, U, 从T中找到<strong>extends U</strong>中的类型，并将其返回


9. ThisType

ThisType`<T>` 

## unknown 和 any

any表示任何类型，如果给一个变量赋值unknown类型，那么意味着操作该变量做任何事情都是违法的,unknown比any更加安全，

unknown 类型的变量可以重新被赋值其他类型, unknown类型 一般表示目前不清楚该变量的类型，但是将来会确定该变量的类型。

## never

表示永远不会返回一个基本类型或者引用类型，一般在函数里死循环或者函数throw error， 是所有类型的`bottom`也就是兜底类型， never在TS中常用来做类型收窄。 never类型不能被其他任何类型赋值

## abstract 抽象类

abstract即为抽象类， 如果你不想为一个类创建实例，可以通过abstract关键字声明一个抽象类，抽象类只能被继承，不能通过new 关键字创建该类的实例，在抽象类中可以定义抽象方法，抽象方法类似一个简单的声明，具体如何实现这个方法由各个子类去实现。

```ts
// 声明一个抽象类
abstract class Animal {
  constructor (public readonly animalType: string) { }
  abstract voice (): void  // voice是一个抽象方法，这里只是进行简单的定义，每个动物的叫声都不一样，所以具体的实现由各个子类去完成
}

// 如果想通过new 关键字 实例化抽象类是会报错误的 

new Animal("cat"); // Cannot create an instance of an abstract class.(2511)

// 抽象类 类比做一个蓝图， 构建一个抽象的事物大致需要的动作、行为、属性
// 实现该抽象类
class Cat extends Animal {
    // 公共的属性，在子类、实例中都能访问
    public name: string;
    // 保护属性，只能在子类或者父类中访问，无法在实例中访问
    protected age: number;
    // 私有属性, 只能在当前类中访问
    private gender: number;
    constructor () {
        super("cat");
    }
    voice () {
        console.log(this.animalType + ": voice 喵");
    }
}
```

## declare namespace
最近在用高德地图的时候研究其类型声明文件（d.ts），遇到了以前从未用过的`declare`关键字，通过查阅官方文档查阅得知 通过 `declare` 关键字声明的变量会被视作为一个全局变量/函数/类
例如


```ts
    declare const model
    declare const model
    declare namespace model
    declare class model
    declare function model
```


## Indexed Access Types 索引访问类型

```ts
type Person = { age: number; name: string; alive: boolean };

type I1 = Person["age" | "name"]; // 可以根据索引获取其类型

type I2 = Person[keyof Person]; // keyof 用于获取Person的所有键名： age |  name | alive ， 然后可以通过索引访问类型获取键名对应的类型

type InsertAliveName = "alive" | "name"; // 声明 InsertAliveName 的字面量类型 “alive", "name"

type I3 = Person[InsertAliveName]; // 获取这个两个字面量对应的索引类型

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
 
type PersonOne = typeof MyArray[number]; // { name: string; age: number }  此处的number代表数组的索引签名是number类型

const key = "age";
type Age = Person[typeof key]; // Person["age"]

```


## 非空断言

非空断言是typescript特有的一种语法，将某个值的值域中排除null 和 undefined

举个栗子

```ts
type Prop = {
    name: (() => void) | null
};

const definePro:Prop = {
    name: null
};

// 此处definePro.name 可能是 null 也可能是一个函数，所以通过非空断言将null从值域中排除，只剩下函数这种类型
definePro.name!();
```

<strong>该语法只在ts文件被编译前可以使用，和ES6+ 的 `?.` 有明显的区别，切勿混淆</strong>

## TS三种类型来源和三种模块语法 
一般的，当我们声明一个type可以在ts文件里通过type或者interface关键字来进行类型定义。当然除了这种声明方式之外，我们还可以通过`declare`关键字给变量声明类型。

如下代码，当我们使用printHello函数时，可自动得到参数的类型。

```ts
declare function printHello (msg: string): string;
```
当我们使用内置的API, 例如`window.requestAnimationFrame`，这些BOM API的类型通常存在一个lib目录，里面有大量的lib.d.ts文件，这就是ts内置的类型声明文件。

可以通过在`tsconfig.json`文件中的compilerOptions中的lib字段让typescript选择加载哪些Lib, ts内置的类型通常只包含es和dom。

但是当我们开发node的项目是没有内置的dts文件来获取类型提示的，可以通过@types/node下载node类型包，并在tsconfig.json通过types字段让ts查找@types包下的类型声明。

如果是在*.d.ts文件里声明的类型一般会当作global类型，但是这个前提条件是在*.d.ts文件里不能出现`import`/`export`语法。如果出现了，则必须手动加上一个`global`关键才可以见类型定义为global类型

如果@types库中没有我们想要的类型定义文件，我们可以在全局的`*.d.ts`文件中自己手写简单的类型声明。dts文件一般指的是类型定义文件。但是如果在d.ts文件里使用import / export语法，那么无法直接全局声明类型。需要在global命名空间下声明全局类型，或者我们也可以通过三斜线指令导入我们需要的类型，然后自己再编写全局类型

https://mp.weixin.qq.com/s/DAL4_JxE-O-ALXPCStvvGA


## TS 协变和逆变

协变和逆变的简述：子类型可以赋值给父类型的叫做协变，父类型可以赋值给子类型叫做逆变。

```ts
interface Computer {
    cpu: string;
    memory: string;
    disk: string;
}

interface Laptop {
    cpu: string;
    memory: string;
    disk: string;
    screen: string;
}

// Laptop和computer是两个不同类型的，但是laptop类型可以分配给computer类型
```


## Ts函数重载的三种写法

1. declare function 

```


```

2. interface

3. 交叉类型


## object vs Record<string, any>

`Record<K, V>` 用于构造一个对象类型，K表示的是键名, 在未开启`keyofStringsOnly: true时`， K的类型可以是string 、number或 symbol。 V表示值的类型。;

<img :src="$withBase('/ts-01.png')" alt="ts keyof any" />

object 也表示一个对象类型，但是ts已经不建议通过object声明一个对象类型，因为`Record<string, any>`更加语义化

```ts
declare const data: object; // ❌

declare const data: Record<string, unknown>; // ✅
```

## ‘-’操作符

在ts中可以通过减号操作符去掉已有修饰符

```ts
// 移除可选修饰符
type Required<T> = { [Key in keyof T]-?: T[Key] }

// 移除只读修饰符
type Mutable<T> = {  -readonly [Key in keyof T]: T[Key] }
```

## infer

infer可以用来在extends条件语句中推断类型变量的类型.

```ts
type Result<T> = T extends (args: Array<infer P>) => void ? P : never;

// infer 放置在待推断的类型变量P前面，可以通过条件运算符返回推断出来的类型
```


## 分布式条件类型 [Distributive conditional types]

如果一个类型是unionType，则当进行extends分配时，将unionType里的每一个type拆分出来构成一个naked type parameter 再进行条件运算.

```ts
type Stu = "name" | "age" | "stuNo" | "gender";

type isKeyString<T> = T extends string ? T : never; 

// 此处T是一个Union-Type，当进行条件运算将其分散成naked type, 再一一进行分配运算

// "name" extends string ? "name" : never | "age" extends string ? "age" : never ....

// "name" 
```

