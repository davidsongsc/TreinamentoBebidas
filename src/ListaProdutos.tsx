import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

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

const ListaProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    socket.emit('get_produtos');

    socket.on('produtos', (novosProdutos: Produto[]) => {
      setProdutos(novosProdutos);
    });

    return () => {
      socket.off('produtos');
    };
  }, []);

  return (
    <div className="lista-produtos-container" >
      <ul className="lista-produtos">
        {produtos.map((product) => (
          <li key={product.id} className={`linha-produto ${product.version === 1 ? '' : 'hidden'}`} style={{
            display: `${product.version === 0 ? "none" : 'flex'}`,
            justifyContent: 'center',
          }}>
            <span><img src={product.imagem} alt="" style={{
              display: `${product.detalhes === 1 ? "none" : 'flex'}`,
              width: '200px',
              height: '200px',
              position: 'relative',
              top: '12px',
              borderRadius: '15px',
              boxShadow: '1px 1px 7px black'
            }} /></span>
            <span><h1 style={{
              color: 'black',
              textShadow: '1px 1px 4px black',
              textAlign: 'center',
              display: `${product.detalhes === 1 ? "none" : 'flex'}`
            }}>{product.nome}&reg;</h1></span>
            <div style={{
              display: `${product.detalhes === 0 ? "none" : 'flex'}`,
              flexDirection: 'column'
            }}>
              <div style={{
                display: 'flex', width: '90%',
                justifyContent: 'space-around',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <span>
                  <h2 style={{ textShadow: '1px 1px 2px white' }}>{product.liquido}
                  </h2></span>
                <span style={{ fontSize: '16px' }}>{/* Utilize map para exibir a lista de componentes */}
                  {product.composicao.length > 0 ? (<h3>Composição</h3>) : null}

                  {product.composicao.map((componente, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        -
                      </div>
                      <div>
                        {componente}
                      </div>
                    </div>
                  ))}

                </span>
                <span>
                  {product.sabores.length > 0 ? (
                    <h3>Opções</h3>
                  ) : null}
                  {product.sabores.map((sabor, index) => (
                    <p key={index}> {sabor}</p>
                  ))}
                </span>
              </div>

              <div style={{
                display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '16px', padding: '15px 15px', background: 'white', letterSpacing: '1.5px' }}>{product.obs}</span>

              </div>
              <div style={{
                display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                justifyContent: 'center'
              }}>


                <span style={{ fontSize: '11px' }}>{product.grupo}</span>
              </div>
              <div style={{
                display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                justifyContent: 'center'
              }}>

                <span style={{ fontSize: '11px', padding: '15px 15px', background: 'white', color:'black' }}>{product.alerta}</span>

              </div>
            </div>
          </li >
        ))}
      </ul >
    </div >
  );
};

export default ListaProdutos;
