# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Backend API Setup

The repository now includes a lightweight Node.js backend that surfaces prompt data from Notion.

### Prerequisites

- Node.js 18+
- A Notion integration with access to your database

### Environment Variables

Create a copy of `server/.env.example` named `server/.env` and populate the values:

```
NOTION_API_KEY=secret_notion_api_key
NOTION_DATABASE_ID=your_database_id
PORT=3000
```

### Install & Run

```sh
npm install
npm run dev
```

This single command starts both the Vite frontend on `http://localhost:5173` and the Notion-backed API on `http://localhost:3000`.

If you prefer to run just the backend API manually:

```sh
cd server
npm install
npm run dev
```

The server listens on `http://localhost:3000` by default with the `GET /api/prompts` endpoint.

### Deploying the Backend

- Vercel: configure a Node.js serverless function or deploy the Express server via the Vercel Node adapter; set the environment variables in the project settings.
- Render: use a web service with `npm install` build command and `npm start` start command, and configure the environment variables via the Render dashboard.

### Frontend Fetch Example

```tsx
import { useEffect, useState } from "react";

type Prompt = {
	id: string;
	title: string;
	prompt_text: string;
	category: string | null;
	tags: string[];
};

export function PromptGrid() {
	const [prompts, setPrompts] = useState<Prompt[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPrompts = async () => {
			try {
				const response = await fetch("/api/prompts");
				if (!response.ok) throw new Error("Failed to load prompts");
				const data: Prompt[] = await response.json();
				setPrompts(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unexpected error");
			} finally {
				setLoading(false);
			}
		};

		fetchPrompts();
	}, []);

	if (loading) return <p>Loading prompts…</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{prompts.map((prompt) => (
				<article key={prompt.id} className="rounded-lg border p-4 shadow">
					<header className="mb-2 flex items-center justify-between">
						<h3 className="text-lg font-semibold">{prompt.title}</h3>
						{prompt.category && (
							<span className="rounded bg-gray-100 px-2 py-1 text-xs uppercase text-gray-600">
								{prompt.category}
							</span>
						)}
					</header>
					<p className="mb-3 text-sm text-gray-700">{prompt.prompt_text}</p>
					<div className="flex flex-wrap gap-2">
						{prompt.tags.map((tag) => (
							<span key={tag} className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">
								{tag}
							</span>
						))}
					</div>
				</article>
			))}
		</div>
	);
}
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
