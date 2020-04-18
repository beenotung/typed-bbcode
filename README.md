# typed-bbcode

Convert BBCode (bulletin board code) into HTML

[![npm Package Version](https://img.shields.io/npm/v/typed-bbcode.svg?maxAge=2592000)](https://www.npmjs.com/package/typed-bbcode)

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
npm i --save typed-bbcode
```

## Usage

### Extract image links from bbcode
```typescript
import { extract_images_from_bbcode } from 'typed-bbcode'

const text = `
some text [img]http://host.net/image-1.jpg[/img] [img]http://host.net/image-2.jpg[/img]
more text
[img]http://host.net/image-3.jpg[/img]
and more
`
const imgs = extract_images_from_bbcode(text)
/*
[
  'http://host.net/image-1.jpg',
  'http://host.net/image-2.jpg',
  'http://host.net/image-3.jpg',
]
*/
```

### Conversion bbcode to html
#### Without attachments
```typescript
import fs from 'fs'
let input = fs.readFileSync('test/in.html').toString() // load string input

import { bbcode_to_html } from 'typed-bbcode'
let output = bbcode_to_html(input) // output is string
fs.writeFileSync('test/out.html', output)


```

#### With attachments
```typescript
import { bbcode_to_html } from 'typed-bbcode'

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
