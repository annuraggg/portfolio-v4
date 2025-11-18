"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronDown,
  Code,
  Cloud,
  Smartphone,
  Monitor,
  Shield,
  Clock,
} from "lucide-react";

const FAQ = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "What full-stack development services do you offer?",
      answer:
        "I specialize in end-to-end web development using modern technologies like React, Node.js, Python, and cloud platforms. My services include frontend development (React, Next.js, TypeScript), backend development (Node.js, Express, FastAPI, Django), database design (PostgreSQL, MongoDB, Redis), cloud deployment (AWS, Google Cloud, Azure), DevOps automation, API development, and mobile-responsive design. I handle everything from concept to deployment and ongoing maintenance.",
      icon: <Code className="w-5 h-5" />,
    },
    {
      question: "What are your pricing and project rates?",
      answer:
        "My rates vary based on project complexity and timeline. For web applications, projects typically range from $3,000-$15,000+ for small to medium applications, $15,000-$40,000+ for complex full-stack applications. Simple landing pages start at $800-$2,500, while e-commerce solutions range from $5,000-$20,000+. I offer both project-based pricing and hourly rates ($50-$100/hour depending on the work). Contact me for a detailed quote based on your specific requirements.",
      icon: <Monitor className="w-5 h-5" />,
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "Timeline depends on project scope and complexity. A simple landing page takes 1-2 weeks, a basic web application takes 3-6 weeks, complex full-stack applications take 2-4 months, and enterprise-level solutions can take 4-6 months. For MVPs, I can typically deliver a working product in 3-8 weeks. I provide detailed project timelines during our initial consultation and keep you updated throughout the development process.",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      question: "What is your experience with cloud technologies?",
      answer:
        "I have 5+ years of experience with major cloud platforms including AWS, Google Cloud Platform, and Microsoft Azure. I'm proficient in containerization with Docker, orchestration with Kubernetes, CI/CD pipelines, serverless architecture, database management (both SQL and NoSQL), monitoring and logging, security best practices, and cost optimization. I can help migrate existing applications to the cloud or build cloud-native solutions from scratch.",
      icon: <Cloud className="w-5 h-5" />,
    },
    {
      question: "Do you work on mobile applications?",
      answer:
        "Yes, I develop mobile applications using React Native for cross-platform solutions and Progressive Web Apps (PWAs) for web-based mobile experiences. I also create responsive web applications that work seamlessly across all devices. For native development, I collaborate with specialized mobile developers when needed. My focus is on creating mobile-first designs that provide excellent user experiences across all screen sizes.",
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      question: "Can you sign an NDA and ensure project confidentiality?",
      answer:
        "Absolutely! Client confidentiality is a top priority in my practice. I'm happy to sign NDAs before discussing project details and maintain strict confidentiality throughout our engagement. I use secure development practices, encrypted communication channels, and follow industry best practices for data protection. Your intellectual property and sensitive information are completely safe with me.",
      icon: <Shield className="w-5 h-5" />,
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-background"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-36 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 md:gap-20 lg:gap-32">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative mt-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold flex flex-col">
                  <span className="mr-3">Frequently</span>
                  <span className="text-primary mr-3">Asked</span>
                  <span>Questions</span>
                </h2>
              </div>
            </motion.div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="flex-1">
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card  rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:border-accent/50">
                    <motion.button
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-foreground/10 transition-colors duration-200"
                      onClick={() => toggleItem(index)}
                      whileHover={{ scale: 1.002 }}
                      whileTap={{ scale: 0.998 }}
                    >
                      <div className="flex items-center gap-2 sm:gap-4">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-foreground pr-2 sm:pr-4 group-hover:text-primary transition-colors duration-200">
                          {item.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openItems[index] ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0 text-muted-foreground group-hover:text-accent transition-colors duration-200"
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {openItems[index] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-2 sm:px-4 pb-4 sm:pb-6 pt-2 sm:pt-4 pl-4 sm:pl-6"
                          >
                            <div></div>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQ;
