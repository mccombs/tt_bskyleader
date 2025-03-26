<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { useColorMode } from '@vueuse/core'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SquareUserRound } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { Badge } from '@/components/ui/badge'

interface Profile {
    did: string
    handle: string
    description: string | null
    avatar: string | null
    followersCount: number | null
}

const profiles = ref<Profile[]>([])

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

useColorMode({
    initialValue: 'dark',
})

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/serve')
        if (!response.ok) {
            throw new Error('Failed to fetch profiles')
        }
        const data = await response.json()
        profiles.value = shuffleArray(data)
    } catch (error) {
        console.error('Error fetching profiles:', error)
    }
})
</script>

<template>
    <div class="my-10 flex flex-col items-center justify-center">
        <div class="flex flex-reverse items-center justify-between relative mb-4">
            <h2 class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Featured BlueSky Accounts
            </h2>
            <a href="https://taechotech.substack.com/" target="_blank">
                <Badge variant="outline"
                    class="absolute -top-5 right-0 roudned-none text-2xs px-2 hover:cursor-pointer hover:bg-primary">
                    Powered by Taecho Tech
                </Badge>
            </a>
        </div>
        <p class="text-xs">25 bluesky accounts to showcase Bun, Elysia and Turso | Blog | Repo</p>

        <div class="flex flex-col gap-4 mx-auto my-4 w-full md:max-w-lg">
            <card v-for="profile in profiles" :key="profile.did" class="flex p-6 w-full">
                <div class="flex justify-between">
                    <Avatar class="mr-4">
                        <AvatarImage :src="profile.avatar || ''" />
                        <AvatarFallback>{{ profile.handle.substring(0, 2).toUpperCase() }}</AvatarFallback>
                    </Avatar>
                    <div class="space-y-2 w-full">
                        <h4 class="text-sm font-semibold">
                            @{{ profile.handle }}
                        </h4>
                        <p class="text-sm">
                            {{ profile.description || 'No description available' }}
                        </p>
                        <div class="flex items-center pt-2">
                            <SquareUserRound class="mr-2 h-4 w-4 opacity-70" />
                            <span class="text-xs text-muted-foreground">
                                {{ profile.followersCount?.toLocaleString() || 0 }} followers
                            </span>
                        </div>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>
