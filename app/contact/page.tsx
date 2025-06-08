"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/components";
import InputWithHoverLabel from "@/components/input_with_hover_label";
import { contactForm } from "@/types/contact_form";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import contactAnimation from "@/animations/contact.json";

import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

import FlyInTitle from "@/components/motion/fly_in_title";
import ShakeOnError from "@/components/motion/shake_on_error";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

const formatLabel = (key: string): string =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const defaultFormData: contactForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const ContactPage = () => {
  const [formData, setFormData] = useState<contactForm>(defaultFormData);
  const [formErrors, setFormErrors] = useState<contactForm>(defaultFormData);
  const [showAnim, setShowAnim] = useState(false);
  const [thankYouMode, setThankYouMode] = useState(false);

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const thankYouMessage = "Thanks for the message!".split("");

  useEffect(() => {
    lottieRef.current?.animationItem?.goToAndStop(0, true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: value ? "" : `${formatLabel(name)} can't be blank`,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: contactForm = {
      firstName: formData.firstName ? "" : "First Name can't be blank",
      lastName: formData.lastName ? "" : "Last Name can't be blank",
      email: formData.email ? "" : "Email can't be blank",
      subject: formData.subject ? "" : "Subject can't be blank",
      message: formData.message ? "" : "Message can't be blank",
    };

    setFormErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const submitForm = async (token: string) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: `${formData.firstName} <${formData.email}>`,
          subject: formData.subject,
          body: formData.message,
          captchaToken: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setFormData(defaultFormData);
      setThankYouMode(true);
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowAnim(true);
    const anim = lottieRef.current?.animationItem;
    anim?.play();

    const onAnimationComplete = async () => {
      try {
        const token = await recaptchaRef.current?.executeAsync();
        recaptchaRef.current?.reset();

        if (!token) {
          throw new Error("ReCAPTCHA token missing.");
        }

        await submitForm(token);
      } catch (error) {
        console.error("ReCAPTCHA validation failed:", error);
      } finally {
        setShowAnim(false);
        anim?.removeEventListener("complete", onAnimationComplete);
      }
    };

    anim?.addEventListener("complete", onAnimationComplete);
  };

  const renderField = (name: keyof contactForm, type: string = "text") => (
    <div className="w-full">
      <ShakeOnError trigger={!!formErrors[name]}>
        <InputWithHoverLabel
          name={name}
          label={formatLabel(name)}
          type={type}
          value={formData[name]}
          onChange={handleChange}
        />
      </ShakeOnError>
      {formErrors[name] && (
        <span className="text-red-700">{formErrors[name]}</span>
      )}
    </div>
  );

  return (
    <Container className="my-40 flex w-screen flex-col items-center justify-center">
      <Container className="flex w-full flex-col items-center justify-center">
        <form className="flex flex-col gap-6 rounded-2xl bg-gray-900 p-20">
          <FlyInTitle text="Get in touch" />

          <Container className="flex gap-2">
            {renderField("firstName")}
            {renderField("lastName")}
          </Container>

          {renderField("email", "email")}
          {renderField("subject")}
          {renderField("message")}

          <div className="w-full overflow-hidden">
            <motion.div
              initial={{ translateY: 300 }}
              animate={{ translateY: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full"
            >
              <button
                type="submit"
                className="relative my-5 w-full rounded-md bg-teal-500 py-5 text-xl transition-all duration-300 hover:-translate-y-2 hover:bg-teal-600"
                onClick={handleSubmit}
                disabled={thankYouMode}
              >
                {thankYouMode ? (
                  <p className="flex justify-center gap-0">
                    {thankYouMessage.map((char, i) =>
                      char === " " ? (
                        <span key={i} className="w-2" />
                      ) : (
                        <motion.span
                          key={i}
                          className="inline-block"
                          animate={{
                            y: [0, -6, 6, 0],
                            opacity: [1, 0.8, 1],
                          }}
                          transition={{
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.42, 0, 0.58, 1],
                          }}
                        >
                          {char}
                        </motion.span>
                      ),
                    )}
                  </p>
                ) : (
                  "Submit"
                )}

                <Lottie
                  lottieRef={lottieRef}
                  animationData={contactAnimation}
                  loop={false}
                  autoplay={false}
                  style={
                    showAnim
                      ? { height: 78, width: 79 }
                      : { height: 0, width: 0 }
                  }
                  className="absolute right-5 bottom-2"
                />
              </button>
            </motion.div>
          </div>

          <ReCAPTCHA sitekey={SITE_KEY} ref={recaptchaRef} size="invisible" />
        </form>
      </Container>
    </Container>
  );
};

export default ContactPage;
