const db = require ('./Dbconnector/sqlite-connector') // you need the connection to the database and Campus model

const seed = async () => {
  await db.sequelize.sync({force: true}) //sync to your database!

  const harvard = await db.user.create({
    name: 'Harvard',
    email: 'PO Box 382609. Cambridge, MA 02238-2609.',
    password: 'World famous Ivy League university'
  })
  const stonybrook = await db.user.create({
    name: 'Stony Brook University',
    email:'100 Nicolls Rd, Stony Brook, NY 11794',
    password: 'It is one of four university centers of the State University of New York system.'
  })
  db.sequelize.close() //close your db connection else the connection stays alive else your process hangs.
  console.log('Seed Successful!') //Have a prompt to let you know everything is working correctly!
}

seed() //initialize the sync!