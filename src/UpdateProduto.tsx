import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';


const ip: string = "192.168.0.50";

interface Produto {
  id: number;
  nome: string;
  version: number;
  detalhes: number;
  tipo: number;
  imagem: string;
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
    const socket = io(`http://192.168.0.50:8000`);

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
      <>

      </>
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


  const colors = ['whitesmoke', '#8a8a8a', '#9418d3']; // Array de cores correspondentes aos valores de product.version

  return (
    <div className="painel-treinador">

      <ul className='lista-painel-treinador'>
        {produtos.map((product) => (
          <li
            key={product.id}
            className='linha-produto'
            style={{
              display: `${product.version === 1 ? 'block' : 'none'}`,
              backgroundColor: colors[product.detalhes % colors.length],
              color: `${product.version === 0 ? 'black' : 'red'}`,
              borderWidth: '4px',
              margin: '5px 2px',
              width: '160px'
            }}
          >
            <div className='manual-div'>
            <span>
                  <img src={`http://${ip}:5000${product.imagem}`} alt="" style={{
                    display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                    width: `${product.detalhes === 3 ? '165px' : '140px'}`,
                    height: `${product.detalhes === 3 ? '165px' : '140px'}`,
                    position: 'relative',
                    top: '0px',
                    borderRadius: '15px',
                    boxShadow: '1px 1px 7px black'
                  }} /></span>
              <span>
                <h1
                  style={{
                    color: 'black',
                    textShadow: '1px 1px 6px black',
                    textAlign: 'center',
                    fontSize: '25px',
                    textTransform: 'capitalize',
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
                        detalhes: 4,
                      };

                      socket.emit('update_produto', updatedProduto);
                    }
                  }}
                >
                  inicio
                </button>
                <button

                  style={{
                    backgroundColor: `${product.detalhes === 0 ? 'whitesmoke' : 'red'}`,
                    color: `${product.version === 0 ? 'black' : 'black'}`,
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
                  nome
                </button>
              </div>

              <div style={{
                display: `${product.version === 0 ? 'none' : 'block'}`
              }}>
                <button
                  style={{
                    backgroundColor: `${product.detalhes === 5 ? 'red' : 'whitesmoke'}`,
                    color: `${product.version === 0 ? 'white' : 'black'}`,
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    if (socket) {
                      const updatedProduto: Produto = {
                        ...product,
                        version: 1,
                        detalhes: 5,
                      };

                      socket.emit('update_produto', updatedProduto);
                    }
                  }}
                >
                  marcar
                </button>
              
                
                <button
                  style={{
                    backgroundColor: `${product.detalhes === 3 ? 'red' : 'whitesmoke'}`,
                    color: `${product.version === 0 ? 'white' : 'black'}`,
                    textTransform: 'uppercase',
                  }}
                  onClick={() => {
                    if (socket) {
                      const updatedProduto: Produto = {
                        ...product,
                        version: 1,
                        detalhes: 3,
                      };

                      socket.emit('update_produto', updatedProduto);
                    }
                  }}
                >
                  loopa
                </button>
                <button
                  style={{
                    backgroundColor: `${product.detalhes === 1 ? 'red' : 'whitesmoke'}`,
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
                  composição
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
                  informações
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
                        version: 0,
                        detalhes: 0,
                      };

                      socket.emit('update_produto', updatedProduto);
                    }
                  }}
                >
                  REMOVE
                </button>
              
              </div>
            </div>

          </li>
        ))}
      </ul>
      <div className='controlador'>
        {manopla()}
        <div className='titutlo-produto'>
          <p>frutas</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'frutas');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'frutas');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>Destilados Caipirinhas</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'destilado');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'destilado');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>caipirinhas Açucar</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'caipirinhas');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'caipirinhas');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>caipirinhas Xarope</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'caipirinhas2');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'caipirinhas2');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>Outros Destilados</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'destilado2');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'destilado2');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>Licores</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'licor');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'licor');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>whisky</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'whisky');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'whisky');
              }
            }}
          >
            ocultar
          </button>
        </div>


        <div className='titutlo-produto'>
          <p>drinks</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'drinks');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'drinks');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>bebidas</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'bebidas');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'bebidas');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>cafe</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'cafe');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'cafe');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>chopp</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'chopp');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'chopp');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>cervejas</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'cervejas');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'cervejas');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>Gins</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'gins');
              }
            }}
          >
            exibir
          </button>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('ocultar', 'gins');
              }
            }}
          >
            ocultar
          </button>
        </div>
        <div className='titutlo-produto'>
          <p>sucos</p>
          <button
            onClick={() => {
              if (socket) {
                socket.emit('mostrar', 'sucos');
              }
            }}
          >
            exibir
          </button>
          <button onClick={() => {
            if (socket) {
              socket.emit('ocultar', 'sucos');
            }
          }}
          >
            ocultar
          </button>
        </div>
      </div>

    </div >
  );
};

export default UpdateProduto;


