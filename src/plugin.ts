import { plugins } from './data';

export const plugin = (mongoosePlugin, options?) => (constructor: any) => {
  const name = constructor.name;
  if (!plugins[name]) {
    plugins[name] = [];
  }
  plugins[name].push({ mongoosePlugin, options });
};
