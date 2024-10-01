// prisma/seed.js
 
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
 
const prisma = new PrismaClient();
 
async function main() {
  // Clear existing data in the correct order to avoid foreign key constraints
  await prisma.employeeSkill.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.course.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();
 
  // Create Departments
  const engineering = await prisma.department.create({
    data: { name: 'Engineering' },
  });
 
  const marketing = await prisma.department.create({
    data: { name: 'Marketing' },
  });
 
  // Create Skills
  const javascript = await prisma.skill.create({
    data: { name: 'JavaScript' },
  });
 
  const reactSkill = await prisma.skill.create({
    data: { name: 'React' },
  });
 
  const nodeSkill = await prisma.skill.create({
    data: { name: 'Node.js' },
  });
 
  // Create Courses
  const jsCourse = await prisma.course.create({
    data: {
      name: 'JavaScript Basics',
      description: 'Introduction to JavaScript',
    },
  });
 
  const reactCourse = await prisma.course.create({
    data: {
      name: 'React for Beginners',
      description: 'Learn the basics of React',
    },
  });
 
  const nodeCourse = await prisma.course.create({
    data: {
      name: 'Node.js Fundamentals',
      description: 'Understanding the basics of Node.js',
    },
  });
 
  // Create Certifications
  const jsCert = await prisma.certification.create({
    data: {
      name: 'JavaScript Certificate',
link: 'https://example.com/js-cert',
    },
  });
 
  const reactCert = await prisma.certification.create({
    data: {
      name: 'React Certificate',
link: 'https://example.com/react-cert',
    },
  });
 
  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
      department: {
connect: { id: engineering.id },
      },
    },
  });
 
  // Create Employee Users
  const employee1Password = await bcrypt.hash('employee123', 10);
  const employee1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: employee1Password,
      role: 'EMPLOYEE',
      department: {
connect: { id: engineering.id },
      },
    },
  });
 
  const employee2Password = await bcrypt.hash('employee123', 10);
  const employee2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: employee2Password,
      role: 'EMPLOYEE',
      department: {
connect: { id: marketing.id },
      },
    },
  });
 
  // Assign EmployeeSkills
  await prisma.employeeSkill.create({
    data: {
userId: employee1.id,
skillId: javascript.id,
courseId: jsCourse.id,
      score: 85,
certificateId: jsCert.id,
      approvalStatus: 'APPROVED',
    },
  });
 
  await prisma.employeeSkill.create({
    data: {
userId: employee1.id,
skillId: reactSkill.id,
courseId: reactCourse.id,
      score: 90,
certificateId: reactCert.id,
      approvalStatus: 'APPROVED',
    },
  });
 
  await prisma.employeeSkill.create({
    data: {
userId: employee2.id,
skillId: nodeSkill.id,
courseId: nodeCourse.id,
      score: 80,
      approvalStatus: 'PENDING',
    },
  });
 
  console.log('Seed data has been successfully inserted.');
}
 
main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });