# The Nutri Tech

The Nutri Tech is a web application that provides nutrition and dietetic services. It allows patients to create accounts, book appointments, and receive personalized nutrition guidance from dietitians. Dietitians can manage their schedules, conduct video consultations, and access patient records. The app utilizes Google OAuth2.0 for authentication, the Calendly API for scheduling, and integrates with Google Meet for video consultations. This README provides information on the application, including its features and how to set up the backend and frontend.

## Technologies Used
<a href="https://www.ruby-lang.org/en/documentation/">
    <img src="https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white" />
<a/>
<a href="https://guides.rubyonrails.org/">
    <img src="https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white" />
<a/>
<a href="https://react.dev/">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
<a/>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
    <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" />
<a/>
<a href="https://react-bootstrap.netlify.app/">
    <img src="https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white" />
<a/>
<br>
<a href="https://www.postgresql.org/docs/">
    <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
<a/>
<a href="https://render.com/docs">
    <img src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white" />
<a/>
<a href="https://vercel.com/docs">
    <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" />
<a/>

## Features

### Patient
- **Account Creation**: Patients can create accounts manually or via Google OAuth2.0.
- **Email Notification**: Patients receive an email to confirm their account creation.
- **Account Login**: Patients can log in to access the application.
- **Appointment Booking**: Patients can book appointments with dietitians based on available timeslots.
- **Confirmation Email**: Patients receive a confirmation email with appointment details and a Google Calendar invite upon successful booking.
- **Upcoming Appointments**: Patients can view their upcoming appointments, including date, time, and the dietitian's name.
- **Previous Appointments**: Patients can access a list of their previous appointments and view corresponding records.

### Dietitian
- **Professional Account Creation**: Dietitians can create professional accounts to offer nutrition/dietetic services.
- **Account Login**: Dietitians log in to access their appointment schedule and patient records.
- **Schedule Management**: Dietitians can manage their schedules using Calendly, ensuring effective time management.
- **Email Notifications**: Dietitians receive email notifications when a patient books an appointment.
- **Video Consultations**: Dietitians can conduct video consultations with patients using Google Meet.
- **Appointment Records**: Dietitians can view all assigned appointments and access records for each to provide personalized support.

### Additional Information
- **Authentication**: The application uses Google OAuth2.0 for user authentication. To implement this, you can refer to this [article](https://hackernoon.com/how-to-implement-social-auth-with-google-in-ruby-on-rails).

- **Scheduling**: The app integrates with the Calendly API for scheduling and manages appointments.

- **Server Uptime**: The application maintains server uptime using cron-jobs.org.

- **Deployment**: The backend is deployed on Render, and the frontend is deployed on Vercel.

### Testing
- Tools used for testing include Rspec, FactoryBot, and Faker.

## Getting Started

### Backend Setup
1. Clone the backend repository.
2. Navigate to the project directory: `cd nutrition-backend`
3. Install the required dependencies: `bundle install`
4. Create and set up the database:
```
rails db:create
rails db:migrate
```
5. Set up your environment variables for Google OAuth2.0 and Calendly: _(please refer to your actual env var)_
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
CALENDLY_API_KEY=your-api-key
```
6. Start the Rails server: `rails server`

### Frontend Setup
1. Clone the frontend repository.
2. Navigate to the project directory: `cd nutrition-frontend`
3. Install the required dependencies: `npm install`
4. Create a .env file for environment variables. 
5. Start the development server: `npm run dev`
