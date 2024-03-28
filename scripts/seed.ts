import * as dotenv from "dotenv";
import {
  Client,
  Databases,
  ID,
  InputFile,
  type Models,
  Permission,
  Role,
  Storage,
  Users,
} from "node-appwrite";

dotenv.config();

const APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT ?? "";
const APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID ?? "";
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY ?? "";

if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY) {
  throw new Error("Missing Appwrite environment variables");
}

const BUCKET_ID_LOGOS = "logos";
const DATABASE_ID = "default";
const COLLECTION_ID_USERS = "users";
const COLLECTION_ID_CLIENTS = "clients";
const COLLECTION_ID_INVOICES = "invoices";
const COLLECTION_ID_SAVED_PRODUCTS = "saved-products";

const client = new Client();
client
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);

const users = new Users(client);
const storage = new Storage(client);
const database = new Databases(client);

function createAuthUser() {
  return users.create(
    "walter",
    "walter@appwrite.io",
    undefined,
    "walterxyz",
    "Walter O'Brien",
  );
}

function uploadLogo(user: Models.User<Models.Preferences>) {
  const inputFile = InputFile.fromPath("./scripts/logo.png", "logo.png");
  return storage.createFile(BUCKET_ID_LOGOS, user.$id, inputFile, [
    Permission.read(Role.user(user.$id)),
  ]);
}

function createDatabaseUser(
  user: Models.User<Models.Preferences>,
  logo: Models.File,
) {
  return database.createDocument(
    DATABASE_ID,
    COLLECTION_ID_USERS,
    user.$id,
    {
      company: "Appwrite",
      logoFileId: logo.$id,
      address1: "123 Main St",
      address2: "Suite 1",
      city: "San Francisco",
      state: "CA",
      zip: "94101",
    },
    [Permission.read(Role.user(user.$id))],
  );
}

interface ClientData {
  id: string;
  name: string;
  company: string;
  emails: string[];
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

function createClient(
  user: Models.User<Models.Preferences>,
  clientData: ClientData,
) {
  const { id, ...data } = clientData;

  return database.createDocument(
    DATABASE_ID,
    COLLECTION_ID_CLIENTS,
    id,
    {
      ...data,
      userId: user.$id,
    },
    [Permission.read(Role.user(user.$id))],
  );
}

interface SavedProduct {
  description: string;
  quantity: number;
  price: number;
}

function createSavedProduct(
  user: Models.User<Models.Preferences>,
  product: SavedProduct,
) {
  return database.createDocument(
    DATABASE_ID,
    COLLECTION_ID_SAVED_PRODUCTS,
    ID.unique(),
    {
      ...product,
      userId: user.$id,
      total: product.price * product.quantity,
    },
    [Permission.read(Role.user(user.$id))],
  );
}

interface Invoice {
  note: string;
  subject: string;
  status: string;
  tax: number;
  products: string;
  total: number;
  terms: string;
  dueDate: Date;
  clientId: string;
}

function createInvoice(
  user: Models.User<Models.Preferences>,
  invoice: Invoice,
) {
  const { dueDate, ...data } = invoice;

  return database.createDocument(
    DATABASE_ID,
    COLLECTION_ID_INVOICES,
    ID.unique(),
    {
      ...data,
      dueDate: dueDate.toISOString(),
      userId: user.$id,
      client: invoice.clientId,
    },
    [Permission.read(Role.user(user.$id))],
  );
}

async function main() {
  const walter = await createAuthUser();
  const logo = await uploadLogo(walter);
  const userDocument = await createDatabaseUser(walter, logo);

  const clients: ClientData[] = [
    {
      name: "Jenny Wilson",
      company: "PixelCraft Studio",
      address1: "123 Elm Street",
      city: "Springfield",
      zip: "62701",
      state: "Illinois",
      id: "jwilson",
      emails: ["jwilson@pixelcraftstudio.com"],
      address2: "",
    },
    {
      name: "Cameron Williamson",
      company: "FreshStart Consulting",
      address1: "456 Maple Avenue",
      city: "Lexington",
      zip: "52757",
      state: "Kentucky",
      id: "cwilliamson",
      emails: ["cwilliamson@freshstartconsulting.com"],
      address2: "",
    },
    {
      name: "Kathryn Murphy",
      company: "BrightHorizon Design Co.",
      address1: "789 Oak Drive",
      city: "Denver",
      zip: "44368",
      state: "Colorado",
      id: "kmurphy",
      emails: ["kmurphy@brighthorizondesign.com"],
      address2: "",
    },
    {
      name: "Jerome Bell",
      company: "SwiftSolutions Marketing",
      address1: "101 Pine Lane",
      city: "Portland",
      zip: "35657",
      state: "Oregon",
      id: "jbell",
      emails: ["jbell@swiftsolutionsmarketing.com"],
      address2: "",
    },
    {
      name: "Darrell Steward",
      company: "PeakPerformance Fitness",
      address1: "234 Cedar Road",
      city: "Phoenix",
      zip: "85897",
      state: "Arizona",
      id: "dsteward",
      emails: ["dsteward@peakperformancefitness.com"],
      address2: "",
    },
    {
      name: "Eleanor Pena",
      company: "GreenThumb Landscaping",
      address1: "567 Birch Street",
      city: "Seattle",
      zip: "25466",
      state: "Washington",
      id: "epena",
      emails: ["epena@greenthumblandscaping.com"],
      address2: "",
    },
    {
      name: "Jane Cooper",
      company: "BlueWave Web Development",
      address1: "890 Walnut Avenue",
      city: "Atlanta",
      zip: "36366",
      state: "Georgia",
      id: "jcooper",
      emails: ["jcooper@bluewavewebdevelopment.com"],
      address2: "",
    },
    {
      name: "Wade Warren",
      company: "GoldenKey Virtual Assistance",
      address1: "357 Spruce Court",
      city: "Dallas",
      zip: "65787",
      state: "Texas",
      id: "wwarren",
      emails: ["wwarren@goldenkeyvirtualassistance.com"],
      address2: "",
    },
    {
      name: "Leslie Alexander",
      company: "SparkWorks Creative Agency",
      address1: "706 Elm Street",
      city: "Miami",
      zip: "46643",
      state: "Florida",
      id: "lalexander",
      emails: ["lalexander@sparkworkscreativeagency.com"],
      address2: "",
    },
    {
      name: "Guy Hawkins",
      company: "SilverLine Events",
      address1: "979 Maple Avenue",
      city: "Boston",
      zip: "97686",
      state: "Massachusetts",
      id: "ghawkins",
      emails: ["ghawkins@silverlineevents.com"],
      address2: "",
    },
    {
      name: "Robert Fox",
      company: "DreamScape Media Solutions",
      address1: "795 Oak Drive",
      city: "Chicago",
      zip: "58906",
      state: "Illinois",
      id: "rfox",
      emails: ["rfox@dreamscapemediasolutions.com"],
      address2: "",
    },
    {
      name: "Jacob Jones",
      company: "SkyHigh Consulting Services",
      address1: "213 Pine Lane",
      city: "San Francisco",
      zip: "54680",
      state: "California",
      id: "jjones",
      emails: ["jjones@skyhighconsultingservices.com"],
      address2: "",
    },
    {
      name: "Esther Howard",
      company: "OceanView Photography",
      address1: "877 Cedar Road",
      city: "Houston",
      zip: "36686",
      state: "Texas",
      id: "ehoward",
      emails: ["ehoward@oceanviewphotography.com"],
      address2: "",
    },
    {
      name: "Brooklyn Simmons",
      company: "Redwood Creative Co.",
      address1: "764 Birch Street",
      city: "Philadelphia",
      zip: "35267",
      state: "Pennsylvania",
      id: "bsimmons",
      emails: ["bsimmons@redwoodcreativeco.com"],
      address2: "",
    },
    {
      name: "Theresa Webb",
      company: "StellarWorks Consulting",
      address1: "453 Spruce Court",
      city: "Nashville",
      zip: "46747",
      state: "Tennessee",
      id: "twebb",
      emails: ["twebb@stellarworksconsulting.com"],
      address2: "",
    },
  ];
  const clientPromises = clients.map((clientData) =>
    createClient(walter, clientData),
  );
  await Promise.all(clientPromises);

  const savedProducts: SavedProduct[] = [
    {
      description: "Custom website creation",
      price: 1500,
      quantity: 1,
    },
    {
      description: "Logo, brochure, and social media graphics",
      price: 500,
      quantity: 1,
    },
    {
      description: "Account management and content creation",
      price: 450,
      quantity: 1,
    },
    {
      description: "Blog posts, articles, and website copy",
      price: 200,
      quantity: 1,
    },
    {
      description: "Event and product photography",
      price: 300,
      quantity: 1,
    },
    {
      description: "Business advice and strategy sessions",
      price: 200,
      quantity: 0,
    },
  ];
  const savedProductPromises = savedProducts.map((product) =>
    createSavedProduct(walter, product),
  );
  await Promise.all(savedProductPromises);

  const invoices: Invoice[] = [
    {
      subject: "Graphics for PixelCraft Studio",
      clientId: "jwilson",
      total: 450,
      note: "",
      status: "pending",
      tax: 0.125,
      products: JSON.stringify([
        {
          description: "Logo, brochure, and social media graphics",
          price: 400,
          quantity: 1,
        },
      ]),
      terms: "",
      dueDate: new Date("2024-04-26"),
    },
    {
      subject: "Website Development",
      clientId: "ghawkins",
      status: "paid",
      total: 1500,
      note: "",
      tax: 0,
      products: JSON.stringify([
        {
          description: "Custom website creation",
          price: 1500,
          quantity: 1,
        },
      ]),
      terms: "",
      dueDate: new Date("2024-03-26"),
    },
    {
      subject: "Website Development",
      clientId: "ghawkins",
      status: "paid",
      total: 1500,
      note: "",
      tax: 0,
      products: JSON.stringify([
        {
          description: "Custom website creation",
          price: 1500,
          quantity: 1,
        },
      ]),
      terms: "",
      dueDate: new Date("2024-03-26"),
    },
    {
      subject: "Website Development",
      clientId: "ghawkins",
      status: "paid",
      total: 1500,
      note: "",
      tax: 0,
      products: JSON.stringify([
        {
          description: "Custom website creation",
          price: 1500,
          quantity: 1,
        },
      ]),
      terms: "",
      dueDate: new Date("2024-03-26"),
    },
    {
      subject: "Website Development",
      clientId: "ghawkins",
      status: "pending",
      total: 1500,
      note: "",
      tax: 0,
      products: JSON.stringify([
        {
          description: "Custom website creation",
          price: 1500,
          quantity: 1,
        },
      ]),
      terms: "",
      dueDate: new Date("2024-03-26"),
    },
    {
      subject: "Website Development",
      clientId: "ghawkins",
      status: "pending",
      total: 1500,
      note: "",
      tax: 0,
      products: JSON.stringify([
        {
          description: "Custom website creation",
          price: 1500,
          quantity: 1,
        },
      ]),
      terms: "",
      dueDate: new Date("2024-03-26"),
    },
    {
      subject: "Website Development",
      clientId: "ghawkins",
      status: "pending",
      total: 1500,
      note: "",
      tax: 0,
      products: JSON.stringify([
        {
          description: "Custom website creation",
          price: 1500,
          quantity: 1,
        },
      ]),
      terms: "",
      dueDate: new Date("2024-03-26"),
    },
    {
      subject: "Website Development",
      clientId: "ghawkins",
      status: "draft",
      total: 1500,
      note: "",
      tax: 0,
      products: JSON.stringify([
        {
          description: "Custom website creation",
          price: 1500,
          quantity: 1,
        },
      ]),
      terms: "",
      dueDate: new Date("2024-03-26"),
    },
    {
      subject: "Website Development",
      clientId: "ghawkins",
      status: "draft",
      total: 1500,
      note: "",
      tax: 0,
      products: JSON.stringify([
        {
          description: "Custom website creation",
          price: 1500,
          quantity: 1,
        },
      ]),
      terms: "",
      dueDate: new Date("2024-03-26"),
    },
    {
      subject: "Website Development",
      clientId: "ghawkins",
      status: "draft",
      total: 1500,
      note: "",
      tax: 0,
      products: JSON.stringify([
        {
          description: "Custom website creation",
          price: 1500,
          quantity: 1,
        },
      ]),
      terms: "",
      dueDate: new Date("2024-03-26"),
    },
  ];
  const invoicePromises = invoices.map((invoice) =>
    createInvoice(walter, invoice),
  );
  await Promise.all(invoicePromises);
}

main()
  .then(() => console.log("Done!"))
  .catch(console.error);
