import { Sets, compileToConstructor, compileToRsp, rsp2latex } from './deps.ts';
import standard from './neuralscript-rsp.js'; 

const ctr = compileToConstructor(
  `
[Class "X"]
[Property "X" "p" "P"] [Annotation "X" "p" "model" "feature1"]
[Property "X" "q" "Q"]
[ConcreteMethod "X" "m" [Fun1 "P" "Q"]]

[Class "XX"] [Extends "XX" "X"]
[Property "XX" "r" "R"]

[Class "Y"]
[Property "Y" "a" "A"] [Annotation "Y" "a" "model" "label1"]

[Class "YY1"] [Extends "YY1" "Y"]
[Property "YY1" "c1" "C"]

[Class "YY2"] [Extends "YY2" "Y"]
[Property "YY2" "c2" "C"]

[EventType "event1" "X"]
[EventType "event1" "Y"]

[Feature "model" "feature1"]
[Label "model" "label1"]


`
  + standard);

const instance = ctr();

for (const t of instance.tuples().filter(t => t.name() === 'ConcreteSubtype'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'ResolvedAnnotation'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'FeatureVector'))
{
  console.log(String(t));
}
