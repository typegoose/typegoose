import { expectType } from 'tsd-lite';

expectType<string>('');
expectType<number>('new String()');
