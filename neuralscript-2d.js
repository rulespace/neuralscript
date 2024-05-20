import { Sets, compileToConstructor, compileToRsp, rsp2latex } from './deps.ts';
import standard from './neuralscript-rsp.js'; 

const ctr = compileToConstructor(
  `
[Class "X"]
[ConcreteMethod "X" "m" [Fun1 "P" "Q"]] [Annotation "X" "m" "model1" "feature1"] [Annotation "X" "m" "model2" "feature1"]

[Class "Y"] [Extends "Y" "X"]
[ConcreteMethod "Y" "n" [Fun1 "A" "B"]] [Annotation "Y" "n" "model2" "feature2"]

[EventType "event1" "X"]

[Feature "model1" "feature1"]
[Feature "model2" "feature1"]
[Feature "model2" "feature2"]
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
