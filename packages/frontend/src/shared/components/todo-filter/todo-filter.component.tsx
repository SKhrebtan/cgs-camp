import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { CustomButton } from '../custom-button/custom-button.component';
import { listStyles, wrapperStyles } from './todo-filter.styles';
import { CustomInput } from '../input/input.component';
import { useFormik } from 'formik';
import { formFilterSchema } from '~shared/schemas/form-filter.schema';
import { StatusEnum } from '~/common/constants/status';
import debounce from 'lodash.debounce';

export const TodoFilter: React.FC = (): React.ReactNode => {
	const [searchParams, setSearchParams] = useSearchParams();

	const params = useMemo(
		() => Object.fromEntries([...searchParams]),
		[searchParams],
	);
	const { search, status } = params;

	const formik = useFormik({
		initialValues: {
			search: search || '',
		},
		validationSchema: formFilterSchema,
		onSubmit: (values) => handleSubmit(values),
	});
	const handleSubmit = (values): void => {
		if (values.search) {
			setSearchParams({ ...params, search: values.search });
		} else {
			setSearchParams((prevSearchParams) => {
				const updatedParams = new URLSearchParams(prevSearchParams);
				updatedParams.delete('search');
				return updatedParams;
			});
		}
	};

	const handleFilterClick = (status: string): void => {
		if (status === StatusEnum.All) {
			setSearchParams((prevSearchParams) => {
				const updatedParams = new URLSearchParams(prevSearchParams);
				updatedParams.delete('status');
				return updatedParams;
			});
		} else {
			setSearchParams({ ...params, status });
		}
	};

	const handleSearchChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		formik.setFieldValue('search', event.target.value);
		debouncedHandleSubmit();
	};
	const debouncedHandleSubmit = useMemo(
		() => debounce(formik.handleSubmit, 1000),
		[formik.handleSubmit],
	);

	return (
		<div className={wrapperStyles}>
			<CustomInput
				name="search"
				onChange={handleSearchChange}
				onBlur={formik.handleBlur}
				value={formik.values.search}
				formikTouched={formik.touched.search}
				formikError={formik.errors.search}
				placeholder="Search..."
				filter={true}
			/>

			<div className={listStyles}>
				<CustomButton
					text="All"
					type="button"
					isViewButton={true}
					isActive={!status}
					onClick={() => handleFilterClick(StatusEnum.All)}
				/>
				<CustomButton
					text="Completed"
					type="button"
					isViewButton={true}
					isActive={status === StatusEnum.Completed}
					onClick={() => handleFilterClick(StatusEnum.Completed)}
				/>
				<CustomButton
					text="Public"
					type="button"
					isViewButton={true}
					isActive={status === StatusEnum.Public}
					onClick={() => handleFilterClick(StatusEnum.Public)}
				/>
				<CustomButton
					text="Private"
					type="button"
					isViewButton={true}
					isActive={status === StatusEnum.Private}
					onClick={() => handleFilterClick(StatusEnum.Private)}
				/>
			</div>
		</div>
	);
};
