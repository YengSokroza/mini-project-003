"use client";

import React, { useState } from "react";
import style from "./style.module.css";

import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { BASE_URL } from "@/lib/constants";
import logo from "@/public/hupe.svg"

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { SiGithub } from "react-icons/si";


import { FcGoogle } from "react-icons/fc";
import { Button } from "@nextui-org/react";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { signIn } from "next-auth/react";

type ValueTypes = {
	email: string;
	password1: string;
	password2: string;
	first_name: string;
	last_name: string;
};

const initialValues: ValueTypes = {
	email: "",
	password1: "",
	password2: "",
	first_name: "",
	last_name: "",
};

// 1- At least one upper case English letter, (?=.*[A-Z])
// 2- At least one lower case English letter, (?=.*[a-z])
// 3- At least one digit, (?=.*\d)
// 4- At least one special character, (?=.*[@#$%^&*])
const strongPasswordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*]).{8,}$");

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password1: Yup.string()
		.min(8, "Password is too short, At lease 8 characters")
		.matches(strongPasswordRegex, "Password must contain at least one upper case English letter, one lower case English letter, one digit and one special character").required("Required"),
	password2: Yup.string()
		.oneOf([Yup.ref("password1")], "Passwords must match")
		.required("Required"),
	first_name: Yup.string().required("Required"),
	last_name: Yup.string().required("Required"),
});

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
		// Toggle password visibility
	};

	//  handle submit
	const handleSubmit = (values: ValueTypes) => {
		setLoading(true);
		fetch(`${BASE_URL}/api/user/register/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			setLoading(false);
		})
		.catch((error) => {
			console.log(error);
			setLoading(false);
		}); 
        


	};

	const handleError = (error : any) => toast.error(error)

	if (loading) {
		return (
			<div className={`${style.container}`}>
				<h1 className="text-6xl text-center">Loading...</h1>
			</div>
		);
	}

	return (
		<main className={`${style.container}`}>
			<ToastContainer />
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, actions) => {
					handleSubmit(values);
				}}
			>
				<Form className="bg-slate-50 p-4 rounded-lg w-80 space-y-2">
					<div className="w-full flex justify-center">
						<Image src={logo} width={80} height={50} alt="logo" />
					</div>
					<h1 className={`${style.title}`}>Create an account</h1>

					<div>
						{/* Email */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="email">
								Email
							</label>
							<Field
								type="email"
								name="email"
								id="email"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="email"
								component="section"
								className={`${style.error}`}
							/>
						</div>

						{/* First Name */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="first_name">
								First Name
							</label>
							<Field
								type="text"
								name="first_name"
								id="first_name"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="first_name"
								component="section"
								className={`${style.error}`}
							/>
						</div>

						{/* Last Name */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="last_name">
								Last Name
							</label>
							<Field
								type="text"
								name="last_name"
								id="last_name"
								className={`${style.input}`}
							/>
							<ErrorMessage
								name="last_name"
								component="section"
								className={`${style.error}`}
							/>
						</div>

						{/* Password1 */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="password1">
								Password
							</label>
							<div className="relative">
								<Field
									type={showPassword ? "text" : "password"}
									name="password1"
									id="password1"
									className={`${style.input}`}
								/>
								{!showPassword ? (
									<IoEyeOffSharp
										onClick={() => handleShowPassword()}
										className="cursor-pointer absolute right-2 top-3"
									/>
								) : (
									<IoEyeSharp
										onClick={() => handleShowPassword()}
										className="cursor-pointer absolute right-2 top-3"
									/>
								)}
							</div>
							<ErrorMessage
								name="password1"
								component="section"
								className={`${style.error}`}
							/>
						</div>



						{/* Password2 */}
						<div className="mb-5">
							<label className={`${style.label}`} htmlFor="password2">
								Password
							</label>
							<div className="relative">
								<Field
									type={showPassword ? "text" : "password"}
									name="password2"
									id="password2"
									className={`${style.input}`}
								/>
								{!showPassword ? (
									<IoEyeOffSharp
										onClick={() => handleShowPassword()}
										className="cursor-pointer absolute right-2 top-3"
									/>
								) : (
									<IoEyeSharp
										onClick={() => handleShowPassword()}
										className="cursor-pointer absolute right-2 top-3"
									/>
								)}
							</div>
							<ErrorMessage
								name="password2"
								component="section"
								className={`${style.error}`}
							/>
						</div>

						{/* button submit */}
						<button type="submit"  className={`${style.button}`}>
							Create an account

						</button>

						<div className="flex gap-2 my-4">

							<Button isIconOnly onClick={() => signIn("google")} className="w-full bg-transparent " variant="faded" aria-label="Take a photo">
								<FcGoogle className="w-5 h-5" />
							</Button>
							<Button onClick={() => signIn("github")} className="w-full bg-transparent" isIconOnly variant="faded" aria-label="Take a photo">
								<SiGithub className="w-5 h-5" />
							</Button>
						</div>

						<a href="/auth/login" className="text-slate-500 flex justify-center underline">Already have an account?</a>
					</div>


				</Form>
			</Formik>
		</main>
	);
}
