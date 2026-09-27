import test from 'node:test';import assert from 'node:assert/strict';import {cents,entry,summarize,validEntries,validDate} from '../public/domain.js';
const make=(amount,type='expense',date='2026-09-01')=>entry({description:'Test',amount,type,category:'Food',date});
test('currency conversion avoids floating-point totals',()=>{assert.equal(cents('0.10')+cents('0.20'),30);assert.equal(cents('12.3'),1230);for(const n of ['-1','0','1.999','1e3','Infinity'])assert.throws(()=>cents(n));});
test('month totals exclude other months and separate income',()=>{const s=summarize([make('100','income'),make('12.50'),make('99','expense','2026-08-31')],'2026-09');assert.equal(s.balance,8750);assert.equal(s.expenses,1250);assert.equal(s.categories[0].amount,1250);assert.equal(s.items.length,2);});
test('dates reject calendar rollover and allow leap days',()=>{assert.equal(validDate('2024-02-29'),true);assert.equal(validDate('2026-02-29'),false);assert.throws(()=>make('1','expense','2026-02-30'));});
test('storage validation rejects invalid amounts',()=>{assert.equal(validEntries([{...make('1'),amount:1.2}]),false);assert.equal(validEntries([make('1')]),true);});
