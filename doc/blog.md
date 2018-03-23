# Blog
1. 增加博客
    + URL: `POST /blog`
    + DATA: 
      ```js
        request.body = {
          title: String,
          introduce: String,
          auth: String,
          createTime: Date,
          species: Number,
          content: String
        }
      ```