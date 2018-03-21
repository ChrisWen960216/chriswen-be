# Webpage

## 首页
1. 获取轮播展示图
  + URL:`GET webpage/carousel`
  + DATA: `null`

2. 更换轮播展示图
  + URL:`PUT webpage/carousel`
  + DATA:
  ```js
    request.body = {
      carouselArray:[carouselURL:String]
    }
  ```

3. 获取标题
  + URL:`GET webpage/title`
  + DATA: `null`

4. 更换标题
  + URL：`PUT webpage/title`
  + DATA: 
  ```js
    request.body = {
      title:{
        main: String,
        extra: String
      }
    }
  ```

5. 获取展示博客
  + URL: `GET webpage/showblogs`
  + DATA: `null`

6. 更换展示博客
  + URL: `PUT webpage/showblogs`
  + DATA: 
  ```js
    request.body = {
      showblogs:[blogId:String]
    }
  ```