import { Sets, compileToConstructor, compileToRsp, rsp2latex } from './deps.ts';
import standard from './neuralscript-rsp.js'; 

const ctr = compileToConstructor(
  `
[Class "X"]
[Property "X" "p" "Y"] 

[Class "XX"] [Extends "XX" "X"]

[Class "Y"]


[Class "YY"] [Extends "YY" "Y"]
[Property "YY" "q" "A"] [Annotation "YY" "q" "model" "feature"]

[EventType "event1" "XX"]

[Feature "model" "feature"]

`
  + standard);

const instance = ctr();



for (const t of instance.tuples().filter(t => t.name() === 'ResolvedAnnotation'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'FeatureVector'))
{
  console.log(String(t));
}
