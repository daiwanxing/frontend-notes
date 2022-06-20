import{_ as d,o as i,c as r,a,b as e,e as t}from"./app.658ffcf5.js";const n={},c=a('<h2 id="\u94FE\u8868-linked-list" tabindex="-1"><a class="header-anchor" href="#\u94FE\u8868-linked-list" aria-hidden="true">#</a> \u94FE\u8868 (Linked-list)</h2><h3 id="\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#\u6570\u7EC4" aria-hidden="true">#</a> \u6570\u7EC4</h3><p>\u5728JavaScript\u8FD9\u95E8\u52A8\u6001\u8BED\u8A00\u4E2D\uFF0C\u6570\u7EC4\u8FD9\u4E00\u6570\u636E\u7ED3\u6784\u7684\u5B9E\u73B0\u5728JS\u5C42\u9762\u672C\u8D28\u4E0A\u4E5F\u662F\u4E00\u4E2AObject\uFF0C\u56E0\u5176\u52A8\u6001\u5206\u914Dsize\u7684\u7279\u6027\uFF0C\u6027\u80FD\u4E0D\u53CA\u9759\u6001\u8BED\u8A00\u7684Array\u3002</p><h3 id="\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#\u94FE\u8868" aria-hidden="true">#</a> \u94FE\u8868</h3><p>\u94FE\u8868\u662F\u4E00\u7EC4\u8282\u70B9\u7EC4\u6210\u7684\u96C6\u5408\uFF0C\u6BCF\u4E00\u4E2A\u8282\u70B9\u90FD\u4F7F\u7528\u4E00\u4E2A\u5BF9\u8C61\u7684\u5F15\u7528\u6307\u5411\u5B83\u7684\u540E\u7EE7\u3002\u6307\u5411\u53E6\u4E00\u4E2A\u8282\u70B9\u7684\u5F15\u7528\u53EB\u94FE\uFF0C\u94FE\u8868\u4E2D\u7684\u6BCF\u4E00\u4E2A\u8282\u70B9\u7531\u5934\u8282\u70B9\u548C\u5C3E\u8282\u70B9\u7EC4\u6210\uFF0C\u5934\u8282\u70B9\u901A\u5E38\u5B58\u50A8\u6570\u636E\uFF0C\u5C3E\u8282\u70B9\u5B58\u50A8\u540E\u7EE7\u8282\u70B9\u7684\u5F15\u7528\uFF08\u94FE\u8868\u4E2D\u7684\u6700\u540E\u4E00\u4E2A\u8282\u70B9\u7684\u5C3E\u8282\u70B9\u901A\u5E38\u6307\u5411\u4E00\u4E2A\u503C\u4E3A<code>null</code>\u7684\u8282\u70B9\uFF09\u3002</p><h3 id="\u4E3A\u4EC0\u4E48\u94FE\u8868\u5927\u90E8\u5206\u573A\u666F\u6027\u80FD\u4F18\u4E8E\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48\u94FE\u8868\u5927\u90E8\u5206\u573A\u666F\u6027\u80FD\u4F18\u4E8E\u6570\u7EC4" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48\u94FE\u8868\u5927\u90E8\u5206\u573A\u666F\u6027\u80FD\u4F18\u4E8E\u6570\u7EC4</h3><h4 id="\u63D2\u5165\u3001\u5220\u9664\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u63D2\u5165\u3001\u5220\u9664\u64CD\u4F5C" aria-hidden="true">#</a> \u63D2\u5165\u3001\u5220\u9664\u64CD\u4F5C</h4><p>\u5728\u6570\u7EC4\u4E2D\uFF0C\u63D2\u5165\u4E00\u4E2A\u5143\u7D20\u5230\u6570\u7EC4\u5185\u7684\u67D0\u4E2A\u4F4D\u7F6E\uFF0C\u90FD\u9700\u8981\u91CD\u65B0\u7D22\u5F15\u6574\u4E2A\u6570\u7EC4\uFF0C\uFF08\u5C3E\u90E8\u63D2\u5165\u5219\u4E0D\u9700\u8981\u7D22\u5F15\u6574\u4E2A\u6570\u7EC4\uFF09\uFF0C\u52A8\u6001\u8C03\u6574\u6570\u7EC4\u7684\u957F\u5EA6\uFF0C\u8FD9\u5BF9\u4E8E\u4E00\u4E2Asmaller\u6570\u7EC4\u800C\u8A00\u8FD9\u70B9\u6027\u80FD\u5F00\u9500\u53EF\u4EE5\u5B8C\u5168\u5FFD\u7565\u4E0D\u8BA1\uFF0C\u4F46\u662F\u6570\u7EC4\u9879\u8DB3\u591F\u5927\u7684\u573A\u666F\u4E0B\uFF0C\u4F8B\u5982\u5B58\u50A8\u67D0\u4E2A\u6570\u7EC4\u5B58\u50A8\u4E861\u4E07\u6761\u6570\u636E\uFF0C\u5F80\u6570\u7EC4\u5934\u90E8\u63D2\u5165\u4E00\u4E2A\u6570\u636E\u540E\uFF0C\u6574\u4E2A\u6570\u7EC4\u5C06\u8981\u91CD\u65B0\u7D22\u5F15\uFF0C\u6BCF\u4E2A\u6570\u7EC4\u9879\u7684\u4E0B\u6807\u90FD\u9700\u8981\u8FDB\u884C\u6539\u53D8\uFF0C\u8FD9\u662F\u8F83\u4E3A\u8017\u8D39\u65F6\u95F4\u7684\uFF0C\u603B\u8017\u65F6\u4E3AO(N), \u5176\u4E2DN\u4E3A\u6570\u7EC4\u7684\u957F\u5EA6\u3002</p><p>\u800C\u5BF9\u4E8E\u4E00\u4E2A\u94FE\u8868\u800C\u8A00\uFF0C\u6CA1\u6709\u7D22\u5F15\u7EF4\u62A4\u7684\u5F00\u9500\uFF0C\u63D2\u5165\u67D0\u4E2A\u5143\u7D20\u5230\u6307\u5B9A\u8282\u70B9\uFF0C\u53EA\u9700\u8981\u5C06\u65B0\u5143\u7D20\u94FE\u63A5\u5230\u6307\u5B9A\u8282\u70B9\u540E\uFF0C\u4EE5\u53CA\u65AD\u5F00\u6307\u5B9A\u7684\u8282\u70B9\u4E0B\u4E00\u4E2A\u5F15\u7528\uFF0C\u5E76\u5C06\u8BE5\u5F15\u7528\u4F5C\u4E3A\u65B0\u5143\u7D20\u7684\u4E0B\u4E00\u4E2A\u8282\u70B9\uFF0C\u65E0\u8BBA\u94FE\u8868\u7684\u8282\u70B9\u6709\u591A\u5C11\u4E2A\uFF0C\u5176\u64CD\u4F5C\u65F6\u95F4\u6C38\u8FDC\u4E3AO(1)\u3002</p>',9),h=e("blockquote",null,[t("\u53C2\u8003\u94FE\u63A5\uFF1A"),e("a",{herf:"https://medium.com/nerd-for-tech/why-use-a-linked-list-instead-of-an-array-f75cdebaad22"},"Why Use A Linked List Instead Of An Array?")],-1),o=a('<h3 id="\u94FE\u63A5\u7684\u79CD\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u94FE\u63A5\u7684\u79CD\u7C7B" aria-hidden="true">#</a> \u94FE\u63A5\u7684\u79CD\u7C7B</h3><ol><li><p>\u5355\u94FE\u8868 (Single-linked-list)</p><p>\u7B2C\u4E00\u4E2A\u8282\u70B9\u5373\u4E3A\u94FE\u8868\u7684\u5934\u90E8\uFF0C\u901A\u5E38\u4E5F\u7528head\u5143\u7D20\u6765\u5B9A\u4E49.</p></li><li><p>\u53CC\u94FE\u8868 (double-linked-list)</p><p>\u548C\u5355\u94FE\u8868\u4E0D\u540C\u7684\u662F\uFF0C\u94FE\u8868\u7684\u6BCF\u4E00\u4E2A\u8282\u70B9\u4E0D\u4EC5\u5B58\u50A8\u4E86<code>next</code>\u4E5F\u540C\u65F6\u5B58\u50A8\u4E86<code>previous</code>\uFF0C\u5934\u8282\u70B9\u7684<code>previous</code>\u548C\u5C3E\u8282\u70B9\u7684<code>next</code>\u4E3Anull.</p></li><li><p>\u5FAA\u73AF\u94FE\u8868 \u94FE\u8868\u7684\u5C3E\u8282\u70B9\u7684<code>next</code>\u7684\u5F15\u7528\u6C38\u8FDC\u6307\u5411\u5934\u8282\u70B9.</p></li></ol>',2),s=[c,h,o];function l(p,u){return i(),r("div",null,s)}var f=d(n,[["render",l],["__file","READM.html.vue"]]);export{f as default};
