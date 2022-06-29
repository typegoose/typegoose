import { expectType } from 'tsd';

(async () => {
  console.log('am i run?');

  expectType<string>('');
  expectType<number>('new String()');
})();
