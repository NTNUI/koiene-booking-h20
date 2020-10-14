import TableHeader from '@/types/admin/TableHeader';

export interface ReportColumn extends TableHeader {
  colorAndTextOptions?: Array<ColorAndText>;
}

export interface ColorAndText {
  color: string;
  text: string;
}
