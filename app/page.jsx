"use client";
import HeroSection from "@/components/hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/data/faqs";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion"




export default  function Home() {
  
  return (
    <div>

      <div className="grid-background">

      </div>
      <HeroSection />

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Robust features built to accelerate your professional development
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}>
              <Card
                key={index}
        

        className={`
    group relative overflow-hidden
    rounded-2xl
   

    bg-linear-to-br
    from-purple-500/10
    via-pink-500/10
    to-fuchsia-500/10

    dark:from-purple-500/0
    dark:via-pink-500/0
    dark:to-fuchsia-500/0

    transition-all duration-300
    hover:-translate-y-2
   

    hover:shadow-xl
    hover:shadow-pink-500/30

        
        
        ${index === 1 ? "lg:mt-12" : ""
                  }
        ${index === 2 ? "lg:mt-24" : ""
                  }
        ${index === 3 ? "lg:mt-36" : ""
                  }
      `}
              >
                <div
  className="
    pointer-events-none
    absolute -inset-1
    rounded-2xl
    bg-linear-to-r
    from-purple-500/30
    via-pink-500/30
    to-fuchsia-500/30
    blur-xl

    opacity-0
    group-hover:opacity-100
    transition-opacity duration-300
  "
/>
<div
  className="
    pointer-events-none
    absolute inset-0
    rounded-2xl
    z-10

    ring-1
    ring-white/30
    dark:ring-white/40

    group-hover:ring-pink-500/40
    transition
  "
/>


                <CardContent className="pt-6 text-center flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    {feature.icon}

                    <h3 className="text-xl font-bold">
                      {feature.title}
                    </h3>

                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-muted/50">
  <div className="container mx-auto px-4 md:px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

      {[
        { value: "50+", text: "Industries Covered", glow: true },
        { value: "500+", text: "Interview Questions", glow: true },
        { value: "95%", text: "Success Rate", glow: true },
        { value: "24/7", text: "AI Support", glow: true },
        
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          
          <div
            className={`
              w-18 h-18 rounded-full
              flex items-center justify-center
              text-2xl font-bold
              bg-background/60 backdrop-blur-md
              transition-transform duration-300 hover:scale-105
              ${
                item.glow
                  ? "border-2 border-primary text-primary ring-2 ring-primary/40 shadow-[0_0_25px_rgba(59,130,246,0.35)]"
                  : "border-2 border-border text-foreground"
              }
            `}
          >
            {item.value}
          </div>

          <p className="text-muted-foreground text-sm max-w-xs">
            {item.text}
          </p>
        </div>
      ))}

    </div>
  </div>
</section>

<section className="w-full py-12 md:py-24 lg:py-32 bg-background">
  <div className="container mx-auto px-4 md:px-6">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl font-bold mb-4">
        How It Works
      </h2>
      <p>Four simple steps to accelerate your career growth</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {howItWorks.map((item, index) => (
        <div
          key={index}
          className="
            group relative
            flex flex-col items-center text-center space-y-4
            p-6 rounded-xl

            bg-background
            transition-all duration-300 ease-out
            hover:-translate-y-2 hover:shadow-xl

            hover:bg-gradient-to-br
            hover:from-purple-500/10
            hover:via-pink-500/10
            hover:to-fuchsia-500/10
          "
        >
          {/* Icon wrapper */}
          <div
            className="
              relative
              w-16 h-16 rounded-full
              flex items-center justify-center

              bg-primary/10
              transition-all duration-300

              group-hover:bg-transparent
            "
          >
            {/* Glow */}
            <div
              className="
                pointer-events-none
                absolute -inset-2
                rounded-full
                bg-gradient-to-r
                from-purple-500/40
                via-pink-500/40
                to-fuchsia-500/40
                blur-xl

                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
              "
            />

            <span className="relative z-10">
              {item.icon}
            </span>
          </div>

          {/* Title */}
          <h3
            className="
              font-semibold text-xl
              transition-all duration-300

              group-hover:text-transparent
              group-hover:bg-clip-text
              group-hover:bg-gradient-to-r
              group-hover:from-purple-400
              group-hover:to-pink-400
            "
          >
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>



 
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3  gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => {
              return (
                <Card key={index}
                  className="bg-background"
                >

                  <CardContent className="pt-6 ">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 shrink-0"><Image
                          width={40}
                          height={40}
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="rounded-full object-cover border-2 border-primary/20"
                        /></div>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            <p className="text-sm text-primary">{testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote>
                        <p className="text-muted-foreground italic relative">
                          <span className="text-3xl text-primary absolute -top-4 -left-2">
                            &quot;
                          </span>
                          {testimonial.quote}
                          <span className="text-3xl text-primary absolute -bottom-4">
                            &quot;
                          </span>
                        </p>
                      </blockquote>
                    </div>
                  </CardContent>

                </Card>
              )
            })}
          </div>
        </div>
      </section>



      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p>Find answers to common questions about our platform</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              
            
            {faqs.map((faq, index) => {
              return(
                <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
              )
            })}
            </Accordion>
          </div>
        </div>
      </section>



       
<section className="w-full">
  <div className="mx-auto py-24 bg-linear-to-r from-purple-100 to-pink-100 rounded-lg">
    <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">

      <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl">
        Ready to take your career to the next level?
      </h2>

      <p className="mx-auto max-w-[600px] text-gray-700 md:text-xl">
        Thousands of professionals are already using AI to accelerate their careers.
      </p>

      <Link href="/dashboard" passHref>
        <Button
          size="lg"
          variant="secondary"
          className="h-11 mt-5 animate-bounce"
        >
          Take the first step today
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>

    </div>
  </div>
</section>


    </div>
  );
}
