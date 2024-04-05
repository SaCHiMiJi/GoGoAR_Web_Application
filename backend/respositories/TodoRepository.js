const Todo = require('../models/Todo');

class TodoRepository {
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
    const newTodo = {
        name: object.name, 
        description: object.description, 
        done: object.done 
    };

    // eslint-disable-next-line new-cap
    const todo = new this.model(newTodo);
  
    return todo.save();
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
    return this.model.findOneAndUpdate(query, { $set: { name: object.name, 
      description: object.description, 
      done: object.done } });
  }
}

module.exports = new TodoRepository(Todo);
