const config = {
    app: {
      port: process.env.PORT || 3000,
    },
    db:{
      uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/danglepc"
    },
    jwt: {
		ACCESS_TOKEN_KEY:
			process.env.ACCESS_TOKEN_KEY || "access_token",
	},
  };
  
  module.exports = config;
  
  