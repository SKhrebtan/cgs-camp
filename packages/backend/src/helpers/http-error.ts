import { CustomError } from '@/types/errors.type';

const errorMessageList: Record<number, string> = {
	400: 'Bad Request',
	401: 'Unauthorizedauth',
	402: 'Payment Required',
	403: 'Forbidden',
	404: 'Not Found',
	408: 'Request Timeout',
	409: 'Conflict',
};

export const HttpError = (
	status: number,
	message = errorMessageList[status],
): CustomError => {
	const error = new Error(message) as CustomError;
	error.status = status;
	return error;
};
