import jsPDF from 'jspdf';
import { IdentitasAlumni } from '@/types/tracer';

interface GenerateReceiptPdfParams {
  submissionId: string;
  identitas: Partial<IdentitasAlumni>;
  statusKegiatan: string;
  submittedAt?: string;
}

export const generateTracerReceiptPdf = ({
  submissionId,
  identitas,
  statusKegiatan,
  submittedAt,
}: GenerateReceiptPdfParams) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Outer Border Box
  doc.setDrawColor(200, 210, 225);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, pageWidth - 20, 277, 'S');

  // Decorative Inner Header Accent Line
  doc.setDrawColor(18, 46, 93); // Dark Navy #122e5d
  doc.setLineWidth(1);
  doc.line(margin, 38, pageWidth - margin, 38);
  doc.setLineWidth(0.3);
  doc.line(margin, 39.5, pageWidth - margin, 39.5);

  // Header Text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('YAYASAN SASMITA JAYA', pageWidth / 2, 18, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(18, 46, 93); // Dark Navy
  doc.text('SMK SASMITA JAYA 2 PAMULANG', pageWidth / 2, 24, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Jl. Surya Kencana No. 1, Pamulang Barat, Kec. Pamulang, Kota Tangerang Selatan, Banten 15417',
    pageWidth / 2,
    29,
    { align: 'center' }
  );
  doc.text(
    'Website: https://smksasmitajaya2.sch.id | Email: bkk@smksasmitajaya2.sch.id',
    pageWidth / 2,
    33.5,
    { align: 'center' }
  );

  // Document Title Badge
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, 46, contentWidth, 14, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('BUKTI RESMI PENGISIAN TRACER STUDY ALUMNI', pageWidth / 2, 53, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Bursa Kerja Khusus (BKK) & Pusat Karir Alumni', pageWidth / 2, 57.5, { align: 'center' });

  // Registration & Date Info Bar
  const yReg = 68;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Nomor Registrasi:', margin, yReg);
  doc.setTextColor(29, 78, 216); // Blue 700
  doc.setFont('courier', 'bold');
  doc.setFontSize(10);
  doc.text(submissionId || 'TRC-2026-0001', margin + 35, yReg);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const printDate = submittedAt ? new Date(submittedAt).toLocaleString('id-ID') : new Date().toLocaleString('id-ID');
  doc.text(`Waktu Pengisian: ${printDate}`, pageWidth - margin, yReg, { align: 'right' });

  // Table Container
  const yTable = 74;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, yTable, contentWidth, 90, 2, 2, 'S');

  // Table rows
  const rowData: [string, string][] = [
    ['Nama Lengkap', identitas.nama_lengkap || '-'],
    ['NISN', identitas.nisn || '-'],
    ['NIK (KTP)', identitas.nik || '-'],
    ['Kompetensi Keahlian', identitas.jurusan || '-'],
    ['Tahun Lulus', identitas.tahun_lulus ? String(identitas.tahun_lulus) : '-'],
    ['Nomor WhatsApp / HP', identitas.no_whatsapp || '-'],
    ['Email', identitas.email || '-'],
    ['Status Terdata Saat Ini', statusKegiatan ? statusKegiatan.toUpperCase() : '-'],
  ];

  let currentY = yTable + 8;
  rowData.forEach(([label, value], index) => {
    // Zebra background
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin + 1, currentY - 5.5, contentWidth - 2, 10.5, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(label, margin + 4, currentY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    if (label === 'Status Terdata Saat Ini') {
      doc.setTextColor(16, 185, 129); // Emerald
    }
    doc.text(value, margin + 55, currentY);

    currentY += 10.5;
  });

  // Validation Stamp Box
  const yStamp = 172;
  doc.setFillColor(240, 253, 244); // Light Emerald #f0fdf4
  doc.setDrawColor(187, 247, 208); // Emerald 200
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yStamp, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(21, 128, 61); // Emerald 700
  doc.text('STATUS DOKUMEN: TERVALIDASI SISTEM PUSAT', margin + 6, yStamp + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Tanda bukti ini sah dan diterbitkan secara digital oleh Sistem Tracer Study SMK Sasmita Jaya 2.',
    margin + 6,
    yStamp + 12.5
  );
  doc.text(
    'Tunjukkan dokumen ini ke loket Tata Usaha / BKK untuk pengambilan Ijazah asli & Sertifikat Uji Kompetensi BNSP.',
    margin + 6,
    yStamp + 17
  );

  // Signatures Section
  const ySign = 206;
  const colRightX = pageWidth - margin - 50;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Pamulang, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), colRightX, ySign);
  doc.text('Kepala BKK SMK Sasmita Jaya 2', colRightX, ySign + 5);

  // Signature line
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.3);
  doc.line(colRightX - 5, ySign + 30, colRightX + 45, ySign + 30);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('BKK SMK Sasmita Jaya 2', colRightX, ySign + 34);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('NIP / NIDN. 19820514 200801 1 003', colRightX, ySign + 38);

  // Footer Note & Verification Code
  const yFooter = 265;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, yFooter, pageWidth - margin, yFooter);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Dokumen ini dicetak otomatis oleh Portal Alumni & Tracer Study SMK Sasmita Jaya 2.', margin, yFooter + 4);
  doc.text(`ID Verifikasi Digital: SHA256-${(submissionId || 'TRC2026').replace(/[^a-zA-Z0-9]/g, '')}-SASMITA`, pageWidth - margin, yFooter + 4, { align: 'right' });

  // Trigger browser file download directly
  const cleanNisn = (identitas.nisn || 'alumni').trim();
  doc.save(`Bukti_Tracer_Study_${cleanNisn}_${submissionId}.pdf`);
};
