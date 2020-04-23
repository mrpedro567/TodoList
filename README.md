# To do List App

## Overview
To do list mobile desenvolvido com React Native + [Expo](https://expo.io) e React JS, com Mongo DB 

## Instalação e Uso

**Antes de Começar, tenha o [Yarn](https://classic.yarnpkg.com/pt-BR/docs/install) instalado no computador**

Agora, precisamos configurar o caminho para o Backend. Para isso, no arquivo: 
[/mobile/src/services/api.js](https://github.com/mrpedro567/TodoList/tree/master/mobile/src/services) mude o endereço de ip para o da sua maquina.

Depois, precisamos instalar o Expo no computador:

### Instalando Expo
```bash
yarn add global expo-cli
```
E tambem o expo em um dispositivo [Mobile](https://expo.io/tools#client)


### instalando Nodemon

Na pasta backend, abra um terminal de digite: 
```bash
yarn add nodemon
```


## Uso
Agora, em um terminal na pasta [backend](https://github.com/mrpedro567/TodoList/tree/master/backend), digite: 
```bash
yarn bg
```

Em outro terminal aberto na pasta [Mobile](https://github.com/mrpedro567/TodoList/tree/master/mobile), digite: 
```bash
yarn start
```

Abrirá uma aba no navegador onde haverá um QrCode. Dentro do aplicativo, escaneie o código e aguarde o carregamento do Programa
