const app = require("./app");
const config = require("./assets/config");
const MongoDB = require("./assets/utils/mongodb.utils");




async function startServer(){
  try{
    await MongoDB.connect(config.db.uri);

    const PORT = config.app.port;
    
    app.listen(PORT, ()=>{
      console.log(`Server is running on port ${PORT}.`);

    });
  }
  catch (error){
    console.log("Cannot connect to the Database with error");
    console.log(error);
    process.exit();
  }
}

startServer();