export const getDateInfo = () => {
  const currentDate = new Date()
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return {
    day: currentDate.getDate(),
    month: monthNames[currentDate.getMonth()],
    year: currentDate.getFullYear().toString(),
    weekday: dayNames[currentDate.getDay()]
  }
}