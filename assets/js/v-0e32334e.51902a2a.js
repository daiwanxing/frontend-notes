"use strict";(self.webpackChunkfrontend_notes=self.webpackChunkfrontend_notes||[]).push([[394],{7157:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-0e32334e",path:"/vue-router4-doc/",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"介绍",slug:"介绍",children:[]},{level:2,title:"正文",slug:"正文",children:[]},{level:2,title:"如何在compositionAPI 中使用vue-router",slug:"如何在compositionapi-中使用vue-router",children:[]}],filePathRelative:"vue-router4-doc/index.md",git:{updatedTime:162485425e4}}},9211:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const e=(0,a(6252).uE)('<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>vue-router4是随着vue3配套的诞生的官方路由库, 下面总结VueRouter4和VueRouter3的配置区别</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><ol><li><p>所有的函数式导航，例如<code>router.push()/replace()/forward()</code>，调用之后会返回一个期约状态已经变更的promise对象。</p></li><li><p><code>router.push()</code>导航时如果提供了path，则params参数完全被忽略。</p></li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>path<span class="token operator">:</span> <span class="token string">&#39;/user&#39;</span><span class="token punctuation">,</span> params<span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&#39;xxx&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// will be ignored, works bad</span>\n\n<span class="token comment">// works good</span>\n<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>path<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/user/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol start="3"><li><code>router.replace()</code>和<code>router.push()</code>唯一的区别是不会创建一个新的历史记录到栈中，只会替换当前路由栈最顶层的历史记录。</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token operator">&lt;</span>router<span class="token operator">-</span>link <span class="token operator">:</span>to<span class="token operator">=</span><span class="token string">&quot;{name: &#39;xxx&#39;}&quot;</span> replace<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>link<span class="token operator">&gt;</span>\n\n<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> replace<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span>replace\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="如何在compositionapi-中使用vue-router" tabindex="-1"><a class="header-anchor" href="#如何在compositionapi-中使用vue-router" aria-hidden="true">#</a> 如何在compositionAPI 中使用vue-router</h2><p>本节将介绍vue-router如何搭配组合式api进行开发。</p><p>由于我们无法在setup中访问this，所以也不能像Vue2一样通过<code>this.$router()</code> / <code>this.$route</code>来对路由进行相关的操作。替代的办法就是通过从Vue中导入<code>useRoute</code>和<code>useRouter</code>，<code>useRoute</code>返回的是一个记录了当前路由信息的响应式对象， <code>useRouter</code>返回的是一个操作路由跳转相关的对象。同样的，路由相关的导航守卫，也是通过导入的形式来使用。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> onBeforeRouteLeave<span class="token punctuation">,</span> onBeforeRouteUpdate<span class="token punctuation">,</span> useRoute<span class="token punctuation">,</span> useRouter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">useRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 返回的是一个router对象， 提供了一系列的路由操作的api</span>\n<span class="token comment">// router.push()</span>\n<span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token function">useRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 返回的是一个route对象，记录了当前路由的相关信息</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>route<span class="token punctuation">.</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>',11),t={render:function(n,s){return e}}}}]);