# Scheduling App

This project was built using `React` + `Vite` + `Typescript` + `Tailwindcss` in the front end and `Ruby on Rails` in API mode as the backend.

## Setup and Initialization

```
$ scheduling-app ~ docker-compose up
$ scheduling-app ~ cd backend
$ backend        ~ rails db:create && rails db:migrate && rails db:seed
```

And that is all 😊

## Considerations

If you are using ARM based architectures (Macbook M1, M2) and run the application with Docker you might have some issues because of Vite SWC in the frontend.
