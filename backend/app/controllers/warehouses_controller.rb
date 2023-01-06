class WarehousesController < ApplicationController

  def index
    @warehouses = Warehouse.all

    render json: @warehouses
  end

  def show
    @warehouse = Warehouse.find(params[:id])

    render json: @warehouse
  end
end
