# Orange API

## Descrição

A Orange API é uma aplicação backend desenvolvida para gerenciar operações de um sistema. Esta aplicação foi construída
utilizando TypeScript, SQL e JavaScript, e gerenciada pelo npm.

## Tecnologias Utilizadas

- **TypeScript**: Linguagem de programação utilizada para desenvolver a aplicação.
- **SQL**: Linguagem de consulta estruturada utilizada para gerenciar os dados armazenados no banco de dados.
- **JavaScript**: Linguagem de programação utilizada para adicionar funcionalidades dinâmicas à aplicação.
- **npm**: Gerenciador de pacotes utilizado para instalar e gerenciar pacotes de software.

## Dependências

A aplicação possui várias dependências, que são listadas no arquivo `package.json`. Algumas das principais dependências
incluem:

- **express**: Framework para Node.js que simplifica o desenvolvimento de aplicações web.
- **bcrypt**: Biblioteca utilizada para hash de senhas.
- **jsonwebtoken**: Biblioteca utilizada para criar e verificar tokens JWT.
- **multer**: Middleware para manipulação de multipart/form-data, usado principalmente para upload de arquivos.
- **prisma**: ORM para TypeScript e JavaScript para gerenciar o banco de dados.
- **supabase-js**: Biblioteca para interagir com o Supabase, uma alternativa de código aberto ao Firebase.
- **helmet**: Middleware que ajuda a proteger a aplicação de algumas vulnerabilidades da web.
- **joi**: Biblioteca para validação de dados.

## Como Utilizar

Para utilizar a aplicação, você precisa ter o Node.js e o npm instalados em seu sistema. Após clonar o repositório, você
pode instalar as dependências da aplicação executando `npm install` no diretório raiz do projeto. Criar um
arquivo `.env` na raiz do projeto e adicionar as variáveis de ambiente necessárias, seguindo o exemplo do
arquivo `.env.example`. Após isso, utilizando o prisma, você pode aplicar o schema ao banco de dados
executando `npx prisma migrate dev`. Por fim, você pode iniciar a aplicação executando `npm run dev`.

Os scripts disponíveis para execução estão listados no arquivo `package.json` e podem ser executados
com `npm run <nome_do_script>`. Por exemplo, para iniciar a aplicação, após o build, você pode executar `npm run start`.

## Endpoints

A aplicação possui vários endpoints que permitem interagir com o sistema. Aqui estão alguns deles:

### Usuários

- **POST /signup**: Cria um novo usuário. O corpo da solicitação deve incluir detalhes do usuário, como nome, email e
  senha.

```json
{
    "name": "Nome do Usuário",
    "lastName": "Sobrenome do Usuário",
    "email": "email@exemplo.com",
    "password": "senha123"
}
```

- **POST /signin**: Autentica um usuário existente. O corpo da solicitação deve incluir email e senha do usuário.

```json
{
    "email": "email@exemplo.com",
    "password": "senha123"
}
```

- **POST /signin/google**: Autentica um usuário através do Google. O corpo da solicitação deve incluir o token do
  Google.

```json
{
    "name": "Nome do Usuário",
    "lastName": "Sobrenome do Usuário",
    "email": "email@exemplo.com",
    "googleId": "googleId"
}
```

### Projetos

- **POST /createProject**: Cria um novo projeto. O corpo da solicitação deve incluir detalhes do projeto em um
  formulário multipartes, como título e tags. Este endpoint requer autenticação.

```{form-data}
{
    "title": "Título do Projeto",
    "description": "Descrição do Projeto",
    "tags": "tag1, tag2, tag3",
    "image": "imagem.jpg"
    "link": "https://linkdoprojeto.com",
    "userId": "userId",
    "releaseDate": "2023-12-31"
}
```

- **DELETE /deleteProject/:projectId**: Exclui um projeto específico. Este endpoint requer autenticação.

```http request
https://orange-api.onrender.com/deleteProject/idDoProjeto
```

- **PATCH /updateProject/:projectId**: Atualiza um projeto específico. O corpo da solicitação deve incluir os detalhes
  do projeto que você deseja atualizar. Este endpoint requer autenticação.

```json
{
    "title": "Título do Projeto",
    "description": "Descrição do Projeto",
    "tags": "tag1, tag2, tag3",
    "link": "https://linkdoprojeto.com"
}
```

- **GET /project/:projectId**: Retorna detalhes de um projeto específico. Este endpoint requer autenticação.

```http request
https://orange-api.onrender.com/project/idDoProjeto
```

- **GET /projects/:userId**: Retorna todos os projetos de um usuário específico. Este endpoint requer autenticação.

```http request
https://orange-api.onrender.com/projects/idDoUsuario
```

- **GET /projects**: Retorna uma lista de todos os projetos. Este endpoint requer autenticação.

```http request
https://orange-api.onrender.com/projects
```

### Cliente de API

Este projeto acompanha um arquivo chamado `HTTP_REQUESTS_COLLECTION.har` que pode ser importado em clientes de API como
o Insomnia ou Postman. Este arquivo contém uma coleção de requisições HTTP que podem ser utilizadas para testar a API.

## Estrutura do Projeto

O projeto está estruturado da seguinte maneira:

- `src/`: Este diretório contém todo o código fonte da aplicação.
    - `services/`: Contém a lógica de negócios da aplicação.
    - `repositories/`: Contém o código que interage diretamente com o banco de dados.
    - `routers/`: Contém as rotas da aplicação.
    - `utils/`: Contém funções utilitárias e auxiliares.
    - `config/`: Contém arquivos de configuração, como as configurações do banco de dados e do cliente Supabase.

## Executando Testes

Atualmente, o projeto não possui um framework de testes configurado. Planejamos adicionar isso no futuro.

## Contribuindo

Agradecemos as contribuições de todos. Se você está interessado em contribuir:

1. Faça um fork deste repositório.
2. Crie uma nova branch para sua funcionalidade ou correção de bug.
3. Faça commit de suas alterações e envie-as para o seu fork.
4. Abra um pull request da branch do seu fork para a nossa branch `dev`.

## Licença

Este projeto está licenciado sob a licença ISC. Para mais informações, consulte o arquivo `LICENSE` na raiz do projeto.
