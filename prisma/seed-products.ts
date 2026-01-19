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
  console.log("🌱 Starting products seeding...");

  // Load products JSON
  console.log("📂 Loading products.json...");
  const productsPath = path.join(process.cwd(), "assets", "products.json");
  const productsData = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

  console.log(`📦 Found ${productsData.length} products`);

  // Get existing heaters to link with products
  const existingHeaters = await prisma.heater.findMany();
  const heaterMap = new Map<string, string>();
  
  for (const heater of existingHeaters) {
    heaterMap.set(heater.model, heater.id);
  }

  console.log(`🔥 Found ${heaterMap.size} existing heaters in database`);

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
          dimensions: product.dimension || null,
          specifications: product.specifications || {},
          basePrice: new Prisma.Decimal(product.price || 0),
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

      // Seed installation options
      if (product.installation && typeof product.installation === "object") {
        for (const [installKey, installData] of Object.entries(product.installation)) {
          const installInfo = installData as any;
          await prisma.productOption.create({
            data: {
              name: installKey === "DIY" ? "DIY Installation" : "Supply & Install",
              optionType: "INSTALLATION",
              category: "installation",
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

  console.log("\n✅ Products seeding completed!");
  console.log(`  - ${productsData.length} products seeded`);
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

