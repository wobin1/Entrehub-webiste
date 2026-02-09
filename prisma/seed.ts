import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
    console.log('🌱 Starting database seed...');

    // Create Authors
    console.log('Creating authors...');
    const sarahJohnson = await prisma.author.upsert({
        where: { email: 'sarah.johnson@entrehub.com' },
        update: {},
        create: {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@entrehub.com',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
            bio: 'Digital Marketing Strategist with over 10 years of experience helping brands grow their online presence.',
        },
    });

    const michaelChen = await prisma.author.upsert({
        where: { email: 'michael.chen@entrehub.com' },
        update: {},
        create: {
            name: 'Michael Chen',
            email: 'michael.chen@entrehub.com',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            bio: 'SEO Specialist and founder of a successful digital marketing agency.',
        },
    });

    const emilyWatson = await prisma.author.upsert({
        where: { email: 'emily.watson@entrehub.com' },
        update: {},
        create: {
            name: 'Emily Watson',
            email: 'emily.watson@entrehub.com',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            bio: 'Social Media Strategist helping brands build meaningful connections online.',
        },
    });

    const davidRodriguez = await prisma.author.upsert({
        where: { email: 'david.rodriguez@entrehub.com' },
        update: {},
        create: {
            name: 'David Rodriguez',
            email: 'david.rodriguez@entrehub.com',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            bio: 'Content Marketing Expert and award-winning copywriter.',
        },
    });

    const lisaAnderson = await prisma.author.upsert({
        where: { email: 'lisa.anderson@entrehub.com' },
        update: {},
        create: {
            name: 'Lisa Anderson',
            email: 'lisa.anderson@entrehub.com',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            bio: 'Email Marketing Specialist with expertise in automation and conversion optimization.',
        },
    });

    const robertFox = await prisma.author.upsert({
        where: { email: 'robert.fox@entrehub.com' },
        update: {},
        create: {
            name: 'Robert Fox',
            email: 'robert.fox@entrehub.com',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            bio: 'Marketing Analytics Consultant helping businesses make smarter decisions with data.',
        },
    });

    // Create Categories
    console.log('Creating categories...');
    const digitalMarketing = await prisma.category.upsert({
        where: { slug: 'digital-marketing' },
        update: {},
        create: {
            name: 'Digital Marketing',
            slug: 'digital-marketing',
            description: 'Latest trends and strategies in digital marketing',
        },
    });

    const seo = await prisma.category.upsert({
        where: { slug: 'seo' },
        update: {},
        create: {
            name: 'SEO',
            slug: 'seo',
            description: 'Search engine optimization tips and best practices',
        },
    });

    const socialMedia = await prisma.category.upsert({
        where: { slug: 'social-media' },
        update: {},
        create: {
            name: 'Social Media',
            slug: 'social-media',
            description: 'Social media marketing strategies and insights',
        },
    });

    const contentMarketing = await prisma.category.upsert({
        where: { slug: 'content-marketing' },
        update: {},
        create: {
            name: 'Content Marketing',
            slug: 'content-marketing',
            description: 'Content creation and marketing strategies',
        },
    });

    const emailMarketing = await prisma.category.upsert({
        where: { slug: 'email-marketing' },
        update: {},
        create: {
            name: 'Email Marketing',
            slug: 'email-marketing',
            description: 'Email marketing automation and best practices',
        },
    });

    const analytics = await prisma.category.upsert({
        where: { slug: 'analytics' },
        update: {},
        create: {
            name: 'Analytics',
            slug: 'analytics',
            description: 'Data analytics and marketing metrics',
        },
    });

    // Create Tags
    console.log('Creating tags...');
    const tags = await Promise.all([
        prisma.tag.upsert({
            where: { slug: 'ai' },
            update: {},
            create: { name: 'AI', slug: 'ai' },
        }),
        prisma.tag.upsert({
            where: { slug: 'trends' },
            update: {},
            create: { name: 'Trends', slug: 'trends' },
        }),
        prisma.tag.upsert({
            where: { slug: 'strategy' },
            update: {},
            create: { name: 'Strategy', slug: 'strategy' },
        }),
        prisma.tag.upsert({
            where: { slug: 'small-business' },
            update: {},
            create: { name: 'Small Business', slug: 'small-business' },
        }),
        prisma.tag.upsert({
            where: { slug: 'optimization' },
            update: {},
            create: { name: 'Optimization', slug: 'optimization' },
        }),
        prisma.tag.upsert({
            where: { slug: 'local-seo' },
            update: {},
            create: { name: 'Local SEO', slug: 'local-seo' },
        }),
        prisma.tag.upsert({
            where: { slug: 'marketing' },
            update: {},
            create: { name: 'Marketing', slug: 'marketing' },
        }),
        prisma.tag.upsert({
            where: { slug: 'engagement' },
            update: {},
            create: { name: 'Engagement', slug: 'engagement' },
        }),
        prisma.tag.upsert({
            where: { slug: 'audience' },
            update: {},
            create: { name: 'Audience', slug: 'audience' },
        }),
        prisma.tag.upsert({
            where: { slug: 'value' },
            update: {},
            create: { name: 'Value', slug: 'value' },
        }),
        prisma.tag.upsert({
            where: { slug: 'automation' },
            update: {},
            create: { name: 'Automation', slug: 'automation' },
        }),
        prisma.tag.upsert({
            where: { slug: 'roi' },
            update: {},
            create: { name: 'ROI', slug: 'roi' },
        }),
        prisma.tag.upsert({
            where: { slug: 'personalization' },
            update: {},
            create: { name: 'Personalization', slug: 'personalization' },
        }),
        prisma.tag.upsert({
            where: { slug: 'data' },
            update: {},
            create: { name: 'Data', slug: 'data' },
        }),
    ]);

    // Create Blog Posts
    console.log('Creating blog posts...');

    await prisma.blogPost.upsert({
        where: { slug: 'the-future-of-digital-marketing-in-2024' },
        update: {},
        create: {
            title: 'The Future of Digital Marketing in 2024',
            slug: 'the-future-of-digital-marketing-in-2024',
            excerpt: 'Explore the emerging trends and technologies that are reshaping the digital marketing landscape this year.',
            content: `
        <h2>Introduction</h2>
        <p>Digital marketing is evolving at an unprecedented pace, and 2024 promises to be a transformative year for businesses and marketers alike. As we navigate through this dynamic landscape, understanding the emerging trends and technologies becomes crucial for staying competitive.</p>
        
        <h2>The Rise of AI-Powered Marketing</h2>
        <p>Artificial Intelligence is no longer a futuristic concept—it's here, and it's revolutionizing how we approach marketing. From predictive analytics to personalized content creation, AI is enabling marketers to work smarter, not harder.</p>
        
        <p>Machine learning algorithms can now analyze vast amounts of customer data to predict behavior patterns, optimize ad spending, and deliver hyper-personalized experiences at scale. This level of automation and intelligence allows marketing teams to focus on strategy and creativity while AI handles the heavy lifting of data analysis and optimization.</p>
        
        <h2>Video Content Dominance</h2>
        <p>Video content continues to dominate the digital landscape, with short-form videos leading the charge. Platforms like TikTok, Instagram Reels, and YouTube Shorts have fundamentally changed how audiences consume content.</p>
        
        <p>The key to success in 2024 is creating authentic, engaging video content that resonates with your target audience. Gone are the days of overly polished corporate videos—today's consumers crave genuine, relatable content that tells a story.</p>
        
        <h2>Privacy-First Marketing</h2>
        <p>With increasing concerns about data privacy and the phasing out of third-party cookies, marketers must adapt to a privacy-first approach. This shift requires building direct relationships with customers and leveraging first-party data effectively.</p>
        
        <p>Transparency and trust are becoming the cornerstones of successful marketing strategies. Brands that prioritize customer privacy and communicate clearly about data usage will build stronger, more loyal customer relationships.</p>
        
        <h2>The Power of Community Building</h2>
        <p>Building engaged communities around your brand is more important than ever. Social media platforms are evolving from broadcasting channels to spaces for meaningful interaction and community engagement.</p>
        
        <p>Successful brands in 2024 will focus on creating value for their communities, fostering genuine connections, and turning customers into brand advocates. This approach not only drives loyalty but also generates authentic word-of-mouth marketing that money can't buy.</p>
        
        <h2>Conclusion</h2>
        <p>The future of digital marketing is exciting and full of opportunities. By embracing AI, prioritizing video content, respecting privacy, and building communities, businesses can position themselves for success in 2024 and beyond.</p>
        
        <p>The key is to stay agile, keep learning, and always put your audience first. The brands that thrive will be those that adapt quickly, experiment boldly, and maintain a genuine connection with their customers.</p>
      `,
            coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
            featured: true,
            published: true,
            publishedAt: new Date('2024-03-15'),
            readTime: '5 min read',
            views: 1247,
            authorId: sarahJohnson.id,
            categoryId: digitalMarketing.id,
            tags: {
                connect: [
                    { slug: 'ai' },
                    { slug: 'trends' },
                    { slug: 'strategy' },
                    { slug: 'marketing' },
                ],
            },
        },
    });

    await prisma.blogPost.upsert({
        where: { slug: 'seo-best-practices-for-small-businesses' },
        update: {},
        create: {
            title: 'SEO Best Practices for Small Businesses',
            slug: 'seo-best-practices-for-small-businesses',
            excerpt: 'Learn how to optimize your website and improve your search engine rankings with these proven strategies.',
            content: `
        <h2>Understanding SEO Fundamentals</h2>
        <p>Search Engine Optimization (SEO) is essential for small businesses looking to increase their online visibility and attract more customers. While it may seem complex, understanding the fundamentals can help you build a strong foundation for your digital presence.</p>
        
        <h2>Keyword Research and Strategy</h2>
        <p>Effective SEO starts with understanding what your potential customers are searching for. Keyword research helps you identify the terms and phrases that are most relevant to your business and have the potential to drive qualified traffic to your website.</p>
        
        <p>Focus on long-tail keywords that are specific to your business and location. These keywords may have lower search volume but often convert better because they target users with specific intent.</p>
        
        <h2>On-Page Optimization</h2>
        <p>On-page SEO involves optimizing individual pages on your website to rank higher and earn more relevant traffic. This includes optimizing title tags, meta descriptions, headers, and content for your target keywords.</p>
        
        <p>Ensure your website has a clear structure, fast loading times, and mobile responsiveness. These factors not only improve user experience but also contribute to better search engine rankings.</p>
        
        <h2>Local SEO for Small Businesses</h2>
        <p>For small businesses serving local markets, local SEO is crucial. Claim and optimize your Google Business Profile, ensure your NAP (Name, Address, Phone) information is consistent across all platforms, and encourage customer reviews.</p>
        
        <h2>Content Marketing and Link Building</h2>
        <p>Creating valuable, relevant content that addresses your audience's needs is one of the most effective SEO strategies. Quality content naturally attracts backlinks, which are crucial for building domain authority and improving search rankings.</p>
        
        <h2>Conclusion</h2>
        <p>SEO is a long-term investment that requires patience and consistency. By implementing these best practices and staying updated with the latest trends, small businesses can compete effectively in the digital landscape.</p>
      `,
            coverImage: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&h=600&fit=crop',
            featured: false,
            published: true,
            publishedAt: new Date('2024-03-12'),
            readTime: '7 min read',
            views: 892,
            authorId: michaelChen.id,
            categoryId: seo.id,
            tags: {
                connect: [
                    { slug: 'small-business' },
                    { slug: 'optimization' },
                    { slug: 'local-seo' },
                    { slug: 'strategy' },
                ],
            },
        },
    });

    await prisma.blogPost.upsert({
        where: { slug: 'social-media-marketing-strategies-that-work' },
        update: {},
        create: {
            title: 'Social Media Marketing Strategies That Work',
            slug: 'social-media-marketing-strategies-that-work',
            excerpt: 'Discover effective social media tactics to engage your audience and grow your brand presence online.',
            content: `
        <h2>The Power of Social Media</h2>
        <p>Social media has transformed the way businesses connect with their audiences. With billions of active users across various platforms, social media marketing offers unprecedented opportunities for brand growth and customer engagement.</p>
        
        <h2>Choosing the Right Platforms</h2>
        <p>Not all social media platforms are created equal, and not all will be right for your business. Understanding where your target audience spends their time is crucial for maximizing your marketing efforts.</p>
        
        <p>Focus your energy on platforms that align with your business goals and audience demographics. It's better to excel on two platforms than to spread yourself thin across five.</p>
        
        <h2>Content Strategy and Consistency</h2>
        <p>Consistency is key in social media marketing. Develop a content calendar that ensures regular posting while maintaining quality. Mix different content types—educational posts, behind-the-scenes content, user-generated content, and promotional material.</p>
        
        <h2>Engagement and Community Building</h2>
        <p>Social media is a two-way conversation. Respond to comments, engage with your followers' content, and create opportunities for interaction. Building a community around your brand creates loyal customers and brand advocates.</p>
        
        <h2>Analytics and Optimization</h2>
        <p>Track your performance metrics to understand what resonates with your audience. Use these insights to refine your strategy, optimize posting times, and create more of the content your audience loves.</p>
        
        <h2>Conclusion</h2>
        <p>Successful social media marketing requires strategy, consistency, and genuine engagement. By focusing on providing value and building relationships, you can create a powerful social media presence that drives real business results.</p>
      `,
            coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop',
            featured: false,
            published: true,
            publishedAt: new Date('2024-03-10'),
            readTime: '6 min read',
            views: 1056,
            authorId: emilyWatson.id,
            categoryId: socialMedia.id,
            tags: {
                connect: [
                    { slug: 'marketing' },
                    { slug: 'engagement' },
                    { slug: 'strategy' },
                ],
            },
        },
    });

    await prisma.blogPost.upsert({
        where: { slug: 'content-marketing-creating-value-for-your-audience' },
        update: {},
        create: {
            title: 'Content Marketing: Creating Value for Your Audience',
            slug: 'content-marketing-creating-value-for-your-audience',
            excerpt: 'Master the art of content creation that resonates with your target audience and drives meaningful engagement.',
            content: `
        <h2>Understanding Content Marketing</h2>
        <p>Content marketing is about creating and distributing valuable, relevant content to attract and retain a clearly defined audience. It's not about direct selling—it's about providing value that builds trust and positions your brand as an authority.</p>
        
        <h2>Know Your Audience</h2>
        <p>Effective content marketing starts with a deep understanding of your target audience. What are their pain points? What questions do they have? What type of content do they prefer?</p>
        
        <h2>Creating Valuable Content</h2>
        <p>Focus on creating content that educates, entertains, or solves problems for your audience. Quality always trumps quantity. One well-researched, comprehensive piece of content can be more valuable than ten superficial posts.</p>
        
        <h2>Content Distribution</h2>
        <p>Creating great content is only half the battle. You need a solid distribution strategy to ensure your content reaches your target audience. Leverage multiple channels—your website, social media, email, and partnerships.</p>
        
        <h2>Measuring Success</h2>
        <p>Track metrics that matter—engagement, conversions, and customer retention. Use these insights to continuously improve your content strategy and deliver more value to your audience.</p>
        
        <h2>Conclusion</h2>
        <p>Content marketing is a powerful tool for building brand awareness, establishing authority, and driving business growth. By consistently delivering value to your audience, you create lasting relationships that translate into business success.</p>
      `,
            coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
            featured: false,
            published: true,
            publishedAt: new Date('2024-03-08'),
            readTime: '8 min read',
            views: 743,
            authorId: davidRodriguez.id,
            categoryId: contentMarketing.id,
            tags: {
                connect: [
                    { slug: 'strategy' },
                    { slug: 'audience' },
                    { slug: 'value' },
                ],
            },
        },
    });

    await prisma.blogPost.upsert({
        where: { slug: 'email-marketing-automation-for-better-roi' },
        update: {},
        create: {
            title: 'Email Marketing Automation for Better ROI',
            slug: 'email-marketing-automation-for-better-roi',
            excerpt: 'Streamline your email campaigns and maximize returns with smart automation strategies and tools.',
            content: `
        <h2>The Power of Email Marketing</h2>
        <p>Email marketing remains one of the most effective digital marketing channels, offering an impressive ROI when done correctly. Automation takes this effectiveness to the next level by allowing you to deliver personalized messages at scale.</p>
        
        <h2>Building Your Email List</h2>
        <p>A quality email list is the foundation of successful email marketing. Focus on organic growth through valuable lead magnets, website opt-ins, and content upgrades. Never buy email lists—they damage your reputation and deliverability.</p>
        
        <h2>Segmentation and Personalization</h2>
        <p>Not all subscribers are the same. Segment your list based on behavior, preferences, and demographics to deliver more relevant content. Personalization goes beyond using someone's name—it's about delivering content that truly matters to them.</p>
        
        <h2>Automation Workflows</h2>
        <p>Set up automated workflows for welcome series, abandoned cart recovery, post-purchase follow-ups, and re-engagement campaigns. These automated sequences work 24/7 to nurture leads and drive conversions.</p>
        
        <h2>Testing and Optimization</h2>
        <p>Continuously test subject lines, content, send times, and calls-to-action. Use A/B testing to identify what resonates best with your audience and optimize your campaigns for better performance.</p>
        
        <h2>Conclusion</h2>
        <p>Email marketing automation allows you to build stronger relationships with your audience while maximizing efficiency and ROI. By implementing strategic automation, you can deliver the right message to the right person at the right time.</p>
      `,
            coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop',
            featured: false,
            published: true,
            publishedAt: new Date('2024-03-05'),
            readTime: '6 min read',
            views: 621,
            authorId: lisaAnderson.id,
            categoryId: emailMarketing.id,
            tags: {
                connect: [
                    { slug: 'automation' },
                    { slug: 'roi' },
                    { slug: 'personalization' },
                ],
            },
        },
    });

    await prisma.blogPost.upsert({
        where: { slug: 'analytics-and-data-driven-marketing-decisions' },
        update: {},
        create: {
            title: 'Analytics and Data-Driven Marketing Decisions',
            slug: 'analytics-and-data-driven-marketing-decisions',
            excerpt: 'Learn how to leverage data analytics to make informed marketing decisions and optimize your campaigns.',
            content: `
        <h2>The Importance of Data in Marketing</h2>
        <p>In today's digital landscape, data is the foundation of effective marketing. The ability to collect, analyze, and act on data separates successful campaigns from those that fall flat.</p>
        
        <h2>Key Metrics to Track</h2>
        <p>Focus on metrics that align with your business goals. While vanity metrics like follower counts might look good, metrics like conversion rate, customer acquisition cost, and lifetime value provide actionable insights.</p>
        
        <h2>Tools and Platforms</h2>
        <p>Leverage analytics tools like Google Analytics, social media insights, and marketing automation platforms to gather comprehensive data about your audience and campaign performance.</p>
        
        <h2>Making Data-Driven Decisions</h2>
        <p>Use data to inform your strategy, not just to report on past performance. Identify trends, spot opportunities, and make proactive adjustments to your campaigns based on what the data tells you.</p>
        
        <h2>Attribution and ROI</h2>
        <p>Understanding which marketing channels and campaigns drive the best results is crucial for optimizing your marketing budget. Implement proper attribution models to track the customer journey and allocate resources effectively.</p>
        
        <h2>Conclusion</h2>
        <p>Data-driven marketing isn't about having more data—it's about having the right data and knowing how to use it. By building a culture of data-driven decision-making, you can continuously improve your marketing effectiveness and drive better business results.</p>
      `,
            coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
            featured: false,
            published: true,
            publishedAt: new Date('2024-03-03'),
            readTime: '9 min read',
            views: 534,
            authorId: robertFox.id,
            categoryId: analytics.id,
            tags: {
                connect: [
                    { slug: 'data' },
                    { slug: 'marketing' },
                    { slug: 'roi' },
                ],
            },
        },
    });

    // Create Admin User
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await prisma.adminUser.upsert({
        where: { email: 'admin@entrehub.com' },
        update: {},
        create: {
            email: 'admin@entrehub.com',
            name: 'Admin User',
            passwordHash: hashedPassword,
            role: 'SUPER_ADMIN',
        },
    });

    console.log('✅ Database seeded successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log('   Email: admin@entrehub.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the admin password after first login!\n');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
