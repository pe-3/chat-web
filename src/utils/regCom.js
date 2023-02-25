export default function (Vue, requireComponent) {
    requireComponent.keys().forEach(fileName => {
        // 获取组件配置
        const componentConfig = requireComponent(fileName);
      
        // 获取组件的 PascalCase 命名
        const componentName = fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '');

        // 全局注册组件
        Vue.component(
          componentName,
          // 如果这个组件选项是通过 `export default` 导出的，
          // 那么就会优先使用 `.default`，
          // 否则回退到使用模块的根。
          componentConfig.default || componentConfig
        );
    });
}