'use client';

import { useParams } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Dummy blog data (same as in blog page)
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Digital Marketing in 2024',
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
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      bio: 'Digital Marketing Strategist with over 10 years of experience helping brands grow their online presence.'
    },
    date: 'March 15, 2024',
    readTime: '5 min read',
    category: 'Digital Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
    tags: ['Digital Marketing', 'AI', 'Trends', 'Strategy']
  },
  {
    id: 2,
    title: 'SEO Best Practices for Small Businesses',
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
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'SEO Specialist and founder of a successful digital marketing agency.'
    },
    date: 'March 12, 2024',
    readTime: '7 min read',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&h=600&fit=crop',
    tags: ['SEO', 'Small Business', 'Optimization', 'Local SEO']
  },
  {
    id: 3,
    title: 'Social Media Marketing Strategies That Work',
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
    author: {
      name: 'Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Social Media Strategist helping brands build meaningful connections online.'
    },
    date: 'March 10, 2024',
    readTime: '6 min read',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop',
    tags: ['Social Media', 'Marketing', 'Engagement', 'Strategy']
  },
  {
    id: 4,
    title: 'Content Marketing: Creating Value for Your Audience',
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
    author: {
      name: 'David Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      bio: 'Content Marketing Expert and award-winning copywriter.'
    },
    date: 'March 8, 2024',
    readTime: '8 min read',
    category: 'Content Marketing',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    tags: ['Content Marketing', 'Strategy', 'Audience', 'Value']
  },
  {
    id: 5,
    title: 'Email Marketing Automation for Better ROI',
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
    author: {
      name: 'Lisa Anderson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      bio: 'Email Marketing Specialist with expertise in automation and conversion optimization.'
    },
    date: 'March 5, 2024',
    readTime: '6 min read',
    category: 'Email Marketing',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop',
    tags: ['Email Marketing', 'Automation', 'ROI', 'Personalization']
  },
  {
    id: 6,
    title: 'Analytics and Data-Driven Marketing Decisions',
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
    author: {
      name: 'Robert Fox',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Marketing Analytics Consultant helping businesses make smarter decisions with data.'
    },
    date: 'March 3, 2024',
    readTime: '9 min read',
    category: 'Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    tags: ['Analytics', 'Data', 'Marketing', 'ROI']
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.id !== postId && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      {/* Navigation Buttons */}
      <div className="pt-24 pb-8 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:border-slate-300 font-medium transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Home className="w-4 h-4" />
            Back to Website
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-6 lg:px-8 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 lg:px-8 pb-24">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center justify-between pb-8 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{post.author.name}</h3>
                <p className="text-sm text-slate-600">{post.author.bio}</p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 mr-2">Share:</span>
              <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-400 hover:text-white flex items-center justify-center transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-all duration-300">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div 
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-slate-700">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-slate-200 transition-colors duration-300 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-slate-50 py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
