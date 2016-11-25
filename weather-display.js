const Lcd = require('lcd');
const readline = require('readline');

const lcd = new Lcd({
    rs: 24,
    e: 25,
    data: [17, 18, 22, 23],
    cols: 16,
    rows: 2
});

lcd.on('ready', () => {
    lcd.clear(() => {
        const rl = readline.createInterface({
            input: process.stdin
        });

        rl.on('line', (input) => {
            const data = JSON.parse(input);

            lcd.clear(() => {
                lcd.setCursor(0, 0);
                lcd.print(`Temp: ${data.temperature_F}F`, (err) => {
                    if (err) throw err;
    
                    lcd.setCursor(0, 1);
                    lcd.print(`Humidity: ${data.humidity}%`, (err) => {
                        if (err) throw err;
                    });
                });
 
            });
       });
    });
});

process.on('SIGINT', () => {
    lcd.close();
    process.exit();
});

