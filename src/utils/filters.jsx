// Mapper to help filter based on backend format
// const paymentTypesMap = {
//   'Wallet funding': 'C',
//   'Money sent': 'D'
// };
const paymentTypesMap = {
  'Wallet funding': 'deposit',
  'Money sent': 'D'
};

const paymentStatusMap = {
  'Successful': 'paid',
  'Pending': 'pending',
  'Failed': 'cancelled'
};

export const filterTransactions = ({
    transactions,
    filters,
    search = '',
  }) => {
    const searchTerm = search.toLowerCase().trim();
  
    return transactions.filter((transaction) => {
      const matchesStatus =
        !filters?.statuses || transaction.status === paymentStatusMap[filters?.statuses];
  
      const matchesPaymentType =
        !filters?.paymentTypes ||
        transaction.type === paymentTypesMap[filters?.paymentTypes];
  
      const matchesSearch =
        !searchTerm ||
        (
          transaction?.reference?.toLowerCase()?.includes(searchTerm) ||
          transaction?._id?.toLowerCase()?.includes(searchTerm) ||
          transaction?.type?.toLowerCase()?.includes(searchTerm) ||
          transaction?.senderAccountNumber?.toLowerCase()?.includes(searchTerm) ||
          transaction?.senderBank?.toLowerCase()?.includes(searchTerm) ||
          transaction?.receiverAccountNumber?.toLowerCase()?.includes(searchTerm) ||
          transaction?.receiverBank?.toLowerCase()?.includes(searchTerm) ||
          transaction?.status?.toLowerCase()?.includes(searchTerm) ||
          String(transaction?.amount)?.includes(searchTerm));
  
      return matchesStatus && matchesPaymentType && matchesSearch;
    });
  };
