#! /usr/bin/env bash
sudo python /home/pi/pi_wifi_monitor/speedtest.py >> /home/pi/pi_wifi_monitor/speedtest.csv
/home/pi/gdrive sync upload speedtest ID