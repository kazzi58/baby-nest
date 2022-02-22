import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import StudentsRepository from './students.repository';

@Injectable()
export class StudentsService{
  constructor(@InjectRepository(StudentsRepository) private studentsRepository: StudentsRepository){
  }

  async create(createStudentDto: CreateStudentDto) {
    const data = await this.studentsRepository.createStudent(createStudentDto);
    return data;
  }

  findAll() {
    return `This action returns all students`;
  }

  async findOne(id: string) {
    const data = await this.studentsRepository.getStudent(id);
    if (data!=undefined){
      return data;
    }
    else {
      return "No data found!";
    }
    
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const data = await this.studentsRepository.updateStudent(id, updateStudentDto);
    return data;
  }

  async remove(id: string) {
    const result = this.studentsRepository.deleteStudent(id);
    return result;
  }
}
