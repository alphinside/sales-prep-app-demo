import Database from "better-sqlite3";
import fs from "fs";

const db = new Database("leads.db");

console.log("🌱 Seeding database with mock data...\n");

try {
  // Read the SQL file
  const sqlContent = fs.readFileSync("seed-data.sql", "utf8");

  // Remove comments and split into sections
  const cleanSql = sqlContent
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');

  // Execute the entire SQL at once
  db.exec(cleanSql);

  console.log("✅ Database seeded successfully!\n");

  // Show summary
  const leads = db.prepare("SELECT COUNT(*) as count FROM leads").get();
  const meetings = db.prepare("SELECT COUNT(*) as count FROM meetings").get();
  const notes = db.prepare("SELECT COUNT(*) as count FROM lead_notes").get();

  console.log(`📈 Total records in database:`);
  console.log(`   - ${leads.count} total leads`);
  console.log(`   - ${meetings.count} total meetings`);
  console.log(`   - ${notes.count} total interaction notes\n`);

  // Show sample leads
  console.log("🎯 Sample leads:");
  const sampleLeads = db.prepare("SELECT name, company, status, value FROM leads LIMIT 5").all();
  sampleLeads.forEach(lead => {
    console.log(`   - ${lead.name} (${lead.company}) - ${lead.status} - $${lead.value.toLocaleString()}`);
  });

  console.log("\n✨ Ready for demo!");

} catch (error) {
  console.error("❌ Error seeding database:", error.message);
  process.exit(1);
} finally {
  db.close();
}
