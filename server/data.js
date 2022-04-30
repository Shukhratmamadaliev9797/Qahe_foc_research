import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      firstName: "Shukhrat",
      lastName: "Mamadaliev",
      userId: "6220969",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("12345678", 8),
      isAdmin: true,
      isStaff: false,
    },
    {
      firstName: "John",
      lastName: "Down",
      userId: 123456,
      email: "stuff@gmail.com",
      password: bcrypt.hashSync("1111", 8),
      isAdmin: false,
      isStaff: true,
    },
  ],
};

export default data;
