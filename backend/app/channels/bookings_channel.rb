class BookingsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "BookingsChannel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
