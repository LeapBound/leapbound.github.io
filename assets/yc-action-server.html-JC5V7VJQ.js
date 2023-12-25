import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,f as e}from"./app-yRCvHPke.js";const o={},t=e(`<h3 id="什么是-yc-action-server" tabindex="-1"><a class="header-anchor" href="#什么是-yc-action-server" aria-hidden="true">#</a> 什么是 yc-action-server？</h3><p><code>yc-action-server</code>是一个较为简单的后端应用程序。它是为了<code>function-call</code>定义方法的实现。</p><h3 id="功能亮点" tabindex="-1"><a class="header-anchor" href="#功能亮点" aria-hidden="true">#</a> 功能亮点</h3><p>1.<code>yc-action-server</code>采用了 java + groovy 方式，除了接口和类定义都是 java，<code>function-call</code>的实现方法全部都由 groovy 脚本完成。 采用 groovy 脚本且不是 class 的好处是，可以随时动态调用 groovy 脚本中的方法，这样就可以随时响应上层服务<code>function-call</code> 不断新增的方法。</p><p>2.项目中采用了<code>redis-stream</code>作为消息队列</p><p>3.配置使用<code>HTTP Interface Client(WebClient)</code>编写 Http 客户端，类似于 Spring Cloud OpenFeign，只需要声明接口就可以完成工作。</p><h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. 执行 sql， sql/20231016/yucong.sql

2. 配置文件根据自己的环境配置

3. 启动 Spring
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="说明" tabindex="-1"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h3><p>1.数据表 <em>yc_function_groovy</em> 保存的是 function名对应的 groovy脚本名和脚本存储位置。应用读取到上层服务的 function-call 定义的 function 时， 查找到对应的 groovy 脚本并调用。</p><p>2.数据表 <em>yc_function_execute_record</em> 记录的是 function 调用的记录，包括入参和返回。</p><p>3.此应用启动时，设定了 <code>ApplicationListener</code>，读取 resources 下的 scripts（包含所有 groovy 脚本）并放到指定的 groovy 地址（yc_function_groovy 的 groovy_url）。</p><p>4.应用中还保留了原始的 java 类调用方式。</p><h3 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h3><ol><li>保存 groovy 脚本定义</li></ol><ul><li>Method: <strong>POST</strong></li><li>URL: <code>http://localhost:8180/yc/function/groovy/save</code></li><li>Headers: Content-Type:application/json</li><li>Body:</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;functionName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;get_current_weather&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;groovyName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Weather.groovy&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;groovyUrl&quot;</span><span class="token operator">:</span> <span class="token string">&quot;/home/scripts/weather/&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;userName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;yao&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Response:</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;success&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
  <span class="token property">&quot;msg&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;success&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
  <span class="token property">&quot;msg&quot;</span><span class="token operator">:</span> <span class="token string">&quot;数据已经存在&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>上传 groovy 脚本文件到 groovy url</li></ol><ul><li>Method: <strong>POST</strong></li><li>URL: <code>http://localhost:8180/yc/function/groovy/scripts/upload</code></li><li>Headers: Content-Type:multipart/form-data</li><li>Form-data:</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>file@
groovyUrl=/home/scripts/weather/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Response:</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;success&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
  <span class="token property">&quot;msg&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;success&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
  <span class="token property">&quot;msg&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Groovy scripts not exist in yc_function_groovy, Weather.groovy&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.测试调用</p><ul><li>Method: <strong>POST</strong></li><li>URL: <code>http://localhost:8180/yc/function/openai/execute</code></li><li>Headers:</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Content-Type:application-json
userName: yao
accountId:
deviceId:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Body:</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;get_current_weather&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;arguments&quot;</span><span class="token operator">:</span> <span class="token string">&quot;{\\&quot;location\\&quot;:\\&quot;上海\\&quot;}&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Response:</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;role&quot;</span><span class="token operator">:</span> <span class="token string">&quot;function&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;{\\&quot;天气\\&quot;:\\&quot;晴朗\\&quot;,\\&quot;温度\\&quot;:\\&quot;32\\&quot;,\\&quot;紫外线指数\\&quot;:\\&quot;5\\&quot;,\\&quot;风速\\&quot;:\\&quot;5m/s\\&quot;,\\&quot;空气质量指数\\&quot;:\\&quot;30\\&quot;,\\&quot;location\\&quot;:\\&quot;上海\\&quot;}&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;get_current_weather&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;role&quot;</span><span class="token operator">:</span> <span class="token string">&quot;function&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;content&quot;</span><span class="token operator">:</span> <span class="token string">&quot;{\\&quot;错误\\&quot;:\\&quot;没有提供 location，要求用户明确 location.\\&quot;}&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;get_current_weather&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34),l=[t];function p(i,c){return s(),a("div",null,l)}const d=n(o,[["render",p],["__file","yc-action-server.html.vue"]]);export{d as default};
