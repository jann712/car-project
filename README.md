# Teste técnico | Node + Angular ou React

Bem-vindos, me chamo João Augusto.
Fiz esse teste técnico com a finalidade de entregar primeiramente o necessário para o funcionamento (nesse caso a listagem dos carros e autenticação com token JWT) e experiência do usuário, tendo em mente o tempo de 7 dias para criação da aplicação.


# Instalação

1. Clonar o repositório para um diretório local:
	```git clone https://github.com/jann712/car-project.git```
	
2. Executar o comando **yarn** nos diretórios "/frontend" e "/backend" para instalação dos pacotes.
	```yarn```

3. Criação de um arquivo **.env** no diretório **backend** para armazenamento das variáveis:
	- FJWT_SECRET
	- FCOOKIE_SECRET

5. "Rodar" os servidores do frontend e backend com:
	```yarn dev```
	em dois terminais diferentes para cada.

6. Utilizar o frontend para navegar pela aplicação.


## Estrutura frontend

A estrutura frontend se compõe em: 

1. Um diretório *components* para componentes React;
2. Um diretório *lib* para armazenamento da instância do Axios e de tipos do Typescript;
3. Um diretório *pages* com as páginas completas (em .tsx) da aplicação.

A estilização do frontend foi feita com TailwindCSS.  
Usei o React Hook Form para formulários.


## Estrutura backend

A estrutura backend se compõe em:
1. Um diretório *lib* para tipos do Typescript;
2. Um diretório *prisma* com os arquivos da instalação do Prisma, como o schema, o db (sqlite) e as migrações;
3. O arquivo **controller.ts** que se encarrega das funções relacionadas ao banco de dados (ex. criação de usuário, *get* todos os carros...);
4. O arquivo **routes.ts** que possui as rotas da aplicação, com as funções de execução de cada rota;
5. O arquivo **prisma.ts** que instancia o *PrismaClient*;
6. E o arquivo **server.ts** que se encarrega de registrar as rotas, os plugins de JWT e Cookies, o decorador de autenticação e a execução do servidor.

## Schema do banco de dados
Usando o ORM do Prisma, criei as seguintes tabelas:
1. Car
	- id Int;
	- nome String;
	- marca String;
	- modelo String;
	- valor Float;
	- foto String.

2. User
	- id Int;
	- email String;
	- hashPassword String;
	- role String.

## Criação de usuários
Basta enviar uma requisição POST para o url "registro" do servidor backend com o email e senha no corpo da requisição.


## Vídeo demonstração
[Gravei um rápido vídeo para demonstração da aplicação.](https://youtu.be/ISP2Ojap4r8)
