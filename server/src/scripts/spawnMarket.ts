import { generateMarketPool } from '../services/staffGenerator';

const count = parseInt(process.argv[2]) || 10;
const pool = generateMarketPool(count);

console.log(`Generated ${count} recruits for the market:`);
console.table(pool.map(p => ({
  name: p.name,
  age: p.age,
  seniority: p.seniority,
  combat: p.combat,
  cost: p.cost
})));

console.log("\nNote: This script currently simulates the generation. Integration with DB would require prisma setup in the script context.");
