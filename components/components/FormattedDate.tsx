const FormattedDate = ({ date }: { date: string }) => {
  const formattedDate = new Date(date).toDateString().split(' ').slice(1);
  formattedDate[1] += ',';
  return <>{formattedDate.join(' ')}</>;
};

export default FormattedDate;
