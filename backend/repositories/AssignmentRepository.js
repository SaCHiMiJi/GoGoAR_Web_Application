const Assignment = require('../models/Assignment.js');

class AsssignmentRepository {
  /**
   * @param {*} model */

  constructor(model) {
    this.model = model;
  }

  /**
   * @params {*} object
   */
  create(object) {
    const newAssignment = {
        assignment_name: object.assignment_name,
	      description: object.description,
        creator_id: object.creator_id,
        ref_url: object.ref_url,
      	mobileapp_url: null,
      	created_date: object.created_date,
      	modified_date: null,
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
  
  findByName(name) {
    return this.model.find({
      "assignment_name": name
    });  }
  
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
	      description: object.description,
              creator_id: object.creator_id,
              ref_url: object.ref_url,
	      modified_date: object.modified_date,
              steps: object.steps
            }
        },
        { 
          new: true
        } 
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
  /*
   * @param {integer} id
   * @param {string} mobileapp_url
   */
  // assign mobile app's URL to the existing assignment
  updateURL(id, mobileapp_url) {
    // check if id is presence.
    if (!id) {
        console.error("No ID provided for update.");
        return Promise.reject("No ID provided for update.");
    }

    const query = { _id: id };

    return this.model.findOneAndUpdate(query,  
      { 
        $set: { 
          mobileapp_url: mobileapp_url 
        } 
      },
      { 
        new: true, useFindAndModify: false 
      } 
    ).then(assigneURL => {
        if (!assigneURL) {
            console.log("No document found with ID:", id);
            return null;
        }
        console.log("Updated document:", assigneURL);
        return assigneURL;
      }).catch(error => {
          console.error("Error updating document:", error);
          throw error;
      });
  }

  /**
   * @param {integer} id
   */
  // Retrieve the mobile app's URL.
  getMobileAppURL(id) {
    // check if id is presence.
    if (!id) {
      console.error("No ID provided for update.");
      return Promise.reject("No ID provided for update.");
   }

   const query = { _id: id};
   return this.model.findOne(query, 
      'mobileapp_url');
  }

  findMultiple(assignmentIds) {
    return this.model.find({
      '_id': { $in: assignmentIds }
    });
  }

  findByCreatorID(creatorid) {
    return this.model.find({
      "creator_id": creatorid
    });
  }
}

module.exports = new AsssignmentRepository(Assignment);
