import prisma from './db';
import { calculateSalary, Seniority } from '../models/Staff';

export const processSalaryReviews = async () => {
  console.log('Auditor: Processing annual salary reviews...');

  
  const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

  const staffToReview = await prisma.staff.findMany({
    where: {
      
      lastSalaryReview: { lte: sixtyDaysAgo }
    }
  });

  for (const member of staffToReview) {
    const newSalary = calculateSalary({
      combat: member.combat,
      subterfuge: member.subterfuge,
      technical: member.technical,
      logistics: member.logistics,
      diplomacy: member.diplomacy
    }, member.age, member.seniority as Seniority);

    await prisma.staff.update({
      where: { id: member.id },
      data: {
        salary: newSalary,
        
        lastSalaryReview: new Date()
      }
    });

    console.log(`Auditor: Salary reviewed for ${member.name}. New rate: $${newSalary}`);
  }
};
