import { AdminView } from '@/types/admin/AdminView';
import AllCabinsView from '@/components/admin/allCabinsView/AllCabinsView.vue';
import AllReportsView from '@/components/admin/allReportsView/AllReportsView.vue';
import KeyManagerOverview from '@/components/keyManager/KeyManagerOverview.vue';

const adminViews: Array<AdminView> = [
  {
    id: 'allCabins',
    title: 'Alle koier',
    icon: 'calendar-month',
    component: AllCabinsView,
  },
  {
    id: 'reports',
    title: 'Rapporter',
    icon: 'file-document-outline',
    component: AllReportsView,
  },
  {
    id: 'keyOverview',
    title: 'Nøkler',
    icon: 'key',
    component: KeyManagerOverview,
  },
];

export default adminViews;
