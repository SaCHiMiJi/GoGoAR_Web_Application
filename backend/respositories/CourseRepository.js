const Course = require('../models/Course');

class CourseRepository {
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
    const newCourse = {
        course_name: object.course_name, 
        course_description: object.course_description, 
        course_instruction: object.course_instruction,
        date_created: new Date()

    };

    // eslint-disable-next-line new-cap
    const course = new this.model(newCourse);
  
    return course.save();
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
                course_name: object.course_name, 
                course_description: object.course_description, 
                course_instruction: object.course_instruction,
                date_created: new Date()
            } 
        }
    );
  }
}

module.exports = new CourseRepository(Course);
