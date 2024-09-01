import React from 'react'

function Credits() {
    return (
        <div class="bg-gray-900 justify-center mx-auto min-h-screen">
            <div>
                <h2 class="text-3xl font-bold text-gray-100 text-center mt-3 sm:text-5xl">Pricing</h2>
                <p class="max-w-3xl mx-auto mt-4 text-xl text-gray-300 text-center">Get started on our free plan and upgrade when you are ready.</p>
            </div>
            <div class="mt-10 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div class="relative p-8 border border-gray-700 rounded-2xl shadow-sm flex flex-col bg-gray-800">
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold text-gray-100">Free</h3>
                        <p class="mt-4 flex items-baseline text-gray-100">
                            <span class="text-5xl font-extrabold tracking-tight">$0</span>
                            <span class="ml-1 text-xl font-semibold text-gray-400">/month</span>
                        </p>
                        <p class="mt-6 text-gray-400">You just want to discover</p>
                        <ul role="list" class="mt-6 space-y-6">
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-gray-100">10 Credits</span></li>
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-gray-100">Generate video (2 credits)</span></li>
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-gray-100">Quizz (1 credit)</span></li>
                        </ul>
                    </div>
                    <a class="bg-emerald-600 text-white hover:bg-emerald-700 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                        href="/auth/login">Signup for free</a>
                </div>
                <div class="relative p-8 border border-gray-700 rounded-2xl shadow-sm flex flex-col bg-gray-800">
                    <div class="flex-1">
                        <h3 class="text-xl font-semibold text-gray-100">Pro</h3>
                        <p
                            class="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
                            Most popular</p>
                        <p class="mt-4 flex items-baseline text-gray-100">
                            <span class="text-5xl font-extrabold tracking-tight">$5</span>
                            <span class="ml-1 text-xl font-semibold text-gray-400">/month</span>
                        </p>
                        <p class="mt-6 text-gray-400">You want to learn and have a personal assistant</p>
                        <ul role="list" class="mt-6 space-y-6">
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-gray-100">30 credits</span></li>
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-gray-100">Powered by GPT-4 (more accurate)</span></li>
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-gray-100">Generate video (2 credits)</span></li>
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-gray-100">Quizz (1 credit)</span></li>
                            <li class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span class="ml-3 text-gray-100">Analytics on the quiz</span></li>
                        </ul>
                    </div>
                    <a class="bg-emerald-500 text-white hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                        href="/auth/login">Upgrade</a>
                </div>
            </div>
        </div>

    )
}

export default Credits