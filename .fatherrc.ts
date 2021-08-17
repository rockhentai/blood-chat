export default {
  esm: 'rollup',
  cjs: 'rollup',
  extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
};
