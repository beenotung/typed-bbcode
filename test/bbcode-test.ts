import fs from 'fs'
import path from 'path'
import { bbcode_to_html } from '../src/bbcode'

let input = fs.readFileSync(path.join('test', 'in.html')).toString()
let output = bbcode_to_html(input)
let outFile = path.join('test', 'out.html')
fs.writeFileSync(outFile, `<div style="white-space: pre-wrap">
${output}
</div>`)
console.log('saved to', outFile)
