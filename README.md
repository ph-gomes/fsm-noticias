# Autenticação - Notícias

[![Fullstack Master - devPleno](https://img.shields.io/badge/Fullstack%20Master-devPleno-blueviolet?style=flat-square)](https://www.devpleno.com/)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/dauxio/daux.io/blob/master/LICENSE.md)

O projeto é um exemplo que busca explorar as diferenças
entre autenticação e autorização alem de explorar
múltiplas maneiras de realiza-las.

## Instalação

O projeto depende externamente do [Node.js](https://nodejs.org/en/) e do [MongoDB](https://www.mongodb.com/download-center/community).

Clone o repositório por meio do comando:

```bash
git clone https://github.com/ph-gomes/noticias.git noticias && cd noticias
```

Instale as dependências por meio do comando:

```bash
npm install
```

## Utilização

Durante a primeira execução do projeto, é gerado automaticamente um banco utilizando o MongoDb com o nome **_noticias_**.

Nesse banco são adicionado dois usuários, _user1_ e _user2_ ambos com a senha: _1234_. _user1_ contem permissões _restritas_ e de _admin_, já _user2_ contem somente permissão _restrita_.

Novas contas pode ser adicionadas automaticamente efetuando-se o login pelo **Facebook** ou pelo **Google**.

Para se iniciar o servidor, basta executar o comando dentro da pasta onde o repositório foi clonado:

```bash
node index.js
```

O website estará hospedado por padrão no [localhost](http://localhost:3000/)
