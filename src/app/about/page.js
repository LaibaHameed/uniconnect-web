"use client";

import Link from "next/link";
import {
    ArrowLeft,
    Users,
    Target,
    Sparkles,
    Heart,
    Zap,
    Shield,
    TrendingUp,
    BookOpen,
    MessageCircle,
    Calendar,
    Award
} from "lucide-react";

// FeatureCard Component
const FeatureCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};

// ValueCard Component
const ValueCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="flex gap-4">
            <div className="shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

// StatCard Component
const StatCard = ({ number, label, icon: Icon }) => {
    return (
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl mb-3">
                <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{number}</div>
            <div className="text-sm text-gray-600">{label}</div>
        </div>
    );
};

// AboutPage Component
const AboutPage = () => {
    const features = [
        {
            icon: Users,
            title: "Clubs & Societies",
            description: "Discover and join diverse student organizations. Create your own club and build a community around shared interests and passions."
        },
        {
            icon: Calendar,
            title: "Events & Activities",
            description: "Stay updated with campus events, workshops, and activities. Never miss out on opportunities to learn, network, and have fun."
        },
        {
            icon: MessageCircle,
            title: "Connect & Collaborate",
            description: "Network with fellow students, share ideas, and collaborate on projects. Build meaningful relationships that last beyond university."
        },
        {
            icon: BookOpen,
            title: "Resource Sharing",
            description: "Access shared resources, study materials, and knowledge bases. Learn from peers and contribute to the community's growth."
        }
    ];

    const values = [
        {
            icon: Heart,
            title: "Community First",
            description: "We believe in the power of connection. Every feature is designed to bring students together and foster genuine relationships."
        },
        {
            icon: Sparkles,
            title: "Innovation",
            description: "We continuously evolve to meet student needs, leveraging technology to create seamless and engaging experiences."
        },
        {
            icon: Shield,
            title: "Safety & Trust",
            description: "Your privacy and security matter. We maintain a safe, respectful environment for all members of our community."
        },
        {
            icon: TrendingUp,
            title: "Growth & Development",
            description: "We support your journey from student to professional, providing opportunities for leadership and skill development."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-linear-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
                <div className="max-w-6xl mx-auto px-4 py-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white mb-8 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-bold mb-6">
                            About Uni Connect
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Uni Connect is your gateway to a vibrant university experience. We're building
                            a platform that empowers students to discover communities, make connections,
                            and create unforgettable memories throughout their academic journey.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shrink-0">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                To transform the university experience by creating a dynamic digital ecosystem
                                where students can easily discover opportunities, build meaningful connections,
                                and actively participate in campus life.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We believe that university is more than just attending classes—it's about
                                growing as a person, finding your tribe, and creating memories that will last
                                a lifetime. Uni Connect makes this journey seamless and enjoyable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white border-y border-gray-200 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatCard number="500+" label="Active Clubs" icon={Users} />
                        <StatCard number="10K+" label="Students Connected" icon={TrendingUp} />
                        <StatCard number="1000+" label="Events Hosted" icon={Calendar} />
                        <StatCard number="50+" label="Universities" icon={Award} />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        What We Offer
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to make the most of your university experience,
                        all in one place.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-linear-to-br from-blue-50 to-purple-50 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do at Uni Connect.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <ValueCard
                                key={index}
                                icon={value.icon}
                                title={value.title}
                                description={value.description}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                    <div className="prose max-w-none text-gray-700 space-y-4">
                        <p className="text-lg leading-relaxed">
                            Uni Connect was born from a simple observation: university life is full of
                            amazing opportunities, but they're often scattered across multiple platforms,
                            bulletin boards, and word-of-mouth communication. Students were missing out
                            on clubs, events, and connections simply because they didn't know they existed.
                        </p>
                        <p className="text-lg leading-relaxed">
                            We set out to change that. By creating a centralized platform specifically
                            designed for university communities, we've made it easier than ever for
                            students to discover what's happening on campus, find their people, and
                            get involved in the activities they're passionate about.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Today, Uni Connect serves thousands of students across multiple universities,
                            helping them make the most of their college years. But we're just getting
                            started—we're constantly evolving, listening to student feedback, and building
                            new features to enhance campus life.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Zap className="w-16 h-16 mx-auto mb-6 text-white" />
                    <h2 className="text-4xl font-bold mb-4">
                        Ready to Get Connected?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Join thousands of students who are making the most of their university experience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/groups"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shadow-lg"
                        >
                            Explore Clubs
                        </Link>
                        <Link
                            href="/groups/create"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            Create a Club
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 text-gray-400 py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-sm">
                        © 2025 Uni Connect. Building better university communities, one connection at a time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;