const readline = require('readline');

const rpio = require('rpio');
const hd44780 = require('gpio-hd44780-driver');

const displayTypes = {
    date: 1,
    temp: 2,
};

const weatherDisplay = () => {
    var tempData = 'Temp: not updated\nHumidity: not updated';
    var display = displayTypes.temp;
    var timeUpdate = false;
    
    rpio.open(26, rpio.OUTPUT, rpio.LOW);

    const lcd = new hd44780({
        pinRs: 18,
        pinEnable: 22,
        pinsData: [11, 12, 15, 16],
        lcdColumns: 16,
        lcdRows: 2
    });

    const rl = readline.createInterface({
        input: process.stdin
    });

    // update temperature data when a new line is read
    rl.on('line', (input) => {
        // update data
        const data = JSON.parse(input);
        tempData = `Temp: ${data.temperature_F}F\nHumidity: ${data.humidity}%`;

        // pulse LED
        rpio.write(26, rpio.HIGH);
        setTimeout(() => {
            rpio.write(26, rpio.LOW);
        }, 1500);
    });

    // initial display
    dateTimeDisplay();
    timeUpdate = setInterval(dateTimeDisplay, 1000);

    // update display every 5 seconds
    const displayInterval = setInterval(() => {
        if (timeUpdate) {
            clearInterval(timeUpdate);
            timeUpdate = false;
        }

        lcd.clear();

        if (display === displayTypes.temp) {
            lcd.print(tempData);
            display = displayTypes.date;
            return;
        }

        if (display === displayTypes.date) {
            // do initial display update
            dateTimeDisplay();

            // update the date/time every second
            timeUpdate = setInterval(dateTimeDisplay, 1000);

            display = displayTypes.temp;
            return;
        }
    }, 5000);

    // cleanup and close the program on SIGINT
    process.on('SIGINT', () => {
        rl.close();
        clearInterval(displayInterval);
        console.log('Done!');
        process.exit();
    });

    function dateTimeDisplay() {
        lcd.setCursor(0, 0);

        // print the date and time on the display
        const now = new Date();
        lcd.print(`${now.toDateString()}\n${now.toTimeString().slice(0, 8)}`);
    }
};

weatherDisplay();

