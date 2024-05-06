"use client";

import React, { useState } from "react";
import style from "./style.module.css";

import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { BASE_URL } from "@/lib/constants";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import logo from "@/public/hupe.svg"
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectToken, setAccessToken } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
type ValueTypes = {
	email: string;
	password: string;
};

const initialValues: ValueTypes = {
	email: "",
	password: "",
};

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().required("Required"),
});

export default function Login() {

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
		// Toggle password visibility
	};

	const dispatch = useAppDispatch();
	


	const router = useRouter();

	// handle login
	const handleSubmit = async (values: ValueTypes) => {

		fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Data in jwt test: ", data);
				dispatch(setAccessToken(data.accessToken));
				router.push('/')
			})
			.catch((error) => {
				console.log(error);
			});
	};


	if (loading) {
		return (
			<div className={`${style.container}`}>
				<h1 className="text-6xl text-center">Loading...</h1>
			</div>
		);
	}

	return (
		<main className={`${style.container}`}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, actions) => {
					handleSubmit(values);
				}}
			>
				<Form className="bg-slate-50 p-4 rounded-lg w-80 space-y-4">
					<div className="w-full flex justify-center">
						<Image src={logo} width={80} height={50} alt="logo" />
					</div>
					<h1 className={`${style.title}`}>Welcome Back!</h1>
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

					{/* Password */}
					<div className="mb-5">
						<label className={`${style.label}`} htmlFor="password">
							Password
						</label>
						<div className="relative">
							<Field
								type={showPassword ? "text" : "password"}
								name="password"
								id="password"
								className={`${style.input}`}
							/>
							{!showPassword ? (
								<IoEyeOffSharp
									onClick={() => handleShowPassword()}
									className="cursor-pointer absolute right-2 top-4"
								/>
							) : (
								<IoEyeSharp
									onClick={() => handleShowPassword()}
									className="cursor-pointer absolute right-2 top-4"
								/>
							)}
						</div>
						<ErrorMessage
							name="password"
							component="section"
							className={`${style.error}`}
						/>
					</div>

					{/* button submit */}
					<button type="submit" className={`${style.button}`}>
						Login
					</button>

					<div className="flex gap-2 my-4">

						<Button isIconOnly onClick={() => signIn("google")} className="w-full bg-transparent " variant="faded" aria-label="sign in with google">
							<FcGoogle className="w-5 h-5" />
						</Button>
						<Button className="w-full bg-transparent" onClick={() => signIn("github")} isIconOnly variant="faded" aria-label="sign in with github">
							<SiGithub className="w-5 h-5" />
						</Button>
					</div>

					<a href="/auth/register" className="text-slate-500 flex justify-center underline">Don't have an account?</a>
				</Form>
			</Formik>
		</main>
	);
}
