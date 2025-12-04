export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* --- Brand --- */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ShopMaster</h2>
          <p className="text-gray-400 text-sm leading-6">
            Your trusted marketplace for the latest fashion, gadgets, and home
            essentials. Quality products, fast delivery, best prices.
          </p>
        </div>

        {/* --- Customer Service --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Help & FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Track Order
              </a>
            </li>
          </ul>
        </div>

        {/* --- Company --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Company Info
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* --- Newsletter --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get 10% off on your first order when you subscribe to our
            newsletter.
          </p>

          <div className="flex bg-gray-800 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-800 text-sm text-gray-300 focus:outline-none"
            />
            <button className="px-4 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              Join
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-facebook-f text-xl"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fa-brands fa-youtube text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopMaster. All Rights Reserved.
      </div>
    </footer>
  );
}
