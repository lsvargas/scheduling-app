class BookingsController < ApplicationController
  # Shows all available booking slots
  def index
    bookings = Booking.get_available_booking_slots(
      params[:warehouse_id],
      params[:date],
      params[:inc]&.to_i
    )

    render json: bookings
  end


  def create
    booking = Booking.new(
      booking_params.merge(warehouse_id: params[:warehouse_id], user: current_user)
    )

    if booking.save
      render json: booking, status: :created
    else
      render json: { code: 422, message: booking.errors }, status: :unprocessable_entity
    end
  end


  private

  def booking_params
    params.require(:booking).permit(:id, :start_time, :end_time)
  end
end
