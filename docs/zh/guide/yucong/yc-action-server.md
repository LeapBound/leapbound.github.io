# yc-action-server

### 什么是 yc-action-server？

`yc-action-server`是一个较为简单的后端应用程序。它是为了`function-call`定义方法的实现。

### 功能亮点

1.`yc-action-server`采用了 java + groovy 方式，除了接口和类定义都是 java，`function-call`的实现方法全部都由 groovy 脚本完成。
采用 groovy 脚本且不是 class 的好处是，可以随时动态调用 groovy 脚本中的方法，这样就可以随时响应上层服务`function-call`
不断新增的方法。

2.项目中采用了`redis-stream`作为消息队列

3.配置使用`HTTP Interface Client(WebClient)`编写 Http 客户端，类似于 Spring Cloud OpenFeign，只需要声明接口就可以完成工作。

### 启动

```
1. 执行 sql， sql/20231016/yucong.sql

2. 配置文件根据自己的环境配置

3. 启动 Spring
```

### 说明

1.数据表 *yc_function_groovy* 保存的是 function名对应的 groovy脚本名和脚本存储位置。应用读取到上层服务的 function-call
定义的 function 时，
查找到对应的 groovy 脚本并调用。

2.数据表 *yc_function_execute_record* 记录的是 function 调用的记录，包括入参和返回。

3.此应用启动时，设定了 `ApplicationListener`，读取 resources 下的 scripts（包含所有 groovy 脚本）并放到指定的 groovy
地址（yc_function_groovy 的 groovy_url）。

4.应用中还保留了原始的 java 类调用方式。

### 如何使用

1. 保存 groovy 脚本定义

- Method: **POST**
- URL: ```http://localhost:8180/yc/function/groovy/save```
- Headers: Content-Type:application/json
- Body:

```json
{
  "functionName": "get_current_weather",
  "groovyName": "Weather.groovy",
  "groovyUrl": "/home/scripts/weather/",
  "userName": "yao"
}
```

- Response:

```json
{
  "success": true,
  "code": null,
  "msg": null,
  "data": null
}
```

```json
{
  "success": false,
  "code": null,
  "msg": "数据已经存在",
  "data": null
}
```

2. 上传 groovy 脚本文件到 groovy url

- Method: **POST**
- URL: ```http://localhost:8180/yc/function/groovy/scripts/upload```
- Headers: Content-Type:multipart/form-data
- Form-data:

```
file@
groovyUrl=/home/scripts/weather/
```

- Response:

```json
{
  "success": true,
  "code": null,
  "msg": null,
  "data": null
}
```

```json
{
  "success": false,
  "code": null,
  "msg": "Groovy scripts not exist in yc_function_groovy, Weather.groovy",
  "data": null
}
```

3.测试调用

- Method: **POST**
- URL: ```http://localhost:8180/yc/function/openai/execute```
- Headers:

```
Content-Type:application-json
userName: yao
accountId:
deviceId:
```

- Body:

```json
{
  "name": "get_current_weather",
  "arguments": "{\"location\":\"上海\"}"
}
```

- Response:

```json
{
  "role": "function",
  "content": "{\"天气\":\"晴朗\",\"温度\":\"32\",\"紫外线指数\":\"5\",\"风速\":\"5m/s\",\"空气质量指数\":\"30\",\"location\":\"上海\"}",
  "name": "get_current_weather"
}
```

```json
{
  "role": "function",
  "content": "{\"错误\":\"没有提供 location，要求用户明确 location.\"}",
  "name": "get_current_weather"
}
```