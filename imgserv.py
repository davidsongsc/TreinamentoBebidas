from flask import Flask, send_file

app = Flask(__name__)

@app.route('/images/<image_id>')
def get_image(image_id):
    # Aqui você pode adicionar a lógica para buscar a imagem com base no ID fornecido
    # e obter o caminho do arquivo da imagem

    # Supondo que você tenha o caminho da imagem, você pode usar o send_file para enviá-la como resposta
    return send_file(f'img/{image_id}.jpg', mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(host='192.168.0.50', port=5000)