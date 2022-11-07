import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button, Spinner } from 'react-bootstrap';
import useExcelDocument from 'hooks/useExcelDocument';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // eslint-disable-next-line react/require-default-props
    apiData?: any;
    fileName: string;
    month?: number;
    year?: number;
    sdate?: string;
    storeId: string | undefined;
    customBilling: boolean;
}
type MyFunction = (
    apiDataIn: any,
    fileNameIn: string,
    ) => void

const ExportToExcel = ({
  apiData, fileName, storeId, month, year, sdate, customBilling, children,
}: IProps) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  // const [sheetData, setsheetData] = React.useState([]);
  const {
    sheetData, getDayBilling, loading, data: excelData, getCustomDayBilling,
    formatDataForExcel, monthsArr, data2: customExcelData,
  } = useExcelDocument();
  const monName = monthsArr(month ?? 1 - 1).initial;
  // const monNameCustom = monthsArr(new Date(sdate).getMonth() ?? 1 - 1).initial;
  // const sdateCustom = sdate?.getDate() ?? 1;
  // const syearCustom = sdate?.getFullYear() ?? 2022;
  // change file name custom billing
  const xlFileName = `groupshop-billing-charges-${monName}-${year}`;
  const xlFileNameCustom = `groupshop-billing-charges-${sdate}`;

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
  React.useEffect(() => {
    if (customExcelData) {
      // foramt data then assign in sheetdata
      const sheetRes = formatDataForExcel(customExcelData.getCustomBillingByDate);
      exportToCSV(sheetRes, xlFileNameCustom);
    }
  }, [customExcelData]);

  const BillingQueryLoader = () => {
    try {
      console.log({ month });
      // ffddee

      const data = customBilling ? getCustomDayBilling({
        variables: {
          storeId,
          sdate,
          // edate,
        },
      }) : getDayBilling({
        variables: {
          storeId,
          month: `${month}`,
          year: `${year}`,
        },
      });
    } catch (error) {
      console.log('getbillingbydate error', error);
    }

    // if (sheetData) exportToCSV(sheetData, xlFileName);
  };

  return (
    <Button
      variant=""
      onClick={(e) => {
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
ExportToExcel.defaultProps = {
  sdate: new Date(),
  // edate: new Date(),
  month: 1,
  year: 1,
};
export default ExportToExcel;
