# coding: utf-8
import sys
import zmq

context = zmq.Context()
socket = context.socket(zmq.SUB)

team = sys.argv[1] if len(sys.argv) > 1 else "Start"
print "Waiting for results for %s" % team
socket.connect ("tcp://localhost:5556")

# Subscribe to team
socket.setsockopt(zmq.SUBSCRIBE, team)

while True:
    string = socket.recv()
    print string

