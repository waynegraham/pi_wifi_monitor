# Wifi Monitor

Notes on setting up a Raspberry Pi to monitor conference WiFi. This assumes the [Raspian](https://www.raspberrypi.org/downloads/raspbian/) distribution.

(based on https://thepi.io/how-to-use-your-raspberry-pi-to-monitor-broadband-speed/)

Note that this has two parts; one part runs on the Raspberry Pi, the other is accessed through Github Pages. 

# Pi Setup

* Update the box (`sudo apt update`)
* Upgrade the box (`sudo apt upgrade`)
* Install OS dependencies (`sudo apt install python topgrade`)
* Install the dependencies (`pip install python-pip speedtest-cli`)

# Software

* Clone the software (`git clone https://github.com/waynegraham/pi_wifi_monitor.git`)

## GDrive for rpi (https://github.com/prasmussen/gdrive)
Not in active development; may need an alternative

`wget -O https://docs.google.com/uc?id=0B3X9GlR6EmbnVXNLanp4ZFRRbzg&export=download`
`chmod +x gdrive`

Connect Google Drive to your account:

`chmod ./gdrive list`

You should get an authentication prompt with a URL to paste in to your browser. After you have authenticated in the browser, paste the verification code in to the terminal.

### Speedtest directory

`./gdrive mkdir -p speedtest`

This created the a `speedtest` directory. Be sure to copy the ID returned by this command.

Now to sync the directory (use the ID from the above command for this step):

`./gdrive sync upload speedtest ID`

Now do a test run:

`python ./speedtest.py >> speedtest/speedtest.csv`

and sync

`./gdrive sync upload speedtest ID`

Check the google drive that everything uploaded.

## Automation
Set the `ID` in `speedtest-cron.sh` to the ID of the directory above.

Create a new crontab (`crontab -e`) with the following:

`*/5 * * * * /home/pi/pi_wifi_monitor/speedtest-cron.sh`
