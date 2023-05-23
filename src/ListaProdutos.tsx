import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://192.168.43.1:8000');

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
  tipo: number;
  descricao: string;
  sys: string;
  imglist: string[];
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
            minWidth: `${product.detalhes === 4 || product.detalhes === 5 ? '200px' : '400px'}`,
            background: `${product.detalhes === 5 || product.detalhes === 6 ? '#ffe140' : '#ff7f50'}`,

            justifyContent: 'flex-start'
          }}>

            <div style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
              <span>
                <img src={product.imagem} alt="" style={{
                  display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                  width: `${product.detalhes === 3 ? '500px' : '200px'}`,
                  height: `${product.detalhes === 3 ? '500px' : '200px'}`,
                  position: 'relative',
                  top: '0px',
                  borderRadius: '15px',
                  boxShadow: '1px 1px 7px black'
                }} /></span>
              <span style={{ display: `${product.detalhes === 4 || product.detalhes === 5 ? 'none' : 'block'}` }}>
                <h1 style={{
                  color: 'black',
                  textShadow: '1px 1px 4px black',
                  textAlign: 'center',
                  fontSize: `${product.detalhes === 3 ? '80px' : '40px'}`,
                  position: 'relative',
                  left: '4px',
                  width: `${product.detalhes === 3 || product.detalhes === 5 ? '500px' : '330px'}`,
                  display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                  background: 'white',
                  padding: '80px 0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  boxShadow: '1px 1px'
                }}>{product.nome}&reg;</h1></span>
            </div>
            <div style={{
              display: `${product.detalhes === 0 ? "none" : 'flex'}`,
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%'
            }}>
              <div style={{
                display: 'flex',

                flexDirection: 'column',
                alignItems: 'center',

              }}>
                <span style={{ display: `${product.detalhes === 4 ? 'none' : 'block'}` }}>
                  <h2 style={{ textShadow: '1px 1px 2px white' }}>{product.liquido}
                  </h2>
                </span>
                <span style={{ fontSize: '26px', display: `${product.detalhes === 4 || product.detalhes === 5 ? 'none' : 'block'}` }}>{/* Utilize map para exibir a lista de componentes */}
                  {product.composicao.map((componente, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      padding: '5px 10px',
                      boxShadow: '1px 1px 4px black',
                      fontSize: `${product.detalhes === 3 ? '50px' : '30px'}`,
                    }}>
                      <div style={{ textTransform: 'uppercase' }}>
                        {index + 1}º {componente}
                      </div>
                    </div>
                  ))}

                </span>


                <span style={{
                  fontSize: '30px',
                  padding: '15px 15px',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '1px 1px',
                  letterSpacing: '1.5px',
                  display: `${product.detalhes === 4 || product.detalhes === 5 ? 'none' : 'flex'}`
                }}>{product.descricao}</span>

              </div>
              <div style={{
                display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                justifyContent: 'center',
                width: '50%'
              }}>

                <div style={{
                  display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                  justifyContent: 'center'
                }}>
                  <span style={{ display: `${product.detalhes === 4 || product.detalhes === 5 ? 'none' : 'flex'}` }}>
                    {product.sabores.length > 0 ? (
                      <h3 style={{ fontSize: '35px' }}>Opções</h3>
                    ) : null}
                    {product.sabores.map((sabor, index) => (
                      <>

                        <p key={index} style={{ fontSize: '35px', width: '150px', padding: '0 40px', textTransform: 'capitalize', letterSpacing: '3px', textDecoration: 'overline orange 15px' }}> {sabor}
                          <img src={`http://192.168.43.1:5000/images/${sabor}`} alt="" style={{ height: '120px' }} />
                        </p>

                      </>
                    ))}
                  </span>


                </div>


              </div>

              <div style={{
                display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                justifyContent: 'center'
              }}>

                <span style={{ fontSize: '30px', padding: '15px 15px', background: 'white', color: 'black', borderRadius: '5px', boxShadow: '1px 1px', display: `${product.detalhes === 4 || product.detalhes === 5 ? 'none' : 'block'}` }}>{product.obs}</span>

              </div>
            </div>
          </li >
        ))}
      </ul >
    </div >
  );
};

export default ListaProdutos;
