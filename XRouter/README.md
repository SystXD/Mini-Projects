# Xrouter
The offical Router, That Xantrack Discord BOT Uses
## Features

- Support For Typescript
- Supports Nested Routes
- Supports Dynamic Routes

 <br />

## Usage Structure

<div align="center">
    <img src="https://media.discordapp.net/attachments/1133303211877470309/1321045913699090482/image.png?ex=676bcf61&is=676a7de1&hm=f5afec6019e0c45b11ee64adfe2410d050581c87ea6963b835f244408e7968a3&=&format=webp&quality=lossless" width="60%" />
    <br />
</div>



> [!NOTE]  
> The Routes must created inside Routes folder and the filename should always be server.js.


## Defining Routes
 - Inside Your Routes directory, create a folder that should be named a Valid HTTP Methods (ex: GET), Folder inside GET will be using as Route name.
 **GET/getAllUser/server.js** => Route will be created as **/getAllUser**

- **Dynamic Routes**
 For dynamic parameters, Just created another folder and wrap it inside square boxed []
EX: **GET/fetchUser/[userId]/server.js** => **/fetchUser/:userId**

## Code Usage
   ### Index.ts
```ts
// in index.ts (or main file)
import { XRouter } from 'xrouter';
import express from 'express';
import path from 'path';

const app = express()
new XRouter({
  dir: path.join(__dirname, 'Routes') 
  app,
  hooks: true // for obtaining Request & Response using hooks, default to false.
})
```
<br />


  ### GET/fetchID/server.ts
 ```ts
 // if hooks are enabled
import { useRequest, useResponse } from 'xrouter';
 export default async function () {
     const [req, res] = [useRequest(), useResponse()]
      res
      .status(200)
      .json({ _id: crypto.randomUUID() })
  }
```
 ```ts
 // if hooks are disabled
 export default async function (req, res) {
      res
      .status(200)
      .json({ _id: crypto.randomUUID() })
  }
```
<br />

**It same Goes for Other HTTP Methods. Have a nice Day** 👋
