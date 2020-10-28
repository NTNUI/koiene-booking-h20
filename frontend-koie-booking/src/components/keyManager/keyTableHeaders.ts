import TableHeader from '@/types/admin/TableHeader';

const reportTableHeaders: Array<TableHeader> = [
  {
    text: 'E-post',
    align: 'center',
    justify: 'center',
    sortable: false,
    value: 'email',
  },
  {
    text: 'Koie',
    align: 'center',
    justify: 'center',
    sortable: true,
    value: 'name',
  },
  {
    text: 'Startdato',
    align: 'center',
    justify: 'center',
    sortable: true,
    value: 'startDate',
  },
  {
    text: 'Sluttdato',
    align: 'center',
    justify: 'center',
    sortable: true,
    value: 'endDate',
  },
  {
    text: 'Nøkkelstatus',
    align: 'center',
    justify: 'center',
    sortable: false,
    value: 'keyStatus',
  },
];

export default reportTableHeaders;
