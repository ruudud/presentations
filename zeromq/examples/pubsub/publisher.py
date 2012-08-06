# coding: utf-8
import zmq
import random
import time

context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://*:5556")

while True:
    matches = ["Molde", "Rosenborg", "Start", "Vålerenga"]
    events = ["Goal", "\033[33mYellow Card\033[0m", "\033[31mRed Card\033[0m", "Corner"]
    match = matches[random.randrange(0,4)]
    event = events[random.randrange(0,4)]

    socket.send("%s: %s" % (match, event))

    time.sleep(random.randrange(0, 6))
