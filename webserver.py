#!/usr/bin/env python3
#
# from https://stackoverflow.com/questions/39801718/how-to-run-a-http-server-which-serve-a-specific-path

import http.server
import socketserver
import os
import webbrowser

PORT = 8000
web_dir = os.path.join(os.path.dirname(__file__), 'web')
os.chdir(web_dir)

Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)
print("serving at port", PORT)
httpd.serve_forever()

url = 'http://127.0.0.1:8000/index.html'
webbrowser.open_new(url)

while True:
    try:
        time.sleep(1)
    except KeyboardInterrupt:
        sys.exit(0)
