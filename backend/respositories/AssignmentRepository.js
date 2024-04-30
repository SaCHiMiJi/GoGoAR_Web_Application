const Assignment = require('../models/Assignment.js');

class AsssignmentRepository {
  /**
   * @param {*} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @params {*} object
   */
  create(object) {
    const newAssignment = {
        assignment_name: object.assignment_name, 
        creator_email: object.creator_email,
        steps: object.steps
    };

    const assignment = new this.model(newAssignment);
  
    return assignment.save();
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
    if (!id) {
        console.error("No ID provided for update.");
        return Promise.reject("No ID provided for update.");
    }

    const query = { _id: id };
    console.log("Updating object with ID: " + id);
    console.log(object);

    return this.model.findOneAndUpdate(query, 
        { $set: 
            { 
              assignment_name: object.assignment_name, 
              creator_email: object.creator_email,
              steps: object.steps
            }
        },
        { new: true } // Return the updated document
    ).then(updatedDocument => {
        if (!updatedDocument) {
            console.log("No document found with ID:", id);
            return null;
        }
        console.log("Updated document:", updatedDocument);
        return updatedDocument;
      }).catch(error => {
          console.error("Error updating document:", error);
          throw error;
      });
  }

}

module.exports = new AsssignmentRepository(Assignment);
