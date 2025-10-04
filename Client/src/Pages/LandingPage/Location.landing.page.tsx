import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";

export function Map() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.932488887924!2d82.13642730627775!3d22.128549593086973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280befca3a0d2f%3A0x580096dff518fe20!2sGuru%20Ghasidas%20Vishwavidyalaya%2C%20Bilaspur!5e0!3m2!1sen!2sin!4v1738605187853!5m2!1sen!2sin" 
        className="w-full h-full min-h-[400px] md:min-h-[600px]"
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function FeedbackForm() {
  return (
    <div id="contact" className="w-full h-full">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-2">Feedback</h2>
        <p className="text-neutral-600 text-base md:text-lg">We value your suggestions</p>
      </div>
      
      <form className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700">Name</label>
          <Input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            className="border-neutral-300 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 rounded-lg px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-all duration-200"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700">Email</label>
          <Input 
            type="email" 
            name="email" 
            placeholder="your.email@example.com" 
            className="border-neutral-300 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 rounded-lg px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-all duration-200"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700">Message</label>
          <Textarea 
            name="message" 
            placeholder="Enter your message here..." 
            className="border-neutral-300 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 rounded-lg px-4 py-3 text-neutral-900 placeholder-neutral-500 resize-none transition-all duration-200 h-40"
          />
        </div>
    
        <Button 
          type="submit" 
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3 px-6 rounded-lg font-medium text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default function Location() {
  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen bg-white px-4 md:px-16 py-16">
      <div className="w-full max-w-7xl">
        <div className="w-full mb-8 md:mb-8 text-center">
          <p className="font-light text-4xl md:text-5xl text-neutral-900 mb-4">Reach Us</p>
          <p className="text-neutral-600 text-lg md:text-xl max-w-2xl mx-auto">
            Visit our campus or get in touch with us directly
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-stretch w-full h-fit gap-8 md:gap-12">
          <div className="w-full md:w-1/2 h-full">
            <Map/>
          </div>
          
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-start bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-neutral-100">
            <FeedbackForm/>
          </div>
        </div>
        
        <div className="w-full mt-12 md:mt-16 text-center">
          <p className="text-neutral-500 text-sm md:text-base">
            Guru Ghasidas Vishwavidyalaya, Bilaspur • Open 24/7
          </p>
        </div>
      </div>
    </div>
  );
}