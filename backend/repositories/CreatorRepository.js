const Creator = require('../models/Creator.js');

class CreatorRepository {
  /**
   * @param {*} model
   */
  constructor(model) {
    this.model = model;
  }

  //    CREATE, READ, DELETE, UPDATE

  /**
   * @params {*} object
   */
  create(object) {

    // this nested constant haven't get password tokenized yet.
    const newCreator = {
        creator_username: object.creator_username, 
        creator_email: object.creator_email,
        creator_password: object.creator_password,
    };

    const creator = new this.model(newCreator);
  
    return creator.save();
  }

  findAll() {
    return this.model.find();
  }

  /**
   * @param {Integer} id
   */
  findById(id) {
    return this.model.findById(id);
  }

  /**
   * @param {integer} id
   */
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  /**
   * @param {integer} id
   * @param {*} object
  updateById(id, object) {
    const query = { _id: id };

    return this.model.findOneAndUpdate(query, { $set: 
            { 
                creator_username: object.creator_username, 
                creator_email: object.creator_email,
                creator_password: object.creator_password,
            }
        }, { new: true } 
    ).then(updatedDocument => {
        if (!updatedDocument) {
            console.log("No document found with ID:", id);
            return null;
        }
        return updatedDocument;
      }).catch(error => {
          console.error("Error updating document:", error);
          throw error;
      });
  }*/
	findByEmail(email) {
		return this.model.findOne({ creator_email: email });
	}

  // change password to the new one, which validated by otp.
  changePassword(email, password) {
    const query = { creator_email: email };

    return this.model.findOneAndUpdate(query,{
      $set: {
        creator_password: password
      }
    }, {
      new: true, 
      useFindAndModify: false
    })
    .catch(error => {
          console.error("Error updating password:", error);
          throw error;
      });
  }
}

module.exports = new CreatorRepository(Creator);
