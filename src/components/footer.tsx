'use client';

import Image from 'next/image';

export default function Footer() {
  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Service', href: '#service' },
    { name: 'Our Work', href: '#work' },
    { name: 'Project', href: '#project' },
  ];

  const services = [
    { name: 'Web & App Development', href: '#' },
    { name: 'Social Media Marketing', href: '#' },
    { name: 'Email Marketing', href: '#' },
    { name: 'SEO', href: '#' },
    { name: 'Creative & Content', href: '#' }
  ];

  const socialMedia = [
    { name: 'Instagram', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Facebook', href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-xl overflow-hidden mr-4 shadow-lg border-2 border-blue-300/30">
                <Image 
                  src="/images/logo.jpeg" 
                  alt="ENTREHUB Logo" 
                  width={40} 
                  height={40} 
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xl font-bold">ENTREHUB</span>
            </div>
            
            <p className="text-blue-100 leading-relaxed mb-6">
              Specializes in innovative digital marketing strategies, blending 
              creativity and data-driven insights to elevate your brand&apos;s online 
              presence and drive measurable growth.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-6">MENU</h3>
            <ul className="space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    className="text-blue-100 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">SERVICES</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="text-blue-100 hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6">SOCIAL MEDIA</h3>
            <ul className="space-y-3">
              {socialMedia.map((social, index) => (
                <li key={index}>
                  <a 
                    href={social.href}
                    className="text-blue-100 hover:text-white transition-colors duration-200"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-700/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm mb-4 md:mb-0">
            © 2025 ENTREHUB. All Rights Reserved.
          </p>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-blue-200 hover:text-white text-sm transition-colors duration-200"
            >
              Terms & Conditions
            </a>
            <a 
              href="#" 
              className="text-blue-200 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
