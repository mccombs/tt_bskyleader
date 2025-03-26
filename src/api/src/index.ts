import { Elysia } from "elysia";
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { db } from './drizzle';
import { profileTable } from './db/schema';
import { fileURLToPath } from 'url';
import { cors } from '@elysiajs/cors';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Account {
    handle: string;
}

interface Profile {
    did: string;
    handle: string;
    description?: string | null;
    avatar?: string | null;
    followersCount?: number | null;
}

const app = new Elysia()
    .use(cors({
        allowHeaders: ['Authorization', 'Content-Type'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowOrigins: ['*'],
        allowCredentials: true,
    }))
    .get("/", () => "Hello Elysia")
    .get('/api/v1/serve', () => {
        return db.select().from(profileTable);
    })
    .get("/api/v1/fetch", async () => {

        try {
            //console.log(db)
            const filePath = join(__dirname, 'accounts.json');
            console.log('Attempting to read file from:', filePath);

            const accountsFile = readFileSync(filePath, 'utf-8');
            const accounts = JSON.parse(accountsFile) as Account[];
            const accountNames = accounts.map(account => account.handle);

            //console.log('Account names:', accountNames);

            const actorsQueryString = accountNames.map(handle => `actors=${encodeURIComponent(handle)}`).join('&');

            const url = `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfiles?${actorsQueryString}`;
            console.log('Fetching from URL:', url);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            // Extract just the handles from the profiles
            const handles = data.profiles.map((data: any) => data.handle);
            console.log('API Response:', JSON.stringify(handles, null, 2));

            if (!data || !data.profiles) {
                throw new Error('Invalid API response: missing profiles data');
            }

            const profiles = data.profiles as Profile[];
            if (!Array.isArray(profiles)) {
                throw new Error('Invalid API response: profiles is not an array');
            }

            // Insert or update all profiles in a single statement
            await db.insert(profileTable)
                .values(
                    profiles.map(profile => ({
                        did: profile.did,
                        handle: profile.handle,
                        description: profile.description || null,
                        avatar: profile.avatar || null,
                        followersCount: profile.followersCount || null
                    }))
                )
                .onConflictDoUpdate({
                    target: profileTable.did,
                    set: {
                        handle: profileTable.handle,
                        description: profileTable.description,
                        avatar: profileTable.avatar,
                        followersCount: profileTable.followersCount
                    }
                });

            console.log('Profiles inserted/updated:', profiles.length);

            return profiles;
        } catch (error: any) {
            console.error('Error reading accounts:', error);
            throw new Error(`Failed to read accounts: ${error.message}`);
        }
    })
    .listen({ port: 3000 });

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
