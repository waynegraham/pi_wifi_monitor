# Wifi Monitor

Notes on setting up a Raspberry Pi to monitor conference WiFi. This assumes the [Raspian](https://www.raspberrypi.org/downloads/raspbian/) distribution.

(based on <https://thepi.io/how-to-use-your-raspberry-pi-to-monitor-broadband-speed/>)

# Pi Setup

-   Update the box (`sudo apt update`)
-   Upgrade the box (`sudo apt upgrade`)
-   Install OS dependencies (`sudo apt install python3`)
-   Install the dependencies (`sudo pip3 install -U speedtest-cli python-dotenv virtualenv`)
-   (or pip3 install -r requirements.txt)

# Software

-   Clone the software (`git clone https://github.com/waynegraham/pi_wifi_monitor.git`)
-   Symlink `/var/www/html` to `~/pi_wifi_monitor/web`

# Kiosk

Based on <https://pimylifeup.com/raspberry-pi-kiosk/>

Edit `/lib/systemd/system/kiosk.service`

    [Unit]
    Description=Chromium Kiosk
    Wants=graphical.target
    After=graphical.target

    [Service]
    Environment=DISPLAY=:0.0
    Environment=XAUTHORITY=/home/pi/.Xauthority
    Type=simple
    ExecStart=/bin/bash /home/pi/pi_wifi_monitor/kiosk.sh
    Restart=on-abort
    User=pi
    Group=pi

    [Install]
    WantedBy=graphical.target

You can now manage this with the `service` command:

    sudo systemctl enable kiosk.service
    sudo systemctl start kiosk.service
    sudo systemctl status kiosk.service
    sudo systemctl stop kiosk.service
    sudo systemctl disable kiosk.service

> Note, make sure you disable the service _before_ traveling, or it'll be hard to get the wifi connected.

## Automation

Set the `ID` in `speedtest-cron.sh` to the ID of the directory above.

Create a new crontab (`crontab -e`) with the following:

`*/10 * * * * /home/pi/pi_wifi_monitor/speedtest-cron.sh`

## Viewing

Assuming everything is running correctly, you can access the report at <http://localhost>.
