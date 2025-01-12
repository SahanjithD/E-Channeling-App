const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const specialties = [
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Orthopedic",
  "General Surgeon",
  "Obstetrician/Gynecologist",
  "Ophthalmologist",
  "Otolaryngologist",
  "Psychiatrist",
  "Urologist",
  "Gastroenterologist",
  "Endocrinologist",
  "Nephrologist",
  "Pulmonologist",
  "Rheumatologist",
  "Oncologist",
  "Allergist/Immunologist",
  "Infectious Disease Specialist",
  "Hematologist",
];
const timeSlots = ["3pm-6pm", "6pm-9pm", "9am-12pm", "12pm-3pm"];

async function main() {
  // Seed Doctors
  for (let i = 0; i < 300; i++) {
    const firstNames = ["Jane", "John", "Emily", "Michael", "Sarah", "Olivia", "Liam", "Noah", "Ethan", "Lucas", "Mia", "Isabella", "Charlotte", "Amelia", "Harper", "Evelyn", "Abigail", "Sophia", "Ava", "Riley"];
    const lastNames = ["Doe", "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Watson", "Lewis", "Hall", "Walker", "Richardson", "Patel"];

    await prisma.doctor.create({
      data: {
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        specialty: specialties[i % specialties.length],
        availableTime: timeSlots[i % timeSlots.length],
      },
    });
  }

  // Seed Users
  for (let i = 0; i < 3; i++) {
    await prisma.user.create({
      data: {
        name: `User ${i + 1}`,
        age: Math.floor(Math.random() * 50) + 20,
        email: `user${i + 1}@example.com`,
        password: "password123",
        gender: i % 2 === 0 ? "Male" : "Female",
        phoneNumber: `+94${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      },
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
