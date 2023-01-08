class BookingAvailability
  def initialize(warehouse_id, date, increment)
    @date = date
    @warehouse = Warehouse.find(warehouse_id)
    @increment = increment
    @fifteen_seconds_step = 900
  end

  def parse_date
    date = @date.split("T")[0].split("-")
    op_h, op_m = @warehouse.opening_time.strftime("%H:%M").split(":")
    cl_h, cl_m = @warehouse.close_time.strftime("%H:%M").split(":")

    a = DateTime.civil_from_format :local, date[0].to_i, date[1].to_i, date[2].to_i, op_h.to_i, op_m.to_i
    b = DateTime.civil_from_format :local, date[0].to_i, date[1].to_i, date[2].to_i, cl_h.to_i, cl_m.to_i 
    return [a, b]
  end

  def calculate
    final_booking = []
    op_time, cl_time = parse_date

    (op_time.to_i..cl_time.to_i-1).step(@fifteen_seconds_step) do |hour|
      start_time = Time.at(hour)
      end_time = Time.at(hour) + @increment*60

      overlapping_bookings = Booking.from_warehouse(@warehouse).where(
        '(?, ?) OVERLAPS (start_time, end_time)',
        start_time,
        end_time
      )

      if overlapping_bookings.empty? && @warehouse.close_time.time.utc.strftime( "%H%M%S%N" ) >= end_time.utc.strftime( "%H%M%S%N" )
        final_booking.push([start_time, end_time])
      end
    end

    final_booking
  end
end
