# 大文件断点续传

标签（空格分隔）： node.js

---
## 前言
>大文件的切片断点续传，起初我在许多博客，论坛，找了好长时间，没有找到相应的demo,和例子，要不么不能用，要么是一个点，无奈之下，只能我自己去找相应的资料去写。期间对于这一块是有好多的问题，还要感谢[这篇博主][1]给予的指点和帮助

有什么问题请issus提问，我会继续更新

## 技术栈

jquery+h5+node+koa2+multer

用到了以下的知识不懂的请认真看下，懂的请略过
jquery 原生 [XMLHttpRequest][2]
h5 原生 [blob][3]
js [fordata][4]的使用
[multer][5]和multer自定义存储引擎[Multer Storage Engine][6]


  [1]: http://blog.csdn.net/Real_Bird/article/details/78567820
  [2]: https://segmentfault.com/a/1190000004322487#articleHeader9
  [3]: https://www.cnblogs.com/hhhyaaon/p/5928152.html
  [4]: https://segmentfault.com/a/1190000006716454
  [5]: https://github.com/expressjs/multer
  [6]: https://github.com/expressjs/multer/blob/master/StorageEngine.md

## 项目运行

git clone   https://github.com/zDream/koa2-fileupload.git

cd koa2-fileupload

npm install

npm run start

>注意ie10以前版本不支持h5，运行不了。 可用Chrome,Firefox,Safari，Opera来运行

