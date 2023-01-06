Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  mount ActionCable.server => "/cable"

  resources :warehouses, only: %i[index show] do
    resources :bookings, only: %i[index create]
  end
end
