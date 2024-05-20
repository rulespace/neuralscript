import { Sets, compileToConstructor, compileToRsp, rsp2latex } from './deps.ts';
import standard from './neuralscript-rsp.js'; 

const ctr = compileToConstructor(
  `
  [Class "I"]
  [Property "I" "p" "T1"]
  [AbstractMethod "I" "m" [Fun1 "A" "B"]]
  
  [Class "X"]
  [Extends "X" "I"]
  
  [Class "Y"]
  [Extends "Y" "X"]
  [Property "Y" "p" "T2"]
  [ConcreteMethod "Y" "m" [Fun1 "A" "B"]]

  [Class "Z"]
  [Extends "Z" "Y"]
  [ConcreteMethod "Z" "m" [Fun1 "A" "B"]]
  `
  + standard);

const instance = ctr();

for (const t of instance.tuples().filter(t => t.name() === 'DirectSubtype'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'DirectSupertype'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'InheritedMethod'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'OverridingMethod'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'InheritedProperty'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'AbstractType'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'ConcreteType'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'ConcreteSubtype'))
{
  console.log(String(t));
}
