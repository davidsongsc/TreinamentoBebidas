import eventlet
import socketio
import sqlite3
import json

sio = socketio.Server(cors_allowed_origins=['http://192.168.43.1:3000'])
app = socketio.WSGIApp(sio)

# Configuração do banco de dados SQLite
db_file = 'produtos.db'


# Função para obter os produtos do banco de dados
def get_produtos():
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM produtos")
    produtos = cursor.fetchall()

    # Formata os dados dos produtos
    formatted_produtos = []
    for produto in produtos:
        formatted_produto = {
            "id": produto[0],
            "nome": produto[1],
            "grupo": produto[2],
            "liquido": produto[3],
            "obs": produto[4],
            "alerta": produto[5],
            "composicao": json.loads(produto[6]),
            "sabores": json.loads(produto[7]),
            "imagem": produto[8],
            "alcolico": produto[9],
            "vegetariano": produto[10],
            "vegano": produto[11],
            "version": produto[12],
            "detalhes": produto[13],
            "tipo": produto[14],
            "descricao": produto[15],
            "sys": produto[16],
            "imglist": json.loads(produto[17])


        }
        formatted_produtos.append(formatted_produto)

    conn.close()

    return formatted_produtos


@sio.on('get_produtos')
def send_produtos(sid):
    # Obtém os produtos do banco de dados
    produtos = get_produtos()

    # Envie os dados dos produtos para o cliente
    sio.emit('produtos', produtos, room=sid)


def get_database_version():
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    # cursor.execute("ALTER TABLE produtos ADD COLUMN version INTEGER DEFAULT 0")

    cursor.execute("SELECT version FROM produtos")

    version = cursor.fetchone()[0]

    conn.close()

    return version

# Função para atualizar um produto no banco de dados


def update_produto(produto):
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()

    # Atualiza os dados do produto no banco de dados
    cursor.execute(
        """
        UPDATE produtos
        SET  version = ?, detalhes = ?
        WHERE id = ?
        """,
        (
            produto["version"], produto["detalhes"], produto["id"]
        )
    )

    conn.commit()
    conn.close()


@sio.on('update_produto')
def handle_update_produto(sid, produto):
    # Atualiza o produto no banco de dados
    update_produto(produto)

    # Obtém os produtos atualizados do banco de dados
    produtos = get_produtos()

    # Envie os dados atualizados dos produtos para todos os clientes conectados
    sio.emit('produtos', produtos)


@sio.on('mostrar')
def handle_update_produtob(sid, produto):
    # Atualiza o produto no banco de dados
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    if produto == 'destilado':
        tipo = 1
    elif produto == 'destilado2':
        tipo = 2
    elif produto == 'licor':
        tipo = 3
    elif produto == 'whisky':
        tipo = 4
    elif produto == 'frutas':
        tipo = 5
    elif produto == 'caipirinhas':
        tipo = 6
    elif produto == 'drinks':
        tipo = 7
    elif produto == 'bebidas':
        tipo = 8
    elif produto == 'gins':
        tipo = 9
    elif produto == 'cafe':
        tipo = 10
    elif produto == 'cervejas':
        tipo = 11
    elif produto == 'chopp':
        tipo = 12
    elif produto == 'sucos':
        tipo = 13
    elif produto == 'caipirinhas2':
        tipo = 66
    else:
        tipo = 0

    # Atualiza os dados do produto no banco de dados
    cursor.execute(
        f"""
        UPDATE produtos
        SET  version = 1, detalhes = 4
        WHERE tipo = {tipo}
        """
    )

    conn.commit()
    conn.close()


@sio.on('ocultar')
def handle_update_produtob(sid, produto):
    # Atualiza o produto no banco de dados
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    if produto == 'destilado':
        tipo = 1
    elif produto == 'destilado2':
        tipo = 2
    elif produto == 'licor':
        tipo = 3
    elif produto == 'whisky':
        tipo = 4
    elif produto == 'frutas':
        tipo = 5
    elif produto == 'caipirinhas':
        tipo = 6
    elif produto == 'drinks':
        tipo = 7
    elif produto == 'bebidas':
        tipo = 8
    elif produto == 'gins':
        tipo = 9
    elif produto == 'cafe':
        tipo = 10
    elif produto == 'cervejas':
        tipo = 11
    elif produto == 'chopp':
        tipo = 12
    elif produto == 'sucos':
        tipo = 13
    elif produto == 'caipirinhas2':
        tipo = 66
    else:
        tipo = 0

    # Atualiza os dados do produto no banco de dados
    cursor.execute(
        f"""
        UPDATE produtos
        SET  version = 0, detalhes = 0
        WHERE tipo = {tipo}
        """
    )

    conn.commit()
    conn.close()


def poll_database_changes():
    last_version = None

    while True:
        # Verifica se houve mudanças no banco de dados
        # Implemente essa função para obter a versão atual do banco de dados
        current_version = get_database_version()

        # Houve mudanças no banco de dados, atualiza os produtos
        produtos = get_produtos()

        # Envie os dados atualizados dos produtos para todos os clientes conectados
        sio.emit('produtos', produtos)

        # Atualiza a versão do banco de dados
        last_version = current_version

        # Aguarde 1 segundo antes de verificar novamente
        eventlet.sleep(1)


if __name__ == '__main__':
    eventlet.monkey_patch()

    # Inicie o thread para verificar as mudanças no banco de dados em tempo real
    eventlet.spawn(poll_database_changes)

    eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
