# qz-web-vue

时间很少 干到哪里算哪里

## TODO:

动态路由有点弱，很多东西无法实现，或者实现的很不好，后期要给后端也搞一下

按钮权限控制

eslint会给else弄到下一行去，这个我不喜欢，有空得研究下应该是什么配置没弄好

接口的请求没有一个统一的request，我只能每一个api都包一个
`return request<Response<Models.PermissionList>>({`
过于抽象

我甚至没办法封装request直接拿到一个结果要每个请求都写一遍.data 半弃坑。。。

## 页面

- 组织账户
- 角色菜单
- API资源
- 字典
- 配置
- 代码模板
- 代码生产
- 文件管理
- 个人中心

## 样式

目前都是开天窗的样式
后面我会自己去画一些UI图
最后才会搞
