import eventlet
import socketio
import sqlite3
import json

sio = socketio.Server(cors_allowed_origins=['http://192.168.0.50:3000'])
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
            "version": produto[12]
        }
        formatted_produtos.append(formatted_produto)

    conn.close()

    return formatted_produtos


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


# Função para excluir um produto do banco de dados
def delete_produto(produto_id):
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()

    # Exclui o produto do banco de dados
    cursor.execute(
        """
        DELETE FROM produtos
        WHERE id = ?
        """,
        (produto_id,)
    )

    conn.commit()
    conn.close()


@sio.on('get_produtos')
def send_produtos(sid):
    # Obtém os produtos do banco de dados
    produtos = get_produtos()

    # Envie os dados dos produtos para o cliente
    sio.emit('produtos', produtos, room=sid)


@sio.on('update_produto')
def handle_update_produto(sid, produto):
    # Atualiza o produto no banco de dados
    update_produto(produto)

    # Obtém os produtos atualizados do banco de dados
    produtos = get_produtos()

    # Envie os dados atualizados dos produtos para todos os clientes conectados
    sio.emit('produtos', produtos)


@sio.on('delete_produto')
def handle_delete_produto(sid, produto_id):
    # Exclui o produto do banco de dados
    delete_produto(produto_id)

    # Obtém os produtos atualizados do banco de dados
    produtos = get_produtos()

    # Envie os dados atualizados dos produtos para todos os clientes conectados
    sio.emit('produtos', produtos)


def get_database_version():
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()

    cursor.execute("SELECT version FROM produtos")

    version = cursor.fetchone()[0]

    conn.close()

    return version


def poll_database_changes():
    last_version = None

    while True:
        # Verifica se houve mudanças no banco de dados
        current_version = get_database_version()

        if current_version != last_version:
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
