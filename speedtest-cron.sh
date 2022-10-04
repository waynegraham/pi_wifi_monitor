#! /usr/bin/env bash
export PATH="/usr/bin/python:$PATH"
python /home/pi/pi_wifi_monitor/speedtest.py >> /home/pi/pi_wifi_monitor/speedtest.csv
