function run(f: (code: string) => string, code: string) {
  for (;;) {
    const res = f(code)
    if (res === code) {
      return code
    }
    code = res
  }
}

function img(code: string) {
  return code
    .replace(/\[img]/g, `<img src="`)
    .replace(/\[img=.*?]/g, `<img src="`)
    .replace(/\[\/img]/g, `">`)
}

function i(code: string) {
  return code
    .replace(/\[i]/g, `<i>`)
    .replace(/\[i\=s]/g, `<i>`)
    .replace(/\[\/i]/g, `</i>`)
}

function b(code: string) {
  return code
    .replace(/\[b]/g, `<b>`)
    .replace(/\[b\=s]/g, `<b>`)
    .replace(/\[\/b]/g, `</b>`)
}

function attr(o: {
  start: string
  end: string
  f: (attr: string, body: string) => string
}) {
  return function (code: string) {
    let start = code.indexOf(o.start)
    if (start === -1) {
      return code
    }
    let end = code.indexOf(']', start)
    if (end === -1) {
      return code
    }
    const attr = code.substring(start + o.start.length, end)
    const prefix = code.substring(0, start)
    start = end + 1
    if (start >= code.length) {
      return code
    }
    end = code.indexOf(o.end, start)
    if (end === -1) {
      return code
    }
    const body = code.substring(start, end)
    const suffix = code.substring(end + o.end.length)
    const span = o.f(attr, body)
    return prefix + span + suffix
  }
}

const size = attr({
  start: '[size=',
  end: '[/size]',
  f: (attr, body) => `<span style="font-size: ${attr}">${body}</span>`,
})

const font = attr({
  start: '[font=',
  end: '[/font]',
  f: (attr, body) => {
    attr = attr.replace(', &quot;', '')
    return `<span style="font-family: ${attr}">${body}</span>`
  },
})

const color = attr({
  start: '[color=',
  end: '[/color]',
  f: (attr, body) => {
    if (attr.length === 5 && attr[0] === '#' && attr[4] === '0') {
      attr = attr.substring(0, 4) // make transparent text visible
    }
    return `<span style="color: ${attr}">${body}</span>`
  },
})

const url = attr({
  start: '[url=',
  end: '[/url]',
  f: (attr, body) => `<a href="${attr}">${body}</a>`,
})

let images: string[] = []
const attach = attr({
  start: '[attach',
  end: '[/attach]',
  f: () => {
    const src = images.shift()
    return `<ion-img src="${src}"></ion-img>`
  },
})

export function bbcode_to_html(
  code: string,
  attachments: string[] = [],
): string {
  const r = (f: (code: string) => string) => {
    code = run(f, code)
  }
  r(img)
  r(size)
  r(font)
  r(color)
  r(i)
  r(b)
  r(url)
  images = attachments
  r(attach)
  return code
}

export function extract_images_from_bbcode(
  code: string,
  imgs: string[] = [],
): string[] {
  const ss = code.split('[img]')
  if (ss.length === 1) {
    return imgs
  }
  ss.forEach(s => {
    const ss = s.split('[/img]')
    if (ss.length === 1) {
      return
    }
    let img = ss[0]
    if (img.includes('[img=')) {
      img = img.split('[img=')[1]
      img = img.substring(img.indexOf(']') + 1)
    }
    imgs.push(img)
  })
  return imgs
}
