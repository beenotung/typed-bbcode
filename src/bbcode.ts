function run(f: (code: string) => string, code: string) {
  for (; ;) {
    let res = f(code)
    if (res === code) {
      return code
    }
    code = res
  }
}

function img(code: string) {
  return code.replace(/\[img]/g, `<img src="`).replace(/\[\/img]/g, `">`)
}

function i(code: string) {
  return code
    .replace(/\[i]/g, `<i>`)
    .replace(/\[i\=s]/g, `<i>`)
    .replace(/\[\/i]/g, `</i>`)
}

function attr(o: {
  start: string;
  end: string;
  f: (attr: string, body: string) => string;
}) {
  return function(code: string) {
    let start = code.indexOf(o.start)
    if (start === -1) {
      return code
    }
    let end = code.indexOf(']', start)
    if (end === -1) {
      return code
    }
    let attr = code.substring(start + o.start.length, end)
    let prefix = code.substring(0, start)
    start = end + 1
    if (start >= code.length) {
      return code
    }
    end = code.indexOf(o.end, start)
    if (end === -1) {
      return code
    }
    let body = code.substring(start, end)
    let suffix = code.substring(end + o.end.length)
    let span = o.f(attr, body)
    return prefix + span + suffix
  }
}

let size = attr({
  start: '[size=',
  end: '[/size]',
  f: (attr, body) => `<span style="font-size: ${attr}">${body}</span>`,
})

let font = attr({
  start: '[font=',
  end: '[/font]',
  f: (attr, body) => {
    attr = attr.replace(', &quot;', '')
    return `<span style="font-family: ${attr}">${body}</span>`
  },
})

let color = attr({
  start: '[color=',
  end: '[/color]',
  f: (attr, body) => {
    if (attr.length === 5 && attr[0] === '#' && attr[4] === '0') {
      attr = attr.substring(0, 4) // make transparent text visible
    }
    return `<span style="color: ${attr}">${body}</span>`
  },
})

let url = attr({
  start: '[url=',
  end: '[/url]',
  f: (attr, body) => `<a href="${attr}">${body}</a>`,
})

let images: string[] = []
let attach = attr({
  start: '[attach',
  end: '[/attach]',
  f: () => {
    let src = images.shift()
    return `<ion-img src="${src}"></ion-img>`
  },
})

export function bbcode_to_html(code: string, attachments: string[] = []): string {
  let r = (f: (code: string) => string) => {
    code = run(f, code)
  }
  r(img)
  r(size)
  r(font)
  r(color)
  r(i)
  r(url)
  images = attachments
  r(attach)
  return code
}

