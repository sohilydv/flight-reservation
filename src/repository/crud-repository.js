const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (!response) {
      throw new AppError(
        "Couldn't find the resource to delete",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async get(data) {
    try {
      const result = await this.model.findByPk(data);
      if (!result)
        throw new AppError("Couldn't find the resource", StatusCodes.NOT_FOUND);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    const result = await this.model.findAll();
    return result;
  }

  async update(id, data) {
    try {
      const instance = await this.get(id);
      if (!instance) {
        throw new AppError("Couldn't find the resource", StatusCodes.NOT_FOUND);
      }
      instance.set(data); // Only valid model fields will be set
      const updated = await instance.save(); // Save to DB

      return updated;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CrudRepository;
