
class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      console.log(" at crud repo create");
      const response = await this.model.create(data);
      console.log("create sucess response: " + response);
      return response;
    } catch (error) {
      console.log("error occured at crud repo create, error: " + error);
      throw error;
    }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      console.log("Deleted " + response);
    } catch (error) {
      throw error;
    }
  }

  async get(data) {
    try {
      const result = await this.model.findByPk(data);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getAll(data) {
    try {
      const result = await this.model.findAll(data);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async update(data, id) {
    try {
      const result = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CrudRepository;
