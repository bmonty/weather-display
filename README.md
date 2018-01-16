# Description

This script provides a display of weather data on an LCD controlled via GPIO.  The display
will alternate between showing the current date/time and showing the latest temperature/humidity.
An LED will turn on for 1.5s each time there is an updated temp/humidity data from the sensor.

# Usage

`rtl_433 -R 12 -F json -C customary | node weather-display.js`

