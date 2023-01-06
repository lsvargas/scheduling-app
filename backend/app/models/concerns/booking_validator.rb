class BookingValidator < ActiveModel::Validator
  def validate(record)
    overlapping_bookings = record.overlapping_bookings(record.warehouse)

    if overlapping_bookings.any?
      record.errors.add :base, "booking overlaps"
    end
  end
end
