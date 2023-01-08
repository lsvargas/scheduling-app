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

  def self.get_available_booking_slots(warehouse_id, date, increment)
    booking_availability = BookingAvailability.new(warehouse_id, date, increment)

    booking_availability.calculate
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
