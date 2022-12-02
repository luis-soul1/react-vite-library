import dayjs, { ManipulateType } from 'dayjs'
type ExpandRecursively<T> = T extends object ? (T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never) : T
type RemoveNull<T> = ExpandRecursively<{ [K in keyof T]: Exclude<RemoveNull<T[K]>, null> }>

export const cleanString = (string: string) => {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replaceAll(' ', '')
}

export const decimalFormat = (number: number | undefined) => {
  return new Intl.NumberFormat().format(number ?? 0)
}

export const calcAverage = (score: number, maxScore: number) => {
  return (score * 100) / maxScore
}

export const cleanRut = (rut: string) => {
  return typeof rut === 'string' ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : ''
}

export const validateRut = (rut: string) => {
  if (typeof rut !== 'string') {
    return false
  }
  if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
    return false
  }

  rut = cleanRut(rut)

  let t = parseInt(rut.slice(0, -1), 10)
  let m = 0
  let s = 1

  while (t > 0) {
    s = (s + (t % 10) * (9 - (m++ % 6))) % 11
    t = Math.floor(t / 10)
  }

  const v = s > 0 ? '' + (s - 1) : 'K'
  return v === rut.slice(-1)
}

export const formatRut = (rut: string) => {
  rut = cleanRut(rut)
  let result = rut ? rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1) : ''
  for (let i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + '.' + result
  }

  return result
}

export const stringTimeToUnix = (string = '1h') => {
  const TIME_TYPE: Record<string, ManipulateType> = {
    y: 'year',
    M: 'month',
    w: 'week',
    d: 'day',
    h: 'hour',
    m: 'minute',
    s: 'second',
    ms: 'millisecond'
  }

  const type: string = string.replace(/[0-9]/g, '')
  const time: string = string.replace(/[a-z]/g, '')

  if (time && TIME_TYPE[type]) {
    const then = dayjs().add(parseInt(time), TIME_TYPE[type])
    const now = dayjs()

    const formatedTime = {
      value: then.unix(),
      inSeconds: (+then - +now) / 1000
    }

    return formatedTime
  }
}

export const buildQuery = (query: Record<string, unknown>): string => {
  const cleanQuery = removeEmptyValues(query)

  const params = Object.entries(cleanQuery).map(([key, value]) => `${key}=${JSON.stringify(value)}`)

  return `?${params.join('&')}`
}

export function removeEmptyValues<T>(obj: T): RemoveNull<T> {
  return Object.fromEntries(
    Object.entries(obj as unknown as RemoveNull<T>)
      .filter((v) => v[1] !== null && v[1] !== '')
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyValues(v) : v])
  ) as RemoveNull<T>
}

export const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export const downloadBlobFile = (buffer: Blob, fileName: string) => {
  const element = document.createElement('a')
  element.href = window.URL.createObjectURL(buffer)
  element.download = fileName
  element.click()
  element.remove()
}

export const lastDotToDecimal = (number: string | number) => {
  const numberToString = number.toString()
  if (!numberToString.includes('.')) return numberToString
  return numberToString.replace(/.([^.]*)$/, ',$1')
}

export const isOdd = (number: number) => {
  return (number + 1) % 2 === 0
}

export const openBase64pdf = (base64file: string) => {
  const win = window.open()
  win &&
    win.document.write(
      '<iframe src="' +
        `data:application/pdf;base64,${base64file}` +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    )
}
export const sortByString = <T>(a: T, b: T, field: keyof T) => {
  const aTostring = cleanString(String(a[field]))
  const bTostring = cleanString(String(b[field]))

  if (aTostring < bTostring) return -1
  if (aTostring > bTostring) return 1
  return 0
}
