
""" Diffie–Hellman key exchange SERVER SCRIPT WORK FLOW / HOW TO USE"""
""" Execute server script first on a terminal, then client script on another terminal, server.js input must be in this format N,Y"""
""" After entering valid data (N big prime number), (Y<<N), private key Xa will be generated"""
""" Ya will be calculated"""
""" Ya will be sent to client"""
""" PrvKey will be calculated"""
""" Input SPACE to quit
    Input N,Y to try new values (makes sure to input the new values in this format N,Y)"""
import socket
import random

def is_prime(number):
    if number <= 1:
        return False
    elif number == 2:
        return True
    elif number % 2 == 0:
        return False
    for i in range(3, int(number**0.5) + 1, 2):
        if number % i == 0:
            return False

    return True

serverSocket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
serverSocket.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
serverSocket.bind(('0.0.0.0',8000))
serverSocket.listen(2)
(socketClient,adIPClient) = serverSocket.accept()
print('Information of connected client: ',socketClient,adIPClient)
M = True
while M:
  Message = input('Give the init numbers (N,Y): ')
  inputs = Message.split(',')
  inputs = [int(value) for value in inputs]
  while inputs[1] > inputs[0] or not is_prime(inputs[0]):
    Message = input('N not prime or Y>N. Give the numbers again (N,Y): ')
    inputs = Message.split(',')
    inputs = [int(value) for value in inputs]
  Xa = random.randint(1, inputs[0] - 2)
  Ya = pow(inputs[1], Xa , inputs[0])
  if Message != ' ':
    socketClient.send(f"{inputs[0]},{inputs[1]},{Ya}".encode())
    Yb = socketClient.recv(2048).decode()
    PrvKey = pow(int(Yb) , Xa , inputs[0])
    print("N: ",inputs[0],"\n","Y: ",inputs[1],"\n","Ya: ",Ya,"\n","Xa: ",Xa, "\n","Yb: ",Yb)
    print('Your private key is:',PrvKey)
  else:
    M = False

serverSocket.close()
socketClient.close()