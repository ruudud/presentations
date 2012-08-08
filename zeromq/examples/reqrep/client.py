# coding: utf-8
import sys
import zmq

if __name__ == '__main__':
    ctx = zmq.Context()
    socket = ctx.socket(zmq.REQ)
#    socket.setsockopt(zmq.IDENTITY, sys.argv[1])
    socket.connect("tcp://0.0.0.0:12345")

    try:
        while True:
            socket.send("Hello from %s" % sys.argv[1])
            print socket.recv() # Blocking
    except:
        raise

    socket.close()
    ctx.term()
