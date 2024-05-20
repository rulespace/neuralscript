import { Sets, compileToConstructor, compileToRsp, rsp2latex } from './deps.ts';
import standard from './neuralscript-rsp.js'; 

const ctr = compileToConstructor(
  `
  [Class "X"]
  [Property "X" "p" "Px"]
  [Property "X" "q" "Qx"]
  [ConcreteMethod "X" "m" [Fun1 "P" "Q"]]
  
  [Class "Y"]
  [Extends "Y" "X"]
  [Property "Y" "p" "Py"]
  [Property "Y" "r" "R"]
  
  [Class "Z"]
  [Extends "Z" "Y"]
  [Property "Z" "q" "Qz"]

  `
  + standard);

const instance = ctr();

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

for (const t of instance.tuples().filter(t => t.name() === 'Subtype'))
{
  console.log(String(t));
}

for (const t of instance.tuples().filter(t => t.name() === 'DirectSupertype'))
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

