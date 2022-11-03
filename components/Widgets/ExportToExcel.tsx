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
    sDate?: Date;
    eDate?: Date;
    storeId: string | undefined;
    customBilling: boolean;
}
type MyFunction = (
    apiDataIn: any,
    fileNameIn: string,
    ) => void

const ExportToExcel = ({
  apiData, fileName, storeId, month, year, sDate, eDate, customBilling, children,
}: IProps) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  // const [sheetData, setsheetData] = React.useState([]);
  const {
    sheetData, getDayBilling, loading, data: excelData,
    formatDataForExcel, monthsArr,
  } = useExcelDocument();
  const monName = monthsArr(month ?? 1 - 1).initial;
  const monNameCustom = monthsArr(sDate?.getMonth() ?? 1 - 1).initial;
  const sdateCustom = sDate?.getDate() ?? 1;
  const syearCustom = sDate?.getFullYear() ?? 2022;
  // change file name custom billing
  const xlFileName = `groupshop-billing-charges-${monName}-${year}`;
  const xlFileNameCustom = `groupshop-billing-charges-${sdateCustom}-${monNameCustom}-${syearCustom}`;

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
    try {
      console.log({ month });
      // ffddee

      const data = getDayBilling({
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
  sDate: new Date(),
  eDate: new Date(),
  month: 1,
  year: 1,
};
export default ExportToExcel;
