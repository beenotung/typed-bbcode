import fs from 'fs'
import path from 'path'
import { bbcode_to_html } from '../src/bbcode'

const input = fs.readFileSync(path.join('test', 'in.html')).toString()
const output = bbcode_to_html(input)
const outFile = path.join('test', 'out.html')
fs.writeFileSync(
  outFile,
  `<div style="white-space: pre-wrap">
${output}
</div>`,
)
console.log('saved to', outFile)
