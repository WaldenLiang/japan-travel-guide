import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const guide = readFileSync(new URL('../japan-travel-guide.html', import.meta.url), 'utf8');
const charts = readFileSync(new URL('../assets/charts.js', import.meta.url), 'utf8');

for (const removedText of ['一泊二食', '私汤', '貸切風呂', '客室露天風呂', 'onsen-']) {
  assert.equal(
    guide.includes(removedText),
    false,
    `Guide should not retain the removed ryokan-plan text: ${removedText}`
  );
}

assert.match(guide, /D4[\s\S]{0,1200}和服体验/, 'Day 4 should include the kimono experience');
assert.match(guide, /冈本和服租赁/, 'Guide should recommend Rental Kimono Okamoto');
assert.match(guide, /梦馆五条店/, 'Guide should include Yumeyakata Gojo as an alternative');
assert.match(guide, /CASA 祇园店/, 'Guide should include CASA Gion as an evening alternative');
assert.match(guide, /Day 4~6/, 'Kyoto accommodation should cover Day 4 through Day 6');
assert.match(charts, /value: 6300, name: '住宿'/, 'Budget chart should use the regular-hotel accommodation budget');
assert.match(charts, /value: 1820, name: '门票景点（含和服体验）'/, 'Budget chart should include the kimono experience');

console.log('Kimono replacement checks passed.');
