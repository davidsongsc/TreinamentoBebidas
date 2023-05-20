import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

interface Produto {
  id: number;
  nome: string;
  version: number;
  detalhes: number;
  // Adicione outros campos do produto conforme necessário
}

interface UpdateProdutoProps {
  id: number;
  onCommand?: (command: string) => void;
}

const UpdateProduto: React.FC<UpdateProdutoProps> = ({ id }) => {
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





  const manopla = () => {
    return (
      <div>

      </div>
    );
  };

  return (
    <>
      <Treinador manopla={manopla} socket={socket} />
    </>
  );
};

interface TreinadorProps {
  manopla: () => JSX.Element;
  socket: Socket | null;
}

const Treinador: React.FC<TreinadorProps> = ({ manopla, socket }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    if (socket) {
      socket.emit('get_produtos');

      socket.on('produtos', (novosProdutos: Produto[]) => {
        setProdutos(novosProdutos);
      });

      return () => {
        socket.off('produtos');
      };
    }
  }, [socket]);
  const products = [
    { id: 1, version: 0 },
    { id: 2, version: 1 },
    { id: 3, version: 2 },
  ];

  const colors = ['whitesmoke', '#8a8a8a', '#9418d3']; // Array de cores correspondentes aos valores de product.version

  return (
    <div>
      {manopla()}
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        {produtos.map((product) => (
          <li
            key={product.id}
            className='linha-produto'
            style={{
              backgroundColor: colors[product.detalhes % colors.length],
              color: `${product.version === 0 ? 'black' : 'red'}`,
              borderWidth: '4px',
              margin: '5px',
              width: '160px'
            }}
          >
            <div>
              <span>
                <h1
                  style={{
                    color: 'black',
                    textShadow: '1px 1px 6px black',
                    textAlign: 'center',
                    fontSize: '15px',
                    textTransform: 'uppercase',
                    display: `${product.detalhes === 1 ? 'flex' : 'flex'}`,
                  }}
                >
                  {product.nome}&reg;
                </h1>
              </span>
              <div>

                <button
                  style={{
                    backgroundColor: `${product.version === 0 ? 'whitesmoke' : 'brown'}`,
                    color: `${product.version === 0 ? 'black' : 'white'}`,
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    if (socket) {
                      const updatedProduto: Produto = {
                        ...product,
                        version: 1,
                        detalhes: 0,
                      };

                      socket.emit('update_produto', updatedProduto);
                    }
                  }}
                >
                  natela
                </button>
                <button

                  style={{
                    backgroundColor: `${product.version === 0 ? 'whitesmoke' : 'brown'}`,
                    color: `${product.version === 0 ? 'black' : 'white'}`,
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    if (socket) {
                      const updatedProduto: Produto = {
                        ...product,
                        version: 2,
                        detalhes: 0,
                      };

                      socket.emit('update_produto', updatedProduto);
                      setTimeout(() => {
                        const updatedProduto: Produto = {
                          ...product,
                          version: 1,
                          detalhes: 0,
                        };

                        socket.emit('update_produto', updatedProduto);
                      }, 1500); // 1500 milissegundos = 1.5 segundos
                    }
                  }}
                >
                  exibir
                </button>
              </div>

              <div style={{
                display: `${product.version === 0 ? 'none' : 'block'}`
              }}>

                <button
                  style={{
                    backgroundColor: `${product.detalhes === 2 ? 'red' : 'whitesmoke'}`,
                    color: `${product.version === 0 ? 'white' : 'black'}`,
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    if (socket) {
                      const updatedProduto: Produto = {
                        ...product,
                        version: 1,
                        detalhes: 2,
                      };

                      socket.emit('update_produto', updatedProduto);
                    }
                  }}
                >
                  tudo
                </button>
                <button
                  style={{
                    backgroundColor: `${product.detalhes === 0 ? 'whitesmoke' : 'red'}`,
                    color: `${product.version === 0 ? 'white' : 'black'}`,
                    
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    if (socket) {
                      const updatedProduto: Produto = {
                        ...product,
                        version: 1,
                        detalhes: 1,
                      };

                      socket.emit('update_produto', updatedProduto);
                    }
                  }}
                >
                  info
                </button>
              </div>
              <div style={{
                display: `${product.version === 0 ? 'none' : 'block'}`
              }}>
                <button
                  style={{
                    backgroundColor: `${product.version === 0 ? 'whitesmoke' : 'black'}`,
                    color: `${product.version === 0 ? 'white' : 'white'}`,
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    if (socket) {
                      const updatedProduto: Produto = {
                        ...product,
                        version: 0,
                        detalhes: 0,
                      };

                      socket.emit('update_produto', updatedProduto);
                    }
                  }}
                >
                  REMOVE
                </button>
                <button
                  style={{
                    backgroundColor: `${product.version === 0 ? 'whitesmoke' : 'black'}`,
                    color: `${product.version === 0 ? 'white' : 'white'}`,
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    if (socket) {
                      const updatedProduto: Produto = {
                        ...product,
                        version: 2,
                        detalhes: 0,
                      };

                      socket.emit('update_produto', updatedProduto);
                      setTimeout(() => {
                        const updatedProduto: Produto = {
                          ...product,
                          version: 0,
                          detalhes: 0,
                        };

                        socket.emit('update_produto', updatedProduto);
                      }, 2500); // 2500 milissegundos = 2.5 segundos
                    }
                  }}
                >
                  OCULTAR
                </button>
              </div>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateProduto;


