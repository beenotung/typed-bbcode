import { extract_images_from_bbcode } from '../src/bbcode'

const text = `
some text [img]http://host.net/image-1.jpg[/img] [img]http://host.net/image-2.jpg[/img]
more text
[img]http://host.net/image-3.jpg[/img]
and more
`
const imgs = extract_images_from_bbcode(text)
console.log(imgs)
if (imgs.length !== 3) {
  console.error('expect 3 images, got', imgs.length)
  process.exit(1)
}
