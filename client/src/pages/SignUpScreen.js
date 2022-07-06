import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoCall, IoLockClosed, IoMail, IoPerson } from 'react-icons/io5';

import { isLoggedIn, registerUser } from '../apis/users';
import FormItem from '../components/FormItem';
import FormContainer from './FormContainer';

const SignUpScreen = () => {
	const [formError, setFormError] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [cookies, setCookie] = useCookies(['user']);

	const formik = useFormik({
		initialValues: {
			username: '',
			phonenumber: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.min(4, 'Username must be more than 3 characters')
				.required('Username is required'),
			phonenumber: Yup.string()
				.min(9, "Number can't have less than 9 digits")
				.required('Number is required'),
			email: Yup.string()
				.email('Enter a valid email')
				.required('Email is required'),
			password: Yup.string()
				.min(8, 'Password must be more than 8 characters')
				.required('Password is required'),
		}),
		onSubmit: async (values) => {
			setSubmitting(true);
			setFormError('');
			try {
				const res = await registerUser({
					...values,
					password: values.password,
				});

				if (res.data) {
					setCookie('user', res.data);
				} else {
					setFormError(res.error);
					setSubmitting(false);
				}
			} catch (e) {
				setFormError('Submittion error. Try again later.');
				setSubmitting(false);
			}
		},
	});

	const handleSubmit = async () => {
		const { values } = formik;
		setSubmitting(true);
		setFormError('');
		console.log({
			...values,
			password: values.password,
		});
		try {
			const res = await registerUser({
				...values,
				password: values.password,
			});

			if (res.data) {
				setCookie('user', res.data);
			} else {
				setFormError(res.error);
				setSubmitting(false);
			}
		} catch (e) {
			setFormError('Submittion error. Try again later.');
			setSubmitting(false);
		}
	};
	if (isLoggedIn(cookies)) {
		return <Navigate to="/" />;
	}

	return (
		<FormContainer
			submitting={submitting}
			title="Create Account"
			btnText="Register"
			formError={formError}
			onSubmit={formik.handleSubmit}
			onClick={handleSubmit}>
			<FormItem
				id="username"
				Icon={IoPerson}
				inputType="text"
				label="Username"
				value={formik.values.username}
				error={formik.errors.username}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			<FormItem
				id="phonenumber"
				Icon={IoCall}
				inputType="text"
				label="Phone Number"
				placeholder="e.g. 0712345678"
				value={formik.values.phonenumber}
				error={formik.errors.phonenumber}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			<FormItem
				id="email"
				Icon={IoMail}
				inputType="email"
				label="Email Address"
				value={formik.values.email}
				error={formik.errors.email}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			<FormItem
				id="password"
				Icon={IoLockClosed}
				inputType="password"
				label="Password"
				value={formik.values.password}
				error={formik.errors.password}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
		</FormContainer>
	);
};

export default SignUpScreen;
