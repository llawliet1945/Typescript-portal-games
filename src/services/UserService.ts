import { Sequelize } from 'sequelize';
import { User } from './../models/User';

export class StudentService {
  constructor(private readonly sequelize: Sequelize) {}

  async getAllStudents(): Promise<User[]> {
    return await User.findAll();
  }

  /*async createStudent(user: User): Promise<User> {
    return await user.create();
  }*/

  async updateStudent(uuid: string, user: User): Promise<void> {
    await User.update(user, { where: { uuid } });
  }

  async deleteStudent(uuid: string): Promise<void> {
    await User.destroy({ where: { uuid } });
  }
}