import {
  Document,
  Packer,
  Paragraph,
  SectionType,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

const TEXT_SIZE = 24;
const FONT = "Arial";

export const exportPlanner = (unis: Types.University[]) => {
  const doc = new Document({
    sections: unis.map((uni) => {
      const rows = uni.Mappings.map((mapping) => {
        const cells = [];
        cells.push(generateCell(mapping.partnerModuleCode));
        cells.push(generateCell(mapping.partnerModuleName));
        cells.push(generateCell(mapping.nusModuleCode));
        cells.push(generateCell(mapping.nusModuleName));
        cells.push(
          new TableCell({
            children: [],
          })
        );
        return generateRow(cells);
      });
      rows.unshift(generateHeaderRow());
      return {
        properties: { type: SectionType.CONTINUOUS },
        children: [generateParagraph(uni.name), generateTable(rows)],
      };
    }),
  });
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "module-mappings.docx");
  });
};

const generateHeaderRow = () =>
  new TableRow({
    children: [
      generateCell("PU Module Code"),
      generateCell("PU Module Title"),
      generateCell("Mapped NUS Module Code"),
      generateCell("Mapped NUS Module Title"),
      generateCell("Remarks"),
    ],
  });

const generateTextRun = (content: string) =>
  new TextRun({
    text: content,
    size: TEXT_SIZE,
    font: FONT,
  });

const generateParagraph = (content: string) =>
  new Paragraph({
    children: [generateTextRun(content)],
  });

const generateCell = (content: string) =>
  new TableCell({
    children: [generateParagraph(content)],
    margins: {
      top: 50,
      left: 100,
      right: 100,
      bottom: 100,
    },
  });

const generateRow = (cells: TableCell[]) =>
  new TableRow({
    children: cells,
  });

const generateTable = (rows: TableRow[]) =>
  new Table({
    rows: rows,
  });
