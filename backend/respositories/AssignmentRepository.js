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

    // eslint-disable-next-line new-cap
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
   *
   * @param {integer} id
   * @param {*} object
   */
  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, 
        { $set: 
            { 
              assignment_name: object.assignment_name, 
              creator_email: object.creator_email,
              steps: object.steps
            } 
        }
    );
  }
}

module.exports = new AsssignmentRepository(Assignment);
