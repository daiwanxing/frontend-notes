"use strict";(self.webpackChunkfrontend_notes=self.webpackChunkfrontend_notes||[]).push([[658],{4961:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-886fcf26",path:"/guide/css-doc/",title:"CSS随记",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"用svg实现一个loading",slug:"用svg实现一个loading",children:[]},{level:2,title:"background-size 属性值的含义",slug:"background-size-属性值的含义",children:[]},{level:2,title:"CSS不常用的伪类",slug:"css不常用的伪类",children:[]},{level:2,title:"border-radius 八个属性值探讨",slug:"border-radius-八个属性值探讨",children:[]},{level:2,title:"box-shadow 多阴影",slug:"box-shadow-多阴影",children:[]},{level:2,title:"Grid布局",slug:"grid布局",children:[]},{level:2,title:"css层的定位问题--父元素设置overflow，绝对定位的子元素会被隐藏或一起滚动",slug:"css层的定位问题-父元素设置overflow-绝对定位的子元素会被隐藏或一起滚动",children:[]},{level:2,title:"视口（View Port）",slug:"视口-view-port",children:[]},{level:2,title:"重绘（repaint）与回流(reflow)",slug:"重绘-repaint-与回流-reflow",children:[]},{level:2,title:"img标签srcset 属性",slug:"img标签srcset-属性",children:[]},{level:2,title:"font-display属性",slug:"font-display属性",children:[]},{level:2,title:"用hr标签装饰分割线",slug:"用hr标签装饰分割线",children:[]},{level:2,title:"BFC、FFC、IFC",slug:"bfc、ffc、ifc",children:[]},{level:2,title:"浅谈css中的clip-path属性",slug:"浅谈css中的clip-path属性",children:[]}],filePathRelative:"guide/css-doc/index.md",git:{updatedTime:1633261826e3}}},4191:(n,s,a)=>{a.r(s),a.d(s,{default:()=>v});var p=a(6252);const t=(0,p.uE)('<h1 id="css随记" tabindex="-1"><a class="header-anchor" href="#css随记" aria-hidden="true">#</a> CSS随记</h1><h2 id="用svg实现一个loading" tabindex="-1"><a class="header-anchor" href="#用svg实现一个loading" aria-hidden="true">#</a> 用svg实现一个loading</h2><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code>&lt;svg xmlns=<span class="token string">&quot;http://www.w3.org/2000/svg&quot;</span> version=<span class="token string">&quot;1.1&quot;</span> class=<span class="token string">&quot;load&quot;</span>&gt;\n       &lt;circle cx=<span class="token string">&quot;150&quot;</span> cy=<span class="token string">&quot;80&quot;</span> r=<span class="token string">&quot;50&quot;</span> class=<span class="token string">&quot;other&quot;</span> /&gt;\n       &lt;circle cx=<span class="token string">&quot;150&quot;</span> cy=<span class="token string">&quot;80&quot;</span> r=<span class="token string">&quot;50&quot;</span> class=<span class="token string">&quot;loading&quot;</span> /&gt;\n&lt;/svg&gt;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="load"><circle cx="150" cy="80" r="50" class="other"></circle><circle cx="150" cy="80" r="50" class="loading"></circle></svg><p>svg的viewBox的含义</p><p>svg的viewbox规定了画布所在的x轴方向和y轴的方向的位置以画布的width * height</p><p>而svg的width和height则是定义了svg容器的大小，svg容器内的元素会被画布尽量铺满到整个svg容器大小，下面这个直角三角形本来是长50宽50的，画布的大小也是50 * 50,但是由于平铺的特性，画布能计算出可以将三角形最大铺满到多少： 300 / 50 = 6 200 / 50 = 4， 宽度会平铺最大拉伸6，高度拉伸4倍</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">viewbox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0,0,50,50<span class="token punctuation">&quot;</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>300<span class="token punctuation">&quot;</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>200<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>polygon</span> <span class="token attr-name">points</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0,0 0,50 50,50<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>polygon</span><span class="token punctuation">&gt;</span></span> \n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="background-size-属性值的含义" tabindex="-1"><a class="header-anchor" href="#background-size-属性值的含义" aria-hidden="true">#</a> background-size 属性值的含义</h2><ol><li>background-size 设定两个值和设定一个值的区别</li></ol><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code>      <span class="token property">background-size</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span> <span class="token comment">/* x轴的背景拉伸到容器的宽度，y轴auto */</span>\n      <span class="token property">background-size</span><span class="token punctuation">:</span> 100% 100%<span class="token punctuation">;</span> <span class="token comment">/* x轴和y轴的宽高拉伸到容器的宽高 */</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="2"><li>background-size: cover 和 contain 的区别</li></ol><p>都是等比例缩放图片的宽高，区别在于contain总是会显示图片的全部的内容，不会发生裁剪，所以如果图片原始尺寸大于容器尺寸，会造成容器的一侧有一部分空白区域，而cover是将背景完全的覆盖到容器的区域，会发生裁剪，不会失真图片。</p><h2 id="css不常用的伪类" tabindex="-1"><a class="header-anchor" href="#css不常用的伪类" aria-hidden="true">#</a> CSS不常用的伪类</h2><ol><li>any-link</li></ol><p>link的替代品，link伪类太鸡肋了，被点击之后，link伪类的样式就没了。而any-link会匹配所有带href属性的链接元素（a,link,area）,即便链接已经被访问过了，仍然样式起效。</p><ol start="2"><li><p>target 锚点伪类，可以给命中的锚点设置样式</p></li><li><p>focus-within</p></li></ol><p>如果一个元素的子元素被focus了，那么该元素仍然可以应用focus-within伪类设置的样式，focus的增强版，兼容性很好（IE不支持）</p><ol start="4"><li>focus-visible</li></ol><p>兼容性目前比较差（2021/5/20），目前来看就Chrome86以上版本支持，它的作用主要是可以区分一个元素被聚焦时是鼠标聚焦还是键盘聚焦，只有键盘聚焦才会应用该伪类样式。想让鼠标聚焦时设置样式，应该用focus伪类（focus伪类点击后，必须点击其他地方，focus样式才会被取消）</p><ol start="5"><li>placeholder-shown</li></ol><p>当输入框设置placeholder时，匹配该输入框，兼容性还可（IE10+,带ms前缀就可以）</p><p>举个🌰, 当输入框提示文本可见时，设置<code>outline: 2px solid #2970ff</code>，不可见时，移除该样式</p><input placeholder="这是一段提升文本" type="text"><ol start="6"><li>disabled</li></ol><p>表单控件禁用伪类 （IE9+）</p><ol start="7"><li>enabled</li></ol><p>表单控件启用伪类（IE9+）</p><ol start="8"><li>checked</li></ol><p>表单控件选中伪类（IE9+支持, MAC-OS <code>&lt;option&gt;</code>元素无法应用该伪类）</p><ol start="9"><li>is伪类</li></ol><p>is伪类是一个新伪类，没有兼容性包袱（-webkit-any伪类的替代品，该伪类已被废弃，建议两个都写，万一chrome版本更新后-webkit-any伪类被移除就遭殃了），它表示的语义性很强。（IE不支持）， is伪类的优先级由选择器列表中优先级最高的那个选择器来决定。</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">is(ul, ol) li:first-child</span> <span class="token punctuation">{</span>\n       <span class="token property">font-size</span><span class="token punctuation">:</span> 42px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>表示: <span style="color:red;">“选中ul 或者ol后面的第一个li元素的字体设置为42像素”</span></p><h2 id="border-radius-八个属性值探讨" tabindex="-1"><a class="header-anchor" href="#border-radius-八个属性值探讨" aria-hidden="true">#</a> border-radius 八个属性值探讨</h2><p>border-radius是我们用的很频繁的一个属性，它是一个圆角属性，从边框开始向内裁剪。我们一般都是设置一个值：<code>border-radius: 50%</code>或者<code>border-radius: 一个具体的数值</code>；其实border-radius不光能设置一个值，可以设置2个，4个甚至8个以便对不同方向的边框进行更细微的裁剪，下面一起探讨不同数量的值的含义。</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code>\n<span class="token selector">div</span> <span class="token punctuation">{</span>\n       <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span> <span class="token comment">/* 盒子的宽高比： width / height， 如果宽高一致，则可以得到一个正圆 */</span>\n       <span class="token property">border-radius</span><span class="token punctuation">:</span> 50% 50px<span class="token punctuation">;</span> <span class="token comment">/* 盒子的左上、右下 值为50%， 右上，左下的值为50px */</span>\n       <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px 20px 40px<span class="token punctuation">;</span> <span class="token comment">/* 盒子左上角椭圆： 10px, 左下，右上 20px, 右下30px*/</span>\n       <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px 20px 30px 40px<span class="token punctuation">;</span> <span class="token comment">/* 盒子左上角椭圆： 10px, 右上 20px, 右下30px, 左下 40px*/</span>\n       <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px 20px 30px 40px / 10px 20px 30px 40px<span class="token punctuation">;</span> <span class="token comment">/* 顺序和上面一样 */</span>\n       <span class="token comment">/* 斜杠左边的代表的是水平方向，斜杠右边代表的是垂直方向 */</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="box-shadow-多阴影" tabindex="-1"><a class="header-anchor" href="#box-shadow-多阴影" aria-hidden="true">#</a> box-shadow 多阴影</h2><p>可以利用box-shadow 设置多个阴影来实现一个简单的loading效果</p><div class="shadow-loading"></div><h2 id="grid布局" tabindex="-1"><a class="header-anchor" href="#grid布局" aria-hidden="true">#</a> Grid布局</h2><p>给一个容器声明<code>display: grid</code>，或者<code>display: inline-grid</code>该容器将生成二维的行列布局，inline-grid和grid的区别仅仅在于容器在外部的排列方式是独占一行还是和其他行内元素参与排列。grid容器的直接子元素为grid项，grid项拥有一些属于自己的属性，grid也拥有一些属于自己的属性，grid-item的宽度没有被指定时占满整个容器宽。</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.grid-box</span> <span class="token punctuation">{</span>\n       <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>\n       <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> <span class="token function">repeat</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span> 100px<span class="token punctuation">)</span><span class="token punctuation">;</span>\n       <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> <span class="token function">repeat</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span> 100px<span class="token punctuation">)</span><span class="token punctuation">;</span>\n       <span class="token comment">/* 上面的属性还可以直接简写成  */</span>\n       <span class="token property">grid</span><span class="token punctuation">:</span> <span class="token function">repeat</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span> 100px<span class="token punctuation">)</span> / <span class="token function">repeat</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span> 100px<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n       <span class="token comment">/* 之前的grid-gap属性已经被废弃，新的定义间距的属性为gap */</span>\n       <span class="token property">gap</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span> <span class="token comment">/* 可以是px、%、vh、vw、em、rem等等 */</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>gap属性是row-gap和column-gap属性的合并简写， column-gap：列与列之间的间距，row-gap: 行与行之间的间距。</p><p><del><code>auto</code>关键字表示宽度自适应,grid-tempalte-rows: 50px auto 50px; 第一个单元格和最后一个单元格的宽度设定为50px，第二个单元格的宽度自适应剩余的宽度。 </del></p><p><code>auto</code>值是基于grid项本身的内容宽度来设定，类似于<code>width: fit-content</code></p><p>该值和fr有着本质的区别，grid项的内容过长，其auto的值也会变大</p><p>而fr的实际是各个fr累加然后平分剩余的宽度，如果累加的fr总值小于1，则每个grid项实际的宽高是 设置fr * 剩余可用的宽高。大于1那就根据累加的总值来均分。</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>\n    <span class="token property">display</span><span class="token punctuation">:</span> grid-box<span class="token punctuation">;</span>\n    <span class="token property">grid</span><span class="token punctuation">:</span> 100px / <span class="token function">repeat</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span> 1fr 2fr 3fr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">/* 已知容器总宽是1000，求三个grid项的宽 */</span>\n    <span class="token comment">/* 1fr + 2fr + 3fr = 6fr,  6fr = 1000, 平均1fr = 166px */</span>\n    <span class="token comment">/* 所以就很容易得到了 */</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>\n    <span class="token property">display</span><span class="token punctuation">:</span> grid-box<span class="token punctuation">;</span>\n    <span class="token property">grid</span><span class="token punctuation">:</span> 100px / <span class="token function">repeat</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span> .2fr .1fr .2fr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">/* 已知容器总宽是1000，求三个grid项的宽 */</span>\n    <span class="token comment">/* .2fr + .1fr + .2fr = .5fr &lt; 1, 每个grid项的实际宽度是容器可用宽度  * 各自设定的fr得到值 */</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>grid-auto-flow指明了grid-item的放置顺序（是先行后列row，还是先列后行column）配合dense值，能够使得item紧密填满，尽量不出现空白的单元格。</p><p><code>grid-auto-flow: row dense</code>。</p><p>项目属性： grid-column-start, grid-column-end, grid-row-start, grid-row-end，这四个属性指定了item的四个边框分别定位在哪根网格线</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code> <span class="token selector">.grid-box div:nth-child(1)</span> <span class="token punctuation">{</span>\n       <span class="token property">grid-column-end</span><span class="token punctuation">:</span> 4<span class="token punctuation">;</span> <span class="token comment">/* 定位在了第四根网格线，也就是占满了3个格子，也可以写成 span 3*/</span>\n       <span class="token property">grid-column</span><span class="token punctuation">:</span> span 3<span class="token punctuation">;</span>\n <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="grid-box"><div>grid-1</div><div>grid-2</div><div>grid-3</div></div><p>关于grid-template-column 和 grid-template-row的属性值</p><ol><li>fr, 表示<code>片段</code>的意思</li></ol><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code>   <span class="token selector">div</span> <span class="token punctuation">{</span>\n       <span class="token property">grid-template-column</span><span class="token punctuation">:</span> 1fr  <span class="token comment">/* 表示第一列占据容器的全部宽度*/</span>\n       <span class="token property">grid-template-column</span><span class="token punctuation">:</span> 1fr 2fr  <span class="token comment">/* 表示第一列占据容器宽度的1/3, 第二列占据 2/3 */</span>\n       <span class="token property">grid-template-column</span><span class="token punctuation">:</span> 1fr auto 100px <span class="token comment">/* auto在内容为空是才会平分剩余的宽度,，否则其宽度由实际的内容宽度来决定 容器的总宽度 - 100px， 得到剩余的宽度.\n       其中 第二列的宽度是文字内容的宽度，剩下的宽度 = 1fr  */</span>\n   <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="2"><li><p>grid-template-area属性</p><p>网格布局允许指定”区域“（area），一个区域由单个或多个单元格组成。</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code>    <span class="token property">grid-template-area</span><span class="token punctuation">:</span> <span class="token string">&#39;a a a&#39;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li></ol><h2 id="css层的定位问题-父元素设置overflow-绝对定位的子元素会被隐藏或一起滚动" tabindex="-1"><a class="header-anchor" href="#css层的定位问题-父元素设置overflow-绝对定位的子元素会被隐藏或一起滚动" aria-hidden="true">#</a> css层的定位问题--父元素设置overflow，绝对定位的子元素会被隐藏或一起滚动</h2><p>如果一个元素设置了overflow： auto，产生了滚动条，则脱离文档流的子元素将会被隐藏或者被一起滚动，这种情况下解决的办法，让滚动的内容由一个新的容器去包裹，这个新的容器隶属于父元素的最近子级元素怒</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>can scroll<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>滚动的内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fixed-menu<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="视口-view-port" tabindex="-1"><a class="header-anchor" href="#视口-view-port" aria-hidden="true">#</a> 视口（View Port）</h2><p>移动端未设定<code>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</code>, 默认宽度是980， 指定视口后，页面的宽度就是屏幕的宽度。</p><h2 id="重绘-repaint-与回流-reflow" tabindex="-1"><a class="header-anchor" href="#重绘-repaint-与回流-reflow" aria-hidden="true">#</a> 重绘（repaint）与回流(reflow)</h2><p>重绘一般发生在元素的样式属性发生变化，而回流一般是元素的几何属性发生变化。重绘会跳过绘制layout-tree 与 layer tree，直接进入绘制阶段。而回流（重排）会重新开始执行整个渲染流水线</p><h2 id="img标签srcset-属性" tabindex="-1"><a class="header-anchor" href="#img标签srcset-属性" aria-hidden="true">#</a> img标签srcset 属性</h2><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1x.png 128w, 2x.png 256<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n<span class="token comment">&lt;!-- 表示当img的宽度为128是展示1x.png 宽度为256时展示2x.png --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://www.hetianlab.com/img/home/10.jpg?e5a1f659 256w, https://www.hetianlab.com/img/home/6.jpg?e6b206e9 512w<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://www.hetianlab.com/img/home/12.jpg?7db3a17a<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(max-width: 360px) 512px, 128px<span class="token punctuation">&quot;</span></span>\n<span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>',68),e={href:"https://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/",target:"_blank",rel:"noopener noreferrer"},c=(0,p.Uk)("详见这篇文章"),l=(0,p.Uk)(" size属性让我们可以定义在视口宽度小于360px时，我们展示512px规格的图片， 其他情况展示128p像素的图片。 srcset的w标识符需要搭配size属性一起使用，srcset可以根据不同分辨率，显示对应的图片，比如我们的iphon6的devicePixelRatio是2，也就是一个css像素会在iphone6下会被渲染成2个像素。像这种高像素的手机用来展示二倍图可以得到更好的观感体验。"),o=(0,p.uE)('<h2 id="font-display属性" tabindex="-1"><a class="header-anchor" href="#font-display属性" aria-hidden="true">#</a> font-display属性</h2><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>\n       <span class="token property">font-display</span><span class="token punctuation">:</span> swap \n       <span class="token comment">/* 先用默认字体展示文本，字体加载完毕后再替换成新的下载好的字体 */</span>\n       <span class="token comment">/* 背景图只有当元素挂载到DOM树上，才会发生请求 */</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="用hr标签装饰分割线" tabindex="-1"><a class="header-anchor" href="#用hr标签装饰分割线" aria-hidden="true">#</a> 用hr标签装饰分割线</h2><p>一般我们在开发页面时常常需用用到两根横线 + 中间一段文字分割展示内容,例如下面这样</p><hr data-content="这是一条分割线" class="sp-hr"><p>我们可以借助hr标签轻易做到，同时拥有良好的语义化，以前我都是通过一个div标签，然后设置before和after两个伪元素一前一后来完成。</p><p>现在只需要 <code>&lt;hr data-content=&quot;这是一条分割线&quot; class=&quot;sp-hr&quot;&gt;</code></p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.sp-hr</span> <span class="token punctuation">{</span>\n    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>\n    <span class="token property">padding</span><span class="token punctuation">:</span> 1em 0<span class="token punctuation">;</span>\n    <span class="token property">border</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.sp-hr::before</span> <span class="token punctuation">{</span>\n    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>\n    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">attr</span><span class="token punctuation">(</span>data-content<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token property">line-height</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>\n    <span class="token property">border</span><span class="token punctuation">:</span> solid #d0d0d5<span class="token punctuation">;</span>\n    <span class="token property">border-width</span><span class="token punctuation">:</span> 0 99vw<span class="token punctuation">;</span> <span class="token comment">/* 需要特别注意的是border-width 两个属性表示的是上下两条边宽度为0，左右各99vw */</span>\n    <span class="token property">width</span><span class="token punctuation">:</span> fit-content<span class="token punctuation">;</span>\n    <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>\n    <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>\n    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>-50%<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>\n    <span class="token property">color</span><span class="token punctuation">:</span> #d0d0d5<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>还可以借助hr实现波浪线分割</p><hr class="wavy"><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.wavy</span> <span class="token punctuation">{</span>\n    <span class="token property">border</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n    <span class="token property">color</span><span class="token punctuation">:</span> #d0d0d5<span class="token punctuation">;</span>\n    <span class="token property">height</span><span class="token punctuation">:</span> .5em<span class="token punctuation">;</span>\n    <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>\n    <span class="token property">letter-spacing</span><span class="token punctuation">:</span> 100vw<span class="token punctuation">;</span>\n    <span class="token property">padding</span><span class="token punctuation">:</span> .5em<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.wavy::after</span> <span class="token punctuation">{</span>\n    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;\\2000\\2000&quot;</span><span class="token punctuation">;</span>\n    <span class="token property">text-decoration</span><span class="token punctuation">:</span> overline wavy<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="bfc、ffc、ifc" tabindex="-1"><a class="header-anchor" href="#bfc、ffc、ifc" aria-hidden="true">#</a> BFC、FFC、IFC</h2><p>BFC（Blcok Formatting Context） 块级格式化上下文</p><p>FFC(Flex Formate Context) 自适应格式化上下文</p><p>IFC（Inline Formate Context）行级格式化上下文</p><h2 id="浅谈css中的clip-path属性" tabindex="-1"><a class="header-anchor" href="#浅谈css中的clip-path属性" aria-hidden="true">#</a> 浅谈css中的clip-path属性</h2>',16),i=(0,p.Uk)("说起clip-path属性就不得不说clip-path属性的前身clip属性，clip-path是clip属性的增强。在还未用clip-path属性前，我曾经常用clip属性的rect函数对容器进行裁剪。clip-path同样也是对容器进行裁剪，但是要注意"),r=(0,p.Uk)("clip-path要比clip属性的功能多得多，而且clip属性已经被web标准给删除了,"),u={href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip",target:"_blank",rel:"noopener noreferrer"},d=(0,p.Uk)("具体详见"),k=(0,p.Uk)("，虽然很多浏览器都实现了该属性，但是性能没有clip-path高，而且clip能做的clip-path也能做，所以不推荐在项目中继续使用clip属性了 "),b=(0,p.Uk)("。clip-path的兼容性在不考虑IE的情况下只需要加上"),m=(0,p._)("code",null,"-webkit-",-1),g=(0,p.Uk)("的前缀就能放心使用。"),h=(0,p.uE)('<p>那么clip-path属性具体要如何使用呢，clip-path属性有很多个函数，例如：ellipse()（椭圆） circle()（圆形） polygon()（多边形）path()（路径） inset() 矩形</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.noraml</span> <span class="token punctuation">{</span>\n       <span class="token comment">/* inset函数会画出一个矩形，有五个值分别表示代表上右下左，以及圆角 */</span>\n       <span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">inset</span><span class="token punctuation">(</span>top right bottom left round [px]<span class="token punctuation">)</span><span class="token punctuation">;</span>\n       <span class="token comment">/*  polygon函数 表示画出一个多边形，一个多边形至少要有三个坐标点， 坐标点(x, y)与坐标点之间用逗号分割 */</span>\n       <span class="token comment">/* 绘制一个三角形 */</span>\n       <span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">polygon</span><span class="token punctuation">(</span>50% 0<span class="token punctuation">,</span> 0 100%<span class="token punctuation">,</span> 100% 100% <span class="token punctuation">)</span><span class="token punctuation">;</span>\n       <span class="token comment">/* 绘制一个圆形，有两个参数作为输入， 第一个参数是半径（px或者%） -&gt; r， 第二个参数是圆心，默认是盒模型中心 */</span>\n       <span class="token property">clip-path</span><span class="token punctuation">:</span> <span class="token function">circle</span><span class="token punctuation">(</span>10px at 150px<span class="token punctuation">)</span><span class="token punctuation">;</span>\n       <span class="token comment">/* 绘制一个椭圆, rx表示x轴方向的半径，ry表示y轴方向的radius， position默认是盒模型的center */</span>\n       <span class="token property">circle-path</span><span class="token punctuation">:</span> <span class="token function">ellipse</span><span class="token punctuation">(</span>rx ry at position | postionX positionY<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>',2),v={render:function(n,s){const a=(0,p.up)("OutboundLink");return(0,p.wg)(),(0,p.iD)(p.HY,null,[t,(0,p._)("p",null,[(0,p._)("a",e,[c,(0,p.Wm)(a)]),l]),o,(0,p._)("p",null,[i,(0,p._)("strong",null,[r,(0,p._)("a",u,[d,(0,p.Wm)(a)]),k]),b,m,g]),h],64)}}}}]);