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

// Helper function to infer sauna category from product name
function inferSaunaCategory(name: string): string {
  const nameLower = name.toLowerCase();
  
  // Check for outdoor showers specifically first
  if (nameLower.includes("outdoor shower") || nameLower.includes("shower")) {
    return "outdoorshowers";
  }
  
  // Check for hot tubs and cold plunge (not saunas, but outdoor category)
  if (nameLower.includes("hot tub") || nameLower.includes("plunge") || nameLower.includes("tub")) {
    return "outdoor";
  }
  
  // Check for specific sauna types
  if (nameLower.includes("cube")) return "cube";
  if (nameLower.includes("barrel")) return "barrel";
  if (nameLower.includes("cabin") || nameLower.includes("pod") || nameLower.includes("indoor")) return "indoor";
  
  // Default to barrel for traditional saunas
  return "barrel";
}

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
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.image.deleteMany();
  await prisma.productOption.deleteMany();
  await prisma.productHeater.deleteMany();
  await prisma.product.deleteMany();
  await prisma.heater.deleteMany();

  // Load JSON files
  console.log("📂 Loading JSON files...");
  const productsPath = path.join(process.cwd(), "assets", "products.json");
  const heatersPath = path.join(process.cwd(), "assets", "heaters.json");
  const extraHeatersPath = path.join(process.cwd(), "assets", "extra_heaters.json");

  const productsData = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
  const heatersData = JSON.parse(fs.readFileSync(heatersPath, "utf-8"));
  
  // Load and merge extra heaters if file exists
  let extraHeatersData = [];
  if (fs.existsSync(extraHeatersPath)) {
    extraHeatersData = JSON.parse(fs.readFileSync(extraHeatersPath, "utf-8"));
    console.log(`🔥 Found ${extraHeatersData.length} extra heaters to add`);
  }
  
  // Merge all heaters
  const allHeatersData = [...heatersData, ...extraHeatersData];

  console.log(`📦 Found ${productsData.length} products`);
  console.log(`🔥 Found ${allHeatersData.length} total heaters`);

  // ====================
  // SEED HEATERS FIRST
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

  // ====================
  // SEED PRODUCTS
  // ====================
  console.log("\n📦 Seeding products...");

  for (let i = 0; i < productsData.length; i++) {
    const product = productsData[i];

    try {
      const category = inferSaunaCategory(product.name);

      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description || "",
          type: category,
          designation: product.type || "Standard",
          collectionType: product.collectionType || null,
          series: product.series || null,
          dimensions: product.dimensions ? JSON.stringify(product.dimensions) : null,
          specifications: {
            ...(product.specifications || {}),
            features: product.features || [],
          },
          basePrice: new Prisma.Decimal(product.price || product.baseCost || 0),
          woodType: product.wood_type ? JSON.stringify(product.wood_type) : null,
          displayOrder: i, // Use array index as initial display order
          isFeatured: product.is_featured || false,
        },
      });

      console.log(`✅ Created product: ${product.name} (${category})`);

      // Seed product images
      if (product.images && Array.isArray(product.images)) {
        for (let imgIdx = 0; imgIdx < product.images.length; imgIdx++) {
          const imgUrl = product.images[imgIdx];
          await prisma.image.create({
            data: {
              url: imgUrl,
              altText: `${product.name} - Image ${imgIdx + 1}`,
              order: imgIdx,
              isPrimary: imgIdx === 0,
              productId: createdProduct.id,
            },
          });
        }
      }

      // Seed wood type options with images
      if (product.wood_type && typeof product.wood_type === "object") {
        for (const [woodName, woodData] of Object.entries(product.wood_type)) {
          const woodInfo = woodData as any;
          
          // Store the image URL in specifications/category field as JSON string
          const optionData = {
            image: woodInfo.image || null
          };
          
          await prisma.productOption.create({
            data: {
              name: woodName,
              optionType: "WOOD_TYPE",
              category: JSON.stringify(optionData), // Store image in category field as JSON
              price: new Prisma.Decimal(woodInfo.price || 0),
              isDefault: woodInfo.price === 0,
              productId: createdProduct.id,
            },
          });
        }
      }

      // Seed additional upgrades (Add-Ons) with images
      if (product.additional_upgrades && Array.isArray(product.additional_upgrades)) {
        for (const upgrade of product.additional_upgrades) {
          const optionData = {
            image: upgrade.image || null
          };
          
          await prisma.productOption.create({
            data: {
              name: upgrade.name,
              optionType: "FINISH", // Using FINISH for add-ons
              category: JSON.stringify(optionData), // Store image in category field as JSON
              price: new Prisma.Decimal(upgrade.price || 0),
              isRequired: false,
              productId: createdProduct.id,
            },
          });
        }
      }

      // NOTE: WiFi controller is NOT added as a ProductOption - it's handled separately

      // Seed installation options with images
      if (product.installation && typeof product.installation === "object") {
        for (const [installKey, installData] of Object.entries(product.installation)) {
          const installInfo = installData as any;
          // Check if there's a delivery cost that should be added to DIY
          const deliveryCost = installKey === "DIY" && product.delivery && !product.delivery.included 
            ? product.delivery.cost || 0 
            : 0;
          
          const optionData = {
            image: installInfo.image || null
          };
          
          await prisma.productOption.create({
            data: {
              name: installKey === "DIY" ? `DIY Installation (+ $${deliveryCost} Delivery Fee)` : "Supply & Install",
              optionType: "INSTALLATION",
              category: JSON.stringify(optionData), // Store image in category field as JSON
              price: new Prisma.Decimal(installInfo.price || 0),
              isDefault: installKey === "DIY",
              productId: createdProduct.id,
            },
          });
        }
      }

      // Create ProductHeater relationships
      if (product.stove_type && typeof product.stove_type === "object") {
        for (const [heaterName, heaterData] of Object.entries(product.stove_type)) {
          const heaterInfo = heaterData as any;
          const heaterKey = getHeaterKey(heaterName);

          // Try to find matching heater
          let matchingHeaterId = heaterMap.get(heaterKey);

          // If not found, try partial match
          if (!matchingHeaterId) {
            for (const [key, id] of heaterMap.entries()) {
              if (key.includes(heaterKey.split("-")[0]) || heaterKey.includes(key.split("-")[0])) {
                matchingHeaterId = id;
                break;
              }
            }
          }

          if (matchingHeaterId) {
            try {
              await prisma.productHeater.create({
                data: {
                  productId: createdProduct.id,
                  heaterId: matchingHeaterId,
                },
              });
            } catch (error) {
              // Ignore duplicate key errors
              if (!(error as any).code?.includes("unique")) {
                console.error(`❌ Error linking heater to product:`, error);
              }
            }
          } else {
            console.log(`⚠️  Could not find heater: ${heaterKey} for product: ${product.name}`);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error creating product ${product.name}:`, error);
    }
  }

  console.log("\n✅ Database seeding completed!");
  console.log("\n📊 Summary:");
  console.log(`  - ${heaterMap.size} heaters`);
  console.log(`  - ${productsData.length} products`);
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

