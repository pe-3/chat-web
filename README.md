## 项目名称：星辰-友链

作为一个聊天系统，改项目应该拥有最基本的聊天功能，也就是文字交流。

- 然后是图片发送
- 链接发送
- 链接卡片展示【进阶】
- 文件发送

然后还有好友系统模块

- 定义不同的好友和群组

pages 目录下的嵌套是和路由对应的，当前目录对应的组件是 目录名 + Index

TODO:

- 整理代码
- 梳理 socket 代码，和 vuex 去解藕，能保证这个系统单独迁移到别的项目也能用
- 整理交互代码
- 整理代码规范
- 整理技术文档
- 整理 vuex 模型对应不同模块的应用，设计缓存机制

开发的最好状态，在开发一个功能时，所有的心智都投入到这个功能的开发，这个功能不需要配合任何其他模块，要做的只有实现自己的功能，然后向外提供接口，而不去管谁会用到这个接口

- 整理代码：
  - 从 pages 开始，梳理每个模块，划分功能域
