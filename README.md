# Urna

O projeto "Urna" é uma aplicação full stack construída como projeto final durante o treinamento Angular, Node e Java - CLT Grade A3. O aplicativo é uma ferramenta de eleição para candidatos concorrendo a um único cargo eletivo (uma lista com cargos para Presidente, Governador e Prefeito é disponibilizada como exemplo). 
Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

# Tecnologias utilizadas

Para executar o projeto, é necessário instalar os seguintes programas:
- Node.js (uma das seguintes versões: active LTS ou maintenance LTS)
- npm package manager (normalmente, ao instalar o Node.js, o pacote npm é instalado simultaneamente)
- Angular CLI (Para instalar o Angular CLI, abra uma janela de terminal e execute o seguinte comando: `npm install -g @angular/cli`)

# Como executar o projeto 

Rodar as linhas de comando abaixo em um terminal:

  - clonar o repositório do backend

    `git clone https://jcvernetti@bitbucket.org/welissonLima/urna-back.git`

  - clonar o repositório do frontend
    `git clone https://jcvernetti@bitbucket.org/welissonLima/urna-front.git`

# Servidor de desenvolvimento backend

Abra o cmd ou outro terminal na pasta "urna-back" e execute `node dist/js.app.js` para subir um servidor de desenvolvimento para o backend. O servidor pode ser acessado em `http://localhost:8080/`.

Endpoints:

  - `/candidatos` (POST):	Usado para salvar os candidatos.
  - `/candidatos` (GET):	Retorna a lista dos candidatos cadastrados.
  - `/login` (POST):	Recebe usuário e senha do administrador
  - `/votacao` (POST):	Salva cada voto
  - `/iniciarvotacao` (POST): Salva as configurações da votação
  - `/terminarvotacao`(GET):	Encerra a votação
  - `/statusvotacao` (GET): Retorna o status da votação 
  - `/apuracao` (GET):	Faz apuração e retorna resultado
  - `/datainicio` (GET): Retorna a data e horário de início da votação
  - `datafim` (GET): Retorna a data e horário do fim da votação

# Servidor de desenvolvimento frontend

Execute `ng serve` para subir um servidor de desenvolvimento para o frontend. Digite  `http://localhost:4200/` na url do seu browser.

Telas:

  - Login: 	Realiza login do Admin
  - Admin: 	Abre a votação
  - Votação:	Insere votos
  - Page-not-found: Aviso de página não encontrada
  - Resultado:	Mostra o relatório da apuração de votos


## Ajuda adicional

Para obter mais ajuda sobre o Angular CLI, use `ng help` ou confira a página [Visão geral e referência de comandos do Angular CLI] (https://angular.io/cli).
