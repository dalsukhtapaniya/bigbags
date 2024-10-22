import { defineConfig } from '@vue/cli-service';

export default defineConfig({
  transpileDependencies: true,
  publicPath: './',  // Change this from '/' to './'
  configureWebpack: {
    devtool: 'source-map'
  }
});
