#!/usr/bin/env python3
import sys
import _thread
import webbrowser
import time
from http.server import BaseHTTPRequestHandler, HTTPServer, SimpleHTTPRequestHandler

def run_server(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
    server_address = ('', 8000)

    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

_thread.start_new_thread(run_server, ())
url = 'http://127.0.0.1:8000/index.html'
webbrowser.open_new(url)

while True:
    try:
        time.sleep(1)
    except KeyboardInterrupt:
        sys.exit(0)
