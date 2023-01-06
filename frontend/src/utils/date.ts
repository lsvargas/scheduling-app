const dateObjectToString = (date: Date) => {
  const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString("en-US", options)
}

const getTime = (dateString: string) => {
  const date = new Date(dateString)
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  return date
}

const isoDateToHourMinutes = (date: string | undefined) => {
  if (!date) return ""

  const jsDate = getTime(date);

  return jsDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
}


export { dateObjectToString, isoDateToHourMinutes };
