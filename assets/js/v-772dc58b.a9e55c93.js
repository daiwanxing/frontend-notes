"use strict";(self.webpackChunkfrontend_notes=self.webpackChunkfrontend_notes||[]).push([[472],{1819:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-772dc58b",path:"/business-doc/",title:"",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"token 自动刷新",slug:"token-自动刷新",children:[]}],filePathRelative:"business-doc/index.md",git:{updatedTime:162627481e4}}},9913:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const p=(0,a(6252).uE)('<h2 id="token-自动刷新" tabindex="-1"><a class="header-anchor" href="#token-自动刷新" aria-hidden="true">#</a> token 自动刷新</h2><p>token 是什么? token是当用户成功登录以后，服务端返回给客户端的一个有时效性的用户唯一身份标识，用户登录后的每一次请求都需要携带这个token，以验证请求是否合法。</p><p>一般而言，前端拿到的token存到了session-storage 或者 local-storage中（具体看业务需求），每次请求都会在请求头中的header字段：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/song-list&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n     headers<span class="token operator">:</span> <span class="token punctuation">{</span>\n         <span class="token string">&#39;Authorization&#39;</span><span class="token operator">:</span> token \n     <span class="token punctuation">}</span>\n <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如果服务端请求客户端发过来的请求过期了，这个请求就会被视为失效，而且也不会返回正常的数据。那么前端相应的需要根据失效的token做出对应的处理，一般token失效后前端是需要做两种处理，要么token失效，自动退出登录状态，重定向到登陆页面并且提示用户登录凭证过期。要么自动帮用刷新token，延长过期时间。</p><p>这里具体讲讲刷新token， 一般在thenable函数中处理后端返回的状态码，如果匹配token失效的状态码，将请求失败的接口放到一个任务队列，调用一个新的接口并带上用来刷新的refreshToken，服务端返回新的refreshToken和token后保存到本地，遍历任务队列里请求失败的接口重新请求</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// /utils/request.js</span>\n<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&quot;axios&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">SET_TOKEN</span><span class="token punctuation">,</span> <span class="token constant">REFRESH_TOKEN</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./LOCAL_STORAGE.js&quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">setToken</span> <span class="token punctuation">(</span><span class="token parameter">token</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token constant">SET_TOKEN</span><span class="token punctuation">,</span> token<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">getToken</span> <span class="token punctuation">(</span><span class="token parameter">tokenName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span>  localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span>tokenName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">refreshToken</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> instance<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&#39;/auth/refresh&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> refresh_token<span class="token operator">:</span> <span class="token function">getToken</span><span class="token punctuation">(</span><span class="token constant">REFRESH_TOKEN</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    baseURL<span class="token operator">:</span> <span class="token string">&quot;192.168.19.1&quot;</span> \n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 在响应拦截里做处理</span>\ninstance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>fulfilledHandler<span class="token punctuation">,</span> rejectHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> abortRequest <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">rejectHandler</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">.</span>response<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">401</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> <span class="token punctuation">{</span> config <span class="token punctuation">}</span> <span class="token operator">=</span> error<span class="token punctuation">;</span>\n        <span class="token keyword">let</span> isRefreshing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n        <span class="token comment">// token失效</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRefreshing<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            isRefreshing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token function">refreshToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">result</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                <span class="token keyword">const</span> <span class="token punctuation">{</span> access_token <span class="token punctuation">}</span> <span class="token operator">=</span> result<span class="token punctuation">;</span>\n                <span class="token function">setToken</span><span class="token punctuation">(</span>access_token<span class="token punctuation">)</span><span class="token punctuation">;</span>\n                abortRequest<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token function">item</span><span class="token punctuation">(</span>access_token<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token keyword">return</span> <span class="token function">instance</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">error</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                isRefreshing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                abortRequest<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">token</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token function">instance</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n                        <span class="token operator">...</span>config<span class="token punctuation">,</span>  \n                        headers<span class="token operator">:</span> <span class="token punctuation">{</span>\n                            Authorization<span class="token operator">:</span> token\n                        <span class="token punctuation">}</span>\n                    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">return</span> instance<span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div>',7),t={render:function(n,s){return p}}}}]);