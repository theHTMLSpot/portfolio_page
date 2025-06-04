"use client";

import { useState, useRef, useEffect } from "react";
import { Title, Container } from "@/components/components";
import InputWithHoverLabel from "@/components/input_with_hover_label";
import { contactForm } from "@/types/contact_form";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import contactAnimation from "@/animations/contact.json";

export default function ContactPage() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [showAnim, setShowAnim] = useState(false);

  

  const [formData, setFormData] = useState<contactForm>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<contactForm>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value === "") {
      setFormErrors({
        ...formErrors,
        [name]: `${name} can't be blank`,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (lottieRef.current?.animationItem) {
      const newErrors: contactForm = {
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        };

        let hasErrors = false;

        for (const key in formData) {
          if (formData[key as keyof contactForm].trim() === "") {
            newErrors[key as keyof contactForm] = `${key} can't be blank`;
            hasErrors = true;
          }
        }

        if (hasErrors) {
          setFormErrors(newErrors);
          return; // Exit early if there are validation errors
        }
      setShowAnim(true);
      const anim = lottieRef.current.animationItem;

      anim.play();

      const onComplete = () => {
        
        const submit = document.getElementById("submit");
        if (submit) submit.innerText = "Thanks For The Message"
        

        

        // TODO: add api endpoint to send message with resend.

        console.log(formData);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });

        setShowAnim(false);

        anim.removeEventListener("complete", onComplete);
      };

      anim.addEventListener("complete", onComplete);
    }
  };

  useEffect(() => {
    if (lottieRef.current?.animationItem) {
      lottieRef.current.animationItem.goToAndStop(0, true);
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
              {formErrors.firstName && (
                <span className="text-red-700">{formErrors.firstName}</span>
              )}
            </div>
            <div className="h-[50%] w-full">
              <InputWithHoverLabel
                name="lastName"
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
              {formErrors.lastName && (
                <span className="text-red-700">{formErrors.lastName}</span>
              )}
            </div>
          </Container>
          <div>
            <InputWithHoverLabel
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <span className="text-red-700">{formErrors.email}</span>
            )}
          </div>
          <div>
            <InputWithHoverLabel
              name="subject"
              label="Subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
            />
            {formErrors.subject && (
              <span className="text-red-700">{formErrors.subject}</span>
            )}
          </div>
          <div>
            <InputWithHoverLabel
              name="message"
              label="Message"
              type="text"
              value={formData.message}
              onChange={handleChange}
            />
            {formErrors.message && (
              <span className="text-red-700">{formErrors.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="relative text-foreground relative my-5 h-auto w-full rounded-md bg-teal-600 py-5 hover:bg-teal-500"
            onClick={handleSubmit}
            id="submit"
          >
            Submit
            <Lottie
              lottieRef={lottieRef}
              className="absolute bottom-2 right-5"
              animationData={contactAnimation}
              loop={false}
              autoplay={false}
              style={showAnim ? { height: 78, width: 79 } : { height: 0, width: 0 }}
            />
          </button>
        </form>
      </Container>
    </Container>
  );
}
