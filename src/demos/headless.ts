import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";
import workbook from "../constants/headlessWorkbook.json";
import { headlessDocument } from "../constants/documents.json";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { automap } from "@flatfile/plugin-automap";
import { recordHook } from "@flatfile/plugin-record-hook";
// import nodemailer from "nodemailer";
// import { promisify } from "util";

export default function flatfileEventListener(listener: Client) {
  listener.filter({ job: "space:configure" }, (configure: FlatfileListener) => {
    configure.on(
      "job:ready",
      async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
        try {
          await api.jobs.ack(jobId, {
            info: "Job started.",
            progress: 10,
          });

          const { data } = await api.documents.create(spaceId, {
            title: "About this Headless Demo",
            body: headlessDocument,
          });

          const documentId = data.id;
          const spaceUpdateParams = {
            metadata: {
              sidebarConfig: {
                defaultPage: {
                  documentId,
                },
              },
            },
          };

          await api.spaces.update(spaceId, spaceUpdateParams);

          const headlessWorkbook = {
            ...{ Labels: ["Primary", "Headless-Demo"] },
            ...workbook,
          };

          // @ts-ignore
          await api.workbooks.create({
            spaceId,
            environmentId,
            ...headlessWorkbook,
          });

          await api.jobs.complete(jobId, {
            outcome: {
              message: "Job completed.",
            },
          });
        } catch (error: any) {
          console.error("Error: ", error.stack);

          await api.jobs.fail(jobId, {
            outcome: {
              message: "Job error.",
            },
          });
        }
      }
    );
  });

  listener.use(ExcelExtractor({ rawNumbers: true }));
  listener.use(
    automap({
      accuracy: "confident",
      defaultTargetSheet: "Inventory",
      matchFilename: /^.*inventory\.xlsx$/,
      onFailure: console.error,
    })
  );

  listener.use(
    recordHook("inventory", async (record, event) => {
      const author = record.get("author");
      function validateNameFormat(name: string) {
        const pattern: RegExp = /^\s*[\p{L}'-]+\s*,\s*[\p{L}'-]+\s*$/u;
        return pattern.test(name);
      }

      if (!validateNameFormat(author as string)) {
        const nameSplit = (author as string).split(" ");
        record.set("author", `${nameSplit[1]}, ${nameSplit[0]}`);
        record.addComment("author", "Author name was updated for vendor");
        return record;
      }
    })
  );

  // listener.filter({ job: "workbook:map" }, (configure) => {
  //   configure.on("job:completed", async (event: FlatfileEvent) => {
  //     const email = await event.secrets("email");
  //     const password = await event.secrets("password");

  //     const { data } = await api.workbooks.get(event.context.workbookId);
  //     // @ts-ignore
  //     const inventorySheet = data.sheets[0].id;
  //     // @ts-ignore
  //     const orderSheet = data.sheets[1].id;

  //     const currentInventory = await api.records.get(inventorySheet);
  //     const purchaseInventory = currentInventory.data.records.map((item) => {
  //       const stockValue = item.values.stock.value;
  //       const stockOrder = Math.max(3 - (stockValue as number), 0);
  //       item.values.purchase = {
  //         value: stockOrder,
  //         valid: true,
  //       };
  //       const { stock, ...fields } = item.values;
  //       return fields;
  //     });
  //     const purchaseOrder = purchaseInventory.filter(
  //       (item) => (item.purchase.value as number) > 0
  //     );

  //     await api.records.insert(orderSheet, purchaseOrder);

  //     const csv = await api.sheets.getRecordsAsCsv(orderSheet);

  //     const transporter = nodemailer.createTransport({
  //       service: "Gmail",
  //       auth: {
  //         user: email,
  //         pass: password,
  //       },
  //     });
  //     const mailOptions = {
  //       from: email,
  //       to: email,
  //       subject: "Purchase Order",
  //       text: "Attached",
  //       attachments: [
  //         {
  //           filename: "orders.csv",
  //           content: csv,
  //         },
  //       ],
  //     };
  //     const sendMail = promisify(transporter.sendMail.bind(transporter));
  //     await sendMail(mailOptions);
  //   });
  // });

  // listener.filter({ job: "workbook:importAction" }, (configure) => {
  //   configure.on("job:ready", async (event: FlatfileEvent) => {
  //     const { jobId, spaceId, environmentId, workbookId } = event.context;
  //     try {
  //       await api.jobs.ack(jobId, {
  //         info: "Job started.",
  //         progress: 10,
  //       });

  //       // How the heck are we going to upload a file from here?

  //       await api.jobs.complete(jobId, {
  //         outcome: {
  //           message: `Job "Custom Action" completed.`,
  //         },
  //       });
  //     } catch (error: any) {
  //       console.error("Error:", error.stack);

  //       await api.jobs.fail(jobId, {
  //         outcome: {
  //           message: "Job encountered an error.",
  //         },
  //       });
  //     }
  //   });
  // });
}
