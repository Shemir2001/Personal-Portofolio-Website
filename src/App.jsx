import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Database, 
  Globe, 
  Smartphone,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import shameer from './assets/shameer.jpeg'
import portofolio from './assets/portofolio.png'
import img from './assets/job.png'
import ecomm from './assets/e-commece.png'
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = [
        { id: 'home', ref: heroRef },
        { id: 'about', ref: aboutRef },
        { id: 'skills', ref: skillsRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef }
      ];
      
      const currentSection = sections.find(section => {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'Frontend', icon: <Code className="w-8 h-8" />, techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { name: 'Backend', icon: <Database className="w-8 h-8" />, techs: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
   
    { name: 'Cloud', icon: <Globe className="w-8 h-8" />, techs: ['AWS', 'Docker', 'CI/CD', 'Firebase'] }
  ];

  const projects = [
    {
      title: 'Fashion Hub E-Commerce Store',
      description: 'Full-stack e-commerce solution with real-time inventory and payment processing',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      image:ecomm,
      github: '#',
      live: '#'
    },
    {
      title: 'AI Powered Fully Feautred Job/Scholarhsips Opportunity Platform',
      description: 'AI powered platform that connects job seekers with top-tier universities, offering a comprehensive suite of features for enhanced job search and application tracking.',
      tech: ['NextJS', 'Node.js', 'Job Api', 'MongoDB'],
      image: img,
      github: '#',
      live: '#'
    },
    {
      title: 'Fully Featured Healthy Eats Dashboard',
      description: 'AI-powered dashboard that empowers users to track their food intake, receive personalized diet recommendations, and monitor their progress, all within a secure and user-friendly environment.',
      tech: ['ReactJS', 'Firebase', 'Node.js', 'Real Time Chat'],
      image: portofolio,
      github: '#',
      live: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
             SHEMIR AHMED BUTT
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'Home', ref: heroRef, id: 'home' },
                { name: 'About', ref: aboutRef, id: 'about' },
                { name: 'Skills', ref: skillsRef, id: 'skills' },
                { name: 'Projects', ref: projectsRef, id: 'projects' },
                { name: 'Contact', ref: contactRef, id: 'contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-slate-900/95 backdrop-blur-md`}>
          <div className="px-4 py-2 space-y-2">
            {[
              { name: 'Home', ref: heroRef },
              { name: 'About', ref: aboutRef },
              { name: 'Skills', ref: skillsRef },
              { name: 'Projects', ref: projectsRef },
              { name: 'Contact', ref: contactRef }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.ref)}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              SHEMIR AHMED BUTT
            </h1>
          </div>
          
          <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 delay-300">
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Full Stack Developer 
            </p>
          </div>
          
          <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 delay-500">
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              I craft exceptional digital experiences through clean code, innovative solutions, 
              and cutting-edge technologies. Let's build something amazing together.
            </p>
          </div>
          
          <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 delay-700 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection(projectsRef)}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="group border-2 border-purple-400 px-8 py-4 rounded-full font-semibold hover:bg-purple-400 hover:text-slate-900 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get In Touch
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0 transform translate-x-8 transition-all duration-1000 delay-300">
              <div className="relative group">
                {/* Profile Image Container */}
                <div className="w-80 h-80 mx-auto relative overflow-hidden rounded-3xl border-4 border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-300">
                  {/* Replace this div with your actual image */}
                  <img 
                    src={shameer}
                    alt="Alex Morgan - Full Stack Developer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay gradient for professional look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                
                {/* Floating decoration elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
            
            <div className="animate-on-scroll opacity-0 transform translate-x-8 transition-all duration-1000 delay-500">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Passionate Full Stack Developer</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Versatile and detail-oriented Full Stack MERN Stack Developer with hands-on experience in building modern and scalable web applications using latest frontend and backend technologies. Proficient in React, NextJs, Node.js, Express, and MongoDB, with a strong understanding of RESTful APIs,database design, and UI/UX principles. Experienced in cloud deployment (AWS, Firebase) and version control with Git/GitHub. Adept at working in Agile environments, collaborating across cross-functional teams, and utilizing Git/GitHub for version control
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Experienced in cloud deployment (AWS, Firebase) and version control with Git/GitHub. Adept at working in Agile environments, collaborating across cross-functional teams, and utilizing Git/GitHub for version control
              </p>
              
              <div className="flex flex-wrap justify-between">
                <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30">
                  <span className="text-purple-400 font-semibold">2</span> Years Experience
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-500/30">
                  <span className="text-pink-400 font-semibold">10+</span> Projects Completed
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 delay-${index * 200} group`}
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                  <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{skill.name}</h3>
                  <div className="space-y-2">
                    {skill.techs.map((tech) => (
                      <div key={tech} className="bg-slate-700/50 px-3 py-1 rounded-full text-sm text-gray-300">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
     {/* Projects Section */}
<section ref={projectsRef} className="py-20 px-4">
  <div className="max-w-6xl mx-auto">
    <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Featured Projects
      </h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div
          key={project.title}
          className={`flex flex-col animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 delay-${index * 200}`}
        >
          <div className="flex flex-col justify-between h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />

            {/* Optional: project image or banner */}
           

            {/* Content */}
            <div className="flex flex-col justify-between flex-grow p-6">
              {/* Title + Description */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech tags aligned at bottom */}
              <div className="mt-auto pt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Contact Section */}
     <section ref={contactRef} className="py-20 px-4 bg-slate-900/50">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    
    {/* Left: Title + CTA buttons */}
    <div>
      <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Let's Work Together
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-xl">
          Have a project in mind? I'd love to hear about it. Let's create something amazing together.
        </p>
      </div>

      <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-1000 delay-300 flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">
        <a
          href="mailto:shemir.butt2001@gmail.com"
          className="group bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          <Mail className="w-5 h-5" />
          shemir.butt2001@gmail.com
        </a>

        <div className="flex gap-4">
          <a href="#" className="bg-slate-800 p-4 rounded-full hover:bg-purple-500 transform hover:scale-110 transition-all duration-300">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="bg-slate-800 p-4 rounded-full hover:bg-blue-500 transform hover:scale-110 transition-all duration-300">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>

    {/* Right: Contact Info Box */}
    <div className="bg-slate-800/40 p-8 rounded-2xl border border-purple-500/20 shadow-lg text-white space-y-6">
      <div className="flex items-center gap-4">
        <Mail className="w-6 h-6 text-purple-400" />
        <span className="text-lg font-medium">shemir.butt2001@gmail.com</span>
      </div>
      <div className="flex items-center gap-4">
        <Smartphone className="w-6 h-6 text-purple-400" />
        <span className="text-lg font-medium">+92 327 9949039</span>
      </div>
    </div>

  </div>
</section>


      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Shemir Ahmed Butt. Portofolio
          </p>
        </div>
      </footer>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;