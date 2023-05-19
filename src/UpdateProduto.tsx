import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import Treinador from './Treinador';
interface Produto {
  id: number;
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
  const [produto, setProduto] = useState<Produto | null>(null);
  const [version, setVersion] = useState<number>(0);
  const [detalhes, setDetalhes] = useState<number>(0);

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

  const handleUpdateProduto = () => {
    if (socket && produto) {
      // Atualizar os campos do produto com os valores atualizados
      const updatedProduto: Produto = {
        ...produto,
        version,
        detalhes,
      };

      // Enviar o evento de atualização para o servidor
      socket.emit('update_produto', updatedProduto);
    }
  };
  const handleOcultar = () => {
    if (socket && produto) {
      // Atualizar os campos do produto com os valores atualizados
      setVersion(0)
      setDetalhes(0)
      const updatedProduto: Produto = {
        ...produto,
        version,
        detalhes,
      };

      // Enviar o evento de atualização para o servidor
      socket.emit('update_produto', updatedProduto);
    }
  };

  const handleLoadProduto = () => {
    // Carregar um produto específico do servidor
    // (pode ser obtido por meio de uma lista ou de alguma outra fonte de dados)
    const produtoId = id; // ID do produto a ser atualizado

    // Fazer uma solicitação para obter os dados do produto do servidor
    // e definir o produto no estado
    const produtoFromServer: Produto = {
      id: produtoId,
      version: 0,
      detalhes: 0,
      // Defina outros campos do produto
    };
    setProduto(produtoFromServer);
    setVersion(produtoFromServer.version);
    setDetalhes(produtoFromServer.detalhes);
    // Defina outros campos do produto no estado
  };
  const manopla = () => {
    return(
    <div>
      {/* Exibir campos de formulário para atualizar o produto */}
      <input
        type="number"
        value={version}
        onChange={(e) => setVersion(Number(e.target.value))}
      />
      <input
        type="number"
        value={detalhes}
        onChange={(e) => setDetalhes(Number(e.target.value))}
      />
      <button onClick={handleUpdateProduto}>Atualizar Produto</button>
      <button onClick={handleLoadProduto}>Carregar Produto</button>
    </div>
    )
  }
  return (
    <>
      <Treinador manopla={manopla}/>
    </>
  );
};

export default UpdateProduto;
