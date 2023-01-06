import { useId, useState } from "react";
import Calendar from 'react-calendar';
import { useParams } from "react-router-dom";

import 'react-calendar/dist/Calendar.css';
import { useCreateBooking, useFetchBookings } from "../../hooks/bookings";
import { useFetchWarehouse } from "../../hooks/warehouses";
import { dateObjectToString } from "../../utils/date";
import AvailableBookings from "../../components/booking/AvailableBooking";
import BookingHeader from "../../components/booking/BookingHeader";
import ConfirmationModal from "../../components/Modal";


const ws = new WebSocket("ws://localhost:4000/cable")

function Booking() {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [date, onDateChange] = useState(new Date());
  const [increment, setIncrement] = useState(15);
  const { id } = useParams();
  const wId = useId();
  const {
    loading,
    availableBookings,
    setAvailableBookings
  } = useFetchBookings(id, date.toISOString(), increment);
  const { createBooking, status, setStatus } = useCreateBooking(id);
  const { wareHouseLoading, warehouse } = useFetchWarehouse(id);

  ws.onopen = () => {
    ws.send(JSON.stringify({
      command: "subscribe",
      identifier: JSON.stringify({
        id: wId,
        channel: "BookingsChannel"
      })
    }));
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    if (data.type === "confirm_subscription") return;

    setAvailableBookings((bookings) => bookings?.filter((booking) => (
      !(booking[0] === data.message.start_time) || !(booking[1] === data.message.end_time)
    )))
  }

  const dateChangeHandler = (selectedDate: Date) => {
    onDateChange(selectedDate)
  };

  const incrementHandler = (event: any) => {
    setIncrement(event.target.value)
  };

  const handleOpenModal = (timeSlot: string) => {
    setModalOpen(true);
    setSelectedTimeSlot(timeSlot)
  }

  const createBookingHandler = () => {
    const [start, end] = selectedTimeSlot;
    createBooking({
      booking: {
        start_time: start,
        end_time: end
      }
    });
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex my-8  p-8 rounded shadow-2xl">
          <div className="flex flex-col items-center">
            <BookingHeader  wareHouseLoading={wareHouseLoading} warehouse={warehouse} />
            <div className="border-b border-[#cccccc] w-full mt-[40px] mb-4" />
            <Calendar className="rounded w-[500px] border-0" onChange={dateChangeHandler} value={date} />
          </div>

          <div className="border-r border-[#cccccc] mx-12"/>

          <div className="flex flex-col items-center min-w-[240px]">
            <AvailableBookings
              dateString={dateObjectToString(date)}
              increment={increment}
              incrementHandler={incrementHandler}
              availableBookings={availableBookings}
              bookingsLoading={loading}
              handleOpenModal={handleOpenModal}
            />
          </div>

        </div>
        <ConfirmationModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          confirmModalCallback={createBookingHandler}
          status={status}
          setStatus={setStatus}
        />
      </div>
    
    </>
  );
}

export default Booking;
