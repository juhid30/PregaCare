import { motion } from "framer-motion";
import { FiClock, FiUser } from "react-icons/fi";

const blogPosts = [
  {
    title: "Essential Nutrients During Pregnancy",
    excerpt:
      "Learn about the key vitamins and minerals you need for a healthy pregnancy.",
    author: "Dr. Sarah Johnson",
    date: "2 days ago",
    category: "Nutrition",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80",
  },
  {
    title: "Safe Exercise During Pregnancy",
    excerpt: "Stay active with these pregnancy-safe workout recommendations.",
    author: "Emma Williams",
    date: "4 days ago",
    category: "Exercise",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80",
  },
  {
    title: "Managing Pregnancy Stress",
    excerpt:
      "Tips and techniques for maintaining emotional well-being during pregnancy.",
    author: "Dr. Michael Chen",
    date: "1 week ago",
    category: "Mental Health",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80",
  },
];

const HealthBlog = () => {
  return (
    <section id="blog" className="section-padding bg-gray-50">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-secondary mb-4">Latest Health Insights</h2>
          <p className="paragraph max-w-2xl mx-auto">
            Expert advice and articles to guide you through your pregnancy
            journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary-100 text-primary-600 text-sm font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiUser className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary">View All Articles</button>
        </div>
      </div>
    </section>
  );
};

export default HealthBlog;
