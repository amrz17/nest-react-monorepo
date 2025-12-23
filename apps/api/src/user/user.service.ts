import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { IUserResponse } from './types/userResponse.interface';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {

  }
  async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);


    const userByEmail = await this.userRepository.findOne({
        where: {
            email: createUserDto.email
        }
    })

    const userByUsername = await this.userRepository.findOne({
        where: {
            username: createUserDto.username
        }
    })

    if(userByEmail || userByUsername) {
        throw new HttpException('EMail or username is already taken', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const saveUser = await this.userRepository.save(newUser);
    return this.generatedUserResponse(saveUser);
  }


  generateToken(user: UserEntity): string {
    console.log(process.env.JWT_SECRET) 
    return sign(
        {
            id: user.id_user,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
    );
  }


  generatedUserResponse(user: UserEntity): IUserResponse {
    return {
        user: {
            ...user,
            token: this.generateToken(user),
        },
    };
  }   
}
