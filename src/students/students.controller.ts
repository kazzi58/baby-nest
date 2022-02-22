import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Post('update/:id')
  update(@Param('id') id, @Body() updateStudentDto: UpdateStudentDto){
    return this.studentsService.update(id, updateStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id) {
    return this.studentsService.remove(id);
  }
}
