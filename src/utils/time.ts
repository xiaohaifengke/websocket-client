export function getTime(): string {
  const d = new Date()
  const year = `${d.getFullYear()}`
  const month = `${d.getMonth() + 1}`
  const date = `${d.getDate()}`
  const hour = `${d.getHours()}`
  const minute = `${d.getMinutes()}`
  const second = `${d.getSeconds()}`
  return `${year}-${month.padStart(2, '0')}-${date.padStart(
    2,
    '0'
  )} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(
    2,
    '0'
  )}`
}
