import { PrismaClient } from '@prisma/client'
import readLine from 'readline'

const prisma = new PrismaClient()

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const main = async () => {

  rl.question('Selecione uma opção: \n 1 - Criar usuário \n 2 - Listar usuários \n 3 - Sair \n ->>>> ', async (line) => {
    switch (line) {
      case "1":
        console.log("this is option 1");
        break;
      case "2":
        const usersWithPosts = await prisma.user.findMany({
          include: {
            posts: true,
          },
        })
        console.dir(usersWithPosts, { depth: null })
        break;
      case "3":
        return rl.close();
        break;
      default:
        console.log("No such option. Please enter another: ");
    }
    main()
  })

  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@prisma.io',
  //   }
  // })
  // console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })