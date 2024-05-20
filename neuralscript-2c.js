import { Sets, compileToConstructor, compileToRsp, rsp2latex } from './deps.ts';
import standard from './neuralscript-rsp.js'; 

const ctr = compileToConstructor(
  `
[Class "X"]
[ConcreteMethod "X" "m1" [Fun1 "P" "Q"]] [Annotation "X" "m1" "model" "feature1"]
[ConcreteMethod "X" "m2" [Fun1 "P" "Q"]] [Annotation "X" "m2" "model" "feature2"]

[Class "Y"] [Extends "Y" "X"]
[ConcreteMethod "Y" "m2" [Fun1 "P" "Q"]] [Annotation "Y" "m2" "model" "feature2"]

[EventType "event1" "X"]

[Feature "model" "feature1"]
[Feature "model" "feature2"]
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
