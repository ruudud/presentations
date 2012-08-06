# coding: utf-8
import time
import zmq

if __name__ == '__main__':
    ctx = zmq.Context()
    socket = ctx.socket(zmq.REP)
    socket.bind("tcp://0.0.0.0:12345")

    try:
        while True:
            request = socket.recv() # Blocking
            print 'Got message: %s' % request
            time.sleep(.5)
            socket.send('Hello world back at ya from the server')
    except:
        pass

    socket.close()
    ctx.term()
