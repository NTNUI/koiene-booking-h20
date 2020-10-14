import TableHeader from '@/types/admin/TableHeader';

export interface ReportColumn extends TableHeader {
  colorAndText?: Array<ColorAndText>;
}

export interface ColorAndText {
  color: string;
  text: string;
}
