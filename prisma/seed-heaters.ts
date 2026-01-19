import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

// Load environment variables
config();

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Helper function to create a unique heater key
function getHeaterKey(heaterName: string): string {
  // Extract model from name (e.g., "HUUM DROP Electric Sauna Heater 6 kW" -> "DROP-6")
  const match = heaterName.match(/(DROP|HIVE|KIP|Revive|Designer)\s*(Mini)?\s*.*?(\d+\.?\d*)\s*[kK][wW]/i);
  if (match) {
    const model = match[1].toUpperCase();
    const mini = match[2] ? "-Mini" : "";
    const power = match[3];
    return `${model}${mini}-${power}`;
  }
  
  // Fallback: use the full name
  return heaterName.replace(/\s+/g, "-");
}

async function main() {
  console.log("🌱 Starting heaters seeding...");

  // Load JSON files
  console.log("📂 Loading JSON files...");
  const heatersPath = path.join(process.cwd(), "assets", "heaters.json");
  const extraHeatersPath = path.join(process.cwd(), "assets", "extra_heaters.json");

  const heatersData = JSON.parse(fs.readFileSync(heatersPath, "utf-8"));
  
  // Load and merge extra heaters if file exists
  let extraHeatersData = [];
  if (fs.existsSync(extraHeatersPath)) {
    extraHeatersData = JSON.parse(fs.readFileSync(extraHeatersPath, "utf-8"));
    console.log(`🔥 Found ${extraHeatersData.length} extra heaters to add`);
  }
  
  // Merge all heaters
  const allHeatersData = [...heatersData, ...extraHeatersData];

  console.log(`🔥 Found ${allHeatersData.length} total heaters`);

  // ====================
  // SEED HEATERS
  // ====================
  console.log("\n🔥 Seeding heaters...");
  const heaterMap = new Map<string, string>(); // heaterKey -> heaterId

  for (const heater of allHeatersData) {
    const heaterKey = heater.model || getHeaterKey(heater.name);

    // Skip if already processed
    if (heaterMap.has(heaterKey)) {
      console.log(`⏭️  Skipping duplicate heater: ${heaterKey}`);
      continue;
    }

    try {
      // Detect heater type
      const isWoodBurning = heater.name.toLowerCase().includes('wood');
      const heaterType = isWoodBurning ? 'WOOD' : 'ELECTRIC';

      // Build type-specific specs
      const electricSpec = !isWoodBurning ? {
        power: heater.power || 0,
        voltage: heater.voltage || "240V",
        electricianRequired: true,
        ...(heater.electricSpec || {}) // Merge any existing electricSpec from JSON
      } : null;

      const woodSpec = isWoodBurning ? {
        fuelType: "Wood",
        ...(heater.woodSpec || {}) // Merge any existing woodSpec from JSON
      } : null;

      const createdHeater = await prisma.heater.create({
        data: {
          type: heaterType,
          name: heater.name,
          model: heaterKey,
          description: heater.description || "",
          basePrice: new Prisma.Decimal(heater.basePrice || 0),
          specifications: heater.specifications || {},
          options: heater.options || {},
          warranty: heater.warranty || null,
          installation: heater.installation || null,
          features: heater.features || [],
          electricSpec,
          woodSpec,
          isFeatured: heater.isFeatured || false,
        },
      });

      heaterMap.set(heaterKey, createdHeater.id);

      // Seed heater images
      if (heater.images && Array.isArray(heater.images)) {
        for (let i = 0; i < heater.images.length; i++) {
          const img = heater.images[i];
          await prisma.image.create({
            data: {
              url: typeof img === "string" ? img : img.url,
              altText: typeof img === "object" ? img.alt : heater.name,
              order: i,
              isPrimary: typeof img === "object" ? img.isPrimary || i === 0 : i === 0,
              heaterId: createdHeater.id,
            },
          });
        }
      }

      console.log(`✅ Created heater: ${heaterKey} (${heaterType})`);
    } catch (error) {
      console.error(`❌ Error creating heater ${heaterKey}:`, error);
    }
  }

  console.log(`\n✅ Seeded ${heaterMap.size} unique heaters`);
  console.log("\n💡 Run 'pnpm prisma studio' to view the data");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

