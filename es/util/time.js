export function getTime() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  return year + "-" + f(month) + "-" + f(date) + " " + f(hour) + ":" + f(minute) + ":" + f(second);

  function f(num) {
    return num > 9 ? num : '0' + num;
  }
}
//# sourceMappingURL=time.js.map