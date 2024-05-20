import { Sets, compileToConstructor, compileToRsp, rsp2latex } from './deps.ts';
import standard from './neuralscript-rsp.js'; 

const ctr = compileToConstructor(
  `
[Class "X"] 
[Property "X" "p1" "Y"] [Annotation "X" "p1" "model" "feature1"]
[Property "X" "q" "Z"] [Annotation "X" "q" "model" "label1"]

[Class "XX"] [Extends "XX" "X"]
[Property "XX" "p2" "Y"] [Annotation "XX" "p2" "model" "feature2"]

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

for (const t of instance.tuples().filter(t => t.name() === 'Filled'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'IncompleteFeatureVector'))
{
  console.log(String(t));
}
for (const t of instance.tuples().filter(t => t.name() === 'CompleteFeatureVector'))
{
  console.log(String(t));
}
