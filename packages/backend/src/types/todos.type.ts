export type TodoType = {
	title: string;
	description?: string | null;
	isCompleted: boolean;
	isPrivate?: boolean;
	authorId: number;
};
