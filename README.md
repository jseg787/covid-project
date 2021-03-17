# covid-project

Web scraper that sends email notification if there is an opening on site https://www.sharp.com/health-classes/volunteer-registration-grossmont-center-covid-19-vaccine-clinic-2558 for volunteer classes.

Need .env file that contains

```
EMAIL_NAME=String
EMAIL_PASSWORD=String
```

For the email that will be sending the notifications.
As well as setting the less secure app access to on myaccount.google.com for the entered email.

`npm install`

To get the dependencies needed to run the application

`node app.js Email`

To run the program. `Email` is argument that will recieve the notifications. 
