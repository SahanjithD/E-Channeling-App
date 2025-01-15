const prisma = require('../models/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'DasunDeshaja';

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, age, email, password, gender, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        age,
        email,
        password: hashedPassword,
        gender,
        phoneNumber,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { registerUser, loginUser };
