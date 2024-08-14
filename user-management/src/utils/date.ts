import dayjs from "dayjs";

export const dateFormat = (date: string | undefined | null, format?: string)=> {
  if(!date) {
    return '-'
  }
  return dayjs(date).format(format || 'YYYY-MM-DD HH:mm:ss')
}

export const calculateAge = (birthDate: string | undefined | null, format?: string)=> {
  if(!birthDate) {
    return '-'
  }
  const today = dayjs();
  const birthDay = dayjs(birthDate);
  const age = today.diff(birthDay, 'year');
  return age;
}