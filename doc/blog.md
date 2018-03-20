# Blog
1. 增加博客
    + URL: `POST /blog/:blogId`
    + DATA: 
      ```js
        request.body = {
          title: String,
          introduce: String,
          key: String[],
          auth: String,
        }
      ```