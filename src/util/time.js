export function getTime () {
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const date = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const second = d.getSeconds()
    return `${year}-${f(month)}-${f(date)} ${f(hour)}:${f(minute)}:${f(second)}`

    function f (num) {
        return num > 9 ? num : '0' + num
    }
}