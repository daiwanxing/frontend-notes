## 用svg实现一个loading

```css
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="load">
       <circle cx="150" cy="80" r="50" class="other" />
       <circle cx="150" cy="80" r="50" class="loading" />
</svg>
````

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="load">
       <circle cx="150" cy="80" r="50" class="other" />
       <circle cx="150" cy="80" r="50" class="loading" />
</svg>

## background-size 属性值的含义

1. background-size 设定两个值和设定一个值的区别

 ```css
       background-size: 100%; /* x轴的背景拉伸到容器的宽度，y轴auto */
       background-size: 100% 100%; /* x轴和y轴的宽高拉伸到容器的宽高 */
 ```

2. background-size: cover 和 contain 的区别

都是等比例缩放图片的宽高，区别在于contain总是会显示图片的全部的内容，不会发生裁剪，所以如果图片原始尺寸大于容器尺寸，会造成容器的一侧有一部分空白区域，而cover是将背景完全的覆盖到容器的区域，会发生裁剪，不会失真图片。



## CSS不常用的伪类

1. any-link

link的替代品，link伪类太鸡肋了，被点击之后，link伪类的样式就没了。而any-link会匹配所有带href属性的链接元素（a,link,area）,即便链接已经被访问过了，仍然样式起效。

2. target
锚点伪类，可以给命中的锚点设置样式

3. focus-within

如果一个元素的子元素被focus了，那么该元素仍然可以应用focus-within伪类设置的样式，focus的增强版，兼容性很好（IE不支持）

4. focus-visible 

兼容性目前比较差（2021/5/20），目前来看就Chrome86以上版本支持，它的作用主要是可以区分一个元素被聚焦时是鼠标聚焦还是键盘聚焦，只有键盘聚焦才会应用该伪类样式。想让鼠标聚焦时设置样式，应该用focus伪类（focus伪类点击后，必须点击其他地方，focus样式才会被取消）

5. placeholder-shown

当输入框设置placeholder时，匹配该输入框，兼容性还可（IE10+,带ms前缀就可以）

6. disabled

表单控件禁用伪类 （IE9+）

7. enabled

表单控件启用伪类（IE9+）

8. checked

表单控件选中伪类（IE9+支持, MAC-OS `<option>`元素无法应用该伪类）

9. is伪类

is伪类是一个新伪类，没有兼容性包袱（-webkit-any伪类的替代品，该伪类已被废弃，建议两个都写，万一chrome版本更新后-webkit-any伪类被移除就遭殃了），它表示的语义性很强。（IE不支持）， is伪类的优先级由选择器列表中优先级最高的那个选择器来决定。

```css
is(ul, ol) li:first-child {
       font-size: 42px;
}
```

表示: <span style="color: red">“选中ul 或者ol后面的第一个li元素的字体设置为42像素”</span>

## border-radius 八个属性值探讨

border-radius是我们用的很频繁的一个属性，它是一个圆角属性，从边框开始向内裁剪。我们一般都是设置一个值：`border-radius: 50%`或者`border-radius: 一个具体的数值`；其实border-radius不光能设置一个值，可以设置2个，4个甚至8个以便对不同方向的边框进行更细微的裁剪，下面一起探讨不同数量的值的含义。

```css

div {
       border-radius: 50%; /* 盒子的宽高比： width / height， 如果宽高一致，则可以得到一个正圆 */
       border-radius: 50% 50px; /* 盒子的左上、右下 值为50%， 右上，左下的值为50px */
       border-radius: 10px 20px 40px; /* 盒子左上角椭圆： 10px, 左下，右上 20px, 右下30px*/
       border-radius: 10px 20px 30px 40px; /* 盒子左上角椭圆： 10px, 右上 20px, 右下30px, 左下 40px*/
       border-radius: 10px 20px 30px 40px / 10px 20px 30px 40px; /* 顺序和上面一样 */
       /* 斜杠左边的代表的是水平方向，斜杠右边代表的是垂直方向 */
}
```

## box-shadow 多阴影

可以利用box-shadow 设置多个阴影来实现一个简单的loading效果

<div class='shadow-loading'></div>