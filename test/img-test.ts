import { extract_images_from_bbcode } from '../src/bbcode'

const text = `
some options [img=0,1]http://host.net/image-4[/img]
some text [img]http://host.net/image-1.jpg[/img] [img]http://host.net/image-2.jpg[/img]
more text
[img]http://host.net/image-3.jpg[/img]
and more
the last [img]http://host.net/image-5[/img]
`

const imgs = extract_images_from_bbcode(text)
console.log(imgs)
if (imgs.length !== 5) {
  console.error('expect 5 images, got', imgs.length)
  process.exit(1)
}
