#!/usr/bin/env python
# import dotenv # https://github.com/theskumar/python-dotenv
import os
import re
import subprocess
import time

response = subprocess.Popen(
    'speedtest-cli --simple --single', shell=True, stdout=subprocess.PIPE).stdout.read()

ping = respons = re.findall('Ping:\s(.*?)\s', response, re.MULTILINE)
download = re.findall('Download:\s(.*?)\s', response, re.MULTILINE)
upload = re.findall('Upload:\s(.*?)\s', response, re.MULTILINE)

ping[0] = ping[0].replace(',', '.')
download[0] = download[0].replace(',', '.')
upload[0] = upload[0].replace(',', '.')

dir_path = os.path.dirname(os.path.realpath(__file__))

try:
    if os.stat(dir_path + '/speedtest.csv').st_size == 0:
        print 'Date,Ping,Download,Upload'
except:
    pass

print '{},{},{},{},{}'.format(time.strftime('%m-%d-%y %H:%M'), ping[0], download[0], upload[0])
