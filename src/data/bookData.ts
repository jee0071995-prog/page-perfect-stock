export interface Book {
  id: string;
  bookId: string;
  agentName: string;
  publisher: string;
  bookName: string;
  issueNo: number;
  inwardDate: string;
  issueDate: string;
  rateOfBook: number;
  totalQty: number;
  agentRate: number;
  returnQty: number;
  acceptedQty: number;
  saleQty: number;
  saleAmount: number;
}

export interface InwardEntry {
  id: string;
  date: string;
  bookName: string;
  author: string;
  quantity: number;
  supplierName: string;
  billNumber: string;
  remarks: string;
}

export interface OutwardEntry {
  id: string;
  date: string;
  bookName: string;
  quantity: number;
  customerName: string;
  billNumber: string;
  remarks: string;
  rate: number;
  amount: number;
}

export interface ReturnEntry {
  id: string;
  date: string;
  bookName: string;
  quantity: number;
  returnedBy: string;
  remarks: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export const booksList: Book[] = [
  { id: '1', bookId: 'VIK01', agentName: 'Vikatan', publisher: 'Vikatan', bookName: 'Ananda Vikatan', issueNo: 1, inwardDate: '2025-10-30', issueDate: '2025-11-05', rateOfBook: 40, totalQty: 20, agentRate: 32, returnQty: 8, acceptedQty: 0, saleQty: 12, saleAmount: 432 },
  { id: '2', bookId: 'VIK01', agentName: 'Vikatan', publisher: 'Vikatan', bookName: 'Ananda Vikatan', issueNo: 2, inwardDate: '2025-11-06', issueDate: '2025-11-12', rateOfBook: 40, totalQty: 20, agentRate: 32, returnQty: 9, acceptedQty: 0, saleQty: 11, saleAmount: 396 },
  { id: '3', bookId: 'VIK02', agentName: 'Vikatan', publisher: 'Vikatan', bookName: 'Aval Vikatan', issueNo: 1, inwardDate: '2025-10-22', issueDate: '2025-11-04', rateOfBook: 40, totalQty: 20, agentRate: 32, returnQty: 15, acceptedQty: 0, saleQty: 5, saleAmount: 180 },
  { id: '4', bookId: 'VIK03', agentName: 'Vikatan', publisher: 'Vikatan', bookName: 'Junior Vikatan', issueNo: 1, inwardDate: '2025-10-29', issueDate: '2025-11-02', rateOfBook: 30, totalQty: 30, agentRate: 24, returnQty: 16, acceptedQty: 0, saleQty: 14, saleAmount: 378 },
  { id: '5', bookId: 'VIK04', agentName: 'Vikatan', publisher: 'Vikatan', bookName: 'Nanayam Vikatan', issueNo: 1, inwardDate: '2025-10-25', issueDate: '2025-11-01', rateOfBook: 35, totalQty: 4, agentRate: 28, returnQty: 2, acceptedQty: 0, saleQty: 2, saleAmount: 63 },
  { id: '6', bookId: 'VIK05', agentName: 'Vikatan', publisher: 'Vikatan', bookName: 'Pasumai Vikatan', issueNo: 1, inwardDate: '2025-10-10', issueDate: '2025-11-10', rateOfBook: 30, totalQty: 12, agentRate: 24, returnQty: 5, acceptedQty: 0, saleQty: 7, saleAmount: 189 },
  { id: '7', bookId: 'VIK06', agentName: 'Vikatan', publisher: 'Vikatan', bookName: 'Sakthi Vikatan', issueNo: 1, inwardDate: '2025-10-28', issueDate: '2025-11-11', rateOfBook: 40, totalQty: 15, agentRate: 32, returnQty: 12, acceptedQty: 0, saleQty: 3, saleAmount: 108 },
  { id: '8', bookId: 'KUM01', agentName: 'Kumadam', publisher: 'Kumadam', bookName: 'Bakathi', issueNo: 1, inwardDate: '2025-10-27', issueDate: '2025-11-06', rateOfBook: 50, totalQty: 23, agentRate: 40, returnQty: 15, acceptedQty: 0, saleQty: 8, saleAmount: 360 },
  { id: '9', bookId: 'KUM02', agentName: 'Kumadam', publisher: 'Kumadam', bookName: 'Kumadam', issueNo: 1, inwardDate: '2025-10-27', issueDate: '2025-11-05', rateOfBook: 35, totalQty: 22, agentRate: 28, returnQty: 8, acceptedQty: 0, saleQty: 14, saleAmount: 441 },
  { id: '10', bookId: 'KUM03', agentName: 'Kumadam', publisher: 'Kumadam', bookName: 'Malaimathi', issueNo: 1, inwardDate: '2025-11-01', issueDate: '2025-11-15', rateOfBook: 30, totalQty: 7, agentRate: 24, returnQty: 3, acceptedQty: 0, saleQty: 4, saleAmount: 108 },
  { id: '11', bookId: 'KSM01', agentName: 'Kungumam', publisher: 'Kungumam', bookName: 'Kungumam', issueNo: 1, inwardDate: '2025-10-25', issueDate: '2025-11-08', rateOfBook: 35, totalQty: 23, agentRate: 28, returnQty: 7, acceptedQty: 0, saleQty: 16, saleAmount: 504 },
  { id: '12', bookId: 'KSM02', agentName: 'Kungumam', publisher: 'Kungumam', bookName: 'Snegiti', issueNo: 1, inwardDate: '2025-10-21', issueDate: '2025-11-04', rateOfBook: 40, totalQty: 12, agentRate: 32, returnQty: 8, acceptedQty: 0, saleQty: 4, saleAmount: 144 },
];

export const bookNames = [
  'Ananda Vikatan',
  'Aval Vikatan', 
  'Junior Vikatan',
  'Nanayam Vikatan',
  'Pasumai Vikatan',
  'Sakthi Vikatan',
  'Bakathi',
  'Kumadam',
  'Malaimathi',
  'Manvasanai',
  'Reporter',
  'Kungumam',
  'Snegiti',
  'Thuglak',
  'Motor Vikatan',
];

export const publishers = ['Vikatan', 'Kumadam', 'Kungumam'];

export const suppliers = [
  'Vikatan Publications',
  'Kumadam Press',
  'Kungumam Media',
  'Central Book House',
  'Magazine World',
];
