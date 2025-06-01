"use client";   

import { useState } from "react";
import { Title, Container, Paragraph } from "@/components/components";
import InputWithHoverLabel from "@/components/input_with_hover_label";
import { contactForm } from "@/types/contact_form";

export default function ContactPage() {
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

    return (
        <Container className="w-screen p-30">
            <Title level={1} className="text-4xl font-bold">
                Contact
            </Title>
            <Container className="grid h-full grid-cols-1 gap-16 sm:grid-cols-1 my-10 md:grid-cols-2 xl:grid-cols-3">
                <Container className="w-full">
                    <Paragraph className="text-xl font-bold">
                        Get in touch
                    </Paragraph>
                    <Container className="flex flex-col gap-6">
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
                            onChange={ handleChange}
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
                    </Container>
                    <button
                        type="submit"
                        className="bg-teal-600 text-foreground hover:bg-teal-500 h-auto w-full max-w-md rounded-md my-5 px-4 py-2"
                    >
                        Submit
                    </button>
                </Container>
            </Container>
        </Container>
    );
}
