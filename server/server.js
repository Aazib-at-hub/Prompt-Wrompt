import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "@notionhq/client";

dotenv.config();
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET","POST","OPTIONS"]
allowedHeaders: ["Content-Type" , "Authorization"]
}));

app.use(express.json());

const { NOTION_API_KEY, NOTION_DATABASE_ID, PORT = 3000 } = process.env;

if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY is not set.");
}

if (!NOTION_DATABASE_ID) {
  throw new Error("NOTION_DATABASE_ID is not set.");
}

const notion = new Client({ auth: NOTION_API_KEY });
const logDatabaseSchema = async () => {
  try {
    const database = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID
    });

    const propertyDetails = Object.entries(database.properties).map(
      ([name, property]) => ({
        name,
        type: property.type
      })
    );

    console.log("Notion database schema:", propertyDetails);
  } catch (error) {
    console.warn("Unable to retrieve Notion database schema", error.message);
  }
};

logDatabaseSchema();

const parseRichText = (richText = []) =>
  richText.map((text) => text.plain_text).join("").trim();

const sanitizeName = (name = "") => name.toLowerCase().replace(/\s+/g, "_");

const createPropertyHelpers = (properties) => {
  const entries = Object.entries(properties || {});

  const matchType = (property, types = []) => {
    if (!types.length) return true;
    return types.includes(property.type);
  };

  const findByName = (names = [], types = []) => {
    if (!names.length) return null;
    const targetNames = names.map(sanitizeName);
    const match = entries.find(
      ([key, property]) =>
        targetNames.includes(sanitizeName(key)) && matchType(property, types)
    );
    return match ? match[1] : null;
  };

  const findByType = (types = []) => {
    if (!types.length) return null;
    const match = entries.find(([, property]) => matchType(property, types));
    return match ? match[1] : null;
  };

  return { findByName, findByType };
};

const getRichTextArray = (property) => {
  if (!property) return [];
  if (Array.isArray(property)) return property;
  if (property.type === "title") return property.title || [];
  if (property.type === "rich_text") return property.rich_text || [];
  return [];
};

const extractCategoryName = (property) => {
  if (!property) return null;

  if (property.type === "select") {
    return property.select?.name || null;
  }

  if (property.type === "status") {
    return property.status?.name || null;
  }

  if (property.type === "multi_select") {
    return property.multi_select?.[0]?.name || null;
  }

  if (property.type === "rich_text") {
    return parseRichText(property.rich_text) || null;
  }

  if (property.type === "title") {
    return parseRichText(property.title) || null;
  }

  return null;
};

const extractTags = (property) => {
  if (!property) return [];

  if (property.type === "multi_select") {
    return (property.multi_select || [])
      .map((tag) => tag.name)
      .filter(Boolean);
  }

  if (property.type === "rich_text") {
    const raw = parseRichText(property.rich_text);
    return raw
      .split(/[#,;\n]+/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (property.type === "title") {
    const raw = parseRichText(property.title);
    return raw
      .split(/[#,;\n]+/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

const mapPrompt = (page) => {
  const properties = page.properties || {};
  const { findByName, findByType } = createPropertyHelpers(properties);

  const titleProperty =
    properties.Title ||
    findByName(["title"], ["title"]) ||
    findByType(["title"]);

  const promptTextProperty =
    properties.Prompt_Text ||
    properties.Prompt ||
    properties.Description ||
    findByName([
      "prompt_text",
      "prompt",
      "description",
      "content",
      "body"
    ], ["rich_text", "title"]) ||
    findByType(["rich_text"]);

  const categoryProperty =
    properties.Category ||
    findByName(["category", "status", "type"], ["select", "status", "multi_select"]) ||
    findByType(["select", "status"]);

  const tagsProperty =
    properties.Tags ||
    findByName(["tags", "tag", "labels"], ["multi_select"]);

  const title = parseRichText(getRichTextArray(titleProperty));
  const promptText = parseRichText(getRichTextArray(promptTextProperty));
  const directCategory =
    properties.Category?.select?.name ||
    properties.Category?.status?.name ||
    properties.Category?.multi_select?.[0]?.name ||
    parseRichText(properties.Category?.rich_text) ||
    parseRichText(properties.Category?.title) ||
    null;

  const category = directCategory || extractCategoryName(categoryProperty);

  const directTags =
    (properties.Tags?.multi_select || [])
      .map((tag) => tag.name)
      .filter(Boolean);

  const richTextTags = parseRichText(properties.Tags?.rich_text);
  const fallbackRichTextTags = richTextTags
    ? richTextTags
        .split(/[#,;\n]+/)
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const tags =
    directTags.length > 0
      ? directTags
      : fallbackRichTextTags.length > 0
        ? fallbackRichTextTags
        : extractTags(tagsProperty);

  return {
    id: page.id,
    title,
    prompt_text: promptText,
    category: category || null,
    tags
  };
};

app.get("/api/prompts", async (_req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID
    });

    const prompts = response.results.map(mapPrompt);

    res.json(prompts);
  } catch (error) {
    console.error("Failed to fetch prompts from Notion", error);
    res.status(500).json({
      error: "Failed to fetch prompts from Notion"
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
