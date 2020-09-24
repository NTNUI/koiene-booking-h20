import { AdminView } from '@/types/admin/AdminView';
import AllCabinsView from '@/components/admin/allCabinsView/AllCabinsView.vue';
import Reports from '@/components/admin/reports/Reports.vue';

const adminViews: Array<AdminView> = [
  {
    id: 'allCabins1',
    title: 'Alle koier1',
    icon: 'calendar-month',
    component: AllCabinsView
  },
  {
    id: 'reports',
    title: 'Rapporter',
    icon: 'file-document-outline',
    component: Reports
  }
];

export default adminViews;
