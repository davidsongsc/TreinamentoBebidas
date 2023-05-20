import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
const socketIO = io('http://192.168.0.50:8000');

interface Produto {
  id: number;
  nome: string;
  grupo: string;
  liquido: string;
  obs: string;
  alerta: string;
  composicao: string[];
  sabores: string[];
  imagem: string;
  alcolico: string;
  vegetariano: string;
  vegano: string;
  version: number;
  detalhes: number;
}
interface UpdateProdutoProps {
  id: number;
}

const Treinador: React.FC<{ manopla: () => JSX.Element }> = ({ manopla }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);




  useEffect(() => {
    // Conectar ao servidor Socket.io
    const socket = io('http://192.168.0.50:8000');
    setSocket(socket);

    // Lidar com a resposta do servidor ao atualizar um produto
    socket.on('produtos', (produtos: Produto[]) => {
      // Atualizar a lista de produtos no estado
      // ou fazer qualquer outra ação necessária
    });

    return () => {
      // Desconectar do servidor Socket.io ao desmontar o componente
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    socketIO.emit('get_produtos');

    socketIO.on('produtos', (novosProdutos: Produto[]) => {
      setProdutos(novosProdutos);
    });

    return () => {
      socketIO.off('produtos');
    };
  }, []);

  return (
    <div>

      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        <>
          <div style={{ margin: '-15px 0 0 0', position: 'fixed' }}></div>
          {produtos.map((product) => (
            <li
              key={product.id}
              className='linha-produto'
              style={{
                backgroundColor: `${product.version === 0 ? 'whitesmoke' : '#9418d3'}`,
                color: `${product.version === 0 ? 'black' : 'white'}`,
                margin: '5px',
              }}
            >
              <div>
                <button
                  style={{
                    backgroundColor: `${product.version === 0 ? 'whitesmoke' : 'brown'}`,
                    color: `${product.version === 0 ? 'black' : 'white'}`,
                    textTransform: 'uppercase',
                  }}
                >
                  v1
                </button>
                <button
                  style={{
                    backgroundColor: `${product.version === 0 ? 'whitesmoke' : 'brown'}`,
                    color: `${product.version === 0 ? 'black' : 'white'}`,
                    textTransform: 'uppercase',
                  }}
                >
                  v2
                </button>
                <button
                  style={{
                    backgroundColor: `${product.version === 0 ? 'whitesmoke' : 'brown'}`,
                    color: `${product.version === 0 ? 'black' : 'white'}`,
                    textTransform: 'uppercase',
                  }}
                >
                  v3
                </button>
                <button
                  style={{
                    backgroundColor: `${product.version === 0 ? 'whitesmoke' : 'brown'}`,
                    color: `${product.version === 0 ? 'black' : 'white'}`,
                    textTransform: 'uppercase',
                  }}
                >
                  Ocultar
                </button>
                <button
                  style={{
                    backgroundColor: `${product.version === 0 ? 'whitesmoke' : 'brown'}`,
                    color: `${product.version === 0 ? 'black' : 'white'}`,
                    textTransform: 'uppercase',
                  }}
                >
                  exibir
                </button>
              </div>
              <span>
                <h1
                  style={{
                    color: 'black',
                    textShadow: '1px 1px 4px black',
                    textAlign: 'center',
                    display: `${product.detalhes === 1 ? 'flex' : 'flex'}`,
                  }}
                >
                  {product.nome}&reg;
                </h1>
              </span>
              {manopla()}
            </li>
          ))}
        </>
      </ul>

    </div>
  );
};

export default Treinador;
