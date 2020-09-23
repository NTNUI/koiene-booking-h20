import { AdminView } from '@/types/admin/AdminView';
import AllCabinsTable from '@/components/admin/allCabinsTable/AllCabinsTable.vue';
import Reports from '@/components/admin/reports/Reports.vue';

const adminViews: Array<AdminView> = [
  {
    id: 'allCabins',
    title: 'Alle koier',
    icon: 'calendar-month',
    component: AllCabinsTable
  },
  {
    id: 'reports',
    title: 'Rapporter',
    icon: 'file-document-outline',
    component: Reports
  }
];

export default adminViews;
