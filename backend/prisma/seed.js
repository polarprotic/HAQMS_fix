const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);
  
  // 1. Create Admin
  await prisma.user.create({
    data: { name: 'System Admin', email: 'admin@haqms.com', password, role: 'ADMIN' }
  });

  // 2. Create Receptionist
  await prisma.user.create({
    data: { name: 'Front Desk', email: 'reception1@haqms.com', password, role: 'RECEPTIONIST' }
  });

  // 3. Create Doctor Login
  await prisma.user.create({
    data: { name: 'Dr. Smith', email: 'doctor1@haqms.com', password, role: 'DOCTOR' }
  });

  // 4. Create Doctor Profile
  await prisma.doctor.create({
    data: { 
      name: 'Dr. Smith', 
      email: 'doctor1@haqms.com', 
      specialization: 'Cardiology', 
      department: 'Surgery', 
      experience: 10, 
      consultationFee: 500 
    }
  });

  console.log('Mock data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });