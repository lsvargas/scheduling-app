import { timeIncrementOptions } from "../../../utils/constants";
import { isoDateToHourMinutes } from "../../../utils/date";
import Spinner from "../../Spinner";

interface AvailableBookingsProps {
  dateString: string;
  increment: number;
  incrementHandler: any;
  availableBookings: string[][] | undefined;
  bookingsLoading: boolean,
  handleOpenModal: any;
}

function AvailableBookings({
  dateString,
  increment,
  incrementHandler,
  availableBookings,
  bookingsLoading,
  handleOpenModal
} : AvailableBookingsProps ) {
  return (
    <>
      <h1>{dateString}</h1>
      <select
        value={increment}
        onChange={incrementHandler}
        id="countries" 
        disabled={bookingsLoading}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5559e1] focus:border-[#5559e1] block w-full p-2.5 mt-4"
      >
        {timeIncrementOptions.map((timeIncrement, index) => (
          <option key={index} value={timeIncrement.value}>
            {timeIncrement.name}
          </option>
        ))}
      </select>

      <div className="border-b border-[#cccccc] w-full mt-4 mb-4" />

      <div className="h-[500px] overflow-auto p-4">
        {bookingsLoading ? (
          <Spinner text="Loading bookings..."/>
        ) : (
          <>
            {availableBookings?.map((booking, index: number) => (
              <div 
                className="mb-4 border border-[#5559e1] rounded py-4 px-8 hover:bg-[#5559e1] hover:text-white hover:cursor-pointer" key={index}
                onClick={() => handleOpenModal(booking)}
              >
                <p className="font-bold">
                  {booking.map((b) => isoDateToHourMinutes(b)).join("-")}
                </p>
              </div>
            ))}
          </>
        )
        }
      </div>
    </>
  )
}

export default AvailableBookings;
