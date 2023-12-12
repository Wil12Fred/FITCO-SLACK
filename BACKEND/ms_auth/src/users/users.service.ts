import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/users.model';
import { CreateUserDTO } from './dto/createUsers.dto';
import * as bcrypt from 'bcrypt';
import { genSalt, hash } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUsers.dto';
import { UserByAccount } from './models/userByAccount.model';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    @InjectModel(UserByAccount)
    private userByAccountModel: typeof UserByAccount,
  ) {}

  async findbyUsernameOrEmail(usernameOrEmail: string): Promise<Users> {
    try {
      const usuario = await this.userModel.findOne({
        where: {
          [Op.or]: {
            username: usernameOrEmail,
            email: usernameOrEmail,
          },
        },
      });
      return usuario;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findbyId(userId: number): Promise<Users> {
    try {
      const usuarioId = await this.userModel.findOne({ where: { userId } });
      console.log(usuarioId);
      return usuarioId;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async filter(accountId: number, params: any): Promise<Users> {
    const queryParams: any = {};
    if (params.email) {
      queryParams.email = params.email;
    }
    if (params.username) {
      queryParams.username = params.username;
    }
    if (params.userId) {
      queryParams.userId = params.userId;
    }
    return this.userModel.findOne({
      where: queryParams,
      include: [
        {
          model: UserByAccount,
          as: 'userAccounts',
          where: {
            accountId,
          },
        },
      ],
    });
  }

  async createUser(accountId: number, dataUser: CreateUserDTO): Promise<Users> {
    try {
      const newUserData: any = dataUser;
      const salt = await bcrypt.genSalt(10);
      const clave_encryp = await bcrypt.hash(dataUser.password, salt);
      dataUser.password = clave_encryp;
      const newUser = new Users(newUserData);
      await newUser.save();

      await this.userByAccountModel.create(
        { userId: newUser.userId, accountId: accountId },
        {
          include: [
            {
              model: Users,
            },
          ],
        },
      );
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async encyptPassword(id: number, password: string): Promise<string> {
    try {
      const salt = await genSalt(10);
      const userHash = await hash(password, salt);
      await this.userModel.update(
        { secret: userHash },
        { where: { userId: id } },
      );

      const user: Users = await this.userModel.findOne({
        where: { userId: id },
      });
      return user.password;
    } catch (error) {
      console.log('no se encripto pass');
      console.log(error);
      return error;
    }
  }

  async updateUser(
    userId: number,
    updateUserDTO: UpdateUserDto,
  ): Promise<Users> {
    const newUserData: any = updateUserDTO;

    const user = await this.userModel.findOne({
      where: {
        userId: userId,
      },
    });

    await user.update(newUserData);

    return user.save();
  }

  async getAll(): Promise<Users[]> {
    const users: Users[] = await this.userModel.findAll();

    return users;
  }

  async deleteUserById(userId: number): Promise<void> {
    const user = await this.userModel.findOne({
      where: {
        userId: userId,
      },
    });

    user.destroy();
  }
}
