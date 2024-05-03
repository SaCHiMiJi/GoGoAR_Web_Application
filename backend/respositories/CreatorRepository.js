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
   */
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
  }

  //    SECURITY PURPOSE FUNCTIONS
  tokenizeNewPassword() {
    // operate with the registry account
    return 1; // as placeholder
  }

  checkLogin(inputPassword) {
    
  }

}

module.exports = new CreatorRepository(Creator);
