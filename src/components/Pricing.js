"use client";

import React from "react";
import Link from "next/link";


const Pricing = () => {
    return (
        <div className="bg-gray-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2">Tailored Plan For You</h1>
                <p className="text-xl text-gray-600 text-center mb-12">Flexing pricing for all and sundry.</p>

                <div className="flex flex-col md:flex-row justify-center gap-8">
                    <PricingCard
                        type="Free"
                        description="This package offers the basic features you need to get started."
                        price="$0.00"
                        features={[
                            "5 credits",
                            "Save posts",
                            "View Community posts",
                        ]}
                        bgColor="bg-green-500"
                    />
                    <PricingCard
                        type="Premium"
                        description="This package provides full access to all premium features."
                        price="$3.99"
                        features={[
                            "All Free plan features",
                            "100 Credits",
                            "Access to Community",
                            "Post from audio",
                            "Post from image",
                            "Improve post",
                            "Posts Show in Community"
                        ]}
                        bgColor="bg-[#334F82]"
                    />
                </div>
            </div>
        </div>
    );
};

const PricingCard = ({ type, description, price, features, bgColor }) => {
    return (
        <div className={`${bgColor} rounded-lg p-8 text-white max-w-sm w-full`}>
            <h2 className="text-2xl font-bold mb-4">{type}</h2>
            <p className="mb-6">{description}</p>
            <h3 className="text-4xl font-bold mb-6">{price}<span className="text-lg font-normal">/month</span></h3>
            <Link href='/auth/signin'>
                <button className="w-full border-2 border-white text-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition duration-300">
                    Get started
                </button>
            </Link>
            <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Features</h4>
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Pricing;
