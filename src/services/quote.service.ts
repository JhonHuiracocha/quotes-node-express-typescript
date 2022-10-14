import { Prisma, PrismaClient, Quote } from "@prisma/client";

const prisma = new PrismaClient();

export const createQuote = (
  quoteCreateInput: Prisma.QuoteCreateInput
): Promise<Quote> => {
  return prisma.quote.create({
    data: quoteCreateInput,
  });
};

export const getQuoteById = (quoteId: number): Promise<Quote | null> => {
  return prisma.quote.findFirst({
    where: {
      id: quoteId,
      status: true,
    },
    include: {
      author: true,
    },
  });
};

export const updateQuoteById = (
  quoteId: number,
  quoteUpdateInput: Prisma.QuoteUpdateInput
): Promise<Quote> => {
  return prisma.quote.update({
    where: {
      id: quoteId,
    },
    data: quoteUpdateInput,
  });
};

export const deleteQuoteById = (quoteId: number): Promise<Quote> => {
  return prisma.quote.update({
    where: {
      id: quoteId,
    },
    data: {
      status: false,
    },
  });
};
