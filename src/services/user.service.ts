import { Prisma, PrismaClient, Quote, User } from "@prisma/client";

const prisma = new PrismaClient();

export const doesUserExist = (email: string): Promise<User | null> => {
  return prisma.user.findFirst({
    where: {
      email,
      status: true,
    },
  });
};

export const createUser = (
  userCreateInput: Prisma.UserCreateInput
): Promise<User> => {
  return prisma.user.create({
    data: userCreateInput,
  });
};

export const getUserQuotes = (
  uid: number,
  take: number = 20,
  skip: number = 0
): Promise<Quote[]> => {
  return prisma.quote.findMany({
    where: {
      authorId: uid,
      status: true,
    },
    include: {
      author: true,
    },
    take,
    skip,
  });
};

export const getUserById = (uid: number): Promise<User | null> => {
  return prisma.user.findFirst({
    where: {
      id: uid,
      status: true,
    },
  });
};

export const updateUserById = (
  uid: number,
  userUpdateInput: Prisma.UserUpdateInput
): Promise<User> => {
  return prisma.user.update({
    where: {
      id: uid,
    },
    data: userUpdateInput,
  });
};

export const deleteUserById = (uid: number): Promise<User> => {
  return prisma.user.update({
    where: {
      id: uid,
    },
    data: {
      status: false,
    },
  });
};
