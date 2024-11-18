'use client'

import React from 'react'
import { Button, Card } from 'flowbite-react'
import { HiOutlineChartPie, HiOutlineUsers, HiOutlineClipboardList, HiOutlineBeaker, HiOutlineLightBulb, HiArrowRight, HiCheck } from 'react-icons/hi'
import dashboard from '../Images/dashboard.png'

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <header className="bg-green-50 py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-green-600">EHR System</div>
            <div className="hidden md:flex space-x-4">
              {/* <a href="#features" className="text-gray-600 hover:text-green-600">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-green-600">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-green-600">Pricing</a> */}
            </div>
             <div className="flex space-x-4">
              <a href="/login"><Button color="light">Log In</Button></a>
              <a href="/signup"><Button color="success">Sign Up</Button></a>
            </div>
          </nav>
        </div>
        
      </header>

      <main>
        <section className="bg-green-50 py-25">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-15 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 mt-10">
                  Revolutionize Your Healthcare Practice
                </h1>
                <p className="text-xl text-gray-600 mb-10">
                  Streamline patient care, enhance collaboration, and improve outcomes with our state-of-the-art Electronic Health Record system.
                </p>
                 <a href="/signup"> <Button size="xl" className="mb-8" color="success">
                  Get Started
                  <HiArrowRight className="ml-2 h-5 w-5" />
                </Button> 
                </a>
              </div>
              <div className="md:w-1/2">
                <img src={dashboard} alt="EHR System Dashboard" className="rounded-lg shadow-xl"  width={650}
                height={650} />
                
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 mt-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={HiOutlineChartPie}
                title="Comprehensive Dashboard"
                description="Get a bird's-eye view of your practice with our intuitive dashboard."
              />
              <FeatureCard
                icon={HiOutlineUsers}
                title="Patient Management"
                description="Efficiently manage patient records, appointments, and communications."
              />
              <FeatureCard
                icon={HiOutlineClipboardList}
                title="Medical History Tracking"
                description="Keep detailed, chronological records of patient medical histories."
              />
              <FeatureCard
                icon={HiOutlineBeaker}
                title="Lab Results Integration"
                description="Seamlessly integrate and analyze laboratory results within patient records."
              />
              <FeatureCard
                icon={HiOutlineLightBulb}
                title="Intelligent Insights"
                description="Leverage AI-powered insights for better decision-making and patient care."
              />
              <FeatureCard
                icon={HiOutlineClipboardList}
                title="Customizable Templates"
                description="Create and use custom templates for various medical scenarios and specialties."
              />
            </div>
          </div>
        </section>

      
      </main>

      <footer className="bg-gray-100 py-8 mt-10">
        <div className="container mx-auto px-4">
          {/* <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">EHR System</h3>
              <p className="text-gray-600">Revolutionizing healthcare management for a better future.</p>
            </div>
            <div className="w-full md:w-1/4 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-green-600">Features</a></li>
                <li><a href="#testimonials" className="text-gray-600 hover:text-green-600">Testimonials</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-green-600">Pricing</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-green-600">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-600">Terms of Service</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-600">Email: support@ehrsystem.com</p>
              <p className="text-gray-600">Phone: (123) 456-7890</p>
            </div>
          </div> */}
          <div className="border-gray-200 text-center">
            <p className="text-gray-600">&copy; 2023 EHR System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-green-100 p-3">
          <Icon className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Card>
  )
}

function TestimonialCard({ quote, author, role }) {
  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <p className="text-gray-600 italic mb-4">"{quote}"</p>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-600">{role}</p>
      </div>
    </Card>
  )
}
