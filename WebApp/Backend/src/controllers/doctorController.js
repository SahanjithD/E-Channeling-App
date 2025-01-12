const prisma = require('../models/prismaClient');

const getDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

// Search and Filter Doctors
const searchDoctors = async (req, res) => {
  try {
    const { name, specialty } = req.query;
    console.log('Query Params:', { name, specialty });

    const doctors = await prisma.doctor.findMany({
      where: {
        AND: [
          name
            ? {
                name: {
                  contains: name,
                  mode: 'insensitive', // Case-insensitive search
                },
              }
            : {},
          specialty
            ? {
                specialty: {
                  contains: specialty,
                  mode: 'insensitive',
                },
              }
            : {},
        ],
      },
    });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error searching doctors', error });
  }
};

module.exports = { getDoctors,searchDoctors };

