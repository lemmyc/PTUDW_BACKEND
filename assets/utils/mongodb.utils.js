const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const config = require("../config");
class MongoDB {
  static connect = async (uri)=>{
    try{
      const connection = await mongoose.connect(
				config.db.uri
			);
			autoIncrement.initialize(connection);
      console.log("Connected to Database");
    }catch(error){
      console.log(error)
    }
  };
  static async setupSoftDelete(schema) {
		schema.pre("find", function () {
			this.where({ isDeleted: false });
		});

		schema.pre("findOne", function () {
			this.where({ isDeleted: false });
		});
	}
}

module.exports = MongoDB;