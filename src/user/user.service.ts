import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {


  constructor(private prisma: PrismaService) { }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10)

    return await this.prisma.user.create({
      data: {
        firstName: dto.firstName, 
        lastName: dto.lastName,
        email: dto.email,
        password: hashedPassword,
        isActive: dto.isActive,
      },
    });
  }



  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
  }

  async findByEmail(email: string) {
    if (!email) {
      return null;
    }
    return await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })
  }

  async findByStatus(isActive: boolean) {
    if (!isActive) {
      return
    }
  }

  async findByEmailAndPassword(email: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
        password: password
      }
    })
  }



  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        email: updateUserDto.email,
      }
    })
  }

  async remove(id: number) {
    try {


      return await this.prisma.user.delete({
        where: { id }
      });
    } catch (error) {
      // ถ้าลบไม่ได้ (เช่น ไม่เจอ ID) ให้พ่นข้อความนี้
      throw new BadRequestException(`ไม่พบ User ID: ${id} ในระบบครับ`);
    }
  }
}
