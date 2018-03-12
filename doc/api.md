# API
1. 注册
    + 注册页：`GET /signup`
    + 注册（包含上传头像）：`POST /signup`
2. 登录
    + 登录页：`GET /signin`
    + 登录：`POST /signin`
    + 登出：`GET /signout`
3. 查看文章
    + 主页：`GET /posts`
    + 个人主页：`GET /posts?author=xxx`
    + 查看一篇文章（包含留言）：`GET /posts/:postId`
4. 发表文章
    + 发表文章页：`GET /posts/create`
    + 发表文章：`POST /posts/create`
5. 修改文章
    + 修改文章页：`GET /posts/:postId/edit`
    + 修改文章：`POST /posts/:postId/edit`
    + 删除文章：`GET /posts/:postId/remove`
6. 留言
    + 创建留言：`POST /comments`
    + 删除留言：`GET /comments/:commentId/remove`