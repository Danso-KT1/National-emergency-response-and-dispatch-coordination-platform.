import dayjs from 'dayjs';

export const formatDateTime = (value: string) => dayjs(value).format('DD MMM YYYY, HH:mm');
export const formatDistance = (value: number) => `${value.toFixed(1)} km`;
