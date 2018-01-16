# Description

This script provides a display of weather data on an LCD controlled via GPIO.  The display
will alternate between showing the current date/time and showing the latest temperature/humidity.
An LED will turn on for 1.5s each time there is an updated temp/humidity data from the sensor.

Temperature/Humidity data should be piped on stdin.  Data can be received using 
[rtl_433](https://github.com/merbanan/rtl_433).


# Usage

`rtl_433 -R 12 -F json -C customary | node weather-display.js`

