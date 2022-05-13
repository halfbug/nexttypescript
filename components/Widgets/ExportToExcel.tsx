import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button, Spinner } from 'react-bootstrap';
import useExcelDocument from 'hooks/useExcelDocument';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // eslint-disable-next-line react/require-default-props
    apiData?: any;
    fileName: string;
    month: number;
    year: number;
    storeId: string | undefined;
}
type MyFunction = (
    apiDataIn: any,
    fileNameIn: string,
    ) => void

const ExportToExcel = ({
  apiData, fileName, storeId, month, year, children,
}: IProps) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  // const [sheetData, setsheetData] = React.useState([]);
  const {
    sheetData, getDayBilling, loading, data: excelData,
    formatDataForExcel,
  } = useExcelDocument();
  const xlFileName = `groupshop-billing-charges-${month}-${year}`;

  const exportToCSV: MyFunction = (apiDataIn, fileNameIn) => {
    const ws = XLSX.utils.json_to_sheet(apiDataIn);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileNameIn + fileExtension);
  };
  // React.useEffect(() => {
  //   if (sheetData) exportToCSV(sheetData, xlFileName);
  // }, [sheetData]);
  React.useEffect(() => {
    if (excelData) {
      // foramt data then assign in sheetdata
      const sheetRes = formatDataForExcel(excelData.getBillingByDate);

      exportToCSV(sheetRes, xlFileName);
      // setsheetData(data);
    }
  }, [excelData]);
  // console.log({ excelData });

  const BillingQueryLoader = () => {
    const startDate = new Date(year, month - 1, 1); // month -1 because JS start month from 0zero
    const endDate = new Date(year, month, 0);
    const data = getDayBilling({
      variables: {
        storeId,
        startDate,
        endDate,
      },
    });

    // if (sheetData) exportToCSV(sheetData, xlFileName);
  };

  return (
    <Button onClick={(e) => {
      // exportToCSV(sheetData, fileName);
      BillingQueryLoader();
    }}
    >
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : children }
    </Button>
  );
};
export default ExportToExcel;
