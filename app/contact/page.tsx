"use client";

import { useState, useRef, useEffect } from "react";
import { Title, Container } from "@/components/components";
import InputWithHoverLabel from "@/components/input_with_hover_label";
import { contactForm } from "@/types/contact_form";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import contactAnimation from "@/animations/contact.json"

export default function ContactPage() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const [formData, setFormData] = useState<contactForm>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (lottieRef.current) {
      lottieRef.current.play
    }
    console.log(formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  useEffect(() => {
      if (lottieRef.current) {
        lottieRef.current.goToAndStop(0, true);
      }
    }, []);
  

  return (
    <Container className="my-40 flex w-screen flex-col items-center justify-center">
      <Container className="flex w-full flex-col items-center justify-center">
        <form className="flex flex-col gap-6 rounded-2xl bg-gray-900 p-20">
          <Title level={1} className="w-fit text-4xl font-bold">
            Get in touch
          </Title>
          <Container className="flex gap-2">
            <div className="h-[50%] w-full">
              <InputWithHoverLabel
                name="firstName"
                label="First Name"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="h-[50%] w-full">
              <InputWithHoverLabel
                name="lastName"
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </Container>
          <InputWithHoverLabel
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputWithHoverLabel
            name="subject"
            label="Subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
          />
          <InputWithHoverLabel
            name="message"
            label="Message"
            type="text"
            value={formData.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="relative text-foreground relative my-5 h-auto w-full rounded-md bg-teal-600 px-4 py-2 hover:bg-teal-500"
            onClick={handleSubmit}
          >
            
            Submit
            <Lottie
                lottieRef={lottieRef}
                className="absolute bottom-2 right-1"
                animationData={contactAnimation}
                loop={false}
                autoplay={false}
                style={{ height: 32, width: 32 }}
              />
          </button>
        </form>
      </Container>
    </Container>
  );
}
