# API
1. 登录
    + URL:`POST /user/login`
    + DATA:
        ```js
        request.body = {
            "user":"userName",
            "password":"password"
        }
        ```
    + RES:
        ```js
        {code:0,msg:"登陆成功"}
        request.session = 'ChrisWen'
        ```

2. 登出
    + URL: `DELETE /user/logout`
    + DATA: null
    + RES:
        ```js
        {code:0,msg:'注销成功'}
        request.session = null
        ```