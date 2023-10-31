import { defineConfig } from 'dumi';
import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: '@eflag/captcha',
    github: homepage,
  },
  html2sketch: {},
});
