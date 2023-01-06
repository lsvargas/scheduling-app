const timeIncrementOptions = [
  { value: 15, name: "15 minutes"},
  { value: 30, name: "30 minutes"},
  { value: 45, name: "45 minutes"},
  { value: 60, name: "1 hour"},
  { value: 75, name: "1 hour 15 minutes"},
  { value: 90, name: "1 hour 30 minutes"},
  { value: 120, name: "2 hours"},
];

const bookingStatusMapper: any = {
  default: {
    title: "Book time slot",
    description: "Are you sure you want to book this slot?"
  },
  success: {
    title: "Booking Successful",
    description: "The time slot was successfully booked!"
  },
  error: {
    title: "Booking Error",
    description: "There was an error while trying to book this time slot"
  },
  loading: {
    title: "Loading..."
  }
}

export { timeIncrementOptions, bookingStatusMapper }
