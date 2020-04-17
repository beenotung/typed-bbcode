# typed-bbcode-to-html

Convert BBCode (bulletin board code) into HTML

[![npm Package Version](https://img.shields.io/npm/v/typed-bbcode-to-html.svg?maxAge=2592000)](https://www.npmjs.com/package/typed-bbcode-to-html)

## Supported BBCode
- img
- size
- font
- color
- i
- b
- url
- attach

## Installation
```bash
npm i --save typed-bbcode-to-html
```

## Usage

### Conversion without attachments
```typescript
import fs from 'fs'
let input = fs.readFileSync('test/in.html').toString() // load string input

import { bbcode_to_html } from 'typed-bbcode-to-html'
let output = bbcode_to_html(input) // output is string
fs.writeFileSync('test/out.html', output)


```

### Conversion with attachments
```typescript
import { bbcode_to_html } from 'typed-bbcode-to-html'

let code = `
some desc
[attach]1[/attach]

some more desc
[attach]2[/attach]
`

let attachments = [
  '/attachments/202004/17/image1.jpg',
  '/attachments/202004/17/image2.jpg',
]

let output = bbcode_to_html(code, attachments) // optionally supply the attachment list
/*
some desc
<img src="/attachments/202004/17/image1.jpg">

some more desc
<img src="/attachments/202004/17/image2.jpg">
*/
```
