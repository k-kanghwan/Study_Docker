from flask import Flask

server = Flask(__name__)

@server.route('/search')
def hello_world():
    return 'Hello, Falsk with docker'

@server.route('/k_kang')
def k_kang():
    return '<b>Hello</b>, My owner kanghwan'

@server.route('/k_kang2')
def k_kang2():
    return '<b>Hello, My owner kanghwan</b>'

