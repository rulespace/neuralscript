import { Sets, compileToConstructor, compileToRsp, rsp2latex } from './deps.ts';
import standard from './neuralscript-rsp.js'; 

const rsp = compileToRsp(standard);
const latexRules = rsp2latex(rsp);

const latex = 
`
\\documentclass[9pt,a4paper]{article}
\\usepackage{amsmath,amssymb}
\\usepackage{mathpartir}

\\begin{document}
${latexRules}
\\end{document}
`

Deno.writeTextFileSync('compiled/neuralscript.tex', latex);

