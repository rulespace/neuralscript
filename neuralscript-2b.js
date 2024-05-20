import { Sets, compileToConstructor, compileToRsp, rsp2latex } from './deps.ts';
import standard from './neuralscript-rsp.js'; 

const ctr = compileToConstructor(
  `
[Class "X"]
[Property "X" "p" "P"] [Annotation "X" "p" "model" "featureX"]
[Property "X" "q" "Q"] [Annotation "X" "q" "model" "label1"]
[ConcreteMethod "X" "m" [Fun1 "P" "Q"]]

[Class "Y"] [Extends "Y" "X"]
[Property "Y" "p" "P2"] [Annotation "Y" "p" "model" "featureY"]

[EventType "event1" "X"]

[Feature "model" "featureX"]
[Feature "model" "featureY"]
[Label "model" "label1"]

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
