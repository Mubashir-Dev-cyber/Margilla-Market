import connectDB from "@/lib/db";
import Product from "@/models/Product";
import openai from "openai";

const openaiClient = new openai({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateVector(text) {
    const response = await openaiClient.embeddings.create({
        model: "text-embedding-3-small",
        input: text
    });
    return response.data[0].embedding;
}

export async function GET() {
    await connectDB();
    const products = await Product.find();
    await Product.deleteMany();
    const productsData = [

        {
            title: "Blue Sneakers",
            description: "Comfortable blue sneakers for everyday wear",
            price: 79.99,
            category: "Footwear",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Red Dress",
            description: "Elegant red dress for special occasions",
            price: 149.99,
            category: "Clothing",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Wireless Headphones",
            description: "High-quality wireless headphones with noise cancellation",
            price: 199.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Gaming Mouse",
            description: "Ergonomic RGB gaming mouse with adjustable DPI",
            price: 59.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Mechanical Keyboard",
            description: "RGB mechanical keyboard with blue switches",
            price: 109.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Smart Watch",
            description: "Fitness tracking smartwatch with heart rate monitor",
            price: 249.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Laptop Backpack",
            description: "Water-resistant backpack with laptop compartment",
            price: 69.99,
            category: "Accessories",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Leather Wallet",
            description: "Premium genuine leather wallet with RFID protection",
            price: 39.99,
            category: "Accessories",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Running Shoes",
            description: "Lightweight running shoes for maximum comfort",
            price: 99.99,
            category: "Footwear",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "White T-Shirt",
            description: "Soft cotton t-shirt with classic fit",
            price: 24.99,
            category: "Clothing",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Denim Jacket",
            description: "Stylish denim jacket for casual wear",
            price: 89.99,
            category: "Clothing",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Coffee Maker",
            description: "Automatic coffee maker with programmable timer",
            price: 129.99,
            category: "Home Appliances",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Blender",
            description: "High-speed blender for smoothies and shakes",
            price: 79.99,
            category: "Home Appliances",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Office Chair",
            description: "Ergonomic office chair with lumbar support",
            price: 219.99,
            category: "Furniture",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Wooden Desk",
            description: "Modern wooden desk for home office",
            price: 299.99,
            category: "Furniture",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "LED Desk Lamp",
            description: "Adjustable LED lamp with touch controls",
            price: 34.99,
            category: "Home Decor",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Wall Clock",
            description: "Minimalist wall clock with silent movement",
            price: 29.99,
            category: "Home Decor",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Yoga Mat",
            description: "Non-slip yoga mat for workouts and meditation",
            price: 44.99,
            category: "Fitness",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Dumbbell Set",
            description: "Adjustable dumbbell set for strength training",
            price: 159.99,
            category: "Fitness",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Water Bottle",
            description: "Insulated stainless steel water bottle",
            price: 19.99,
            category: "Fitness",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Bluetooth Speaker",
            description: "Portable speaker with deep bass and long battery life",
            price: 89.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "4K Monitor",
            description: "27-inch UHD monitor with vibrant colors",
            price: 399.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "USB-C Hub",
            description: "7-in-1 USB-C hub with HDMI and card reader",
            price: 49.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "External SSD",
            description: "1TB portable SSD with high-speed data transfer",
            price: 139.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Phone Stand",
            description: "Adjustable aluminum phone stand for desks",
            price: 15.99,
            category: "Accessories",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Sunglasses",
            description: "Polarized sunglasses with UV400 protection",
            price: 54.99,
            category: "Accessories",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Winter Coat",
            description: "Warm insulated winter coat with hood",
            price: 179.99,
            category: "Clothing",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Casual Jeans",
            description: "Slim-fit denim jeans for everyday use",
            price: 59.99,
            category: "Clothing",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Formal Shirt",
            description: "Premium cotton formal shirt for office wear",
            price: 49.99,
            category: "Clothing",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Travel Suitcase",
            description: "Lightweight hard-shell suitcase with spinner wheels",
            price: 189.99,
            category: "Travel",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Camping Tent",
            description: "4-person waterproof camping tent",
            price: 229.99,
            category: "Outdoor",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Sleeping Bag",
            description: "Warm sleeping bag suitable for all seasons",
            price: 74.99,
            category: "Outdoor",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Mountain Bike Helmet",
            description: "Lightweight cycling helmet with ventilation",
            price: 64.99,
            category: "Sports",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Football",
            description: "Professional size 5 football for training and matches",
            price: 34.99,
            category: "Sports",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Cookware Set",
            description: "10-piece non-stick cookware set",
            price: 199.99,
            category: "Kitchen",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Chef Knife",
            description: "Professional stainless steel chef knife",
            price: 69.99,
            category: "Kitchen",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Air Fryer",
            description: "Digital air fryer with 6-liter capacity",
            price: 149.99,
            category: "Kitchen",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Perfume",
            description: "Long-lasting fragrance with floral notes",
            price: 84.99,
            category: "Beauty",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Skin Care Kit",
            description: "Complete skincare routine for healthy skin",
            price: 94.99,
            category: "Beauty",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Electric Toothbrush",
            description: "Rechargeable toothbrush with multiple cleaning modes",
            price: 79.99,
            category: "Health",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Premium Men's Lightweight Blue Running Sneakers for Everyday Walking and Fitness",
            description: "Comfortable lightweight blue running sneakers designed for everyday walking, jogging, gym workouts, fitness training, and casual outdoor activities.",
            price: 79.99,
            category: "Footwear",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Elegant Women's Red Evening Dress for Weddings, Parties, and Special Occasions",
            description: "Beautiful red evening dress featuring an elegant design, comfortable fabric, and stylish fit, perfect for weddings, parties, formal dinners, and special occasions.",
            price: 149.99,
            category: "Clothing",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation and Deep Bass",
            description: "High-quality wireless Bluetooth headphones with active noise cancellation, deep bass, clear audio, comfortable ear cushions, and long-lasting battery life.",
            price: 199.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Professional RGB Mechanical Gaming Keyboard with Customizable Backlighting and Blue Switches",
            description: "High-performance mechanical gaming keyboard featuring RGB backlighting, responsive blue switches, customizable lighting effects, anti-ghosting, and durable construction.",
            price: 119.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Ergonomic Wireless RGB Gaming Mouse with Adjustable DPI and Programmable Buttons",
            description: "Precision wireless gaming mouse with adjustable DPI settings, customizable RGB lighting, programmable buttons, ergonomic grip, and responsive optical tracking.",
            price: 69.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Advanced Smart Fitness Watch with Heart Rate Monitoring, GPS, and Sleep Tracking",
            description: "Modern smart fitness watch featuring heart rate monitoring, built-in GPS, sleep tracking, step counting, workout tracking, notifications, and long battery life.",
            price: 249.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Durable Water-Resistant Laptop Backpack with USB Charging Port and Multiple Compartments",
            description: "Spacious water-resistant laptop backpack with padded computer compartment, USB charging port, multiple storage pockets, adjustable shoulder straps, and travel-friendly design.",
            price: 74.99,
            category: "Accessories",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Premium Genuine Leather RFID Blocking Wallet for Men with Multiple Card Slots",
            description: "Classic genuine leather wallet with RFID blocking technology, multiple credit card slots, cash compartment, identification card holder, and slim everyday design.",
            price: 44.99,
            category: "Accessories",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Classic Men's Slim Fit Stretch Denim Jeans for Casual Everyday Wear",
            description: "Comfortable slim-fit denim jeans made with stretch fabric, designed for casual everyday wear, outdoor activities, travel, shopping, and relaxed weekend outfits.",
            price: 64.99,
            category: "Clothing",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Premium Men's Waterproof Leather Boots for Hiking, Travel, and Outdoor Adventures",
            description: "Durable waterproof leather boots with strong grip, comfortable inner lining, supportive sole, and rugged construction for hiking, travel, work, and outdoor adventures.",
            price: 139.99,
            category: "Footwear",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Portable Bluetooth Wireless Speaker with Powerful Stereo Sound and Extended Battery Life",
            description: "Compact portable Bluetooth speaker delivering powerful stereo sound, enhanced bass, wireless connectivity, rechargeable battery, and convenient outdoor portability.",
            price: 89.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "27-Inch Ultra HD 4K Computer Monitor with High Resolution and Vibrant Color Display",
            description: "Professional 27-inch 4K UHD monitor offering sharp high-resolution visuals, vibrant colors, wide viewing angles, and excellent performance for gaming, work, design, and entertainment.",
            price: 399.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Multi-Port USB-C Hub Adapter with HDMI, USB 3.0, SD Card Reader, and Fast Data Transfer",
            description: "Compact USB-C hub featuring HDMI output, USB 3.0 ports, SD card reader, high-speed data transfer, and convenient connectivity for laptops and tablets.",
            price: 49.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "High-Speed Portable 1TB External SSD Storage Drive for Computers and Backup",
            description: "Fast portable 1TB solid state drive designed for secure file storage, computer backups, video editing, gaming libraries, photos, documents, and high-speed data transfer.",
            price: 139.99,
            category: "Electronics",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Automatic Programmable Coffee Maker Machine with Built-In Timer and Large Water Reservoir",
            description: "Easy-to-use automatic coffee maker with programmable timer, large water reservoir, reusable filter, quick brewing system, and convenient design for home or office.",
            price: 129.99,
            category: "Kitchen",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Digital 6-Liter Air Fryer with Multiple Cooking Presets and Adjustable Temperature Control",
            description: "Large-capacity digital air fryer with multiple cooking presets, adjustable temperature control, rapid air circulation, non-stick basket, and easy-to-use touchscreen controls.",
            price: 149.99,
            category: "Kitchen",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Professional Stainless Steel Chef Knife with Sharp Blade and Ergonomic Handle",
            description: "High-quality stainless steel kitchen chef knife featuring a sharp precision blade, ergonomic non-slip handle, balanced design, and durable construction for food preparation.",
            price: 69.99,
            category: "Kitchen",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Complete Non-Stick Cookware Set with Frying Pans, Saucepan, and Cooking Accessories",
            description: "Complete non-stick cookware collection including frying pans, saucepans, cooking utensils, heat-resistant handles, and durable kitchen accessories for everyday cooking.",
            price: 199.99,
            category: "Kitchen",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Ergonomic Adjustable Office Chair with Lumbar Support, Armrests, and Comfortable Cushion",
            description: "Comfortable ergonomic office chair with adjustable height, lumbar support, padded seat, adjustable armrests, smooth-rolling wheels, and breathable backrest for long working hours.",
            price: 219.99,
            category: "Furniture",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        },
        {
            title: "Modern Minimalist Wooden Computer Desk with Large Workspace and Storage Drawer",
            description: "Modern wooden computer desk with spacious workspace, built-in storage drawer, sturdy construction, minimalist design, and comfortable layout for home offices and study rooms.",
            price: 299.99,
            category: "Furniture",
            image: `https://picsum.photos/500/300?random=${Math.random()}`
        }

    ];

    // Embeddings are optional. Products can be browsed with normal MongoDB
    // text fields even when an OpenAI API key has not been added yet.
    let productsToInsert = productsData;

    if (process.env.OPENAI_API_KEY) {
        try {
            productsToInsert = await Promise.all(productsData.map(async (product) => {
                const embedding = await generateVector(`${product.title} ${product.description} ${product.category}`);
                return { ...product, embedding };
            }));
        } catch (error) {
            console.warn("OpenAI embeddings unavailable; seeding products without vectors.", error.message);
        }
    }

    /*
      Previous version kept for learning:)(When have API key Just uncomment it then)

      const productsWithVectors = await Promise.all(productsData.map(async (product) => {
          const embedding = await generateVector(`${product.title} ${product.description} ${product.category}`);
          return { ...product, embedding };
      }));

      await Product.insertMany(productsWithVectors);
    */

    await Product.insertMany(productsToInsert);

    return Response.json({ message: "Database seeded successfully" })
}
