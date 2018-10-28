import dotenv # https://github.com/theskumar/python-dotenv
import os
import re
import subprocess
import time

response = subprocess.Popen(
    'speedtest-cli --simple', shell=True, stdout=subprocess.PIPE).stdout.read()

ping = re.findall('Ping:\s(.*?)\s', response, re.MULTILINE)
download = re.findall('Download:\s(.*?)\s', response, re.MULTILINE)
upload = re.findall('Upload:\s(.*?)\s', response, re.MULTILINE)

ping[0] = ping[0].replace(',', '.')
download[0] = download[0].replace(',', '.')
upload[0] = upload[0].replace(',', '.')

try:
    if os.stat('/Users/waynegraham/projects/pi_wifi_monitor/speedtest.csv').st_size == 0:
        print 'Date,Time,Ping (ms),Download (Mbit/s),Upload (Mbit/s)'
except:
    pass

print '{},{},{},{},{}'.format(time.strftime('%m/%d/%y'), time.strftime('%H:%M'), ping[0], download[0], upload[0])
