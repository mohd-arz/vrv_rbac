import prisma from "../db/prisma-singleton";
import bcrypt from "bcrypt";
import log from "../log/log";

async function seedRole() {
  await prisma.role.createMany({
    data: [{ name: "admin" }, { name: "moderator" }, { name: "user" }],
  });
}

async function seedAdmin() {
  const password = bcrypt.hashSync("12345678", 8);
  const admin_id = await prisma.role.findFirstOrThrow({
    where: { name: "admin" },
    select: { id: true },
  });
  await prisma.user.create({
    data: {
      name: "admin",
      username: "admin",
      password: password,
      role_id: admin_id.id,
    },
  });
}

async function main() {
  await seedRole();
  await seedAdmin();
}

main()
  .then(() => {
    console.log("db seeded");
  })
  .catch((err) => {
    log(err);
  });
