import { EntityRepository, Repository } from "typeorm";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";

@EntityRepository(Student)
export default class StudentsRepository extends Repository<Student> {

    async createStudent(createStudentDto: CreateStudentDto): Promise<Student | Error> {
        try{
            const { name, address, school } = createStudentDto;
            console.log('name = ', name);

            const studentObject = {
                name: name,
                address: address,
                school: school
            }

            const student = this.create(studentObject);
            await this.save(student);
            return student;
        }
        
        catch(e){
            console.log('e =',e);
            return e;
        }
    }

    async updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        const {name, address, school} = updateStudentDto;
        const student = await this.findOne(id);

        student.name = name;
        student.address = address;
        student.school = school;

        await this.save(student);
        return student;
    }

}