# covid-project

Web scraper that sends email notification if there is an opening on site https://www.sharp.com/health-classes/volunteer-registration-grossmont-center-covid-19-vaccine-clinic-2558 for volunteer classes.

Need .env file that contains

EMAIL_NAME=String
EMAIL_PASSWORD=String

as well as setting the less secure app access on myaccount.google.com for the entered email.

npm install
To get the dependencies 

node app.js email
enter and email as argument to send the notifications to that email address