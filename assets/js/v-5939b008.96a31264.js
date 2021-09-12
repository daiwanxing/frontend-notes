"use strict";(self.webpackChunkfrontend_notes=self.webpackChunkfrontend_notes||[]).push([[914],{8679:(a,s,n)=>{n.r(s),n.d(s,{data:()=>e});const e={key:"v-5939b008",path:"/guide/gsap/",title:"GSAP 是一个高性能的Javascript动画库，通过使用gsap可以实现许多精美的交互效果",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"使用GSAP",slug:"使用gsap",children:[]},{level:2,title:"使用gsap给DOM元素设置animate",slug:"使用gsap给dom元素设置animate",children:[]},{level:2,title:"gsap 定义了一些特殊的属性",slug:"gsap-定义了一些特殊的属性",children:[]}],filePathRelative:"guide/gsap/README.md",git:{updatedTime:1631433668e3}}},7944:(a,s,n)=>{n.r(s),n.d(s,{default:()=>p});const e=(0,n(6252).uE)('<h1 id="gsap-是一个高性能的javascript动画库-通过使用gsap可以实现许多精美的交互效果" tabindex="-1"><a class="header-anchor" href="#gsap-是一个高性能的javascript动画库-通过使用gsap可以实现许多精美的交互效果" aria-hidden="true">#</a> GSAP 是一个高性能的Javascript动画库，通过使用gsap可以实现许多精美的交互效果</h1><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/logo-man.svg"><h2 id="使用gsap" tabindex="-1"><a class="header-anchor" href="#使用gsap" aria-hidden="true">#</a> 使用GSAP</h2><p>通过cdn 或者 <code>npm i gsap</code> 安装gsap</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// gsap.ts</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> gsap <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;gsap&quot;</span><span class="token punctuation">;</span>\n<span class="token comment">// gsap除了核心模块，还有其他的插件，可以通过resigerPlugin方法注册插件</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> PixiPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;gsap/PixiPlugin&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> MotionPathPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;gsap/MotionPathPlugin&quot;</span><span class="token punctuation">;</span>\n\ngsap<span class="token punctuation">.</span><span class="token function">registerPlugin</span><span class="token punctuation">(</span>PixiPlugin<span class="token punctuation">,</span> MotionPathPlugin<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="使用gsap给dom元素设置animate" tabindex="-1"><a class="header-anchor" href="#使用gsap给dom元素设置animate" aria-hidden="true">#</a> 使用gsap给DOM元素设置animate</h2><p>通过<code>gsap.to</code>代表设置一个元素<code>要完成</code>的动画状态，以及<code>gsap.from</code>设置元素最开始的入场动画状态。</p><h2 id="gsap-定义了一些特殊的属性" tabindex="-1"><a class="header-anchor" href="#gsap-定义了一些特殊的属性" aria-hidden="true">#</a> gsap 定义了一些特殊的属性</h2><ol><li>delay， 定义了动画延迟多久开始执行</li><li>onComplete 当动画结束后，回调函数会被触发</li><li>onUpdate 每次动画更新（绘制新的一帧）/渲染时都将会被执行，（UI线程每隔16.6ms绘制一次UI，应该是每16.6ms执行一次回调，当然并不能保证每次都是16.6ms绘制一次UI）</li><li>ease 设置缓动函数</li><li>stagger 交错可以为一组对象设置动画的延时时间</li><li>onStart 当动画开始的时候被触发</li><li>onRepeat 当动画每次被重复执行时执行回调</li><li>onReverseComplete 当动画反转时再次到达开头时触发</li></ol><p>// 可以自己指定回调的参数, 必须是一个数组将参数包裹</p><p>stagger的值是一个number，例如: <code>stagger: .2</code>； 那么gsap访问到的每个元素的delay都会依次以0.2的公差递增delay。</p><p>使用<code>gsap.timeline</code>可以编排时间线动画</p>',12),p={render:function(a,s){return e}}}}]);