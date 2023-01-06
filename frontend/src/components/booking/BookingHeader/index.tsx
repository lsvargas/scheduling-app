import { isoDateToHourMinutes } from "../../../utils/date";
import Spinner from "../../Spinner";

interface IWarehouse {
  id: number;
  name: string;
  opening_time: string;
  close_time: string;
}

interface BookingHeaderProps {
  wareHouseLoading: boolean;
  warehouse: IWarehouse | undefined;
}

function BookingHeader({ wareHouseLoading, warehouse }: BookingHeaderProps) {

  if (wareHouseLoading) return <Spinner />

  return (
    <>
      <h1 className="text-xl tracking-[5px] font-bold mb-2">{warehouse?.name}</h1>
      <div className="flex">
        <p className="text-sm mr-2 text-[#737374]"><strong>Opening hours:</strong></p>
        <p className="text-sm text-[#737374]">
          {`${isoDateToHourMinutes(warehouse?.opening_time)} - ${isoDateToHourMinutes(warehouse?.close_time)}`}
        </p>
      </div>
    </>
  )
}

export default BookingHeader;
