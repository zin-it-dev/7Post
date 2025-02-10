export const formatFullName = (firstName?: string, lastName?: string): string => {
	if (!firstName && !lastName) {
		return 'Anonymous User';
	}
	return `${firstName || ''} ${lastName || ''}`.trim();
};
