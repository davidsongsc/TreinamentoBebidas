import threading
import os

def start_controlador():
    print('controlador: 1.00.00')
    os.system("python servidor.py")

def start_imagem_server():
    print('imagem server: 1.00.00')
    os.system("python imgserv.py")


def start_servidor():
    print('Servidor')
    os.system("serve -s build")


if __name__ == "__main__":
    print('iniciando Serviço...')
    thread1 = threading.Thread(target=start_controlador)
    thread2 = threading.Thread(target=start_imagem_server)
    #thread3 = threading.Thread(target=start_servidor)

    thread1.start()
    thread2.start()
    #thread3.start()

    thread1.join()
    thread2.join()
    #thread3.join()

