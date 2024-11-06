const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  // Crear algunas ubicaciones
  const locations = await prisma.locations.createMany({
    data: [
      { description: "San Miguel de Tucuman" },
      { description: "Tafi Viejo" },
      { description: "Yerba Buena" },
      { description: "Monteros" },
      { description: "Buenos Aires" },
      { description: "Córdoba" },
      { description: "Rosario" },
      { description: "Mendoza" },
    ],
  });

  // Crear algunas categorías
  const categories = await prisma.categories.createMany({
    data: [
      { description: "Plomería" },
      { description: "Carpintería" },
      { description: "Electricidad" },
      { description: "Pintura" },
    ],
  });

  // Obtener las categorías y ubicaciones recién creadas
  const allLocations = await prisma.locations.findMany();
  const allCategories = await prisma.categories.findMany();

  //crear un admin
  await prisma.user.create({
    data: {
      email: 'admin',
      name: 'Administrador',
      address: faker.location.streetAddress(),
      password: 'admin',
      area: "General",
      birthDay: faker.date.birthdate(),
      disabled: false,
      profilePicture: faker.image.avatar(),
      salary: "$" + 0,
      dni: faker.number.int({ min: 10000000, max: 99999999 }) + "",
      role: "administrador",
    },
  });

  // Crear trabajadores aleatorios
  for (let i = 0; i < 25; i++) {
    // Seleccionar una ubicación y algunas categorías al azar
    const randomLocation = faker.helpers.arrayElement(allLocations);
    const randomCategories = faker.helpers.arrayElements(
      allCategories,
      faker.number.int({ min: 1, max: 3 })
    );

    // Crear un trabajador
    const trabajador = await prisma.trabajadores.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        bio: faker.lorem.sentence(),
        address: faker.location.streetAddress(),
        location: {
          connect: { id: randomLocation.id }, // Conectar con una ubicación existente
        },
        rating: faker.number.float({ min: 1, max: 5 }),
        totalReviews: faker.number.int({ min: 0, max: 100 }),
        profilePicture: faker.image.avatar(),
        TrabajadorCategories: {
          create: randomCategories.map((category) => ({
            category: {
              connect: { id: category.id }, // Conectar con las categorías seleccionadas
            },
          })),
        },
      },
    });

    const usuario = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        password: faker.string.hexadecimal(),
        area: faker.helpers.arrayElement(["RRHH", "Finanzas", "General"]),
        birthDay: faker.date.birthdate(),
        disabled: false,
        profilePicture: faker.image.avatar(),
        salary: "$" + faker.number.int({ min: 100000, max: 9999999 }),
        dni: faker.number.int({ min: 10000000, max: 99999999 }) + "",
        role: faker.helpers.arrayElement(["administrador", "empleado"]),
      },
    });

    console.log(`Created trabajador with id: ${trabajador.id}`);
    console.log(`Created trabajador with id: ${usuario.id}`);
  }

  for (let i = 0; i < 50; i++) {
    const usuarios = await prisma.user.findMany();
    const trabajadores = await prisma.trabajadores.findMany();

    await prisma.interactionsHistory.create({
      data: {
        userId: faker.helpers.arrayElement(usuarios).id,
        description: `Se cambio el salario del usuario ${faker.person.fullName()}`,
        oldValue: "$" + faker.number.int({ min: 100000, max: 9999999 }),
        newValue: "$" + faker.number.int({ min: 100000, max: 9999999 }),
      },
    });

    await prisma.commissions.create({
      data: {
        trabajadorId: faker.helpers.arrayElement(trabajadores).id,
        amount: faker.number.int({ min: 1000, max: 9999 }),
        createdAt: faker.date.anytime()
      }
    })
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
