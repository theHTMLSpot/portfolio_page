"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/components";
import InputWithHoverLabel from "@/components/input_with_hover_label";
import { contactForm } from "@/types/contact_form";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import contactAnimation from "@/animations/contact.json";

import { motion } from "framer-motion";

import FlyInTitle from "@/components/motion/fly_in_title";
import ShakeOnError from "@/components/motion/shake_on_error";

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1") // Insert space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first character
}

export default function ContactPage() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [showAnim, setShowAnim] = useState(false);
  const [thankYouMode, setThankYouMode] = useState(false);

  const message = [
    "T",
    "h",
    "a",
    "n",
    "k",
    "s",
    " ",
    "f",
    "o",
    "r",
    " ",
    "t",
    "h",
    "e",
    " ",
    "m",
    "e",
    "s",
    "s",
    "a",
    "g",
    "e",
    "!",
  ];

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
        [name]: `${formatLabel(name)} can't be blank`,
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
          const label = formatLabel(key);
          newErrors[key as keyof contactForm] = `${label} can't be blank`;
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
        setThankYouMode(true);

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
          <FlyInTitle text="Get in touch" />
          <Container className="flex gap-2">
            <div className="h-[50%] w-full">
              <ShakeOnError trigger={!!formErrors.firstName}>
                <InputWithHoverLabel
                  name="firstName"
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </ShakeOnError>
              {formErrors.firstName && (
                <span className="max-h-fit text-red-700">
                  {formErrors.firstName}
                </span>
              )}
            </div>

            <div className="h-[50%] w-full">
              <ShakeOnError trigger={!!formErrors.lastName}>
                <InputWithHoverLabel
                  name="lastName"
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </ShakeOnError>
              {formErrors.lastName && (
                <span className="max-h-fit text-red-700">
                  {formErrors.lastName}
                </span>
              )}
            </div>
          </Container>

          <ShakeOnError trigger={!!formErrors.email}>
            <InputWithHoverLabel
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </ShakeOnError>
          {formErrors.email && (
            <span className="max-h-fit text-red-700">{formErrors.email}</span>
          )}

          <ShakeOnError trigger={!!formErrors.subject}>
            <InputWithHoverLabel
              name="subject"
              label="Subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
            />
          </ShakeOnError>
          {formErrors.subject && (
            <span className="max-h-fit text-red-700">{formErrors.subject}</span>
          )}

          <ShakeOnError trigger={!!formErrors.message}>
            <InputWithHoverLabel
              name="message"
              label="Message"
              type="text"
              value={formData.message}
              onChange={handleChange}
            />
          </ShakeOnError>
          {formErrors.message && (
            <span className="max-h-fit text-red-700">{formErrors.message}</span>
          )}

          <div className="h-fit w-full overflow-hidden">
            <motion.div
              initial={{ translateY: 300 }}
              animate={{ translateY: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full w-full"
            >
              <button
                type="submit"
                className="text-foreground easeInOut relative my-5 h-auto w-full rounded-md bg-teal-500 py-5 text-xl transition-all duration-300 hover:-translate-y-2 hover:bg-teal-600"
                onClick={handleSubmit}
                id="submit"
              >
                {!thankYouMode && "Submit"}
                {thankYouMode && (
                  <p className="flex w-full items-center justify-center gap-0 text-center">
                    {message.map((char, i) =>
                      char === " " ? (
                        <span key={i} className="w-2" />
                      ) : (
                        <motion.span
                          key={i}
                          className="text-foreground inline-block"
                          animate={{
                            y: [0, -6, 6, 0], // smoother bounce motion
                            opacity: [1, 0.8, 1], // subtle flicker
                          }}
                          transition={{
                            duration: 0.5,
                            delay: i * 0.05, // staggered timing per character
                            ease: [0.42, 0, 0.58, 1], // easeInOutCubic
                          }}
                        >
                          {char}
                        </motion.span>
                      ),
                    )}
                  </p>
                )}
                <Lottie
                  lottieRef={lottieRef}
                  className="absolute right-5 bottom-2"
                  animationData={contactAnimation}
                  loop={false}
                  autoplay={false}
                  style={
                    showAnim
                      ? { height: 78, width: 79 }
                      : { height: 0, width: 0 }
                  }
                />
              </button>
            </motion.div>
          </div>
        </form>
      </Container>
    </Container>
  );
}
