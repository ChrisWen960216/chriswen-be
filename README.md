# ChrisWen - BE

> 个人博客

开发版文档看[这里](/doc/api.md)

|模块|功能|API|完成度|
|---|---|---|---|
|用户|注册|`POST /user/register`|√|
||登录|`POST /user/login`|√|
||获取信息|`GET /user/info`|√|
|博客|添加|`POST /blog`|√|
||修改|`PUT /blog/:blogId`||
||删除|`DELETE /blog/blogId`||
||获取详情（按ID）|`GET /blog/blog:id`||
|轮播|修改轮播|||
|中间件|权限控制||√|
||错误处理||√|
|数据库|用户模型||√|
||博客模型|||
||轮播模型|||
||用户操作（CR）||√|
||博客操作（CRUD）||√|
||轮播操作（CRUD）|||