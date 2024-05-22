import { CustomError } from '@/types/errors.type';

const errorMessageList: { [key: number]: string } = {
	400: 'Bad Request',
	401: 'Unauthorized',
	403: 'Forbidden',
	404: 'Not found',
	409: 'Conflict',
};

export const HttpError = (
	status: number,
	message: string = errorMessageList[status],
): CustomError => {
	const error: CustomError = new Error(message);
	error.status = status;
	return error;
};
