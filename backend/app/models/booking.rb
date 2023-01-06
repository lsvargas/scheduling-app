class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :warehouse

  validates_with BookingValidator

  after_create_commit { broadcast_booking }

  scope :from_warehouse, ->(warehouse) { where(warehouse: warehouse) }

  def overlapping_bookings(warehouse)
    bookings = Booking.from_warehouse(warehouse)
    
    bookings.where('(?, ?) OVERLAPS (start_time, end_time)', start_time, end_time)
  end

  def self.parse_date(date, warehouse)
    date = date.split("T")[0].split("-")
    op_h, op_m = warehouse.opening_time.strftime("%H:%M").split(":")
    cl_h, cl_m = warehouse.close_time.strftime("%H:%M").split(":")

    a = DateTime.civil_from_format :local, date[0].to_i, date[1].to_i, date[2].to_i, op_h.to_i, op_m.to_i
    b = DateTime.civil_from_format :local, date[0].to_i, date[1].to_i, date[2].to_i, cl_h.to_i, cl_m.to_i 
    return [a, b]
  end

  def self.get_available_booking_slots(warehouse_id, date, increment=15)
    new_increment = increment * 60
    warehouse = Warehouse.find(warehouse_id)
    bookings = Booking.from_warehouse(warehouse)
    op_time, cl_time = parse_date(date, warehouse)
    final_booking = []

    (op_time.to_i..cl_time.to_i-1).step(new_increment) do |hour|
      start_time = Time.at(hour)
      end_time = Time.at(hour) + new_increment

      overlapping_bookings = bookings.where(
        '(?, ?) OVERLAPS (start_time, end_time)',
        start_time,
        end_time
      )

      final_booking.push([start_time, end_time]) if overlapping_bookings.empty?
    end

    final_booking
  end

  private

  def broadcast_booking
    ActionCable.server.broadcast("BookingsChannel", {
      id:,
      start_time:,
      end_time:
    })
  end
end
