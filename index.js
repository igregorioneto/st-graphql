const { gql, ApolloServer } = require("apollo-server");


const usuarios = [
  {
    id: 1,
    nome: 'Greg',
    salario: 10000.50,
    ativo: true,
    idade: 27
  },
  {
    id: 1,
    nome: 'João',
    salario: 5000.00,
    ativo: false,
    idade: 30
  }
];

const produtos = [
  {
    id: 1,
    nome: 'Notebook',
    valor: 12000.50,
  },
  {
    id: 2,
    nome: 'TV',
    valor: 5000.00,
  }
];

const resolvers = {
  Query: {
    hello() {
      return 'World';
    },
    tecnologias() {
      ['Angular', 'IONIC', 'NestJS', 'GraphQL', 'MariaDB']
    },
    // Criando alguns tipos
    usuarios() {
      return usuarios;
    },
    usuario(_, args) {
      const { id, nome } = args;
      if (id) return usuarios.find((usuario) => usuario.id === id);
      return usuarios.find((usuario) => usuario.nome === nome);
    },
    produtos() {
      return produtos;
    },
    produto(_, args) {
      const { id } = args;
      if (id)
        return produtos.find((produto) => produto.id === id);

      return null;
    }
  }
};

const typeDefs = gql`

  type Usuario {
    idade: Int,
    nome: String,
    salario: Float,
    ativo: Boolean,
    id: ID,
  }

  type Produto {
    id: ID,
    nome: String,
    valor: Float
  }

  type Query {
    hello: String,
    # O ! diz que é obrigatório
    tecnologias: [String!]!,
    # Criando typos
    usuarios: [Usuario],
    produtos: [Produto],
    # Retornando com parametro
    usuario(id: Int, nome: String): Usuario,
    produto(id: Int): Produto,
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen();