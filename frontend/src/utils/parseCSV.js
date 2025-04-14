import Papa from "papaparse";

export const parseCSV = (file, callback) => {
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
        callback(results.data);
        },
    });
};
