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
            borderStyle: `${product.detalhes === 5 || product.detalhes === 6 ? 'ridge' : 'solid'}`,
            minWidth: `${product.detalhes === 4 || product.detalhes === 5 ? '200px' : '400px'}`,
            background: `${product.detalhes === 5 || product.detalhes === 6 ? '#d3d600' : '#cd5c5c'}`,
            justifyContent: 'flex-start',
            animation: 'gradientAnimation 15s ease infinite',
            backgroundImage: 'linear-gradient(45deg, white, orange, gold)',
            backgroundSize: "150% 150%"
           

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
                  width: `${product.detalhes === 3 || product.detalhes === 5 ? '1200px' : '330px'}`,
                  display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                  background: 'white',
                  padding: '72px 33px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  boxShadow: '1px 1px'
                }}>{product.nome}</h1></span>
            </div>
            <div style={{
              display: `${product.detalhes === 1 ? "none" : 'flex'}`,
              justifyContent: 'space-around',

              width: '100%'
            }}>
              <span style={{
                display: `${product.detalhes === 4 || product.detalhes === 5 ? 'none' : 'flex'}`,
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>

                {product.sabores.map((sabor, index) => (
                  <>

                    <p key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      margin: '5px 8px',
                      flexDirection: 'column-reverse',
                      alignItems: 'center',
                      fontSize: '25px',
                      width: '180px',
                      padding: '15px 5px',
                      textTransform: 'capitalize',
                      letterSpacing: '1.5px',
                      textDecoration: 'overline red 1px',
                      boxShadow: '2px 2px 5px red',
                      backgroundColor: '#d0b82b'
                    }}> {sabor.replace(/\./g, ' ')}
                      <img src={`http://192.168.43.1:5000/images/${sabor}`} alt="" style={{ height: '150px', boxShadow: '1px 1px 4px black', width: '150px', borderRadius: '50%' }} />
                    </p>

                  </>
                ))}
              </span>


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
                        
                        {componente}
                      </div>
                    </div>
                  ))}

                </span>


                <span style={{
                  fontSize: '30px',
                  padding: '15px 15px',
                  background: 'white',
                  borderRadius: '8px',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
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




              </div>

              <div style={{
                display: `${product.detalhes === 1 ? "none" : 'flex'}`,
                justifyContent: 'center'
              }}>

                <span style={{
                  fontSize: '30px', padding: '15px 15px', background: 'white', color: 'black', borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px', boxShadow: '1px 1px', display: `${product.detalhes === 4 || product.detalhes === 5 ? 'none' : 'block'}`
                }}>{product.obs}</span>

              </div>
            </div>
          </li >
        ))}
      </ul >
    </div >
  );
};

export default ListaProdutos;
