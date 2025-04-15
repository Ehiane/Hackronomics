import Papa from "papaparse";

export const parseCSV = (file, callback) => {
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            const transformed = results.data.map((tx) => {
                // Normalize Location whether it's split or nested
                const city = tx["Location.city"] || tx.city || "";
                const state = tx["Location.state"] || tx.state || "";
                const zipcode = tx["Location.zipcode"] || tx.zipcode || "";

                return {
                    ...tx,
                    Location: {
                        city,
                        state,
                        zipcode,
                    },
                };
            });
            callback(transformed);
        },
    });
};
