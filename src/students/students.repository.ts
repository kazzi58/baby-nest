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
        const updateResult = await this.update(id, updateStudentDto);
        const student = await this.findOne(id);
        console.log('res - ', updateResult);
        return student;
    }

    async getStudent(id: string): Promise<Student | Error>{
        const student = this.findOne({ where: { id: id, isDeleted: "false" } });
        return student;
    }

    async getAllStudents(): Promise<Student[]>{
        const students = this.find({ select: ["name", "address", "school"], where: {isDeleted: "false"} })
        return students;
    }

    async deleteStudent(id: string): Promise<string> {
        const student = await this.findOne({ where: { id: id, isDeleted: "false" } });
        console.log('stu - ', student);
        if (student!=undefined){
            // found the student with passed id in the database
            (await student).isDeleted = 'true';
            await this.update(id, {isDeleted: 'true'});
            return `Student with ID: ${id} has been deleted from the database`;
        }
        else{
            return `Student with ID: ${id} does not exist in the database`;
        }
        
    }

}