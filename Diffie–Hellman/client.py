
""" Diffie–Hellman key exchange CLIENT SCRIPT WORK FLOW / HOW TO USE"""
""" Execute server script first on a terminal, then client script on another terminal"""
""" After entering valid data (N big prime number) & (Y<<N) on server private key Xb will be generated"""
""" Yb will be calculated"""
""" Yb will be sent to client"""
""" PrvKey will be calculated"""
""" Input SPACE to quit (make sure to relaunch server.js file to try new values)
    Input ENTER to try new values (makes sure to input the new values on the server.js terminal first)"""

import socket
import random

clientSocket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
clientSocket.connect(('127.0.0.1',8000))

M = True
while M:
  Data = clientSocket.recv(2048).decode()
  inputs = Data.split(',')
  inputs = [int(value) for value in inputs]
  Xb = random.randint(1, inputs[0] - 2)
  Yb = pow(inputs[1] , Xb , inputs[0])
  print("N: ",inputs[0],"\n","Y: ",inputs[1],"\n","Yb: ",Yb,"\n","Xb: ",Xb,"\n","Ya: ",inputs[2])
  clientSocket.send(f"{Yb}".encode())
  PrvKey = pow(inputs[2] , Xb , inputs[0])
  print('Your private key is:',PrvKey)
  Message = input('input SPACE to exits Enter to continue: ')
  if Message == ' ':
    M = False

clientSocket.close()