import { useEffect, useState } from "react"

const useFetchBookings = (id: string | undefined, date: string, increment: number) => {
  const [loading, setLoading] = useState(false);
  const [availableBookings, setAvailableBookings] = useState<string[][]>();

  const parseBookResponse = (bookings: string[][]) =>
    bookings.map((booking) => [
      new Date(booking[0]).toISOString(),
      new Date(booking[1]).toISOString()
    ])
  
  useEffect(() => {
    const fetchAvailableBookings = async () => {
      setLoading(true)
      try {
        const response = await (
          await fetch(`http://localhost:4000/warehouses/${id}/bookings?date=${date}&inc=${increment}`)
        ).json()
        setAvailableBookings(parseBookResponse(response));
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    if (date) fetchAvailableBookings();
  }, [date, increment])

  return {
    loading,
    error: null,
    availableBookings,
    setAvailableBookings
  }
}

interface BookingType {
  start_time: string;
  end_time: string;
}

interface BookingInputType {
  booking: BookingType
}

type StatusType = | "default" | "success" | "error" | "loading";

const useCreateBooking = (id: string | undefined) => {
  const [status, setStatus] = useState<StatusType>("default");

  const createBooking = async (bookingData: BookingInputType) => {
    setStatus("loading");
    try {
      const response = await (await fetch(
        `http://localhost:4000/warehouses/${id}/bookings`,
        {
          method: 'POST',
          body: JSON.stringify(bookingData),
          headers: {
            "Content-Type": "application/json"
          } 
        }
      )).json()

      if (response?.code === 422) throw new Error('Something went wrong');

      setStatus("success");
    } catch(error) {
      setStatus("error")
    }
  }

  return {
    createBooking,
    status,
    setStatus
  }
}



export { useFetchBookings, useCreateBooking }
