## GoStack Bootcamp FastFeet

> 🚀 Practical project of the [Rocketseat](https://rocketseat.com.br) GoStack Bootcamp.  
👷 Developed by Matheus Ramalho de Oliveira.  
🔨 Systems Analyst, Full-Stack Developer.  
🏡 Goiânia, Goiás, Brasil.  
✉️ kastorcode@gmail.com  
👍 [instagram.com/kastorcode](https://www.instagram.com/kastorcode)

---

<p align="center">
  <img src="assets/gostack.png" width="300" /> 
  <img src="assets/fastfeet.png" width="300" />
</p>

<p align="center">
    Final Challenge: FastFeet
</p>

---

### Backend installation and execution

1. Make a clone of this repository;
2. Enter the folder running `cd gostack-fast-feet/backend`;
3. Run `yarn` to install dependencies;
4. Make sure you have two [Docker containers](https://www.docker.com/resources/what-container) running: [PostgreSQL](https://hub.docker.com/_/postgres) and [Redis](https://hub.docker.com/_/redis);
5. Create a database in `postgres` with the name of `fast-feet`;
6. Rename the `.env.example` file to `.env`;
7. Put your credentials within `.env`;
8. Run `yarn sequelize db:migrate` to execute the migrations;
9. Run `yarn sequelize db:seed` to feed the database with the default user `Distribuidora FastFeet`;
10. Run `yarn dev` to start the development server;
11. Run `yarn queue` in another terminal to start the processing queue in the background;
12. Import the `backend/insomnia/index.json` file in [Insomnia](https://insomnia.rest) to make calls to api.

### Default user

Name: `Distribuidora FastFeet`;  
Email: `admin@fastfeet.com`;  
Password: `123456`.

---

### To do

[] Web frontend > [bootcamp-gostack-desafio-09](bootcamp-gostack-desafio-09)
[] Mobile app > [bootcamp-gostack-desafio-10](bootcamp-gostack-desafio-10)

---

### 🗓 ️Roadmap

- Introduction to Node.js
- Creating Node.js project
- Continuing Node.js project
- CSS Flexbox
- UI Design
- Introduction to React
- First project with ReactJS
- First project with React Native
- Front-end documentation
- Flux architecture
- Using React Hooks
- Server-side rendering(SSR) with ReactJS
- GraphQL
- Expo
- Creating ReactJS project
- Creating React Native project
- Animations with React Native
- Full-stack app development
- Node.js tests
- Node.js deploy
- ReactJS tests
- React Native tests
- ReactJS deploy
- React Native publication
- WebSocket with Express
- Advanced patterns at Node.js
- OmniStack SaaS(software as a service) and AdonisJS
- Final challenge
- Monorepo
