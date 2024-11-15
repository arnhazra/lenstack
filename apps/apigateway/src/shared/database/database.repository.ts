import { Model, Document, FilterQuery, UpdateQuery } from "mongoose"

export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(createDto: Partial<T>): Promise<T> {
    const createdDocument = new this.model(createDto)
    return await createdDocument.save()
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return await this.model.find(filter).exec()
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter).exec()
  }

  async update(
    filter: FilterQuery<T>,
    updateDto: UpdateQuery<T>
  ): Promise<T | null> {
    return await this.model
      .findOneAndUpdate(filter, updateDto, { new: true })
      .exec()
  }

  async delete(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOneAndDelete(filter).exec()
  }
}
