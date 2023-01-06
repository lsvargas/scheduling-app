class CreateWarehouseTable < ActiveRecord::Migration[7.0]
  def change
    create_table :warehouses do |t|
      t.string :name
      t.datetime :opening_time
      t.datetime :close_time

      t.timestamps
    end
  end
end
